"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  Tag,
} from "lucide-react";
import { useScrollLock } from "@/lib/scroll-lock";

export interface DemoCartItem {
  id: string;
  name: string;
  category: string;
  size: string;
  color: string;
  price: number;
  originalPrice: number;
  image: string;
  quantity: number;
}

const INITIAL_DEMO_ITEMS: DemoCartItem[] = [
  {
    id: "1",
    name: "Nap-Bottom One-Piece (Cherry Garden)",
    category: "Little Girl",
    size: "3-6M",
    color: "Cream Cherry",
    price: 249,
    originalPrice: 499,
    image: "/assets/temp/pr1.webp",
    quantity: 1,
  },
  {
    id: "2",
    name: "Pink Bunny Bow Fluffy Dress Set",
    category: "Little Girl",
    size: "6-12M",
    color: "Blush Pink",
    price: 249,
    originalPrice: 499,
    image: "/assets/temp/pr2.webp",
    quantity: 1,
  },
  {
    id: "3",
    name: "Teddy Bear Cotton Pajama Pants",
    category: "Unisex Wear",
    size: "12-18M",
    color: "Vanilla",
    price: 249,
    originalPrice: 499,
    image: "/assets/temp/pr4.webp",
    quantity: 1,
  },
];

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const [items, setItems] = useState<DemoCartItem[]>(INITIAL_DEMO_ITEMS);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);

  // Stop background page and Lenis scroll while drawer is open
  useScrollLock(isOpen);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as DemoCartItem[]
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode.trim()) return;
    if (promoCode.trim().toUpperCase() === "BAHAKIDS" || promoCode.trim().toUpperCase() === "BABY10") {
      setPromoApplied(true);
      setPromoDiscount(50);
    } else {
      alert("Invalid code. Try 'BAHAKIDS' for ₹50 off!");
    }
  };

  const subtotal = items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  const totalOriginal = items.reduce(
    (acc, curr) => acc + curr.originalPrice * curr.quantity,
    0
  );
  const totalSavings = totalOriginal - subtotal + promoDiscount;
  const shippingFreeThreshold = 499;
  const isFreeShipping = subtotal >= shippingFreeThreshold;
  const amountToFreeShipping = Math.max(0, shippingFreeThreshold - subtotal);
  const finalTotal = Math.max(0, subtotal - promoDiscount);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex justify-end"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Slide-over Drawer Panel */}
      <div
        data-lenis-prevent="true"
        className="relative w-full max-w-md sm:max-w-lg bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300 font-secondary"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-black/5 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#FFF8E0] text-[#0D03AE] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-[#DC5513]" />
            </div>
            <div>
              <h2 className="font-['Didot',_'Playfair_Display',_'Times_New_Roman',_Georgia,_serif] italic font-bold text-lg sm:text-xl text-[#0D03AE]">
                Your Shopping Bag
              </h2>
              <span className="text-[11px] text-neutral-500 font-medium">
                {items.length} {items.length === 1 ? "item" : "items"} selected
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-4 sm:px-5 py-3 bg-[#FAF8E8] border-b border-[#FED174]/40 shrink-0">
          <div className="flex items-center justify-between text-xs font-semibold mb-1.5 text-[#793A20]">
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#DC5513]" />
              {isFreeShipping ? (
                <strong className="text-emerald-700">
                  🎉 Congratulations! You have unlocked Free Shipping!
                </strong>
              ) : (
                <>Add ₹{amountToFreeShipping} more for Free Express Delivery</>
              )}
            </span>
          </div>

          <div className="w-full h-1.5 rounded-full bg-black/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#FED174] to-[#DC5513] rounded-full transition-all duration-300"
              style={{
                width: `${Math.min(100, (subtotal / shippingFreeThreshold) * 100)}%`,
              }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 no-scrollbar">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-[#FFF8E0] text-[#DC5513] flex items-center justify-center mb-3">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-base text-neutral-900 mb-1">
                Your bag is empty!
              </h3>
              <p className="text-xs text-neutral-500 max-w-xs mb-5 leading-relaxed">
                Explore our softest organic cord sets, sleepwear, and playsuits for your little one.
              </p>
              <button
                type="button"
                onClick={() => {
                  setItems(INITIAL_DEMO_ITEMS);
                }}
                className="px-5 py-2.5 rounded-full bg-[#0D03AE] text-white text-xs font-semibold hover:bg-[#0a028a] transition-colors cursor-pointer"
              >
                Restore Demo Products
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3.5 p-3 rounded-2xl bg-neutral-50/70 border border-neutral-100 shadow-2xs hover:shadow-xs transition-shadow relative group"
              >
                {/* Product Thumbnail */}
                <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-xl overflow-hidden bg-white shrink-0 border border-black/5">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="88px"
                    className="object-cover"
                  />
                </div>

                {/* Meta & Price */}
                <div className="flex-1 flex flex-col justify-between min-w-0 pr-6">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#DC5513] tracking-wide block">
                      {item.category}
                    </span>
                    <h4 className="font-semibold text-xs sm:text-[13px] text-neutral-900 truncate leading-snug">
                      {item.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-neutral-500">
                      <span>Size: <strong className="text-neutral-800">{item.size}</strong></span>
                      <span>&bull;</span>
                      <span>{item.color}</span>
                    </div>
                  </div>

                  {/* Quantity Stepper & Price */}
                  <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-black/5">
                    {/* Stepper */}
                    <div className="flex items-center border border-neutral-200 rounded-lg p-0.5 bg-white">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-6 h-6 rounded flex items-center justify-center text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-neutral-900 w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-6 h-6 rounded flex items-center justify-center text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-extrabold text-sm text-neutral-950">
                        ₹{item.price * item.quantity}
                      </span>
                      <span className="text-[11px] text-neutral-400 line-through">
                        ₹{item.originalPrice * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Remove Trash Button */}
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remove ${item.name}`}
                  className="absolute top-2.5 right-2.5 text-neutral-400 hover:text-rose-500 p-1 rounded-md transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-black/5 bg-[#FFFDF7] shrink-0 space-y-3">
            {/* Promo Code Input */}
            <form onSubmit={applyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Promo code (e.g. BAHAKIDS)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 rounded-xl border border-neutral-200 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#0D03AE]"
                />
              </div>
              <button
                type="submit"
                className="px-3.5 py-2 rounded-xl bg-neutral-900 text-white text-xs font-semibold hover:bg-black transition-colors cursor-pointer"
              >
                Apply
              </button>
            </form>

            {promoApplied && (
              <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Code &apos;BAHAKIDS&apos; applied! You saved ₹50.
              </p>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-neutral-600 pt-1">
              <div className="flex items-center justify-between">
                <span>Bag Subtotal</span>
                <span className="font-bold text-neutral-900">₹{subtotal}</span>
              </div>

              {promoDiscount > 0 && (
                <div className="flex items-center justify-between text-emerald-700 font-semibold">
                  <span>Special Promo Savings</span>
                  <span>-₹{promoDiscount}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span>Shipping Fee</span>
                <span className="font-semibold text-emerald-700">
                  {isFreeShipping ? "FREE" : "₹49"}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm font-bold text-neutral-950 pt-2 border-t border-black/5">
                <span>Final Payable</span>
                <span className="text-base text-[#0D03AE]">₹{finalTotal}</span>
              </div>
            </div>

            {/* Savings Notice */}
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-800 text-[11px] font-semibold text-center">
              🎉 You are saving a total of ₹{totalSavings} on this order!
            </div>

            {/* Checkout Action Button */}
            <button
              type="button"
              onClick={() => alert("Checkout flow initiated for ₹" + finalTotal)}
              className="w-full py-3.5 rounded-2xl bg-[#DC5513] hover:bg-[#c2460c] active:scale-98 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Trust Micro-Text */}
            <div className="flex items-center justify-center gap-4 text-[10px] text-neutral-400 pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" /> 100% Safe Checkout
              </span>
              <span>&bull;</span>
              <span>7 Days Easy Doorstep Returns</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

