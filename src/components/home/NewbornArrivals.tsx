"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export interface NewbornItem {
  id: string | number;
  image: string;
  link: string;
  badgeBg?: string; // background color for the playful backdrop square
}

const DEFAULT_NEWBORN_ITEMS: NewbornItem[] = [
  {
    id: 1,
    image: "/assets/temp/p1.webp",
    link: "/products",
    badgeBg: "bg-[#FED174]", // brand yellow
  },
  {
    id: 2,
    image: "/assets/temp/p2.webp",
    link: "/products",
    badgeBg: "bg-[#0D03AE]", // brand primary blue
  },
  {
    id: 3,
    image: "/assets/temp/p3.webp",
    link: "/products",
    badgeBg: "bg-[#DC5513]", // brand orange accent
  },
  {
    id: 4,
    image: "/assets/temp/p4.webp",
    link: "/products",
    badgeBg: "bg-[#8F7F3C]", // brand olive
  },
];

export default function NewbornArrivals({
  items = DEFAULT_NEWBORN_ITEMS,
}: {
  items?: NewbornItem[];
}) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Animate Section Title only once user scrolls deeper into view
      gsap.fromTo(
        ".newborn-title",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.25,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
          },
        }
      );

      // Stagger animate cards with noticeable delay after title appears
      gsap.fromTo(
        ".newborn-card",
        { opacity: 0, y: 50, scale: 0.93 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.18,
          delay: 0.55,
          ease: "back.out(1.15)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 62%",
          },
        }
      );

      // Slide in the peeking monkey gracefully after the cards have revealed
      gsap.fromTo(
        ".newborn-monkey",
        { opacity: 0, x: 100, scale: 0.88 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.2,
          delay: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        }
      );

      // Fade in the CTA button at the very end
      gsap.fromTo(
        ".newborn-cta",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 1.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 58%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-white py-10 sm:py-14 select-none font-secondary"
    >
      {/* 100% full-width outer container so the monkey can anchor directly to the viewport's right edge */}
      <div className="relative w-full">
        {/* Inner Content Container locked to max-w-[1600px] */}
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">

          {/* Section Header: Headline matching the brand font */}
          <div className="newborn-title mb-8 sm:mb-10 flex flex-col items-start font-primary opacity-0">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-brand-primary leading-tight">
              Arrivals for
            </h2>
            <span className="text-3xl sm:text-4xl lg:text-5xl text-brand-accent leading-tight -mt-1 sm:-mt-1.5">
              New Born Baby&apos;s
            </span>
          </div>

          {/* Cards Grid: positioned with plenty of room on the left/center */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-full md:max-w-[65%] lg:max-w-[70%] xl:max-w-[1050px] z-10 relative">
            {items.map((item, idx) => {
              // Distinct rotation angle and direction for every single card (-5deg, +4.5deg, -3.5deg, +6deg)
              const rotations = [
                "-rotate-[5deg]",
                "rotate-[4.5deg]",
                "-rotate-[3.5deg]",
                "rotate-[6deg]",
              ];
              const rotClass = rotations[idx % rotations.length];

              return (
                <Link
                  key={item.id}
                  href={item.link}
                  className="newborn-card group relative block aspect-square w-full p-2 select-none opacity-0"
                >
                  {/* Card 1 (Back Card): Colored, uniquely tilted, soft rounded corners */}
                  <div
                    className={`absolute inset-2 rounded-xl sm:rounded-2xl transition-all duration-300 ease-out ${item.badgeBg || "bg-brand-primary"
                      } ${rotClass} group-hover:rotate-0 group-hover:scale-105 shadow-sm`}
                    aria-hidden="true"
                  />

                  {/* Card 2 (Front Card): Piled directly on top, straight, only image with slight border-radius */}
                  <div className="relative z-10 w-full h-full rounded-lg sm:rounded-xl overflow-hidden  shadow-md bordertransition-transform duration-300 group-hover:-translate-y-1">
                    <img
                      src={item.image}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Bottom CTA: Show More Button */}
          <div className="newborn-cta mt-8 sm:mt-10 flex items-center justify-start opacity-0">
            <Link
              href="/products"
              className="group inline-flex min-h-10 sm:min-h-11 items-center gap-3 rounded-full bg-brand-primary border-2 border-brand-primary py-1 pr-1.5 pl-5 sm:py-1.5 sm:pr-2 sm:pl-6 font-secondary text-xs sm:text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-accent hover:border-brand-accent hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary"
            >
              Show More
              <span
                aria-hidden="true"
                className="grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-full bg-white text-brand-primary transition-transform duration-300 group-hover:rotate-45 shrink-0"
              >
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H9M17 7V15" />
                </svg>
              </span>
            </Link>
          </div>
        </div>

        {/* Monkey anchored directly to the 100% full-width right edge of the screen */}
        <div className="newborn-monkey hidden md:block absolute right-0 top-1/2 -translate-y-[45%] pointer-events-none select-none z-20 w-60 sm:w-72 md:w-84 lg:w-[440px] xl:w-[500px] aspect-square opacity-0">
          <Image
            src="/assets/monkey.webp"
            alt="Cute waving monkey"
            fill
            sizes="(max-width: 768px) 288px, (max-width: 1024px) 336px, 500px"
            priority
            className="object-contain object-right"
          />
        </div>
      </div>
    </section>
  );
}

