"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Package,
  Heart,
  Baby,
  MapPin,
  Gift,
  HelpCircle,
  LogOut,
  ChevronRight,
  Truck,
  Plus,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  ShoppingBag,
  X,
  Upload,
  Calendar,
} from "lucide-react";
import { useScrollLock } from "@/lib/scroll-lock";

export interface KidProfile {
  id: string;
  name: string;
  relation: string;
  age: string;
  size: string;
  gender: "Girl" | "Boy";
  avatar: string;
}

const DEMO_KIDS: KidProfile[] = [
  {
    id: "k1",
    name: "Rhea",
    relation: "Daughter",
    age: "8 Months",
    size: "6-12M",
    gender: "Girl",
    avatar: "/assets/temp/review-baby1.webp",
  },
  {
    id: "k2",
    name: "Kabir",
    relation: "Son",
    age: "3 Years",
    size: "3-4Y",
    gender: "Boy",
    avatar: "/assets/temp/review-photo3.webp",
  },
];

export default function ProfilePage() {
  const [kids, setKids] = useState<KidProfile[]>(DEMO_KIDS);
  const [selectedKidId, setSelectedKidId] = useState<string>("k1");
  const [activeTab, setActiveTab] = useState<
    "overview" | "orders" | "kids" | "wishlist" | "addresses" | "rewards"
  >("overview");

  // Add Child Modal State
  const [isAddChildOpen, setIsAddChildOpen] = useState(false);
  const [newChildName, setNewChildName] = useState("");
  const [newChildAge, setNewChildAge] = useState("");
  const [newChildGender, setNewChildGender] = useState<"Girl" | "Boy">("Girl");
  const [newChildRelation, setNewChildRelation] = useState("Daughter");
  const [newChildSize, setNewChildSize] = useState("6-12M");
  const [newChildImage, setNewChildImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useScrollLock(isAddChildOpen);

  const selectedKid = kids.find((k) => k.id === selectedKidId) || kids[0];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewChildImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChild = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChildName.trim() || !newChildAge.trim()) {
      alert("Please enter the child's name and age.");
      return;
    }

    const defaultAvatar =
      newChildGender === "Girl"
        ? "/assets/temp/review-baby2.webp"
        : "/assets/temp/review-photo3.webp";

    const newKid: KidProfile = {
      id: "k" + (kids.length + 1),
      name: newChildName.trim(),
      relation: newChildRelation,
      age: newChildAge.trim(),
      size: newChildSize,
      gender: newChildGender,
      avatar: newChildImage || defaultAvatar,
    };

    setKids((prev) => [...prev, newKid]);
    setSelectedKidId(newKid.id);

    // Reset Form & Close Modal
    setNewChildName("");
    setNewChildAge("");
    setNewChildImage(null);
    setIsAddChildOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF8E8]/40 pt-28 sm:pt-32 pb-16 sm:pb-24 font-secondary">
      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb / Back button */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-500 mb-6">
          <Link
            href="/"
            className="flex items-center gap-1.5 hover:text-[#0D03AE] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <span>/</span>
          <span className="font-semibold text-neutral-800">My Account</span>
        </div>

        {/* Profile Header Card */}
        <div className="bg-white rounded-3xl border border-black/5 shadow-xs p-6 sm:p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#FED174]/20 via-[#FAF8E8]/30 to-transparent rounded-full -mr-16 -mt-16 pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            {/* User Meta */}
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-full overflow-hidden border-3 border-[#0D03AE] shadow-md bg-white shrink-0">
                <Image
                  src="/assets/temp/review-baby1.webp"
                  alt="Priya Sharma"
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>

              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="font-primary text-2xl sm:text-3xl text-neutral-900">
                    Priya Sharma
                  </h1>
                  <span className="px-3 py-0.5 rounded-full bg-[#FED174] text-[#793A20] text-xs font-bold shrink-0">
                    Gold Club Member
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                  priya.sharma@example.com &bull; +91 98765 43210
                </p>
                <div className="flex items-center gap-2 mt-2 text-xs text-neutral-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Baha Parent since 2024</span>
                </div>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 shrink-0">
              <div className="p-3 sm:p-4 rounded-2xl bg-[#FAF8E8] border border-black/5 text-center min-w-[90px] sm:min-w-[105px]">
                <span className="block font-black text-lg sm:text-xl text-[#0D03AE]">
                  450
                </span>
                <span className="text-[11px] text-neutral-600 font-medium">
                  Baha Coins
                </span>
              </div>

              <Link
                href="/orders"
                className="p-3 sm:p-4 rounded-2xl bg-[#FFF8E0] border border-[#FED174]/40 text-center min-w-[90px] sm:min-w-[105px] hover:border-[#DC5513] transition-colors"
              >
                <span className="block font-black text-lg sm:text-xl text-[#DC5513]">
                  1 Active
                </span>
                <span className="text-[11px] text-neutral-600 font-medium">
                  Shipment
                </span>
              </Link>

              <div className="p-3 sm:p-4 rounded-2xl bg-neutral-50 border border-black/5 text-center min-w-[90px] sm:min-w-[105px]">
                <span className="block font-black text-lg sm:text-xl text-neutral-800">
                  8 Items
                </span>
                <span className="text-[11px] text-neutral-600 font-medium">
                  Wishlist
                </span>
              </div>
            </div>
          </div>

          {/* Kids Profiles Selector Bar */}
          <div className="mt-6 pt-6 border-t border-black/5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider flex items-center gap-1.5">
                <Baby className="w-4 h-4 text-[#DC5513]" />
                Kids Profiles ({kids.length})
              </span>
              <button
                type="button"
                onClick={() => setIsAddChildOpen(true)}
                className="text-xs font-bold text-[#0D03AE] hover:text-[#DC5513] transition-colors cursor-pointer flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Child
              </button>
            </div>

            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
              {kids.map((kid) => {
                const isSelected = selectedKidId === kid.id;
                return (
                  <div
                    key={kid.id}
                    onClick={() => setSelectedKidId(kid.id)}
                    className={`flex items-center gap-2.5 p-2 pr-4 rounded-2xl border transition-all cursor-pointer shrink-0 ${
                      isSelected
                        ? "bg-[#FFF8E0] border-[#0D03AE] shadow-xs ring-2 ring-[#0D03AE]/20"
                        : "bg-white border-black/10 hover:border-black/20 opacity-80 hover:opacity-100"
                    }`}
                  >
                    <div className="relative w-9 h-9 rounded-full overflow-hidden border border-black/10 shrink-0">
                      <Image
                        src={kid.avatar}
                        alt={kid.name}
                        fill
                        sizes="36px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col text-left">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs sm:text-sm text-neutral-900 leading-none">
                          {kid.name}
                        </span>
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0D03AE]" />
                        )}
                      </div>
                      <span className="text-[11px] text-neutral-500 mt-0.5 leading-none">
                        {kid.age} &bull; Size {kid.size}
                      </span>
                    </div>
                  </div>
                );
              })}

              <button
                type="button"
                onClick={() => setIsAddChildOpen(true)}
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-2xl border border-dashed border-neutral-300 text-neutral-600 hover:border-[#0D03AE] hover:text-[#0D03AE] transition-all text-xs font-semibold shrink-0 cursor-pointer bg-white"
              >
                <Plus className="w-4 h-4" />
                <span>Add Child</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Grid: Sidebar Tabs + Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Left Navigation Menu */}
          <div className="lg:col-span-1 space-y-2">
            <div className="bg-white rounded-3xl border border-black/5 p-3 shadow-xs space-y-1">
              {[
                {
                  id: "overview",
                  label: "Dashboard Overview",
                  icon: Sparkles,
                  href: null,
                },
                {
                  id: "orders",
                  label: "My Orders & Returns",
                  icon: Package,
                  href: "/orders",
                },
                {
                  id: "kids",
                  label: "Baby's Profile & Sizes",
                  icon: Baby,
                  href: null,
                },
                {
                  id: "wishlist",
                  label: "Saved Wishlist",
                  icon: Heart,
                  href: null,
                },
                {
                  id: "addresses",
                  label: "Saved Addresses",
                  icon: MapPin,
                  href: null,
                },
                {
                  id: "rewards",
                  label: "Baha Coins & Perks",
                  icon: Gift,
                  href: null,
                },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                if (tab.href) {
                  return (
                    <Link
                      key={tab.id}
                      href={tab.href}
                      className="w-full flex items-center justify-between p-3 rounded-2xl text-xs sm:text-sm font-semibold text-neutral-700 hover:bg-[#FAF8E8]/70 hover:text-[#0D03AE] transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-neutral-400" />
                    </Link>
                  );
                }

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#0D03AE] text-white shadow-xs"
                        : "text-neutral-700 hover:bg-[#FAF8E8]/70 hover:text-[#0D03AE]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 ${
                        isActive ? "text-white" : "text-neutral-400"
                      }`}
                    />
                  </button>
                );
              })}

              <hr className="my-2 border-black/5" />

              <button
                type="button"
                onClick={() => alert("Logged out successfully")}
                className="w-full flex items-center gap-3 p-3 rounded-2xl text-xs sm:text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          </div>

          {/* Right Content View */}
          <div className="lg:col-span-3 space-y-6">
            {/* Active Shipment Banner */}
            <div className="bg-[#FFF8E0] rounded-3xl border border-[#FED174]/60 p-5 sm:p-6 shadow-xs">
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="font-bold text-[#793A20] flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#DC5513]" />
                  Active In-Transit Order &bull; #BAHA-8921
                </span>
                <span className="text-xs text-emerald-700 font-semibold bg-white/90 px-3 py-1 rounded-full shadow-2xs">
                  On Time
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-white shrink-0 border border-black/5">
                    <Image
                      src="/assets/temp/pr1.webp"
                      alt="Nap-Bottom Romper"
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-neutral-900">
                      Nap-Bottom One-Piece (Cherry) + 1 more item
                    </h4>
                    <p className="text-xs text-neutral-600 mt-1">
                      Expected Delivery:{" "}
                      <strong className="text-neutral-900 font-bold">
                        Tomorrow, by 6:00 PM
                      </strong>
                    </p>
                    <span className="text-[11px] text-neutral-500">
                      Courier: Bluedart Express &bull; AWB 7891230491
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href="/orders"
                    className="px-4 py-2.5 rounded-full bg-white border border-black/10 hover:border-[#0D03AE] text-neutral-800 hover:text-[#0D03AE] text-xs font-bold transition-all text-center"
                  >
                    View All Orders
                  </Link>
                  <button
                    type="button"
                    onClick={() => alert("Tracking live shipment details...")}
                    className="px-5 py-2.5 rounded-full bg-[#0D03AE] text-white hover:bg-[#DC5513] text-xs font-bold transition-colors cursor-pointer shadow-xs shrink-0 self-start sm:self-center"
                  >
                    Track Live Shipment &rarr;
                  </button>
                </div>
              </div>
            </div>

            {/* Selected Kid Card Highlight */}
            <div className="bg-white rounded-3xl border border-black/5 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Baby className="w-5 h-5 text-[#DC5513]" />
                  <h3 className="font-bold text-base sm:text-lg text-neutral-900">
                    Currently Shopping for: {selectedKid.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddChildOpen(true)}
                  className="text-xs font-bold text-[#0D03AE] hover:text-[#DC5513] transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Another Child
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8E8] border border-black/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-black/10 shrink-0">
                    <Image
                      src={selectedKid.avatar}
                      alt={selectedKid.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-neutral-900">
                      {selectedKid.name} ({selectedKid.relation})
                    </h5>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Age: {selectedKid.age} &bull; Recommended Size:{" "}
                      <strong className="text-[#0D03AE] font-bold">
                        {selectedKid.size}
                      </strong>
                    </p>
                  </div>
                </div>

                <Link
                  href="/products"
                  className="px-4 py-2 rounded-full bg-white border border-black/10 hover:border-[#0D03AE] text-neutral-800 hover:text-[#0D03AE] text-xs font-bold transition-all text-center"
                >
                  View Styles for {selectedKid.name} ({selectedKid.size}) &rarr;
                </Link>
              </div>
            </div>

            {/* Quick Actions & Help Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-3xl border border-black/5 p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-[#FFF8E0] text-[#DC5513] flex items-center justify-center mb-3">
                    <Gift className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm sm:text-base text-neutral-900">
                    Baha Rewards &amp; Club Perks
                  </h4>
                  <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                    You have 450 Baha Coins ready to redeem on your next baby
                    outfit purchase.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0D03AE]">
                    ₹450 Discount Value
                  </span>
                  <Link
                    href="/products"
                    className="text-xs font-bold text-[#DC5513] hover:underline"
                  >
                    Redeem Now &rarr;
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-black/5 p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-[#FAF8E8] text-[#0D03AE] flex items-center justify-center mb-3">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm sm:text-base text-neutral-900">
                    24/7 Parent Concierge
                  </h4>
                  <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                    Need sizing guidance or help with a return? Our babywear
                    specialists are available 24/7.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between">
                  <span className="text-xs text-neutral-500">
                    Avg response &lt; 2 mins
                  </span>
                  <button
                    type="button"
                    onClick={() => alert("Opening live concierge chat...")}
                    className="text-xs font-bold text-[#0D03AE] hover:underline cursor-pointer"
                  >
                    Start Chat &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Child Modal */}
      {isAddChildOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[110] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={() => setIsAddChildOpen(false)}
          />

          {/* Modal Card */}
          <div
            data-lenis-prevent="true"
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 z-10 animate-in zoom-in-95 duration-200 font-secondary max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-black/5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-[#FFF8E0] text-[#DC5513] flex items-center justify-center">
                  <Baby className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-primary text-xl text-neutral-900">
                    Add Child Profile
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Get customized size recommendations &amp; style picks.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsAddChildOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveChild} className="mt-5 space-y-4">
              {/* Optional Photo Upload */}
              <div className="flex flex-col items-center justify-center pb-2">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="relative w-20 h-20 rounded-full border-2 border-dashed border-[#0D03AE]/40 hover:border-[#0D03AE] bg-[#FAF8E8] flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all group"
                >
                  {newChildImage ? (
                    <Image
                      src={newChildImage}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <>
                      <Upload className="w-5 h-5 text-[#0D03AE] group-hover:scale-110 transition-transform mb-1" />
                      <span className="text-[10px] text-neutral-500 font-semibold">
                        Photo (Opt)
                      </span>
                    </>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <span className="text-[11px] text-neutral-400 mt-1">
                  Upload baby photo (optional)
                </span>
              </div>

              {/* Name Input (Required) */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wide mb-1.5">
                  Child&apos;s Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rhea, Kabir, Ananya"
                  value={newChildName}
                  onChange={(e) => setNewChildName(e.target.value)}
                  className="w-full bg-neutral-50 border border-black/10 rounded-2xl px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-[#0D03AE] focus:bg-white focus:ring-2 focus:ring-[#0D03AE]/15 transition-all"
                />
              </div>

              {/* Age / Birthday (Required) */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wide mb-1.5">
                    Age / Month <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 8 Months, 2 Years"
                    value={newChildAge}
                    onChange={(e) => setNewChildAge(e.target.value)}
                    className="w-full bg-neutral-50 border border-black/10 rounded-2xl px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-[#0D03AE] focus:bg-white focus:ring-2 focus:ring-[#0D03AE]/15 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wide mb-1.5">
                    Recommended Size
                  </label>
                  <select
                    value={newChildSize}
                    onChange={(e) => setNewChildSize(e.target.value)}
                    className="w-full bg-neutral-50 border border-black/10 rounded-2xl px-4 py-2.5 text-sm text-neutral-900 outline-none focus:border-[#0D03AE] focus:bg-white focus:ring-2 focus:ring-[#0D03AE]/15 transition-all cursor-pointer"
                  >
                    <option value="0-3M">0-3 Months</option>
                    <option value="3-6M">3-6 Months</option>
                    <option value="6-12M">6-12 Months</option>
                    <option value="12-18M">12-18 Months</option>
                    <option value="18-24M">18-24 Months</option>
                    <option value="2-3Y">2-3 Years</option>
                    <option value="3-4Y">3-4 Years</option>
                  </select>
                </div>
              </div>

              {/* Gender & Relation */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wide mb-1.5">
                    Gender
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(["Girl", "Boy"] as const).map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setNewChildGender(g)}
                        className={`py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                          newChildGender === g
                            ? "bg-[#0D03AE] text-white shadow-xs"
                            : "bg-neutral-50 border border-black/10 text-neutral-700 hover:bg-neutral-100"
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wide mb-1.5">
                    Relation
                  </label>
                  <select
                    value={newChildRelation}
                    onChange={(e) => setNewChildRelation(e.target.value)}
                    className="w-full bg-neutral-50 border border-black/10 rounded-2xl px-4 py-2 text-sm text-neutral-900 outline-none focus:border-[#0D03AE] focus:bg-white focus:ring-2 focus:ring-[#0D03AE]/15 transition-all cursor-pointer"
                  >
                    <option value="Daughter">Daughter</option>
                    <option value="Son">Son</option>
                    <option value="Niece">Niece</option>
                    <option value="Nephew">Nephew</option>
                    <option value="Grandchild">Grandchild</option>
                  </select>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-black/5">
                <button
                  type="button"
                  onClick={() => setIsAddChildOpen(false)}
                  className="px-5 py-2.5 rounded-full text-xs font-bold text-neutral-600 hover:bg-neutral-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#0D03AE] text-white hover:bg-[#DC5513] text-xs font-bold transition-colors cursor-pointer shadow-xs"
                >
                  Save Child Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}