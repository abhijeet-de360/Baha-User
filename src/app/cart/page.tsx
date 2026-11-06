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

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const originalSubtotal = items.reduce(
    (acc, item) => acc + item.originalPrice * item.quantity,
    0
  );
  const savings = originalSubtotal - subtotal + promoDiscount;
  const freeShippingThreshold = 499;
  const remainingForFreeShipping = Math.max(
    0,
    freeShippingThreshold - subtotal
  );
  const progressToFreeShipping = Math.min(
    100,
    (subtotal / freeShippingThreshold) * 100
  );
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 79;
  const grandTotal = Math.max(0, subtotal - promoDiscount + shippingFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "BAHA50" || promoCode.trim().toUpperCase() === "FIRST100") {
      setPromoApplied(true);
      setPromoDiscount(100);
    } else {
      alert("Invalid coupon code. Try 'BAHA50' or 'FIRST100'");
    }
  };

  return (
    <div className="min-h-screen bg-[#fffcf6] text-[#292240] pt-24 sm:pt-28 pb-36 sm:pb-28 lg:pb-20 px-4 sm:px-6 lg:px-12 select-none">
      <div className="w-full max-w-[1600px] mx-auto">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6 text-xs sm:text-sm text-[#786C65] flex items-center gap-2">
          <Link href="/" className="hover:text-[#0D03AE] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#0D03AE] font-medium">Shopping Bag</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E7DEC8] pb-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EDE5FA] text-[#0D03AE] text-xs sm:text-sm font-semibold mb-2">
              <ShoppingBag className="w-4 h-4" />
              <span>Review Your Outfits</span>
            </div>
            <h1 className="font-primary text-3xl sm:text-4xl md:text-5xl text-[#0D03AE] flex items-center gap-3">
              <span>Shopping Bag</span>
              <span className="text-xl sm:text-2xl text-[#786C65] font-normal">
                ({items.length} {items.length === 1 ? "item" : "items"})
              </span>
            </h1>
          </div>

          <Link
            href="/orders"
            className="text-xs sm:text-sm font-semibold text-[#DC5513] hover:underline self-start sm:self-auto"
          >
            View Past Orders &rarr;
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center justify-center max-w-md mx-auto">
            <div className="w-20 h-20 rounded-full bg-[#FFE4CF] text-[#DC5513] flex items-center justify-center mx-auto mb-5 shadow-xs">
              <ShoppingBag className="w-9 h-9" />
            </div>
            <h2 className="font-primary text-2xl sm:text-3xl text-[#0D03AE]">
              Your bag is currently empty!
            </h2>
            <p className="mt-2 text-sm text-[#786C65] leading-relaxed">
              Looks like you haven&apos;t added any adorable baby outfits yet!
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#0D03AE] hover:bg-[#090280] text-white font-primary text-lg shadow-md transition-all active:scale-95"
            >
              <span>Explore Baby Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Items Column (Span 7) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Free Delivery Bar */}
              <div className="bg-[#FFFBF0] rounded-2xl p-4 border border-[#E7DEC8]">
                <div className="flex items-center justify-between text-xs font-bold text-[#793A20] mb-2">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#DC5513]" />
                    {remainingForFreeShipping > 0
                      ? `Add ₹${remainingForFreeShipping} more for FREE shipping!`
                      : "🎉 Congratulations! You unlocked FREE shipping!"}
                  </span>
                  <span>{Math.round(progressToFreeShipping)}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-black/5 overflow-hidden">
                  <div
                    className="h-full bg-[#DC5513] rounded-full transition-all duration-500"
                    style={{ width: `${progressToFreeShipping}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="border border-[#E7DEC8] rounded-3xl bg-[#FFFBF0]/60 divide-y divide-[#E7DEC8] overflow-hidden">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-[#FAF8E8] shrink-0 border border-[#E7DEC8]">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </div>

                      <div>
                        <span className="text-[11px] font-jost text-[#DC5513] font-medium leading-none">
                          {item.category}
                        </span>
                        <h4 className="font-primary text-base sm:text-lg text-neutral-900 font-semibold mt-0.5">
                          {item.name}
                        </h4>
                        <p className="text-xs text-[#786C65] mt-1">
                          Size: <strong className="text-neutral-800">{item.size}</strong> &bull; Color:{" "}
                          <strong className="text-neutral-800">{item.color}</strong>
                        </p>
                        <div className="flex items-baseline gap-2 mt-2">
                          <span className="font-bold text-sm sm:text-base text-neutral-900">
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
                      <div className="flex items-center gap-3 bg-[#FAF8E8] rounded-full px-3 py-1.5 border border-[#E7DEC8]">
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

            {/* Right Summary Column (Span 5) */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
              {/* Promo Code Card */}
              <div className="border border-[#E7DEC8] rounded-3xl p-6 bg-[#FFFBF0]/60 space-y-3">
                <h3 className="font-primary text-lg text-neutral-900 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-[#DC5513]" />
                  <span>Coupons &amp; Offers</span>
                </h3>
                <form onSubmit={handleApplyPromo} suppressHydrationWarning className="flex gap-2">
                  <input
                    type="text"
                    suppressHydrationWarning
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code (e.g. BAHA50)"
                    className="flex-1 bg-[#FAF8E8] border border-[#E7DEC8] rounded-2xl px-3.5 py-2.5 text-xs uppercase font-bold text-neutral-900 placeholder:text-neutral-400 placeholder:normal-case placeholder:font-normal outline-none focus:border-[#0D03AE]"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-2xl bg-[#0D03AE] text-white hover:bg-[#090280] text-xs font-primary shadow-xs transition-colors cursor-pointer"
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
              <div className="border border-[#E7DEC8] rounded-3xl p-6 sm:p-7 bg-[#FFFBF0]/60 space-y-4">
                <h3 className="font-primary text-xl sm:text-2xl text-[#0D03AE] pb-3 border-b border-[#E7DEC8]">
                  Order Summary
                </h3>

                <div className="space-y-2.5 text-xs sm:text-sm text-[#4A4458]">
                  <div className="flex justify-between">
                    <span>Bag Total (MRP)</span>
                    <span className="line-through text-neutral-400">₹{originalSubtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Discounted Price</span>
                    <span className="font-semibold text-neutral-900">₹{subtotal}</span>
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

                <div className="pt-3 border-t border-[#E7DEC8] flex items-baseline justify-between">
                  <div>
                    <span className="font-bold text-sm text-neutral-900 block">Grand Total</span>
                    <span className="text-[11px] text-emerald-700 font-bold">
                      You save ₹{savings} total!
                    </span>
                  </div>
                  <span className="font-black text-2xl text-[#0D03AE]">₹{grandTotal}</span>
                </div>

                <Link
                  href="/checkout"
                  className="w-full py-4 rounded-full bg-[#0D03AE] hover:bg-[#090280] text-white font-primary text-lg sm:text-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-[#786C65] text-center">
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
