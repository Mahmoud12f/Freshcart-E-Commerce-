"use server"

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { RegisterResponse, userDataType } from "./register";

export async function handleUserRegister(userData: userDataType): Promise<string | boolean> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });

        const data: RegisterResponse = await response.json();

        if (data.message === "success") {
            const cookieStore = await cookies();
            cookieStore.set('tkn', data.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", 
                maxAge: 60 * 60 * 24 * 10, 
                sameSite: "strict",
                path: "/" 
            });

            // تحديث الكاش عشان الـ Navbar يحس بالتغيير فوراً
            revalidatePath("/", "layout"); 
            return true;
        }

        return data.message || "Registration failed.";

    } catch (error) {
        console.error("Register Action Error:", error);
        return "Network error: Please check your connection.";
    }
}