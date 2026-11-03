"use client";

import React from "react";
import Image from "next/image";

export interface PatternCurtainSectionProps {
  children?: React.ReactNode;
  className?: string;
}

export default function PatternCurtainSection({
  children,
  className = "",
}: PatternCurtainSectionProps) {
  return (
    <section className={`relative w-full overflow-hidden bg-gradient-to-b from-[#FAF8E8] via-[#FAF8E8]/70 to-white select-none ${className}`}>
      {/* Top Wave: White scalloped crests dipping down into the #FAF8E8 background */}
      <div
        className="pointer-events-none relative inset-x-0 top-0 z-10 w-full overflow-hidden leading-none"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 48"
          preserveAspectRatio="none"
          className="relative block w-full h-8 sm:h-11 md:h-14 text-white fill-current"
        >
          {/* White top fill dipping into #FAF8E8 with smooth repetitive semicircular scallop crests */}
          <path d="M0,0 L1440,0 L1440,24 C1395,44 1365,44 1320,24 C1275,4 1245,4 1200,24 C1155,44 1125,44 1080,24 C1035,4 1005,4 960,24 C915,44 885,44 840,24 C795,4 765,4 720,24 C675,44 645,44 600,24 C555,4 525,4 480,24 C435,44 405,44 360,24 C315,4 285,4 240,24 C195,44 165,44 120,24 C75,4 45,4 0,24 Z" />
        </svg>
      </div>

      {/* Top Left Decorative Ice Cream Icon */}
      <div
        className="pointer-events-none absolute left-4 sm:left-8 lg:left-14 top-4 sm:top-5 lg:top-6 z-20 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 select-none -rotate-6 transition-transform duration-300"
        aria-hidden="true"
      >
        <Image
          src="/assets/icecream.webp"
          alt="Cute ice cream cone"
          fill
          priority
          className="object-contain"
        />
      </div>

      {/* Main Section Content Area */}
      <div className="relative w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
        {children}
      </div>
    </section>
  );
}

