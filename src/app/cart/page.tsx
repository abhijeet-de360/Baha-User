"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ShieldCheck,
  Truck,
  Sparkles,
  Tag,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export interface CartItem {
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

const INITIAL_CART_ITEMS: CartItem[] = [
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

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);

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
        .filter(Boolean) as CartItem[]
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "BAHA50" || promoCode.trim().toUpperCase() === "WELCOME") {
      setPromoApplied(true);
      setPromoDiscount(100);
    } else {
      alert("Please try code 'BAHA50' or 'WELCOME'");
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const originalSubtotal = items.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0);
  const savings = originalSubtotal - subtotal + promoDiscount;
  const freeShippingThreshold = 499;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingFee = subtotal >= freeShippingThreshold || items.length === 0 ? 0 : 49;
  const grandTotal = Math.max(0, subtotal - promoDiscount + shippingFee);

  return (
    <div className="min-h-screen bg-[#FAF8E8]/40 pt-28 sm:pt-32 pb-20 font-secondary">
      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-500 mb-6">
          <Link
            href="/"
            className="flex items-center gap-1.5 hover:text-[#0D03AE] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
          <span>/</span>
          <span className="font-semibold text-neutral-800">Shopping Bag</span>
        </div>

        {/* Heading */}
        <div className="flex items-baseline justify-between mb-8 pb-4 border-b border-black/5">
          <div className="flex items-center gap-3">
            <h1 className="font-primary text-3xl sm:text-4xl text-neutral-900">
              Shopping Bag
            </h1>
            <span className="px-3 py-1 rounded-full bg-[#FED174] text-[#793A20] text-xs font-bold">
              {items.length} {items.length === 1 ? "Item" : "Items"}
            </span>
          </div>
          <Link
            href="/orders"
            className="text-xs sm:text-sm font-bold text-[#0D03AE] hover:text-[#DC5513] transition-colors"
          >
            View Past Orders &rarr;
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl border border-black/5 p-12 text-center max-w-xl mx-auto shadow-xs">
            <div className="w-20 h-20 rounded-full bg-[#FAF8E8] text-[#DC5513] flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h3 className="font-primary text-2xl text-neutral-900">
              Your bag is empty
            </h3>
            <p className="text-sm text-neutral-500 mt-2 mb-6">
              Looks like you haven&apos;t added any adorable baby outfits yet!
            </p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#0D03AE] text-white hover:bg-[#DC5513] text-sm font-bold transition-colors shadow-xs"
            >
              Explore Baby Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Items Column */}
            <div className="lg:col-span-8 space-y-4">
              {/* Free Delivery Bar */}
              <div className="bg-[#FFF8E0] rounded-2xl p-4 border border-[#FED174]/60">
                <div className="flex items-center justify-between text-xs font-bold text-[#793A20] mb-2">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#DC5513]" />
                    {remainingForFreeShipping > 0
                      ? `Add ₹${remainingForFreeShipping} more for FREE shipping!`
                      : "🎉 Congratulations! You unlocked FREE shipping!"}
                  </span>
                  <span>{Math.round(progressToFreeShipping)}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/70 overflow-hidden">
                  <div
                    className="h-full bg-[#DC5513] rounded-full transition-all duration-500"
                    style={{ width: `${progressToFreeShipping}%` }}
                  />
                </div>
              </div>

              {/* Items Card List */}
              <div className="bg-white rounded-3xl border border-black/5 shadow-xs divide-y divide-black/5 overflow-hidden">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-neutral-100 shrink-0 border border-black/5">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </div>

                      <div>
                        <span className="text-[11px] font-bold text-[#DC5513] uppercase tracking-wide">
                          {item.category}
                        </span>
                        <h4 className="font-bold text-sm sm:text-base text-neutral-900 mt-0.5">
                          {item.name}
                        </h4>
                        <p className="text-xs text-neutral-500 mt-1">
                          Size: <strong className="text-neutral-800">{item.size}</strong> &bull; Color:{" "}
                          <strong className="text-neutral-800">{item.color}</strong>
                        </p>
                        <div className="flex items-baseline gap-2 mt-2">
                          <span className="font-black text-sm sm:text-base text-neutral-900">
                            ₹{item.price}
                          </span>
                          <span className="text-xs text-neutral-400 line-through">
                            ₹{item.originalPrice}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity Selector & Remove */}
                    <div className="flex items-center justify-between w-full sm:w-auto gap-4 pt-2 sm:pt-0">
                      <div className="flex items-center gap-3 bg-neutral-100 rounded-full px-3 py-1.5 border border-black/5">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:text-[#DC5513] text-neutral-700 cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-bold text-sm text-neutral-900 min-w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:text-[#0D03AE] text-neutral-700 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="p-2 rounded-full hover:bg-rose-50 text-neutral-400 hover:text-rose-600 transition-colors cursor-pointer"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Summary Column */}
            <div className="lg:col-span-4 space-y-6">
              {/* Promo Code Card */}
              <div className="bg-white rounded-3xl border border-black/5 p-6 shadow-xs">
                <h3 className="font-bold text-sm text-neutral-900 mb-3 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-[#DC5513]" />
                  Coupons &amp; Offers
                </h3>
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code (e.g. BAHA50)"
                    className="flex-1 bg-neutral-50 border border-black/10 rounded-2xl px-3.5 py-2 text-xs uppercase font-bold text-neutral-900 placeholder:text-neutral-400 placeholder:normal-case placeholder:font-normal outline-none focus:border-[#0D03AE]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-2xl bg-[#0D03AE] text-white hover:bg-[#DC5513] text-xs font-bold transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
                {promoApplied && (
                  <p className="text-xs font-semibold text-emerald-700 mt-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Code &apos;{promoCode.toUpperCase()}&apos; applied (-₹100)
                  </p>
                )}
              </div>

              {/* Order Summary */}
              <div className="bg-white rounded-3xl border border-black/5 p-6 shadow-xs space-y-4">
                <h3 className="font-bold text-base text-neutral-900 pb-3 border-b border-black/5">
                  Order Summary
                </h3>

                <div className="space-y-2.5 text-xs text-neutral-600">
                  <div className="flex justify-between">
                    <span>Bag Total (MRP)</span>
                    <span className="line-through text-neutral-400">₹{originalSubtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Discounted Price</span>
                    <span className="font-bold text-neutral-900">₹{subtotal}</span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Promo Coupon Discount</span>
                      <span>-₹{promoDiscount}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Estimated Shipping</span>
                    <span>
                      {shippingFee === 0 ? (
                        <strong className="text-emerald-700 font-bold">FREE</strong>
                      ) : (
                        `₹${shippingFee}`
                      )}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-black/5 flex items-baseline justify-between">
                  <span className="font-bold text-sm text-neutral-900">Grand Total</span>
                  <div className="text-right">
                    <span className="font-black text-xl text-[#0D03AE]">₹{grandTotal}</span>
                    <span className="block text-[10px] text-emerald-700 font-bold">
                      You save ₹{savings} total!
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => alert("Proceeding to secure checkout...")}
                  className="w-full py-3.5 rounded-full bg-[#0D03AE] text-white hover:bg-[#DC5513] text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-neutral-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>100% Secure Checkout &bull; Free 7-Day Easy Returns</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

