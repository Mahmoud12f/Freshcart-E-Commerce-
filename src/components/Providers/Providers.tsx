"use client";
import CartContexProvider from "@/Context/CartContext/CartContext";
import { SessionProvider } from "next-auth/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartContexProvider>
      <SessionProvider>
        {children}
      </SessionProvider>
    </CartContexProvider>
  );
}