"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { ProfileDrawer } from "@/components/profile/ProfileDrawer";

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

  // Click outside to collapse search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
      }
    };
    if (searchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchOpen]);

  const navLinks = [
    { label: "New Arrivals", href: "/#new-arrivals" },
    { label: "Boys", href: "/#boys" },
    { label: "Girls", href: "/#girls" },
    { label: "Baby", href: "/#baby" },
    { label: "Ethnic Wear", href: "/#ethnic-wear" },
  ];

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 w-full pt-3 sm:pt-6 lg:pt-8 px-3 sm:px-6 lg:px-8 pointer-events-none transition-all duration-300 font-jost">
        {/* Floating Pill Container with Aceternity LiquidGlass */}
        <div className="relative max-w-[1600px] mx-auto pointer-events-auto">
          <LiquidGlass
            radius={32}
            bevelDepth={100}
            scale={50}
            aberration={3}
            frost={0.5}
            tint={0.1}
            className="border border-white/60 shadow-[0_8px_32px_0_rgba(13,3,174,0.1),inset_0_1px_1px_rgba(255,255,255,0.8)] transition-all duration-300"
            contentClassName="relative px-3 sm:px-6 lg:px-7 py-1.5 sm:py-2.5 lg:py-3 min-h-[46px] sm:min-h-[54px] lg:min-h-[64px] flex items-center"
          >
            <div className="flex items-center justify-between gap-4 w-full">
              
              {/* Left Side: Desktop Nav Links / Mobile Menu Button */}
              <div className="flex items-center">
                {/* Mobile Menu Toggle */}
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-2 -ml-1 text-black hover:text-brand-primary hover:bg-black/5 rounded-xl transition-colors cursor-pointer"
                  aria-label="Toggle Navigation"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>

                {/* Left Nav Menu Items */}
                <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-semibold text-black">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-black hover:text-brand-primary transition-colors tracking-normal font-normal"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Spacer to give room for center protruding logo */}
              <div className="w-16 sm:w-24 lg:w-32 h-1 shrink-0 pointer-events-none" />

              {/* Right Side: Action Icons + Leftward Expanding Search */}
              <div className="flex items-center gap-1 sm:gap-3 text-black relative">
                {/* Expand-towards-left Search Bar */}
                <div ref={searchContainerRef} className="relative flex items-center justify-end">
                  <div
                    className={`flex items-center rounded-full transition-all duration-300 ease-out overflow-hidden ${
                      searchOpen
                        ? "w-40 sm:w-56 md:w-72 bg-white/90 border border-black/15 shadow-sm px-2.5 py-1"
                        : "w-0 border-transparent p-0 opacity-0 pointer-events-none"
                    }`}
                  >
                    <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black/50 shrink-0 mr-1.5" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search styles..."
                      className="w-full bg-transparent text-xs sm:text-sm text-black placeholder:text-black/40 outline-none font-normal"
                      onKeyDown={(e) => {
                        if (e.key === "Escape") setSearchOpen(false);
                      }}
                    />
                    {searchQuery ? (
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="text-black/50 hover:text-black p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    ) : null}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSearchOpen(!searchOpen)}
                    className={`p-1.5 sm:p-2 rounded-full text-black hover:bg-black/5 hover:text-brand-primary transition-colors cursor-pointer shrink-0 ${
                      searchOpen ? "bg-black/5 text-brand-primary" : ""
                    }`}
                    aria-label="Toggle Search"
                  >
                    {searchOpen ? (
                      <X className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
                    ) : (
                      <Search className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
                    )}
                  </button>
                </div>

                {/* Wishlist Icon */}
                <Link
                  href="/#wishlist"
                  className="relative p-1.5 sm:p-2 rounded-full text-black hover:bg-black/5 hover:text-brand-primary transition-colors shrink-0"
                  aria-label="Wishlist"
                >
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
                </Link>

                {/* Shopping Bag / Cart */}
                <button
                  type="button"
                  onClick={() => setCartOpen(true)}
                  className="relative p-1.5 sm:p-2 rounded-full text-black hover:bg-black/5 hover:text-brand-primary transition-colors shrink-0 cursor-pointer"
                  aria-label="Open Shopping Bag"
                >
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
                  <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-[#DC5513] text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                    3
                  </span>
                </button>

                {/* User Account / Profile */}
                <button
                  type="button"
                  onClick={() => setProfileOpen(true)}
                  className="p-1.5 sm:p-2 rounded-full text-black hover:bg-black/5 hover:text-brand-primary transition-colors shrink-0 cursor-pointer"
                  aria-label="Open User Profile"
                >
                  <User className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
                </button>
              </div>
            </div>

            {/* Mobile Drawer Links */}
            {mobileMenuOpen && (
              <div className="lg:hidden mt-3 pt-3 border-t border-black/10 flex flex-col gap-1 animate-in fade-in slide-in-from-top-2 duration-200 w-full">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 rounded-xl text-sm font-semibold text-black hover:bg-black/5 hover:text-brand-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </LiquidGlass>

          {/* Center Logo Anchor (Circle Badge protruding out of the glass bar at BOTH top and bottom) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-30 pointer-events-auto">
            <Link
              href="/"
              className="group relative flex items-center justify-center w-16 h-16 sm:w-22 sm:h-22 lg:w-28 lg:h-28 rounded-full bg-[#0D03AE] text-white shadow-[0_8px_24px_-4px_rgba(13,3,174,0.4),0_0_0_3px_#ffffff] sm:shadow-[0_12px_30px_-4px_rgba(13,3,174,0.45),0_0_0_5px_#ffffff] transition-transform duration-300 hover:scale-105 active:scale-95 overflow-hidden p-1.5 sm:p-2.5 lg:p-3"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src="/assets/logo.webp"
                  alt="Baha Kids Logo"
                  fill
                  sizes="(max-width: 640px) 64px, (max-width: 1024px) 88px, 112px"
                  priority
                  className="object-contain drop-shadow-xs"
                />
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Cart Drawer */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Profile Drawer */}
      <ProfileDrawer isOpen={profileOpen} onClose={() => setProfileOpen(false)} />
    </>
  );
};
