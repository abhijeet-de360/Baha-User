"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ShieldCheck,
  CreditCard,
  Banknote,
  CheckCircle2,
  Lock,
  Sparkles,
  Plus,
  X,
  MapPin,
} from "lucide-react";

interface SavedAddress {
  id: string;
  name: string;
  tag: "Home" | "Work" | "Other";
  street: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  isDefault: boolean;
}

const INITIAL_ADDRESSES: SavedAddress[] = [
  {
    id: "addr_1",
    name: "Sneha Roy",
    tag: "Home",
    street: "Flat 402, Sunshine Meadows, Sector 45",
    city: "Gurugram",
    state: "Haryana",
    pincode: "122003",
    phone: "+91 98765 43210",
    isDefault: true,
  },
  {
    id: "addr_2",
    name: "Sneha Roy (Parents)",
    tag: "Other",
    street: "House 18, Block C, Green Park Extension",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110016",
    phone: "+91 98765 43210",
    isDefault: false,
  },
];

const ORDER_SUMMARY_ITEMS = [
  {
    id: 1,
    name: "Nap-Bottom One-Piece (Cherry Garden)",
    size: "3-6M",
    qty: 1,
    price: 249,
    originalPrice: 499,
    image: "/assets/temp/pr1.webp",
  },
  {
    id: 2,
    name: "Pink Bunny Bow Fluffy Dress Set",
    size: "6-12M",
    qty: 1,
    price: 249,
    originalPrice: 499,
    image: "/assets/temp/pr2.webp",
  },
  {
    id: 3,
    name: "Teddy Bear Cotton Pajama Pants",
    size: "12-18M",
    qty: 1,
    price: 249,
    originalPrice: 499,
    image: "/assets/temp/pr3.webp",
  },
];

