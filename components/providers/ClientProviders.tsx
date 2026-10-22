"use client";

import React from "react";
import { LanguageProvider } from "@/context/LanguageContext";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";
import CheckoutModal from "@/components/cart/CheckoutModal";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <CartProvider>
        {children}
        <CartDrawer />
        <CheckoutModal />
      </CartProvider>
    </LanguageProvider>
  );
}
