"use client"

import React, { createContext, useState, ReactNode } from "react"

// تعريف الـ Interface عشان الـ TypeScript ميزعلش
interface CartContextType {
  cartCount: number;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
}

// القيم الافتراضية
export const CartCreatedContext = createContext<CartContextType>({
  cartCount: 0,
  setCartCount: () => {} 
});

export default function CartContexProvider({ children }: { children: ReactNode }) {
  const [cartCount, setCartCount] = useState<number>(0);

  return (
    // لازم تبعت الاتنين في الـ value وتستخدم .Provider
    <CartCreatedContext.Provider value={{ cartCount, setCartCount }}>
      {children}
    </CartCreatedContext.Provider>
  );
}