export default function CheckoutPage() {
  const router = useRouter();
  const [addresses, setAddresses] = useState<SavedAddress[]>(INITIAL_ADDRESSES);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("addr_1");
  const [paymentMethod, setPaymentMethod] = useState<"online" | "cod">("online");
  const [isNewAddressOpen, setIsNewAddressOpen] = useState(false);

  // New Address Form State
  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    pincode: "",
    street: "",
    city: "",
    state: "",
    tag: "Home" as "Home" | "Work" | "Other",
  });

  // Price Calculations
  const mrpTotal = 1497;
  const bagTotal = 747;
  const promoDiscount = 100;
  const shippingFee = 0; // Free above ₹499
  const codFee = paymentMethod === "cod" ? 49 : 0;
  const finalTotal = bagTotal - promoDiscount + shippingFee + codFee;

  const handlePlaceOrder = () => {
    const randomOrderId = `BK-${Math.floor(10000 + Math.random() * 90000)}`;
    router.push(`/order-confirmed?orderId=${randomOrderId}&payment=${paymentMethod}&amount=${finalTotal}`);
  };

  const handleSaveNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddress.name || !newAddress.pincode || !newAddress.street) return;

    const newId = `addr_${Date.now()}`;
    const created: SavedAddress = {
      id: newId,
      name: newAddress.name,
      phone: newAddress.phone,
      pincode: newAddress.pincode,
      street: newAddress.street,
      city: newAddress.city || "New Delhi",
      state: newAddress.state || "Delhi",
      tag: newAddress.tag,
      isDefault: false,
    };

    setAddresses((prev) => [created, ...prev]);
    setSelectedAddressId(newId);
    setNewAddress({
      name: "",
      phone: "",
      pincode: "",
      street: "",
      city: "",
      state: "",
      tag: "Home",
    });
    setIsNewAddressOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#fffcf6] text-[#292240] pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-12 select-none">
      <div className="w-full max-w-[1600px] mx-auto">
        {/* Breadcrumb & Top Bar */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0D03AE] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Bag</span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-[#786C65]">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-Bit Bank Grade Encryption</span>
          </div>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E7DEC8] pb-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EDE5FA] text-[#0D03AE] text-xs sm:text-sm font-semibold mb-2">
              <Lock className="w-4 h-4" />
              <span>256-Bit Bank Grade Encryption</span>
            </div>
            <h1 className="font-primary text-3xl sm:text-4xl md:text-5xl text-[#0D03AE] flex items-center gap-3">
              <span>Secure Checkout</span>
            </h1>
          </div>
        </div>

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Delivery Address & Payment (Span 7) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Delivery Address */}
            <section className="border-b border-[#E7DEC8] pb-8">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#0D03AE] text-white text-xs font-bold flex items-center justify-center">
                    1
                  </div>
                  <h2 className="font-primary text-xl sm:text-2xl text-[#0D03AE]">
                    Delivery Address
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setIsNewAddressOpen(!isNewAddressOpen)}
                  className="text-xs sm:text-sm font-semibold text-[#DC5513] hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Address</span>
                </button>
              </div>

              {/* Saved Addresses Horizontal Scrollable Carousel */}
              <div className="flex gap-3.5 overflow-x-auto pb-3 pt-1 scrollbar-none snap-x snap-mandatory">
                {addresses.map((addr) => {
                  const isSelected = selectedAddressId === addr.id;
                  return (
                    <label
                      key={addr.id}
                      className={`relative flex-shrink-0 w-[280px] sm:w-[320px] snap-start flex flex-col justify-between p-4 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? "border-[#0D03AE] bg-[#FFFBF0] ring-2 ring-[#0D03AE]/25 shadow-xs"
                          : "border-[#E7DEC8] hover:border-neutral-400 bg-[#FAF8E8]/70"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-neutral-900">{addr.name}</span>
                            <span className="px-2 py-0.5 rounded-md bg-[#EDE5FA] text-[#0D03AE] text-[10px] font-bold">
                              {addr.tag}
                            </span>
                          </div>
                          <input
                            type="radio"
                            name="delivery_address"
                            checked={isSelected}
                            onChange={() => setSelectedAddressId(addr.id)}
                            className="accent-[#0D03AE]"
                          />
                        </div>
                        <p className="text-xs text-[#4A4458] leading-relaxed line-clamp-3">
                          {addr.street}, {addr.city}, {addr.state} - {addr.pincode}
                        </p>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-[#E7DEC8]/60 flex items-center justify-between text-[11px] text-[#786C65]">
                        <span>Ph: {addr.phone}</span>
                        {addr.isDefault && (
                          <span className="text-emerald-700 font-bold">Default</span>
                        )}
                      </div>
                    </label>
                  );
                })}
              </div>
            </section>

            {/* Step 2: Payment Options */}
            <section className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-[#0D03AE] text-white text-xs font-bold flex items-center justify-center">
                  2
                </div>
                <h2 className="font-primary text-xl sm:text-2xl text-[#0D03AE]">
                  Payment Method
                </h2>
              </div>

              <div className="space-y-3">
                {/* Online Payment */}
                <label
                  className={`flex items-start gap-3.5 p-4 rounded-2xl border transition-all cursor-pointer ${
                    paymentMethod === "online"
                      ? "border-[#0D03AE] bg-[#FFFBF0] ring-2 ring-[#0D03AE]/25 shadow-xs"
                      : "border-[#E7DEC8] hover:border-neutral-400 bg-[#FAF8E8]/70"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment_method"
                    checked={paymentMethod === "online"}
                    onChange={() => setPaymentMethod("online")}
                    className="mt-1 accent-[#0D03AE]"
                  />
                  <div className="flex-1 text-xs sm:text-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-neutral-900 flex items-center gap-2">
                        <span>Online Payment</span>
                        <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          Recommended
                        </span>
                      </span>
                      <CreditCard className="w-5 h-5 text-[#0D03AE]" />
                    </div>
                    <p className="text-[#786C65] mt-1">
                      Pay securely via UPI (Google Pay, PhonePe, Paytm), Cards, or NetBanking.
                    </p>
                  </div>
                </label>

                {/* Cash on Delivery (COD) */}
                <label
                  className={`flex items-start gap-3.5 p-4 rounded-2xl border transition-all cursor-pointer ${
                    paymentMethod === "cod"
                      ? "border-[#0D03AE] bg-[#FFFBF0] ring-2 ring-[#0D03AE]/25 shadow-xs"
                      : "border-[#E7DEC8] hover:border-neutral-400 bg-[#FAF8E8]/70"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment_method"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="mt-1 accent-[#0D03AE]"
                  />
                  <div className="flex-1 text-xs sm:text-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-neutral-900 flex items-center gap-2">
                        <span>Cash on Delivery (COD)</span>
                        <span className="px-2 py-0.5 rounded-md bg-[#FFE4CF] text-[#DC5513] text-[10px] font-bold">
                          +₹49 Handling
                        </span>
                      </span>
                      <Banknote className="w-5 h-5 text-[#DC5513]" />
                    </div>
                    <p className="text-[#786C65] mt-1">
                      Pay in cash or scan QR at your doorstep upon parcel delivery.
                    </p>
                  </div>
                </label>
              </div>
            </section>
          </div>

          {/* Right Column: Order Summary (Span 5) */}
          <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-28">
            <div className="border border-[#E7DEC8] rounded-3xl p-6 sm:p-7 bg-[#FFFBF0]/60 space-y-5">
              <h3 className="font-primary text-xl sm:text-2xl text-[#0D03AE] border-b border-[#E7DEC8] pb-3">
                Order Summary (3 items)
              </h3>

              {/* Items Preview */}
              <div className="space-y-3.5 max-h-64 overflow-y-auto pr-1">
                {ORDER_SUMMARY_ITEMS.map((item) => (
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
                  <span>Bag MRP Total</span>
                  <span className="line-through text-neutral-400">₹{mrpTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discounted Price</span>
                  <span className="font-semibold text-neutral-900">₹{bagTotal}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Coupon Savings</span>
                  <span>-₹{promoDiscount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="text-emerald-700 font-bold">FREE</span>
                </div>
                {paymentMethod === "cod" && (
                  <div className="flex justify-between text-[#DC5513] font-medium">
                    <span>COD Convenience Fee</span>
                    <span>+₹49</span>
                  </div>
                )}
              </div>

              {/* Grand Total */}
              <div className="border-t border-[#E7DEC8] pt-4 flex items-baseline justify-between">
                <div>
                  <span className="font-bold text-sm text-neutral-900 block">Total Payable</span>
                  <span className="text-[11px] text-emerald-700 font-semibold">
                    You save ₹{mrpTotal - finalTotal} on this order!
                  </span>
                </div>
                <span className="font-black text-2xl text-[#0D03AE]">₹{finalTotal}</span>
              </div>

              {/* Pay / Place Order Button */}
              <button
                type="button"
                onClick={handlePlaceOrder}
                className="w-full py-4 rounded-full bg-[#0D03AE] hover:bg-[#090280] text-white font-primary text-lg sm:text-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>
                  {paymentMethod === "cod" ? "Place COD Order" : `Pay ₹${finalTotal} Securely`}
                </span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#786C65] text-center pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Genuine Kids Wear &bull; Free 7-Day Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add New Address Modal Dialog */}
      {isNewAddressOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs">
          <div
            className="relative w-full max-w-lg bg-[#fffcf6] rounded-3xl p-6 sm:p-8 border border-[#E7DEC8] shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E7DEC8]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#EDE5FA] text-[#0D03AE] flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-primary text-xl sm:text-2xl text-[#0D03AE]">
                    Add New Address
                  </h3>
                  <p className="text-[11px] text-[#786C65]">Enter accurate delivery details</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsNewAddressOpen(false)}
                className="w-8 h-8 rounded-full bg-white/70 hover:bg-white text-neutral-500 hover:text-neutral-800 flex items-center justify-center transition-colors cursor-pointer border border-[#E7DEC8]"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Address Form */}
            <form onSubmit={handleSaveNewAddress} className="mt-5 space-y-4">
              {/* Tag Selector */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Address Tag
                </label>
                <div className="flex gap-2">
                  {(["Home", "Work", "Other"] as const).map((tagOption) => (
                    <button
                      key={tagOption}
                      type="button"
                      onClick={() => setNewAddress({ ...newAddress, tag: tagOption })}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                        newAddress.tag === tagOption
                          ? "bg-[#0D03AE] text-white border-[#0D03AE] shadow-xs"
                          : "bg-white/70 text-neutral-700 border-[#E7DEC8] hover:bg-white"
                      }`}
                    >
                      {tagOption}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-600 mb-1">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sneha Roy"
                    value={newAddress.name}
                    onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7DEC8] bg-white text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-[#0D03AE] focus:ring-1 focus:ring-[#0D03AE]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-600 mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={newAddress.phone}
                    onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7DEC8] bg-white text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-[#0D03AE] focus:ring-1 focus:ring-[#0D03AE]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-600 mb-1">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="6-digit PIN code"
                    value={newAddress.pincode}
                    onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7DEC8] bg-white text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-[#0D03AE] focus:ring-1 focus:ring-[#0D03AE]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-600 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gurugram"
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7DEC8] bg-white text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-[#0D03AE] focus:ring-1 focus:ring-[#0D03AE]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-600 mb-1">
                  House / Flat No., Apartment, Street *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Flat 402, Sunshine Meadows, Sector 45"
                  value={newAddress.street}
                  onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7DEC8] bg-white text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-[#0D03AE] focus:ring-1 focus:ring-[#0D03AE]"
                />
              </div>

              {/* Form Action Buttons */}
              <div className="pt-3 border-t border-[#E7DEC8] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewAddressOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-neutral-300 text-xs sm:text-sm font-semibold text-neutral-700 hover:bg-neutral-50 cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#0D03AE] hover:bg-[#090280] text-white text-xs sm:text-sm font-primary shadow-sm hover:shadow transition-all cursor-pointer active:scale-95"
                >
                  Save &amp; Deliver Here
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
