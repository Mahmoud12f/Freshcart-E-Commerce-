"use server"

import { getUserToken } from "@/app/myUtil";
import { revalidatePath } from "next/cache";
import { prodcutCartId, productQuantity } from "./AddToCart.interface";


async function getAuthHeaders() {
    const token = await getUserToken();
    if (!token) return null;

    return {
        "token": token as string,
        "Content-Type": "application/json",
    };
}

// 1. إضافة منتج للسلة
export async function handleAddProductToCart(data: prodcutCartId) {
    try {
        const headers = await getAuthHeaders();
        if (!headers) return { status: "error", message: "User not authenticated" };

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`, {
            method: "POST",
            headers,
            body: JSON.stringify(data)
        });

        const resData = await response.json();
        
        if (resData.status === "success") {
            revalidatePath('/cart');
            return {
                status: resData.status,
                message: resData.message,
                numOfCartItems: resData.numOfCartItems,
                cartId: resData.cartId,
                totalCartPrice: resData.data.totalCartPrice,
                products: resData.data.products
            };
        }
        return { status: "error", message: resData.message };
    } catch (error) {
        return { status: "error", message: "Network connection failed" };
    }
}

// 2. جلب بيانات السلة
export async function getUserCart() {
    try {
        const headers = await getAuthHeaders();
        if (!headers) return null;

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`, {
            method: "GET",
            headers,
            cache: "no-store", 
        });

        const resData = await response.json();
        
        if (resData.status === "success") {
            return {
                numOfCartItems: resData.numOfCartItems,
                cartId: resData.cartId,
                totalCartPrice: resData.data.totalCartPrice,
                products: resData.data.products
            };
        }
        return null;
    } catch (error) {
        return null;
    }
}

// 3. تحديث كمية منتج
export async function handleProductQuantity(data: productQuantity, productId: string) {
    try {
        const headers = await getAuthHeaders();
        if (!headers) return { status: "error" };

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${productId}`, {
            method: "PUT",
            headers,
            body: JSON.stringify(data)
        });

        const resData = await response.json();
        revalidatePath('/cart');
        revalidatePath('/payment'); // تحديث صفحة الدفع أيضاً لو مفتوحة
        return resData;
    } catch (error) {
        console.error("Update quantity error:", error);
        return { status: "error" };
    }
}

// 4. حذف منتج من السلة
export async function handleRemoveProduct(productId: string) {
    try {
        const headers = await getAuthHeaders();
        if (!headers) return { status: "error" };

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${productId}`, {
            method: "DELETE",
            headers,
        });

        const resData = await response.json();
        revalidatePath('/cart');
        revalidatePath('/payment');
        return resData;
    } catch (error) {
        console.error("Remove product error:", error);
        return { status: "error" };
    }
}