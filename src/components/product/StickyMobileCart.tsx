"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ShoppingBag, Check } from "lucide-react";
import { Product } from "@/data/products";

interface StickyMobileCartProps {
  product: Product;
}

export function StickyMobileCart({ product }: StickyMobileCartProps) {
  const [visible, setVisible] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past 600px
      if (window.scrollY > 550) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!visible) return null;

  return (
    <div className="lg:hidden fixed bottom-[calc(70px+env(safe-area-inset-bottom))] inset-x-3 z-40 bg-white/95 backdrop-blur-md border border-black/10 rounded-2xl px-4 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.12)] animate-in slide-in-from-bottom duration-300 font-secondary">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        {/* Product Tiny Meta */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-neutral-100 shrink-0 border border-black/5">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="44px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-semibold text-xs text-neutral-900 truncate">
              {product.name}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xs text-neutral-950">
                ₹{product.price}
              </span>
              <span className="text-[10px] text-neutral-400 line-through">
                ₹{product.originalPrice}
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={handleAdd}
          className={`px-4 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-1.5 shrink-0 transition-all cursor-pointer shadow-sm ${
            added
              ? "bg-emerald-600 text-white"
              : "bg-[#DC5513] hover:bg-[#c2460c] text-white active:scale-95"
          }`}
        >
          {added ? (
            <>
              <Check className="w-3.5 h-3.5" /> Added!
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5" /> Add to Bag
            </>
          )}
        </button>
      </div>
    </div>
  );
}

