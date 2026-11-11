"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronRight, Sparkles, Package, Coins, LogOut, Bell, LogIn } from "lucide-react";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { LogoutModal } from "@/components/profile/LogoutModal";
import { NotificationDropdown } from "@/components/notifications/NotificationDropdown";
import { LoginModal } from "@/components/auth/LoginModal";
import { useScrollLock } from "@/lib/scroll-lock";

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const profileContainerRef = useRef<HTMLDivElement>(null);
  const notificationContainerRef = useRef<HTMLDivElement>(null);
  const notificationDropdownRef = useRef<HTMLDivElement>(null);
  const profileTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleProfileMouseEnter = () => {
    if (profileTimeoutRef.current) {
      clearTimeout(profileTimeoutRef.current);
    }
    setProfileDropdownOpen(true);
  };

  const handleProfileMouseLeave = () => {
    profileTimeoutRef.current = setTimeout(() => {
      setProfileDropdownOpen(false);
    }, 150);
  };

  // Lock page scrolling while mobile sidebar or mobile search bottomsheet is open
  useScrollLock(mobileMenuOpen || mobileSearchOpen);

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    if (mobileSearchOpen) {
      setTimeout(() => {
        mobileSearchInputRef.current?.focus();
      }, 100);
    }
  }, [mobileSearchOpen]);

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

  // Click outside & Escape key to close notifications dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedTarget = event.target as Node;
      if (
        notificationDropdownRef.current &&
        !notificationDropdownRef.current.contains(clickedTarget) &&
        notificationContainerRef.current &&
        !notificationContainerRef.current.contains(clickedTarget)
      ) {
        setNotificationOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setNotificationOpen(false);
      }
    };

    if (notificationOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [notificationOpen]);

  const navLinks = [
    { label: "New Arrivals", href: "/products" },
    { label: "Boys", href: "/products?gender=Boys" },
    { label: "Girls", href: "/products?gender=Girls" },
    { label: "Baby", href: "/products?category=Baby" },
    { label: "Ethnic Wear", href: "/products?category=Ethnic%20Wear" },
    { label: "Reels", href: "/reels" },
  ];

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 w-full pt-2 sm:pt-3 md:pt-4 lg:pt-8 px-2.5 sm:px-4 md:px-6 lg:px-8 pointer-events-none transition-all duration-300 font-jost">
        {/* Floating pill with a clear refractive lens and specular rim */}
        <div className="relative max-w-[1600px] mx-auto pointer-events-auto">
          <LiquidGlass
            radius={999}
            bevelDepth={28}
            scale={80}
            aberration={0}
            frost={1}
            tint={0.04}
            className="z-0 border border-white/35 shadow-[0_8px_24px_rgba(25,30,45,0.12),inset_0_1px_1px_rgba(255,255,255,0.85),inset_0_-1px_1px_rgba(255,255,255,0.45)] transition-shadow duration-300"
            contentClassName="relative px-2.5 sm:px-4 md:px-5 lg:px-7 py-1.5 sm:py-2 md:py-2.5 lg:py-3 min-h-[42px] sm:min-h-[46px] md:min-h-[50px] lg:min-h-[64px] flex items-center"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(135deg,rgba(255,255,255,0.24),rgba(255,255,255,0.02)_35%,transparent_65%,rgba(255,255,255,0.14))]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-px rounded-full border border-white/20 [mask-image:linear-gradient(135deg,black,transparent_35%,transparent_65%,black)]"
            />
            <div className="relative flex items-center justify-between gap-2 sm:gap-4 w-full">
              
              {/* Left Side: Desktop Nav Links / Mobile Menu Button */}
              <div className="flex items-center">
                {/* Mobile Menu Toggle */}
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(true)}
                  className="lg:hidden p-1 sm:p-1.5 -ml-0.5 text-black hover:text-brand-primary hover:bg-black/5 rounded-xl transition-colors cursor-pointer"
                  aria-label="Open Navigation Menu"
                >
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
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
              <div className="w-12 sm:w-16 md:w-20 lg:w-32 h-1 shrink-0 pointer-events-none" />

              {/* Right Side: Action Icons + Leftward Expanding Search */}
              <div className="flex items-center gap-1 sm:gap-3 text-black relative">
                {/* Desktop Expand-towards-left Search Bar */}
                <div ref={searchContainerRef} className="hidden lg:flex relative items-center justify-end">
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
                      suppressHydrationWarning
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

                {/* Mobile Search Button (Triggers Bottom Sheet) */}
                <button
                  type="button"
                  onClick={() => setMobileSearchOpen(true)}
                  className="lg:hidden p-1 sm:p-1.5 rounded-full text-black hover:bg-black/5 hover:text-brand-primary transition-colors cursor-pointer shrink-0"
                  aria-label="Open Search"
                >
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
                </button>

                {/* Mobile Notifications Button */}
                <button
                  type="button"
                  onClick={() => {
                    setNotificationOpen((prev) => !prev);
                    setMobileSearchOpen(false);
                  }}
                  className={`lg:hidden relative p-1 sm:p-1.5 rounded-full text-black hover:bg-black/5 hover:text-brand-primary transition-colors cursor-pointer shrink-0 ${
                    notificationOpen ? "bg-black/5 text-brand-primary" : ""
                  }`}
                  aria-label="Open Notifications"
                >
                  <Bell className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
                  {unreadCount > 0 && (
                    <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-[#DC5513] ring-1.5 ring-white" />
                  )}
                </button>

                {/* Wishlist Icon (Desktop only) */}
                <Link
                  href="/wishlist"
                  className="hidden lg:flex relative p-1.5 sm:p-2 rounded-full text-black hover:bg-black/5 hover:text-brand-primary transition-colors shrink-0"
                  aria-label="Wishlist"
                >
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
                </Link> 

                {/* Notifications Icon (Desktop only) */}
                <div
                  ref={notificationContainerRef}
                  className="hidden lg:block relative"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setNotificationOpen((prev) => !prev);
                      setProfileDropdownOpen(false);
                    }}
                    className={`relative p-1.5 sm:p-2 rounded-full transition-colors shrink-0 cursor-pointer flex items-center justify-center ${
                      notificationOpen
                        ? "bg-black/5 text-brand-primary"
                        : "text-black hover:bg-black/5 hover:text-brand-primary"
                    }`}
                    aria-label="Open Notifications"
                  >
                    <Bell className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
                    {unreadCount > 0 && (
                      <span className="absolute top-0.5 right-0.5 min-w-4 h-4 px-1 rounded-full bg-[#DC5513] text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                </div>

                {/* Shopping Bag / Cart (Desktop only) */}
                <Link
                  href="/cart"
                  className="hidden lg:flex relative p-1.5 sm:p-2 rounded-full text-black hover:bg-black/5 hover:text-brand-primary transition-colors shrink-0 cursor-pointer"
                  aria-label="Open Shopping Bag"
                >
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
                  <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-[#DC5513] text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                    3
                  </span>
                </Link>

                {/* User Account / Profile Dropdown (Desktop only) */}
                <div
                  ref={profileContainerRef}
                  onMouseEnter={handleProfileMouseEnter}
                  onMouseLeave={handleProfileMouseLeave}
                  className="hidden lg:block relative"
                >
                  <Link
                    href="/profile"
                    className={`flex p-1.5 sm:p-2 rounded-full transition-colors shrink-0 cursor-pointer items-center justify-center ${
                      profileDropdownOpen
                        ? "bg-black/5 text-brand-primary"
                        : "text-black hover:bg-black/5 hover:text-brand-primary"
                    }`}
                    aria-label="Open User Profile"
                  >
                    <User className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
                  </Link>
                </div>

                {/* Login Icon (Beside Profile) */}
                <button
                  type="button"
                  onClick={() => setLoginModalOpen(true)}
                  className="hidden lg:flex p-1.5 sm:p-2 rounded-full text-black hover:bg-black/5 hover:text-brand-primary transition-colors shrink-0 cursor-pointer items-center justify-center"
                  aria-label="Login"
                  title="Sign In / Login"
                >
                  <LogIn className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
                </button>
              </div>
            </div>
          </LiquidGlass>

          {/* Notifications Dropdown (Positioned outside LiquidGlass to prevent overflow-hidden clipping) */}
          <div
            ref={notificationDropdownRef}
            className={`absolute top-full pt-2 right-2 sm:right-6 md:right-8 lg:right-24 xl:right-28 z-[999] transition-all duration-200 ease-out origin-top-right ${
              notificationOpen
                ? "opacity-100 visible translate-y-0 pointer-events-auto"
                : "opacity-0 invisible -translate-y-2 pointer-events-none"
            }`}
          >
            <NotificationDropdown
              isOpen={notificationOpen}
              onClose={() => setNotificationOpen(false)}
              unreadCount={unreadCount}
              setUnreadCount={setUnreadCount}
            />
          </div>

          {/* Desktop Profile Dropdown (Positioned outside LiquidGlass to prevent overflow-hidden clipping) */}
          <div
            onMouseEnter={handleProfileMouseEnter}
            onMouseLeave={handleProfileMouseLeave}
            className={`hidden lg:block absolute top-full pt-2 right-4 sm:right-6 md:right-8 lg:right-10 z-[999] transition-all duration-200 ease-out origin-top-right ${
              profileDropdownOpen
                ? "opacity-100 visible translate-y-0 pointer-events-auto"
                : "opacity-0 invisible -translate-y-2 pointer-events-none"
            }`}
          >
            <div className="w-60 rounded-2xl bg-[#fffcf6] border border-[#E7DEC8] shadow-[0_16px_40px_rgba(25,30,45,0.20)] p-2 font-jost backdrop-blur-md">
              {/* User greeting header */}
              <div className="px-3 py-2.5 mb-1.5 border-b border-[#E7DEC8] flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#0D03AE] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-2xs">
                  P
                </div>
                <div className="flex flex-col overflow-hidden text-left">
                  <span className="text-xs font-bold text-neutral-900 truncate">
                    Priya Sharma
                  </span>
                  <span className="text-[11px] text-neutral-500 truncate">
                    priya@example.com
                  </span>
                </div>
              </div>

              {/* Dropdown Options */}
              <div className="space-y-0.5 text-left">
                <Link
                  href="/profile"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-neutral-800 hover:bg-[#FAF8E8] hover:text-[#0D03AE] transition-colors"
                >
                  <User className="w-4 h-4 text-neutral-500" />
                  <span>Profile</span>
                </Link>

                <Link
                  href="/orders"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-neutral-800 hover:bg-[#FAF8E8] hover:text-[#0D03AE] transition-colors"
                >
                  <Package className="w-4 h-4 text-neutral-500" />
                  <span>My Orders</span>
                </Link>

                <Link
                  href="/profile"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-neutral-800 hover:bg-[#FAF8E8] hover:text-[#0D03AE] transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Coins className="w-4 h-4 text-[#DC5513]" />
                    <span>Baha Coins</span>
                  </div>
                  <span className="text-[10px] font-bold text-[#DC5513] bg-[#FFF8E0] border border-[#FED174]/60 px-2 py-0.5 rounded-full">
                    450
                  </span>
                </Link>

                <div className="my-1.5 border-t border-[#E7DEC8]" />

                <button
                  type="button"
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    setLogoutModalOpen(true);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Center Logo Anchor (Circle Badge protruding out of the glass bar at BOTH top and bottom) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-30 pointer-events-auto">
            <Link
              href="/"
              className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-28 lg:h-28 rounded-full bg-[#0D03AE] text-white shadow-[0_4px_16px_-2px_rgba(13,3,174,0.35),0_0_0_2px_#ffffff] sm:shadow-[0_6px_20px_-3px_rgba(13,3,174,0.38),0_0_0_2.5px_#ffffff] lg:shadow-[0_12px_30px_-4px_rgba(13,3,174,0.45),0_0_0_5px_#ffffff] transition-transform duration-300 hover:scale-105 active:scale-95 overflow-hidden p-1 sm:p-1.5 md:p-2 lg:p-3"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src="/assets/logo.webp"
                  alt="Baha Kids Logo"
                  fill
                  sizes="(max-width: 640px) 48px, (max-width: 768px) 56px, (max-width: 1024px) 64px, 112px"
                  priority
                  className="object-contain drop-shadow-xs"
                />
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Slide-over Sidebar Drawer */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex justify-start lg:hidden"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Sidebar Drawer Panel */}
          <div
            data-lenis-prevent="true"
            className="relative w-[85%] max-w-xs sm:max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-300 font-secondary"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-5 bg-gradient-to-b from-[#FAF8E8] to-white border-b border-black/5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full bg-[#0D03AE] flex items-center justify-center p-1 shadow-xs">
                  <Image
                    src="/assets/logo.webp"
                    alt="Baha Kids Logo"
                    fill
                    sizes="40px"
                    className="object-contain p-1"
                  />
                </div>
                <div>
                  <h3 className="font-primary text-lg text-neutral-900 leading-none">
                    Baha Kids
                  </h3>
                  <span className="text-[11px] text-[#DC5513] font-semibold">
                    Cuddly Comfort &bull; Little Smiles
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-9 h-9 rounded-full bg-white hover:bg-black/5 text-neutral-700 shadow-2xs flex items-center justify-center transition-colors cursor-pointer border border-black/5"
                aria-label="Close navigation"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Nav Links Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-1 no-scrollbar">
              <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider px-3 block mb-2">
                Categories &amp; Collections
              </span>

              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-2xl hover:bg-[#FAF8E8] text-neutral-800 hover:text-[#0D03AE] font-semibold text-sm transition-colors group"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 group-hover:text-[#0D03AE] transition-transform" />
                </Link>
              ))}

              <hr className="my-3 border-black/5" />

              <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider px-3 block mb-2">
                Account &amp; Quick Access
              </span>

              <Link
                href="/orders"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-[#FAF8E8] text-neutral-800 hover:text-[#0D03AE] font-semibold text-sm transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <Package className="w-4 h-4 text-[#0D03AE]" />
                  <span>My Orders &amp; Delivery</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-full bg-[#EDE5FA] text-[#0D03AE] text-[10px] font-bold">
                    Track
                  </span>
                  <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 group-hover:text-[#0D03AE] transition-transform" />
                </div>
              </Link>

              <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-[#FAF8E8] text-neutral-800 hover:text-[#0D03AE] font-semibold text-sm transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <User className="w-4 h-4 text-[#0D03AE]" />
                  <span>My Account &amp; Kids Profile</span>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 group-hover:text-[#0D03AE] transition-transform" />
              </Link>

              <Link
                href="/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-[#FAF8E8] text-neutral-800 hover:text-[#0D03AE] font-semibold text-sm transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <Heart className="w-4 h-4 text-[#DC5513]" />
                  <span>Saved Wishlist</span>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 group-hover:text-[#0D03AE] transition-transform" />
              </Link>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setLoginModalOpen(true);
                }}
                className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-[#FAF8E8] text-neutral-800 hover:text-[#0D03AE] font-semibold text-sm transition-colors group cursor-pointer text-left"
              >
                <div className="flex items-center gap-2.5">
                  <LogIn className="w-4 h-4 text-[#0D03AE]" />
                  <span>Sign In / Login</span>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 group-hover:text-[#0D03AE] transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setNotificationOpen(true);
                }}
                className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-[#FAF8E8] text-neutral-800 hover:text-[#0D03AE] font-semibold text-sm transition-colors group cursor-pointer text-left"
              >
                <div className="flex items-center gap-2.5">
                  <Bell className="w-4 h-4 text-[#0D03AE]" />
                  <span>Notifications</span>
                </div>
                {unreadCount > 0 ? (
                  <span className="px-2 py-0.5 rounded-full bg-[#DC5513] text-white text-[10px] font-bold">
                    {unreadCount} New
                  </span>
                ) : (
                  <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 group-hover:text-[#0D03AE] transition-transform" />
                )}
              </button>
            </div>

            {/* Bottom Promo Card */}
            <div className="p-4 border-t border-black/5 bg-[#FFFDF7] shrink-0">
              <div className="p-3.5 rounded-2xl bg-[#FFF8E0] border border-[#FED174]/50 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#DC5513] text-white flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-bold text-xs text-neutral-900">
                    Summer Sale Live
                  </h5>
                  <p className="text-[11px] text-neutral-500">
                    Up to 50% off on baby rompers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Logout Confirmation Modal */}
      <LogoutModal
        isOpen={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
      />

      {/* Login / Auth Modal */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />

      {/* Mobile Search Bottom Sheet */}
      {mobileSearchOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex flex-col justify-end lg:hidden"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
            onClick={() => setMobileSearchOpen(false)}
          />

          {/* Bottom Sheet Modal */}
          <div
            data-lenis-prevent="true"
            className="relative w-full bg-white rounded-t-3xl shadow-2xl flex flex-col z-10 animate-in slide-in-from-bottom duration-300 font-secondary max-h-[85vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Grab handle bar */}
            <div className="w-full flex justify-center pt-3 pb-1">
              <div className="w-12 h-1.5 rounded-full bg-neutral-300" />
            </div>

            {/* Search Input Bar */}
            <div className="p-4 sm:p-5 border-b border-black/5 flex items-center gap-3">
              <div className="flex-1 flex items-center gap-2.5 bg-neutral-100 rounded-2xl px-3.5 py-2.5 border border-black/5 focus-within:border-[#0D03AE] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0D03AE]/15 transition-all">
                <Search className="w-4 h-4 text-neutral-400 shrink-0" />
                <input
                  ref={mobileSearchInputRef}
                  type="text"
                  suppressHydrationWarning
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search dresses, rompers, baby sets..."
                  className="w-full bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 outline-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && searchQuery.trim()) {
                      setMobileSearchOpen(false);
                    }
                  }}
                />
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="p-1 rounded-full hover:bg-neutral-200 text-neutral-500"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                ) : null}
              </div>

              <button
                type="button"
                onClick={() => setMobileSearchOpen(false)}
                className="text-xs font-bold text-neutral-600 hover:text-neutral-900 px-2 py-2"
              >
                Cancel
              </button>
            </div>

            {/* Quick Suggestions & Trending Searches */}
            <div className="p-5 overflow-y-auto space-y-4 no-scrollbar">
              <div>
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-2.5">
                  Popular Searches
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Nap-Bottom Romper",
                    "Cherry Print One-Piece",
                    "Pure Cotton Baby Sets",
                    "Newborn Essentials",
                    "Ethnic Kurta Set",
                    "Summer Frocks",
                  ].map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => {
                        setSearchQuery(term);
                      }}
                      className="px-3.5 py-1.5 rounded-full bg-[#FAF8E8] hover:bg-[#FED174]/40 text-neutral-800 text-xs font-medium border border-black/5 transition-colors cursor-pointer text-left"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-2.5">
                  Quick Category Shortcuts
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {navLinks.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileSearchOpen(false)}
                      className="p-3 rounded-2xl bg-white border border-black/5 hover:border-[#0D03AE] hover:bg-[#FAF8E8]/50 transition-all flex items-center justify-between text-xs font-semibold text-neutral-800"
                    >
                      <span>{item.label}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
