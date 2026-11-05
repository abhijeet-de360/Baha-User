import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Home, ShoppingBag, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-[calc(100vh-80px)] w-full overflow-hidden bg-[#fffcf6] flex flex-col justify-between select-none">
      {/* Main Center Content */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 max-w-3xl mx-auto">
        {/* Playful Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFE4CF] text-[#DC5513] text-xs sm:text-sm font-semibold tracking-wide shadow-xs mb-4">
          <Sparkles className="w-4 h-4 text-[#DC5513]" />
          <span>Uh-Oh! Little Adventure Detour</span>
        </div>

        {/* 404 Visual with Mascot */}
        <div className="relative flex items-center justify-center my-2 select-none">
          {/* Big "4" */}
          <span className="font-primary text-[100px] sm:text-[140px] md:text-[180px] leading-none text-[#0D03AE] tracking-tight drop-shadow-xs">
            4
          </span>

          {/* Curious / Cute Mascot Peek in Place of '0' */}
          <div className="relative w-28 sm:w-40 md:w-48 h-28 sm:h-40 md:h-48 mx-[-8px] sm:mx-[-14px] flex items-center justify-center animate-bounce duration-1000">
            <Image
              src="/assets/bunny.webp"
              alt="Curious Bunny Mascot"
              fill
              sizes="(max-width: 640px) 112px, (max-width: 768px) 160px, 192px"
              priority
              className="object-contain drop-shadow-md"
            />
          </div>

          {/* Big "4" */}
          <span className="font-primary text-[100px] sm:text-[140px] md:text-[180px] leading-none text-[#DC5513] tracking-tight drop-shadow-xs">
            4
          </span>
        </div>

        {/* Heading in Brand Font */}
        <h1 className="font-primary text-3xl sm:text-4xl md:text-5xl text-[#0D03AE] tracking-tight mt-1">
          Oops! This page is playing hide & seek!
        </h1>

        {/* Playful Kid-Friendly Copy */}
        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-[#556987] font-medium max-w-lg leading-relaxed">
          Looks like this little outfit took a wrong turn at the playground.
          Let&apos;s get you back to safe cuddles and cute styles!
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#0D03AE] hover:bg-[#090280] text-white font-primary text-lg sm:text-xl shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>

          <Link
            href="/products"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-white hover:bg-neutral-50 text-[#0D03AE] border-2 border-[#0D03AE]/20 hover:border-[#0D03AE] font-primary text-lg sm:text-xl shadow-xs hover:shadow-md transition-all active:scale-95"
          >
            <ShoppingBag className="w-5 h-5 text-[#DC5513]" />
            <span>Explore Outfits</span>
          </Link>
        </div>

        {/* Little Footnote Links */}
        <div className="mt-10 pt-4 flex items-center justify-center gap-6 text-xs sm:text-sm font-medium text-[#786C65]">
          <Link href="/products" className="hover:text-[#0D03AE] hover:underline transition-colors">
            New Arrivals
          </Link>
          <span className="text-neutral-300">•</span>
          <Link href="/cart" className="hover:text-[#0D03AE] hover:underline transition-colors">
            Your Cart
          </Link>
          <span className="text-neutral-300">•</span>
          <Link href="/profile" className="hover:text-[#0D03AE] hover:underline transition-colors">
            My Account
          </Link>
        </div>
      </main>

    </div>
  );
}

