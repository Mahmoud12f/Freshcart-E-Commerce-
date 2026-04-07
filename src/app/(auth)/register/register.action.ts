"use server"

import { cookies } from "next/headers";
import { RegisterResponse, userDataType } from "./register";

export async function handleUserRegister(userData: userDataType): Promise<string | boolean> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json" 
            },
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

            return true;
        }

       
        return data.message || "Registration failed. Please try again.";

    } catch (error) {
       
        console.error("Register Action Error:", error);
        return "Network error: Please check your internet connection.";
    }
}