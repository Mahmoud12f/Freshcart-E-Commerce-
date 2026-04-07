"use server"

import { cookies } from "next/headers";
import { LoginData } from "./loginFormShap";

export async function sendUserDataLogin(data: LoginData) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify(data)
        });

      
        if (!res) {
            return "Server is not responding. Please try again later.";
        }

        const resData = await res.json();

        if (resData.message === "success") {
            
            const token = resData.token;

            
            const cookieStore = await cookies();
            cookieStore.set("userToken", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 24 * 7,
                path: "/",
            });

            return true;
        }

       
        return resData.message || "An error occurred during login.";

    } catch (error) {
    
        console.error("Login Action Error:", error);
        return "Network error: Please check your internet connection.";
    }
}