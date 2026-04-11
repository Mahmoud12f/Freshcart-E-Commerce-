"use server";

import { getUserToken } from "@/app/myUtil";
import { ShippingAddressType } from "./Payment.interface";
import { revalidatePath } from "next/cache";

// 1. طلب الدفع الكاش
export async function handleCashOrder(
  shippingAddress: ShippingAddressType,
  cartId: string,
) {
  try {
    const token = await getUserToken();
    if (!token) return { status: "error", message: "User not authenticated" };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/${cartId}`,
      {
        method: "POST",
        headers: {
          token: token as string,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ shippingAddress }),
      },
    );

    const resData = await res.json();

    if (resData.status === "success") {
      revalidatePath("/cart");
      return { status: "success", data: resData };
    }

    return { status: "error", message: resData.message };
  } catch (error) {
    console.error("Cash Order Error:", error);
    return { status: "error", message: "Failed to process cash order" };
  }
}

// ===================================

// 2. طلب الدفع أونلاين (Stripe)

export async function handleOnlineOrder(
  shippingAddress: { details: string; phone: string; city: string },
  cartId: string,
) {
  try {
    // 1. التأكد من وجود الـ Token
    const token = await getUserToken();
    if (!token) throw new Error("User not authenticated");

    // 2. التأكد من أن cartId صالح وليس null
    if (!cartId || cartId === "null") {
      console.error("Error: cartId is null or undefined");
      return null;
    }

    // 3. تحديد الدومين للـ Redirect بعد الدفع
    const domain = process.env.NEXTAUTH_URL || "http://localhost:3000";

    // 4. تجهيز الطلب للـ API
    // ملاحظة: بنحول الـ shippingAddress لـ String عشان الـ Metadata في Stripe
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/checkout-session/${cartId}?url=${domain}`,
      {
        method: "POST",
        headers: {
          token: token as string,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shippingAddress: {
            details: String(shippingAddress.details),
            phone: String(shippingAddress.phone),
            city: String(shippingAddress.city),
          },
        }),
      },
    );

    const resData = await res.json();

    // 5. التعامل مع رد الـ API
    if (resData.status === "success") {
      return resData.session.url; // ده الرابط اللي هيفتح صفحة Stripe
    }

    // لو الـ API رجعت خطأ الـ Metadata تاني، جرب تبعت الـ shippingAddress كـ JSON.stringify مباشر
    if (resData.message?.includes("Metadata")) {
      const retryRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/checkout-session/${cartId}?url=${domain}`,
        {
          method: "POST",
          headers: {
            token: token as string,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            shippingAddress: JSON.stringify(shippingAddress), // الحل البديل في حالة الـ String المتداخل
          }),
        },
      );
      const retryData = await retryRes.json();
      if (retryData.status === "success") return retryData.session.url;
    }

    throw new Error(resData.message || "Failed to create checkout session");
  } catch (error) {
    console.error("Online Order Error:", error);
    return null;
  }
}
