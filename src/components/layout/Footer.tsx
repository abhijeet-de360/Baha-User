'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#484178] text-white pt-16 pb-12 overflow-hidden border-t border-white/10">
      
      {/* Ambient Splash Light Blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        {/* Top-Right Yellow Glow */}
        <div
          className="absolute -top-28 -right-28 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #FFD66B 0%, transparent 70%)' }}
        />
        {/* Bottom-Left Coral & Mint Glow */}
        <div
          className="absolute -bottom-36 -left-28 w-[550px] h-[550px] rounded-full opacity-25 blur-3xl"
          style={{ background: 'radial-gradient(circle, #ff9500ff 0%, #86d98aff 50%, transparent 75%)' }}
        />
        {/* Center Blue Glow */}
        <div
          className="absolute top-1/2 left-1/3 w-[600px] h-[350px] rounded-full opacity-15 blur-3xl"
          style={{ background: 'radial-gradient(ellipse, #A8D8E8 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 container">
        
        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 pb-12 border-b border-white/15">
          
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-brand-yellow flex items-center justify-center text-text-main shadow-md">
                <Sparkles className="w-5 h-5 fill-text-main text-text-main" />
              </span>
              <div>
                <span className="font-heading text-2xl sm:text-3xl font-black text-white tracking-tight block leading-none">
                  Baha <span className="text-brand-yellow">Fashion</span>
                </span>
              </div>
            </div>
            
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-sm font-normal">
              Mindfully designed children's apparel made from premium fabrics. Crafted with love for curious little dreamers and explorers across India.
            </p>
          </div>

          {/* Quick Collections */}
          <div>
            <h4 className="font-heading text-sm font-bold text-brand-yellow uppercase tracking-wider mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white/80">
              <li>
                <Link href="/products/category/boys" className="hover:text-brand-yellow transition-colors cursor-pointer">
                  Boys Wear
                </Link>
              </li>
              <li>
                <Link href="/products/category/girls" className="hover:text-brand-yellow transition-colors cursor-pointer">
                  Girls Dresses
                </Link>
              </li>
              <li>
                <Link href="/products/category/baby" className="hover:text-brand-yellow transition-colors cursor-pointer">
                  Baby & Newborn
                </Link>
              </li>
              <li>
                <Link href="/products/category/ethnic" className="hover:text-brand-yellow transition-colors cursor-pointer">
                  Festive Ethnic Wear
                </Link>
              </li>
              <li>
                <Link href="/products/category/party" className="hover:text-brand-yellow transition-colors cursor-pointer">
                  Party Outfits
                </Link>
              </li>
            </ul>
          </div>

          {/* Parent Resources */}
          <div>
            <h4 className="font-heading text-sm font-bold text-brand-yellow uppercase tracking-wider mb-4">
              Parents Hub
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white/80">
              <li className="hover:text-brand-yellow transition-colors cursor-pointer">Interactive Size Calculator</li>
              <li className="hover:text-brand-yellow transition-colors cursor-pointer">Organic Fabric Care Guide</li>
              <li className="hover:text-brand-yellow transition-colors cursor-pointer">Sensory-Friendly Notes</li>
              <li className="hover:text-brand-yellow transition-colors cursor-pointer">Pass-It-On Recycling</li>
              <li className="hover:text-brand-yellow transition-colors cursor-pointer">Gift Cards & Bundles</li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-heading text-sm font-bold text-brand-yellow uppercase tracking-wider mb-4">
              Help & Support
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white/80">
              <li className="hover:text-brand-yellow transition-colors cursor-pointer">Track Your Package</li>
              <li className="hover:text-brand-yellow transition-colors cursor-pointer">Free 30-Day Returns</li>
              <li className="hover:text-brand-yellow transition-colors cursor-pointer">Shipping & Delivery Info</li>
              <li className="hover:text-brand-yellow transition-colors cursor-pointer">FAQ & Help Desk</li>
              <li className="hover:text-brand-yellow transition-colors cursor-pointer">Contact Parent Support</li>
            </ul>
          </div>

          {/* Useful Links & Policies */}
          <div>
            <h4 className="font-heading text-sm font-bold text-brand-yellow uppercase tracking-wider mb-4">
              Useful Links & Policies
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white/80">
              <li className="hover:text-brand-yellow transition-colors cursor-pointer">Privacy Policy</li>
              <li className="hover:text-brand-yellow transition-colors cursor-pointer">Terms & Conditions</li>
              <li className="hover:text-brand-yellow transition-colors cursor-pointer">Return & Refund Policy</li>
              <li className="hover:text-brand-yellow transition-colors cursor-pointer">Shipping Policy</li>
              <li className="hover:text-brand-yellow transition-colors cursor-pointer">Cancellation Policy</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/70">
          <p>© 2026 Baha Fashion, Inc. All rights reserved. <a className="" href="https://www.digitaledge360.com" target="_blank" rel="noopener noreferrer">Designed and Maintained by Digital EDGE 360</a></p>

          <div className="flex items-center gap-2">

            {/* UPI Logo */}
            <div title="UPI - Unified Payments Interface" className="bg-white px-1 py-1 rounded-md border border-white/20 shadow-xs flex items-center justify-center transition-transform hover:scale-105">
              <img src="/icons/upi.png" alt="UPI Payment" className="h-5 w-auto object-contain" />
            </div>

            {/* VISA Logo */}
            <div title="VISA" className="bg-white px-2 py-1 rounded-md border border-white/20 shadow-xs flex items-center justify-center transition-transform hover:scale-105">
              <img src="/icons/visa.png" alt="Visa" className="h-5 w-auto object-contain" />
            </div>

            {/* Mastercard Logo */}
            <div title="Mastercard" className="bg-white px-2 py-1 rounded-md border border-white/20 shadow-xs flex items-center justify-center transition-transform hover:scale-105">
              <img src="/icons/mastercard.png" alt="Mastercard" className="h-5 w-auto object-contain" />
            </div>

            {/* AMEX Logo */}
            <div title="American Express" className="bg-white px-2 py-1 rounded-md border border-white/20 shadow-xs flex items-center justify-center transition-transform hover:scale-105">
              <img src="/icons/amex.png" alt="AMEX" className="h-5 w-auto object-contain" />
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
};
