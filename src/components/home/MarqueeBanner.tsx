"use client";

import React from "react";

interface MarqueeBannerProps {
  items?: string[];
  speed?: number; // duration in seconds
  angle?: number; // tilt angle in degrees, e.g. -2 or 2
}

const DEFAULT_ITEMS = [
  "Every Mom’s Favorite",
  "Care With Softness",
  "Baha Makes Smiles",
  "Nap-Bottom One-Piece Worn Alone",
  "Pure Organic Cotton",
  "Loved By 100k+ Parents",
];

export default function MarqueeBanner({
  items = DEFAULT_ITEMS,
  speed = 100,
  angle = -2,
}: MarqueeBannerProps) {
  // Duplicate list enough times to ensure seamless infinite looping
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="relative z-20 w-full overflow-hidden py-6 sm:py-8 select-none pointer-events-none bg-gradient-to-b from-white via-[#FAF8E8] to-[#FAF8E8]">
      {/* Rotated ribbon ribbon wrapper */}
      <div
        className="relative w-[115%] -left-[7.5%] flex items-center shadow-lg"
        style={{
          transform: `rotate(${angle}deg)`,
        }}
      >
        {/* Torn Paper / Painted Stroke Edge Tape Background */}
        <div className="relative w-full bg-brand-accent py-3.5 sm:py-4.5 md:py-5 flex items-center overflow-hidden">
          {/* Top Torn/Rough Edge SVG Mask/Border (Blends into White above) */}
          <div
            className="absolute top-0 left-0 right-0 h-[6px] sm:h-[8px] bg-repeat-x opacity-90"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 6' preserveAspectRatio='none'%3E%3Cpath d='M0,6 Q5,0 10,5 Q15,1 20,4 Q25,0 30,5 Q35,2 40,6 L40,0 L0,0 Z' fill='%23FFFFFF'/%3E%3C/svg%3E")`,
              backgroundSize: "40px 100%",
            }}
          />

          {/* Bottom Torn/Rough Edge SVG Mask/Border (Blends into #FAF8E8 below) */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[6px] sm:h-[8px] bg-repeat-x opacity-90"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 6' preserveAspectRatio='none'%3E%3Cpath d='M0,0 Q5,6 10,1 Q15,5 20,2 Q25,6 30,1 Q35,4 40,0 L40,6 L0,6 Z' fill='%23FAF8E8'/%3E%3C/svg%3E")`,
              backgroundSize: "40px 100%",
            }}
          />

          {/* Infinite Marquee Track */}
          <div
            className="flex w-max shrink-0 animate-marquee items-center"
            style={{ animationDuration: `${speed}s` }}
          >
            {repeatedItems.map((phrase, idx) => (
              <div
                key={`m1-${idx}`}
                className="flex items-center mx-4 sm:mx-8 md:mx-12 shrink-0"
              >
                <span className="font-primary text-white text-base sm:text-xl md:text-2xl lg:text-3xl tracking-wide font-normal">
                  {phrase}
                </span>
                <span className="ml-4 sm:ml-8 md:ml-12 text-white/60 text-xs sm:text-sm">
                  ★
                </span>
              </div>
            ))}
          </div>

          <div
            aria-hidden="true"
            className="flex w-max shrink-0 animate-marquee items-center"
            style={{ animationDuration: `${speed}s` }}
          >
            {repeatedItems.map((phrase, idx) => (
              <div
                key={`m2-${idx}`}
                className="flex items-center mx-4 sm:mx-8 md:mx-12 shrink-0"
              >
                <span className="font-primary text-white text-base sm:text-xl md:text-2xl lg:text-3xl tracking-wide font-normal">
                  {phrase}
                </span>
                <span className="ml-4 sm:ml-8 md:ml-12 text-white/60 text-xs sm:text-sm">
                  ★
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

