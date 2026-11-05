"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="hidden sm:block relative w-full overflow-hidden bg-[#FCF6E6] text-[#302C27] font-secondary mt-auto pb-24 lg:pb-0">
      {/* Main Footer Links Container */}
      <div className="relative w-full max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-12 pt-7 sm:pt-9 pb-10 z-10">
        <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-8 lg:gap-10">

          {/* Col 1: Brand Info, Logo, Bio & Socials (Span 3) */}
          <div className="col-span-2 md:col-span-6 lg:col-span-3 space-y-2.5">
            <Link href="/" className="inline-block">
              {/* Brand Logo: matched aspect ratio to eliminate extra vertical whitespace */}
              <div className="relative w-36 h-24">
                <Image
                  src="/assets/logo-footer.webp"
                  alt="Baha Kids"
                  fill
                  sizes="144px"
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-[#746B60] leading-relaxed max-w-sm">
              For first steps, big adventures, and all the cuddles in between.
              Playful little favourites for their wonderfully everyday moments.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="relative w-11 h-11 rounded-full overflow-hidden hover:scale-110 transition-transform shadow-xs flex items-center justify-center bg-white border border-[#E9DFCF]"
              >
                <Image
                  src="/assets/instagram.svg"
                  alt="Instagram"
                  width={44}
                  height={44}
                  className="w-full h-full object-cover"
                />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="relative w-11 h-11 rounded-full overflow-hidden hover:scale-110 transition-transform shadow-xs flex items-center justify-center bg-white border border-[#E9DFCF]"
              >
                <Image
                  src="/assets/facebook.svg"
                  alt="Facebook"
                  width={44}
                  height={44}
                  className="w-full h-full object-cover"
                />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="relative w-11 h-11 rounded-full overflow-hidden hover:scale-110 transition-transform shadow-xs flex items-center justify-center bg-white border border-[#E9DFCF]"
              >
                <Image
                  src="/assets/youtube.svg"
                  alt="YouTube"
                  width={44}
                  height={44}
                  className="w-full h-full object-cover scale-120"
                />
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
                <Link href="/our-story" className="hover:text-[#DC5513] transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-[#DC5513] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="hover:text-[#DC5513] transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-[#DC5513] transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Policies (Span 2) */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 space-y-3">
            <h4 className="font-primary text-2xl text-[#0D03AE] font-medium tracking-wide">
              Policies
            </h4>
            <ul className="space-y-3 text-sm text-[#746B60]">
              <li>
                <Link href="/shipping-policy" className="hover:text-[#DC5513] transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/return-exchange" className="hover:text-[#DC5513] transition-colors">
                  Return &amp; Exchange
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-[#DC5513] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions" className="hover:text-[#DC5513] transition-colors">
                  Terms &amp; Conditions
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

      {/* Bottom Sub-Footer Bar */}
      <div className="relative py-5 z-10">
        <div className="w-full max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 border-t border-[#DCD0B8]/60 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#746B60]">
          {/* Copyright */}
          <div>
            &copy; 2026 Baha Kids. All rights reserved.
          </div>

          {/* Designed and Developed By */}
          <div>
            Designed and Developed by{" "}
            <a
              href="https://digitaledge360.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#0D03AE] hover:text-[#DC5513] transition-colors hover:underline"
            >
              DIGITAL EDGE 360
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
