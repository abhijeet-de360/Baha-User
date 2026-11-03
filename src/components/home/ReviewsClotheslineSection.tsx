"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Star, Heart } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function WoodenClothespin({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 50"
      className={`w-4 sm:w-5 h-8 sm:h-10 drop-shadow-md select-none pointer-events-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="woodGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C98B4B" />
          <stop offset="35%" stopColor="#E3A868" />
          <stop offset="70%" stopColor="#D49453" />
          <stop offset="100%" stopColor="#B37537" />
        </linearGradient>
        <linearGradient id="springMetal" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E5E7EB" />
          <stop offset="50%" stopColor="#9CA3AF" />
          <stop offset="100%" stopColor="#4B5563" />
        </linearGradient>
      </defs>
      {/* Clothespin Back Shadow */}
      <rect x="7" y="10" width="10" height="36" rx="2" fill="#8C5320" opacity="0.6" />
      {/* Front Wooden Clamp Body */}
      <path
        d="M8,2 C8,0.9 8.9,0 10,0 L14,0 C15.1,0 16,0.9 16,2 L16.5,20 L15.5,22 L16.5,46 C16.5,47.7 15.2,49 13.5,49 L10.5,49 C8.8,49 7.5,47.7 7.5,46 L8.5,22 L7.5,20 Z"
        fill="url(#woodGrad)"
      />
      {/* Center Joint Cutout */}
      <rect x="7" y="21" width="10" height="4" fill="#784212" opacity="0.4" />
      {/* Spring Clip */}
      <rect x="6" y="22" width="12" height="3" rx="1.5" fill="url(#springMetal)" />
      <circle cx="12" cy="23.5" r="2.5" fill="url(#springMetal)" stroke="#374151" strokeWidth="0.8" />
      {/* Natural Wood Highlight */}
      <line x1="10" y1="2" x2="10" y2="47" stroke="#FEF3C7" strokeWidth="0.8" opacity="0.4" />
    </svg>
  );
}

export default function ReviewsClotheslineSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Header Animation
      gsap.fromTo(
        ".reviews-header",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Stagger Cards with subtle swing entrance
      gsap.fromTo(
        ".hanging-card",
        { opacity: 0, y: -25, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          stagger: 0.08,
          delay: 0.2,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-20 md:pb-24 overflow-hidden"
    >
      <div className="w-full max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Headline */}
        <div className="reviews-header text-center mb-10 sm:mb-14 md:mb-16 flex flex-col items-center justify-center opacity-0">
          <span className="font-['Didot',_'Playfair_Display',_'Times_New_Roman',_Georgia,_serif] italic font-semibold text-2xl sm:text-3xl md:text-4xl text-[#0D03AE] leading-tight tracking-tight">
            What Happens
          </span>
          <h2 className="font-primary text-3xl sm:text-4xl md:text-5xl lg:text-[52px] text-[#DC5513] font-normal leading-none -mt-1 sm:-mt-1.5">
            After Buying Baha Products
          </h2>
        </div>

        {/* Clothesline Stage */}
        <div className="relative w-full min-h-[320px] sm:min-h-[350px] md:min-h-[380px] flex items-center justify-center">
          {/* Curved Twisted Clothesline Rope (Desktop & Tablet) */}
          <div className="hidden sm:block absolute inset-x-0 top-6 md:top-8 h-24 sm:h-28 md:h-32 pointer-events-none z-10">
            <svg
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <defs>
                <linearGradient id="ropeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#B37C3E" />
                  <stop offset="50%" stopColor="#D59B56" />
                  <stop offset="100%" stopColor="#B37C3E" />
                </linearGradient>
                <pattern
                  id="ropePattern"
                  width="10"
                  height="10"
                  patternUnits="userSpaceOnUse"
                  patternTransform="rotate(45)"
                >
                  <line x1="0" y1="0" x2="0" y2="10" stroke="#8E5E2A" strokeWidth="2.2" />
                  <line x1="5" y1="0" x2="5" y2="10" stroke="#F6D8A8" strokeWidth="2.2" />
                </pattern>
              </defs>

              {/* Rope Cast Shadow */}
              <path
                d="M 25,28 Q 600,105 1175,28"
                fill="none"
                stroke="rgba(0,0,0,0.06)"
                strokeWidth="6"
                strokeLinecap="round"
                transform="translate(0, 3)"
              />
              {/* Rope Base */}
              <path
                d="M 25,28 Q 600,105 1175,28"
                fill="none"
                stroke="url(#ropeGrad)"
                strokeWidth="4"
                strokeLinecap="round"
              />
              {/* Rope Twisted Fiber Highlights */}
              <path
                d="M 25,28 Q 600,105 1175,28"
                fill="none"
                stroke="url(#ropePattern)"
                strokeWidth="3.2"
                strokeLinecap="round"
                opacity="0.85"
              />
            </svg>

            {/* Left Sketched Heart & Knot Pin */}
            <div className="absolute left-1 sm:left-3 md:left-5 top-0 w-11 sm:w-14 h-9 sm:h-11 pointer-events-none select-none z-20">
              <Image
                src="/assets/temp/rope-heart-left.webp"
                alt="Heart Pin"
                fill
                className="object-contain"
              />
            </div>

            {/* Right Sketched Heart & Knot Pin */}
            <div className="absolute right-1 sm:right-3 md:right-5 top-0 w-11 sm:w-14 h-9 sm:h-11 pointer-events-none select-none z-20">
              <Image
                src="/assets/temp/rope-heart-right.webp"
                alt="Heart Pin"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Hanging Cards Container (Flex on desktop with responsive swipe on mobile) */}
          <div className="w-full flex items-start justify-center sm:justify-between gap-3 sm:gap-3 md:gap-4 lg:gap-5 overflow-x-auto no-scrollbar py-6 px-2 sm:px-4 sm:overflow-visible">
            
            {/* 1. Photo Polaroid 1 */}
            <div className="hanging-card flex-shrink-0 relative group -rotate-[3.5deg] translate-y-0 hover:rotate-0 hover:scale-105 hover:z-30 transition-all duration-300 opacity-0 cursor-pointer">
              {/* Peg */}
              <div className="absolute -top-4 sm:-top-5 left-1/2 -translate-x-1/2 z-20">
                <WoodenClothespin />
              </div>

              {/* Polaroid Frame */}
              <div className="w-[150px] sm:w-[165px] md:w-[185px] lg:w-[200px] bg-white p-2.5 sm:p-3 pb-7 sm:pb-9 shadow-md group-hover:shadow-xl rounded-xs border border-black/5 transition-shadow duration-300">
                <div className="relative aspect-square w-full rounded-xs overflow-hidden bg-neutral-100">
                  <Image
                    src="/assets/temp/review-photo1.webp"
                    alt="Happy baby in green onesie"
                    fill
                    sizes="(max-width: 640px) 150px, 200px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            {/* 2. Review Card 1 */}
            <div className="hanging-card flex-shrink-0 relative group -rotate-[1.5deg] translate-y-2 sm:translate-y-3 md:translate-y-4 hover:rotate-0 hover:scale-105 hover:z-30 transition-all duration-300 opacity-0 cursor-pointer">
              {/* Peg */}
              <div className="absolute -top-4 sm:-top-5 left-1/2 -translate-x-1/2 z-20">
                <WoodenClothespin />
              </div>

              {/* Note Card */}
              <div className="w-[150px] sm:w-[165px] md:w-[185px] lg:w-[200px] h-[190px] sm:h-[210px] md:h-[235px] lg:h-[250px] bg-[#FFFDF7] p-3.5 sm:p-4.5 pb-3.5 shadow-md group-hover:shadow-xl rounded-xs border border-[#EFE8DC] flex flex-col justify-between transition-shadow duration-300">
                <div>
                  {/* 5 Stars */}
                  <div className="flex items-center gap-0.5 sm:gap-1 text-[#DE5416] mb-2 sm:mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#DE5416] stroke-none" />
                    ))}
                  </div>

                  {/* Review Quote */}
                  <p className="font-secondary font-semibold text-xs sm:text-[13px] md:text-sm text-neutral-800 leading-snug sm:leading-snug">
                    &ldquo;Finally, something she doesn&apos;t want to take off!&rdquo;
                  </p>
                </div>

                {/* Author & Heart Icon */}
                <div className="flex items-center justify-between border-t border-neutral-200/60 pt-2 sm:pt-2.5 mt-auto">
                  <span className="font-secondary text-[11px] sm:text-xs text-neutral-500 font-medium">
                    &mdash; Rhea&apos;s Mom
                  </span>
                  <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#DE5416] fill-none stroke-[2]" />
                </div>
              </div>
            </div>

            {/* 3. Photo Polaroid 2 (Girl with Teddy Bear) */}
            <div className="hanging-card flex-shrink-0 relative group -rotate-[0.5deg] translate-y-4 sm:translate-y-6 md:translate-y-7 hover:rotate-0 hover:scale-105 hover:z-30 transition-all duration-300 opacity-0 cursor-pointer">
              {/* Peg */}
              <div className="absolute -top-4 sm:-top-5 left-1/2 -translate-x-1/2 z-20">
                <WoodenClothespin />
              </div>

              {/* Polaroid Frame */}
              <div className="w-[150px] sm:w-[165px] md:w-[185px] lg:w-[200px] bg-white p-2.5 sm:p-3 pb-7 sm:pb-9 shadow-md group-hover:shadow-xl rounded-xs border border-black/5 transition-shadow duration-300">
                <div className="relative aspect-square w-full rounded-xs overflow-hidden bg-neutral-100">
                  <Image
                    src="/assets/temp/review-photo2.webp"
                    alt="Happy girl hugging teddy bear"
                    fill
                    sizes="(max-width: 640px) 150px, 200px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            {/* 4. Review Card 2 */}
            <div className="hanging-card flex-shrink-0 relative group rotate-[1deg] translate-y-4 sm:translate-y-6 md:translate-y-7 hover:rotate-0 hover:scale-105 hover:z-30 transition-all duration-300 opacity-0 cursor-pointer">
              {/* Peg */}
              <div className="absolute -top-4 sm:-top-5 left-1/2 -translate-x-1/2 z-20">
                <WoodenClothespin />
              </div>

              {/* Note Card */}
              <div className="w-[150px] sm:w-[165px] md:w-[185px] lg:w-[200px] h-[190px] sm:h-[210px] md:h-[235px] lg:h-[250px] bg-[#FFFDF7] p-3.5 sm:p-4.5 pb-3.5 shadow-md group-hover:shadow-xl rounded-xs border border-[#EFE8DC] flex flex-col justify-between transition-shadow duration-300">
                <div>
                  {/* 5 Stars */}
                  <div className="flex items-center gap-0.5 sm:gap-1 text-[#DE5416] mb-2 sm:mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#DE5416] stroke-none" />
                    ))}
                  </div>

                  {/* Review Quote */}
                  <p className="font-secondary font-semibold text-xs sm:text-[13px] md:text-sm text-neutral-800 leading-snug sm:leading-snug">
                    &ldquo;Super soft even after multiple washes.&rdquo;
                  </p>
                </div>

                {/* Author & Heart Icon */}
                <div className="flex items-center justify-between border-t border-neutral-200/60 pt-2 sm:pt-2.5 mt-auto">
                  <span className="font-secondary text-[11px] sm:text-xs text-neutral-500 font-medium">
                    &mdash; Aarav&apos;s Mom
                  </span>
                  <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#DE5416] fill-none stroke-[2]" />
                </div>
              </div>
            </div>

            {/* 5. Photo Polaroid 3 (Curly Hair Smiling Boy) */}
            <div className="hanging-card flex-shrink-0 relative group rotate-[2.5deg] translate-y-2 sm:translate-y-3 md:translate-y-4 hover:rotate-0 hover:scale-105 hover:z-30 transition-all duration-300 opacity-0 cursor-pointer">
              {/* Peg */}
              <div className="absolute -top-4 sm:-top-5 left-1/2 -translate-x-1/2 z-20">
                <WoodenClothespin />
              </div>

              {/* Polaroid Frame */}
              <div className="w-[150px] sm:w-[165px] md:w-[185px] lg:w-[200px] bg-white p-2.5 sm:p-3 pb-7 sm:pb-9 shadow-md group-hover:shadow-xl rounded-xs border border-black/5 transition-shadow duration-300">
                <div className="relative aspect-square w-full rounded-xs overflow-hidden bg-neutral-100">
                  <Image
                    src="/assets/temp/review-photo3.webp"
                    alt="Smiling boy in patterned t-shirt"
                    fill
                    sizes="(max-width: 640px) 150px, 200px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            {/* 6. Review Card 3 */}
            <div className="hanging-card flex-shrink-0 relative group rotate-[4deg] translate-y-0 hover:rotate-0 hover:scale-105 hover:z-30 transition-all duration-300 opacity-0 cursor-pointer">
              {/* Peg */}
              <div className="absolute -top-4 sm:-top-5 left-1/2 -translate-x-1/2 z-20">
                <WoodenClothespin />
              </div>

              {/* Note Card */}
              <div className="w-[150px] sm:w-[165px] md:w-[185px] lg:w-[200px] h-[190px] sm:h-[210px] md:h-[235px] lg:h-[250px] bg-[#FFFDF7] p-3.5 sm:p-4.5 pb-3.5 shadow-md group-hover:shadow-xl rounded-xs border border-[#EFE8DC] flex flex-col justify-between transition-shadow duration-300">
                <div>
                  {/* 5 Stars */}
                  <div className="flex items-center gap-0.5 sm:gap-1 text-[#DE5416] mb-2 sm:mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#DE5416] stroke-none" />
                    ))}
                  </div>

                  {/* Review Quote */}
                  <p className="font-secondary font-semibold text-xs sm:text-[13px] md:text-sm text-neutral-800 leading-snug sm:leading-snug">
                    &ldquo;Perfect for running around all day.&rdquo;
                  </p>
                </div>

                {/* Author & Heart Icon */}
                <div className="flex items-center justify-between border-t border-neutral-200/60 pt-2 sm:pt-2.5 mt-auto">
                  <span className="font-secondary text-[11px] sm:text-xs text-neutral-500 font-medium">
                    &mdash; Kabir&apos;s Dad
                  </span>
                  <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#DE5416] fill-none stroke-[2]" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

