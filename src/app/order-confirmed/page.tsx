"use client";

import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Sparkles,
  Truck,
  MapPin,
  Calendar,
  CreditCard,
  ArrowRight,
  ShoppingBag,
  Download,
  Share2,
} from "lucide-react";

const ORDER_ITEMS = [
  {
    id: 1,
    name: "Nap-Bottom One-Piece (Cherry Garden)",
    category: "Little Girl",
    size: "3-6M",
    qty: 1,
    price: 249,
    originalPrice: 499,
    image: "/assets/temp/pr1.webp",
  },
  {
    id: 2,
    name: "Pink Bunny Bow Fluffy Dress Set",
    category: "Little Girl",
    size: "6-12M",
    qty: 1,
    price: 249,
    originalPrice: 499,
    image: "/assets/temp/pr2.webp",
  },
  {
    id: 3,
    name: "Teddy Bear Cotton Pajama Pants",
    category: "Unisex Wear",
    size: "12-18M",
    qty: 1,
    price: 249,
    originalPrice: 499,
    image: "/assets/temp/pr3.webp",
  },
];

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "BK-82914";
  const paymentMethod = (searchParams.get("payment") || "ONLINE").toUpperCase();
  const totalAmount = searchParams.get("amount") || "647";

  return (
    <div className="w-full max-w-[1200px] mx-auto space-y-8">
      {/* Hero Success Banner */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="relative inline-flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-[#E8EEDC] text-[#596F3D] flex items-center justify-center shadow-xs animate-in zoom-in-75 duration-300">
            <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
          </div>
          <span className="absolute -top-1 -right-1 flex h-6 w-6">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0D03AE] opacity-60"></span>
            <span className="relative inline-flex rounded-full h-6 w-6 bg-[#0D03AE] items-center justify-center text-white">
              <Sparkles className="w-3 h-3" />
            </span>
          </span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EDE5FA] text-[#0D03AE] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Order Confirmed &bull; #{orderId}</span>
        </div>

        <h1 className="font-primary text-3xl sm:text-4xl md:text-5xl text-[#0D03AE] tracking-tight">
          Yay! Your Little Outfits Are on the Way!
        </h1>

        <p className="text-sm sm:text-base text-[#786C65] leading-relaxed">
          We&apos;re preparing your parcel with extra love and baby-safe care. A confirmation email and WhatsApp receipt have been sent to your registered contact.
        </p>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/orders"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0D03AE] hover:bg-[#090280] text-white font-primary text-base shadow-sm transition-all active:scale-95"
          >
            <Truck className="w-4 h-4" />
            <span>Track Live Delivery</span>
          </Link>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FFFBF0] hover:bg-white text-[#0D03AE] border border-[#E7DEC8] font-primary text-base shadow-2xs transition-all active:scale-95"
          >
            <ShoppingBag className="w-4 h-4 text-[#DC5513]" />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>

      {/* 2-Column Details Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start pt-4">
        {/* Left Column: Shipment & Delivery Milestones (Span 7) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Order Details Card */}
          <div className="border border-[#E7DEC8] rounded-3xl p-6 sm:p-7 bg-[#FFFBF0]/60 space-y-5">
            <h3 className="font-primary text-xl sm:text-2xl text-[#0D03AE] border-b border-[#E7DEC8] pb-3 flex items-center justify-between">
              <span>Delivery Information</span>
              <span className="text-xs font-sans font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                Preparing to Ship
              </span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              {/* Delivery Address */}
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#fffcf6] border border-[#E7DEC8]">
                <MapPin className="w-4 h-4 text-[#0D03AE] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-neutral-900">Sneha Roy</p>
                  <p className="text-[#4A4458] mt-0.5 leading-relaxed">
                    Flat 402, Sunshine Meadows, Sector 45, Gurugram, Haryana - 122003
                  </p>
                  <p className="text-[#786C65] mt-1">Ph: +91 98765 43210</p>
                </div>
              </div>

              {/* Estimated Delivery & Payment */}
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#fffcf6] border border-[#E7DEC8]">
                  <Calendar className="w-4 h-4 text-[#DC5513] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] text-[#786C65]">Estimated Arrival</p>
                    <p className="font-bold text-neutral-900">3 - 4 Business Days</p>
                    <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">Dispatches in 24 Hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#fffcf6] border border-[#E7DEC8]">
                  <CreditCard className="w-4 h-4 text-[#0D03AE] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] text-[#786C65]">Payment Method</p>
                    <p className="font-bold text-neutral-900">{paymentMethod}</p>
                    <p className="text-[11px] text-[#786C65]">Total: ₹{totalAmount}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Progress Steps */}
            <div className="pt-2">
              <h4 className="font-bold text-xs text-neutral-900 mb-3">Order Milestones</h4>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                  <span className="block font-bold text-emerald-800">Confirmed</span>
                  <span className="text-[10px] text-emerald-600">Today</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#fffcf6] border border-[#E7DEC8] text-neutral-600">
                  <span className="block font-semibold">Packed</span>
                  <span className="text-[10px] text-neutral-400">Next Step</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#fffcf6] border border-[#E7DEC8] text-neutral-400">
                  <span className="block font-semibold">Delivered</span>
                  <span className="text-[10px]">In 3-4 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Order Items & Summary (Span 5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="border border-[#E7DEC8] rounded-3xl p-6 sm:p-7 bg-[#FFFBF0]/60 space-y-5">
            <h3 className="font-primary text-xl sm:text-2xl text-[#0D03AE] border-b border-[#E7DEC8] pb-3">
              Items Ordered ({ORDER_ITEMS.length})
            </h3>

            {/* Items List */}
            <div className="space-y-3.5 max-h-64 overflow-y-auto pr-1">
              {ORDER_ITEMS.map((item) => (
                <div key={item.id} className="flex items-center gap-3 text-xs sm:text-sm">
                  <div className="relative w-14 h-14 rounded-xl bg-[#FAF8E8] overflow-hidden shrink-0 border border-[#E7DEC8]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-neutral-900 truncate">{item.name}</p>
                    <p className="text-[11px] text-[#786C65]">Size: {item.size} &bull; Qty: {item.qty}</p>
                  </div>
                  <span className="font-bold text-neutral-900">₹{item.price}</span>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="border-t border-[#E7DEC8] pt-4 space-y-2 text-xs sm:text-sm text-[#4A4458]">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-neutral-900">₹747</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Coupon Applied</span>
                <span>-₹100</span>
              </div>
              <div className="flex justify-between">
                <span>Standard Delivery</span>
                <span className="text-emerald-700 font-bold">FREE</span>
              </div>
              <div className="border-t border-[#E7DEC8] pt-3 flex justify-between font-bold text-sm text-neutral-900">
                <span>Total Paid</span>
                <span className="font-black text-lg text-[#0D03AE]">₹{totalAmount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmedPage() {
  return (
    <div className="min-h-screen bg-[#fffcf6] text-[#292240] pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-12 select-none">
      <Suspense fallback={<div className="py-20 text-center">Loading confirmation...</div>}>
        <OrderConfirmationContent />
      </Suspense>
    </div>
  );
}

