"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  Package,
  Heart,
  Baby,
  MapPin,
  Gift,
  HelpCircle,
  LogOut,
  ChevronRight,
  Sparkles,
  Truck,
  CheckCircle2,
  Clock,
  Plus,
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

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileDrawer({ isOpen, onClose }: ProfileDrawerProps) {
  const [kids, setKids] = useState<KidProfile[]>(DEMO_KIDS);
  const [selectedKidId, setSelectedKidId] = useState<string>("k1");

  const selectedKid = kids.find((k) => k.id === selectedKidId) || kids[0];

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
        {/* Header / User Card */}
        <div className="p-5 sm:p-6 bg-gradient-to-b from-[#FAF8E8] to-white border-b border-black/5 shrink-0 relative">
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close profile"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-neutral-700 shadow-2xs flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3.5">
            {/* Avatar */}
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-[#0D03AE] shadow-md bg-white shrink-0">
              <Image
                src="/assets/temp/review-baby1.webp"
                alt="Priya Sharma"
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>

            {/* User Meta */}
            <div className="flex flex-col min-w-0 pr-6">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base sm:text-lg text-neutral-900 truncate">
                  Priya Sharma
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#FED174] text-[#793A20] text-[10px] font-bold shrink-0">
                  Gold Club
                </span>
              </div>
              <p className="text-xs text-neutral-500 truncate">
                priya.sharma@example.com &bull; +91 98765 43210
              </p>
            </div>
          </div>

          {/* Multiple Kids Section (Directly after parent's name) */}
          <div className="mt-4 pt-3.5 border-t border-black/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-neutral-600 uppercase tracking-wider flex items-center gap-1.5">
                <Baby className="w-3.5 h-3.5 text-[#DC5513]" />
                Kids Profiles ({kids.length})
              </span>
              <button
                type="button"
                onClick={() => {
                  const newName = prompt("Enter child's name:");
                  if (newName) {
                    const newKid: KidProfile = {
                      id: "k" + (kids.length + 1),
                      name: newName,
                      relation: "Child",
                      age: "1.5 Years",
                      size: "18-24M",
                      gender: "Girl",
                      avatar: "/assets/temp/review-baby2.webp",
                    };
                    setKids([...kids, newKid]);
                    setSelectedKidId(newKid.id);
                  }
                }}
                className="text-[11px] font-bold text-[#0D03AE] hover:text-[#DC5513] transition-colors cursor-pointer flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> Add Child
              </button>
            </div>

            {/* Kids Horizontal Selector */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
              {kids.map((kid) => {
                const isSelected = selectedKidId === kid.id;
                return (
                  <div
                    key={kid.id}
                    onClick={() => setSelectedKidId(kid.id)}
                    className={`flex items-center gap-2 p-1.5 pr-3 rounded-2xl border transition-all cursor-pointer shrink-0 ${
                      isSelected
                        ? "bg-[#FFF8E0] border-[#0D03AE] shadow-xs ring-1 ring-[#0D03AE]/20"
                        : "bg-white border-black/10 hover:border-black/20 opacity-80 hover:opacity-100"
                    }`}
                  >
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-black/10 shrink-0">
                      <Image
                        src={kid.avatar}
                        alt={kid.name}
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col text-left">
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-xs text-neutral-900 leading-none">
                          {kid.name}
                        </span>
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0D03AE]" />
                        )}
                      </div>
                      <span className="text-[10px] text-neutral-500 mt-0.5 leading-none">
                        {kid.age} &bull; Size {kid.size}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Add Child Plus Button */}
              <button
                type="button"
                onClick={() => {
                  const newName = prompt("Enter child's name:");
                  if (newName) {
                    const newKid: KidProfile = {
                      id: "k" + (kids.length + 1),
                      name: newName,
                      relation: "Child",
                      age: "1.5 Years",
                      size: "18-24M",
                      gender: "Girl",
                      avatar: "/assets/temp/review-baby2.webp",
                    };
                    setKids([...kids, newKid]);
                    setSelectedKidId(newKid.id);
                  }
                }}
                className="flex items-center justify-center gap-1 px-3 py-2 rounded-2xl border border-dashed border-neutral-300 text-neutral-500 hover:border-[#0D03AE] hover:text-[#0D03AE] transition-all text-xs font-semibold shrink-0 cursor-pointer bg-white/50"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Quick Perks Bar */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-black/5 text-center">
            <div className="p-2 rounded-xl bg-white border border-black/5 shadow-2xs">
              <span className="block font-extrabold text-sm text-[#0D03AE]">
                450
              </span>
              <span className="text-[10px] text-neutral-500 font-medium">
                Baha Coins
              </span>
            </div>

            <div className="p-2 rounded-xl bg-white border border-black/5 shadow-2xs">
              <span className="block font-extrabold text-sm text-[#DC5513]">
                1 Active
              </span>
              <span className="text-[10px] text-neutral-500 font-medium">
                Shipment
              </span>
            </div>

            <div className="p-2 rounded-xl bg-white border border-black/5 shadow-2xs">
              <span className="block font-extrabold text-sm text-neutral-800">
                8 Items
              </span>
              <span className="text-[10px] text-neutral-500 font-medium">
                Wishlist
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 no-scrollbar">
          {/* Active Live Order Tracking Banner */}
          <div className="p-4 rounded-2xl bg-[#FFF8E0] border border-[#FED174]/50 shadow-2xs">
            <div className="flex items-center justify-between text-xs mb-2.5">
              <span className="font-bold text-[#793A20] flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#DC5513]" />
                In Transit &bull; Order #BAHA-8921
              </span>
              <span className="text-[11px] text-emerald-700 font-semibold bg-white/80 px-2 py-0.5 rounded-full">
                On Time
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white shrink-0 border border-black/5">
                <Image
                  src="/assets/temp/pr1.webp"
                  alt="Nap-Bottom Romper"
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-xs text-neutral-900 truncate">
                  Nap-Bottom One-Piece (Cherry) + 1 more item
                </h4>
                <p className="text-[11px] text-neutral-500 mt-0.5">
                  Expected Delivery: <strong className="text-neutral-800">Tomorrow, by 6 PM</strong>
                </p>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-[#FED174]/40 flex items-center justify-between">
              <span className="text-[11px] text-neutral-500">
                Courier: Bluedart Express
              </span>
              <button
                type="button"
                onClick={() => alert("Tracking live shipment details...")}
                className="text-xs font-bold text-[#0D03AE] hover:text-[#DC5513] transition-colors cursor-pointer"
              >
                Track Live &rarr;
              </button>
            </div>
          </div>

          {/* Account Navigation Menu Items */}
          <div className="space-y-1">
            <span className="text-[11px] uppercase font-bold text-neutral-400 tracking-wider px-3 block mb-1">
              Account Essentials
            </span>

            {/* My Orders */}
            <Link
              href="/#orders"
              onClick={onClose}
              className="flex items-center justify-between p-3 rounded-2xl hover:bg-[#FAF8E8]/70 text-neutral-800 hover:text-[#0D03AE] transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-neutral-100 group-hover:bg-[#FFF8E0] text-neutral-700 group-hover:text-[#DC5513] flex items-center justify-center transition-colors">
                  <Package className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-xs sm:text-sm block">
                    My Orders &amp; Returns
                  </span>
                  <span className="text-[11px] text-neutral-400">
                    Track shipments, view invoices &amp; exchange items
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            {/* Baby's Profile */}
            <Link
              href="/#baby-profile"
              onClick={onClose}
              className="flex items-center justify-between p-3 rounded-2xl hover:bg-[#FAF8E8]/70 text-neutral-800 hover:text-[#0D03AE] transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-neutral-100 group-hover:bg-[#FFF8E0] text-neutral-700 group-hover:text-[#DC5513] flex items-center justify-center transition-colors">
                  <Baby className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-xs sm:text-sm block">
                    Baby&apos;s Profile &amp; Sizes
                  </span>
                  <span className="text-[11px] text-neutral-400">
                    {selectedKid.name} ({selectedKid.age}) &bull; Size {selectedKid.size} &bull; Auto-filters styles
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            {/* Wishlist */}
            <Link
              href="/#wishlist"
              onClick={onClose}
              className="flex items-center justify-between p-3 rounded-2xl hover:bg-[#FAF8E8]/70 text-neutral-800 hover:text-[#0D03AE] transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-neutral-100 group-hover:bg-[#FFF8E0] text-neutral-700 group-hover:text-[#DC5513] flex items-center justify-center transition-colors">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-xs sm:text-sm block">
                    Saved Favourites / Wishlist
                  </span>
                  <span className="text-[11px] text-neutral-400">
                    8 saved styles waiting for playday
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            {/* Saved Addresses */}
            <Link
              href="/#addresses"
              onClick={onClose}
              className="flex items-center justify-between p-3 rounded-2xl hover:bg-[#FAF8E8]/70 text-neutral-800 hover:text-[#0D03AE] transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-neutral-100 group-hover:bg-[#FFF8E0] text-neutral-700 group-hover:text-[#DC5513] flex items-center justify-center transition-colors">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-xs sm:text-sm block">
                    Saved Addresses
                  </span>
                  <span className="text-[11px] text-neutral-400">
                    Home (Indiranagar, Bangalore) &amp; 1 other
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            {/* Baha Rewards */}
            <Link
              href="/#rewards"
              onClick={onClose}
              className="flex items-center justify-between p-3 rounded-2xl hover:bg-[#FAF8E8]/70 text-neutral-800 hover:text-[#0D03AE] transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-neutral-100 group-hover:bg-[#FFF8E0] text-neutral-700 group-hover:text-[#DC5513] flex items-center justify-center transition-colors">
                  <Gift className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-xs sm:text-sm block">
                    Baha Coins &amp; Gift Cards
                  </span>
                  <span className="text-[11px] text-neutral-400">
                    Earn 5% cashback on every cuddly order
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            {/* Help & Support */}
            <Link
              href="/#support"
              onClick={onClose}
              className="flex items-center justify-between p-3 rounded-2xl hover:bg-[#FAF8E8]/70 text-neutral-800 hover:text-[#0D03AE] transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-neutral-100 group-hover:bg-[#FFF8E0] text-neutral-700 group-hover:text-[#DC5513] flex items-center justify-center transition-colors">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-xs sm:text-sm block">
                    24/7 Parent Concierge
                  </span>
                  <span className="text-[11px] text-neutral-400">
                    Instant chat &amp; sizing assistance
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Footer Log Out */}
        <div className="p-4 sm:p-5 border-t border-black/5 bg-[#FFFDF7] shrink-0">
          <button
            type="button"
            onClick={() => {
              alert("Logged out successfully");
              onClose();
            }}
            className="w-full py-2.5 rounded-xl border border-neutral-200 text-neutral-600 hover:bg-neutral-100 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            Log Out of Baha
          </button>
        </div>
      </div>
    </div>
  );
}

