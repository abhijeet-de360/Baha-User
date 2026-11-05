"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import baby1 from "../../../public/assets/temp/baby1.webp";
import baby2 from "../../../public/assets/temp/baby2.webp";
import baby3 from "../../../public/assets/temp/baby3.webp";
import baby4 from "../../../public/assets/temp/baby4.webp";
import splatter from "../../../public/assets/temp/splatter.webp";

export default function BabyMoodSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".mood-card",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        ".mood-bottom-banner",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative z-10 w-full bg-[#FAF8E8] pt-8 sm:pt-12 md:pt-16 pb-0 overflow-hidden flex flex-col justify-between"
    >

      {/* Main 4 Individual Mood Cards */}
      <div className="relative w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 z-10 flex-1 flex flex-col justify-end">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 items-end">
          {/* Card 1: Warm Terracotta Arch */}
          <div className="mood-card relative flex flex-col items-center justify-end group opacity-0">
            <Link
              href="/products?mood=happy"
              className="relative w-full max-w-[280px] h-[340px] sm:h-[390px] md:h-[430px] lg:h-[470px] flex items-end justify-center overflow-visible block cursor-pointer transition-transform duration-300 group-hover:scale-[1.02]"
            >
              <div className="absolute inset-x-0 bottom-0 top-0 rounded-t-full rounded-b-none bg-[#DE5416] shadow-md transition-all duration-300 group-hover:shadow-lg" />
              
              <div className="relative z-10 w-[84%] sm:w-[86%] h-[82%] sm:h-[84%] flex items-end justify-center pb-0">
                <Image
                  src={baby1}
                  alt="Happy baby with teddy bear"
                  priority
                  className="w-full h-full object-contain object-bottom drop-shadow-md transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </Link>
          </div>

          {/* Card 2: Lavender Rounded Box */}
          <div className="mood-card relative flex flex-col items-center justify-end group opacity-0">
            <Link
              href="/products?mood=playful"
              className="relative w-full max-w-[280px] h-[340px] sm:h-[390px] md:h-[430px] lg:h-[470px] flex items-end justify-center overflow-visible block cursor-pointer transition-transform duration-300 group-hover:scale-[1.02]"
            >
              {/* Text Lockup at Top */}
              <div className="absolute top-2 sm:top-4 md:top-6 lg:top-8 left-0 right-0 z-20 flex items-end gap-2 sm:gap-2.5 px-1 sm:px-2">
                <span className="font-['Didot',_'Bodoni_MT',_'Playfair_Display',_'Times_New_Roman',_Georgia,_serif] text-6xl sm:text-7xl md:text-8xl font-normal leading-none text-black select-none tracking-tight">
                  1
                </span>
                <div className="flex flex-col justify-end pb-1 sm:pb-1.5">
                  <span className="font-primary text-lg sm:text-xl md:text-2xl lg:text-3xl text-black font-semibold leading-tight whitespace-nowrap">
                    Baby&apos;s Mood
                  </span>
                  <span className="font-['Didot',_'Playfair_Display',_'Times_New_Roman',_Georgia,_serif] italic text-xs sm:text-sm md:text-base text-neutral-500 font-normal leading-tight whitespace-nowrap">
                    Shop As Per Your
                  </span>
                </div>
              </div>

              {/* Lavender Box */}
              <div className="absolute inset-x-0 bottom-0 h-[36%] sm:h-[37%] rounded-t-2xl sm:rounded-t-3xl bg-[#8E97E8] shadow-md transition-all duration-300 group-hover:shadow-lg" />

              {/* Character 2 */}
              <div className="relative z-10 w-[96%] sm:w-[102%] h-[98%] sm:h-[104%] flex items-end justify-center pb-0 origin-bottom scale-[1.08]">
                <Image
                  src={baby2}
                  alt="Playful kid with skateboard and headphones"
                  priority
                  className="w-full h-full object-contain object-bottom drop-shadow-md transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </Link>
          </div>

          {/* Card 3: Lilac Rounded Box */}
          <div className="mood-card relative flex flex-col items-center justify-end group opacity-0">
            <Link
              href="/products?mood=trendy"
              className="relative w-full max-w-[280px] h-[340px] sm:h-[390px] md:h-[430px] lg:h-[470px] flex items-end justify-center overflow-visible block cursor-pointer transition-transform duration-300 group-hover:scale-[1.02]"
            >
              {/* Text Lockup at Top */}
              <div className="absolute top-2 sm:top-4 md:top-6 lg:top-8 left-0 right-0 z-20 flex items-end gap-2 sm:gap-2.5 px-1 sm:px-2">
                <span className="font-['Didot',_'Bodoni_MT',_'Playfair_Display',_'Times_New_Roman',_Georgia,_serif] text-6xl sm:text-7xl md:text-8xl font-normal leading-none text-black select-none tracking-tight">
                  2
                </span>
                <div className="flex flex-col justify-end pb-1 sm:pb-1.5">
                  <span className="font-primary text-lg sm:text-xl md:text-2xl lg:text-3xl text-black font-semibold leading-tight whitespace-nowrap">
                    Baby&apos;s Mood
                  </span>
                  <span className="font-['Didot',_'Playfair_Display',_'Times_New_Roman',_Georgia,_serif] italic text-xs sm:text-sm md:text-base text-neutral-500 font-normal leading-tight whitespace-nowrap">
                    Shop As Per Your
                  </span>
                </div>
              </div>

              {/* Lilac Box */}
              <div className="absolute inset-x-0 bottom-0 h-[36%] sm:h-[37%] rounded-t-2xl sm:rounded-t-3xl bg-[#E28FF6] shadow-md transition-all duration-300 group-hover:shadow-lg" />

              {/* Character 3 */}
              <div className="relative z-10 w-[70%] sm:w-[72%] h-[71%] sm:h-[73%] flex items-end justify-center pb-0">
                <Image
                  src={baby3}
                  alt="Trendy girl in yellow sweater blowing kiss"
                  priority
                  className="w-full h-full object-contain object-bottom drop-shadow-md transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </Link>
          </div>

          {/* Card 4: Sunny Yellow Arch */}
          <div className="mood-card relative flex flex-col items-center justify-end group opacity-0">
            <Link
              href="/products?mood=sporty"
              className="relative w-full max-w-[280px] h-[340px] sm:h-[390px] md:h-[430px] lg:h-[470px] flex items-end justify-center overflow-visible block cursor-pointer transition-transform duration-300 group-hover:scale-[1.02]"
            >
              <div className="absolute inset-x-0 bottom-0 top-0 rounded-t-full rounded-b-none bg-[#FED174] shadow-md transition-all duration-300 group-hover:shadow-lg" />
              
              <div className="relative z-10 w-[84%] sm:w-[86%] h-[82%] sm:h-[84%] flex items-end justify-center pb-0">
                <Image
                  src={baby4}
                  alt="Sporty kid with ice cream and soccer ball"
                  priority
                  className="w-full h-full object-contain object-bottom drop-shadow-md transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Full-Width Solid Royal Blue Bottom Ribbon */}
      <div className="mood-bottom-banner relative w-full bg-[#0D03AE] mt-1.5 sm:mt-2.5 py-3 sm:py-3.5 md:py-4 px-4 text-center shadow-md opacity-0">
        <Link
          href="/products"
          className="inline-block font-primary text-lg sm:text-2xl md:text-3xl text-white tracking-wide hover:underline hover:scale-[1.01] transition-transform duration-200"
        >
          Shop As Per Your Baby&apos;s Mood
        </Link>
      </div>
    </section>
  );
}
