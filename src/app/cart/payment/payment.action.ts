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

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/${cartId}`, {
      method: "POST",
      headers: {
        token: token as string,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ shippingAddress }) 
    });

    const resData = await res.json();
    
    if (resData.status === "success") {
        revalidatePath('/cart'); 
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
  shippingAddress: ShippingAddressType,
  cartId: string,
) {
  try {
    const token = await getUserToken();
    if (!token) throw new Error("User not authenticated");

    // تعديل حاسم: استبدال localhost برابط الموقع الحقيقي عند الرفع
    const domain = process.env.NEXTAUTH_URL || "http://localhost:3000";

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/checkout-session/${cartId}?url=${domain}`, {
      method: "POST",
      headers: {
        token: token as string,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ shippingAddress })
    });

    const resData = await res.json();

    if (resData.status === "success") {
        return resData.session.url; // رابط بوابة Stripe
    }
    
    throw new Error(resData.message || "Failed to create checkout session");

  } catch (error) {
    console.error("Online Order Error:", error);
    return null;
  }
}