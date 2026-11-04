"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="hidden sm:block relative w-full overflow-hidden bg-[#FCF6E6] text-[#302C27] font-secondary mt-auto pb-24 lg:pb-0">
      {/* Main Footer Links Container */}
      <div className="relative w-full max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 pt-7 sm:pt-9 pb-10 z-10">
        <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Col 1: Brand Info, Logo, Bio & Socials (Span 4) */}
          <div className="col-span-2 md:col-span-6 lg:col-span-3 space-y-4">
            <Link href="/" className="inline-block">
              {/* Brand Logo */}
              <div className="relative size-20 rounded-full bg-[#0D03AE] p-3">
                <Image
                  src="/assets/logo.webp"
                  alt="Baha Kids"
                  fill
                  sizes="80px" className="object-contain p-3"
                />
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-[#746B60] leading-relaxed max-w-sm">
              For first steps, big adventures, and all the cuddles in between.
              Playful little favourites for their wonderfully everyday moments.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full border border-[#E9DFCF] bg-white text-[#0D03AE] flex items-center justify-center hover:scale-110 transition-transform shadow-xs"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-[2]" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full border border-[#E9DFCF] bg-white text-[#0D03AE] flex items-center justify-center hover:scale-110 transition-transform shadow-xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full border border-[#E9DFCF] bg-white text-[#0D03AE] flex items-center justify-center hover:scale-110 transition-transform shadow-xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z" />
                </svg>
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Pinterest"
                className="w-8 h-8 rounded-full border border-[#E9DFCF] bg-white text-[#0D03AE] font-bold text-xs flex items-center justify-center hover:scale-110 transition-transform shadow-xs"
              >
                P
              </a>
            </div>
          </div>

          {/* Col 2: Shop Links (Span 2) */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 space-y-3">
            <h4 className="font-primary text-2xl text-[#0D03AE] font-medium tracking-wide">
              Shop
            </h4>
            <ul className="space-y-3 text-sm text-[#746B60]">
              <li>
                <Link href="/products" className="hover:text-[#DC5513] transition-colors">
                  Newborn
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-[#DC5513] transition-colors">
                  Baby
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-[#DC5513] transition-colors">
                  Boys
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-[#DC5513] transition-colors">
                  Girls
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-[#DC5513] transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-[#DC5513] transition-colors">
                  Best Sellers
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care (Span 2) */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 space-y-3">
            <h4 className="font-primary text-2xl text-[#0D03AE] font-medium tracking-wide">
              Customer Care
            </h4>
            <ul className="space-y-3 text-sm text-[#746B60]">
              <li>
                <Link href="/profile" className="hover:text-[#DC5513] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/orders" className="hover:text-[#DC5513] transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/orders" className="hover:text-[#DC5513] transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/orders" className="hover:text-[#DC5513] transition-colors">
                  Return &amp; Exchange
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-[#DC5513] transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-[#DC5513] transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: About Baha (Span 2) */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 space-y-3">
            <h4 className="font-primary text-2xl text-[#0D03AE] font-medium tracking-wide">
              About
            </h4>
            <ul className="space-y-3 text-sm text-[#746B60]">
              <li>
                <Link href="/" className="hover:text-[#DC5513] transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-[#DC5513] transition-colors">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-[#DC5513] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-[#DC5513] transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact details have room to wrap on smaller screens. */}
          <div className="col-span-2 md:col-span-2 lg:col-span-3 space-y-3">
            <h4 className="font-primary text-2xl text-[#0D03AE] font-medium tracking-wide">
              Need Help?
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-[#746B60]">
              <a
                href="mailto:support@bahakids.com"
                className="flex items-center gap-2.5 hover:text-[#DC5513] transition-colors group"
              >
                <div className="w-7 h-7 rounded-lg bg-[#FFF0DF] text-[#DC5513] flex items-center justify-center shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span className="break-all">support@bahakids.com</span>
              </a>

              <a
                href="tel:+919876543210"
                className="flex items-center gap-2.5 hover:text-[#DC5513] transition-colors group"
              >
                <div className="w-7 h-7 rounded-lg bg-[#FFF0DF] text-[#DC5513] flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>+91 98765 43210</span>
              </a>

              <div className="flex items-center gap-2.5 text-[#746B60]">
                <div className="w-7 h-7 rounded-lg bg-[#FFF0DF] text-[#DC5513] flex items-center justify-center shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <span className="text-[11px] sm:text-xs">Mon - Sat, 10:00 AM - 7:00 PM</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Sub-Footer Bar with Payment Badges & Legal Links */}
      <div className="relative py-5 z-10">
        <div className="w-full max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 border-t border-[#DCD0B8]/60 pt-5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#746B60]">
          {/* Copyright */}
          <div>
            &copy; 2026 Baha Kids. All rights reserved.
          </div>

          {/* Payment Method Badges Placeholder */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {["VISA", "Mastercard", "PayPal", "GPay", "ApplePay"].map((pay) => (
              <span
                key={pay}
                className="px-2.5 py-1 rounded-md bg-white border border-black/10 text-[10px] font-bold text-neutral-700 shadow-2xs"
              >
                {pay}
              </span>
            ))}
          </div>

          {/* Legal / Policy Links */}
          <div className="flex flex-wrap justify-center items-center gap-3 text-xs">
            <Link href="/" className="hover:text-[#0D03AE] transition-colors">
              Privacy Policy
            </Link>
            <span>&bull;</span>
            <Link href="/" className="hover:text-[#0D03AE] transition-colors">
              Terms &amp; Conditions
            </Link>
            <span>&bull;</span>
            <Link href="/" className="hover:text-[#0D03AE] transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
