'use client';

import { useShopState } from "@/hooks/useShopState";
import { createContext, ReactNode, useContext } from "react";

export const ShopContext = createContext<ReturnType<typeof useShopState> | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
    return (
        <ShopContext.Provider value={useShopState()}>
            {children}
        </ShopContext.Provider>
    )
};

export function useShop() {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error("useShop must be used inside ShopProvider");
  }

  return context;
}