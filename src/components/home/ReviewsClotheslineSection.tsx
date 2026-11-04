"use client";

import { useRef } from "react";
import Image from "next/image";
import { Star, Heart, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const reviews = [
  { photo: "/assets/temp/baby1.webp", alt: "Happy baby in green onesie", quote: "Finally, something she doesn’t want to take off!", author: "Rhea’s Mom", note: "The everyday favourite", colour: "bg-[#F1EAFB]", ink: "text-[#66518B]", shape: "rounded-t-[48%] rounded-b-[20%]", tilt: "-rotate-6" },
  { photo: "/assets/temp/baby2.webp", alt: "Happy girl hugging teddy bear", quote: "Super soft even after multiple washes.", author: "Aarav’s Mom", note: "Softness that stays", colour: "bg-[#FFE9D9]", ink: "text-[#AD542D]", shape: "rounded-[44%_44%_22%_44%]", tilt: "rotate-3" },
  { photo: "/assets/temp/baby3.webp", alt: "Smiling boy in patterned t-shirt", quote: "Perfect for running around all day.", author: "Kabir’s Dad", note: "Made for little adventures", colour: "bg-[#E8EFDE]", ink: "text-[#526744]", shape: "rounded-t-[48%] rounded-b-[35%]", tilt: "-rotate-3" },
];

export default function ReviewsClotheslineSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (typeof window === "undefined") return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(
        ".parent-story",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: 0.15,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} aria-labelledby="reviews-heading" className="relative isolate overflow-hidden bg-[#FFFCF6] py-14 text-[#292240] sm:py-20 lg:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-35 [background-image:radial-gradient(#C8BBA4_0.7px,transparent_0.7px)] [background-size:18px_18px]" />
      <div className="relative mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-12">
        <div className="mb-10 flex flex-col items-center gap-5 text-center lg:mb-14 lg:flex-row lg:items-end lg:justify-between lg:text-left">
          <div>
            <p className="mb-4 flex items-center justify-center gap-2.5 font-secondary text-[11px] font-semibold uppercase tracking-[0.2em] text-[#786C65] lg:justify-start">
              <span className="h-px w-7 bg-[#DC5513]" /> The parent diaries
            </p>
            <h2 id="reviews-heading" className="font-primary text-[38px] leading-[1.15] tracking-tight text-[#0D03AE] sm:text-5xl lg:text-[58px]">
              Little moments.<br />
              <span className="relative inline-block text-[#DC5513]">Big, big love.
                <svg aria-hidden="true" viewBox="0 0 360 16" className="absolute -bottom-3 left-0 h-4 w-full fill-none text-[#F3BC63]"><path d="M5 9 Q170 -2 354 8 M45 14 Q200 4 320 13" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>
              </span>
            </h2>
          </div>
          <p className="max-w-[260px] pt-4 font-secondary text-sm leading-7 text-[#786C65] lg:pb-1">The cuddles, the playdays, the can’t-take-it-off favourites.<br /><span className="font-medium text-[#292240]">A few words from our Baha families.</span></p>
        </div>

        <div className="grid gap-5 md:grid-cols-3 lg:gap-7">
          {reviews.map((review, index) => (
            <figure
              key={review.author}
              className={`parent-story group relative flex flex-col rounded-[32px] p-6 sm:p-8 ${review.colour} ${
                index === 1 ? "md:mt-8" : "md:mb-8"
              } transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(41,34,64,0.15)] cursor-pointer`}
            >
              <div className="mb-7 flex items-center justify-between">
                <span className={`font-secondary text-[10px] font-semibold uppercase tracking-[0.14em] ${review.ink}`}>
                  Happy little chapter
                </span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Heart className="size-3.5 fill-[#DC5513] text-[#DC5513]" />
                </span>
              </div>
              <div className="relative mx-auto mb-7 w-36 sm:w-40">
                <div
                  aria-hidden="true"
                  className={`absolute -inset-2 border border-current opacity-35 ${review.shape} ${review.ink} rotate-6 transition-transform duration-500 ease-out group-hover:rotate-12 group-hover:scale-105`}
                />
                <div
                  className={`relative aspect-[1/1.08] overflow-hidden border-[5px] border-[#FFFCF6] shadow-[0_5px_12px_#30234415] ${review.shape} ${review.tilt} transition-transform duration-500 ease-out group-hover:rotate-0 group-hover:scale-105`}
                >
                  <Image
                    src={review.photo}
                    alt={review.alt}
                    fill
                    sizes="160px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </div>
                <span
                  aria-hidden="true"
                  className="absolute -bottom-2 -right-5 flex size-12 rotate-12 items-center justify-center rounded-full bg-[#FFFCF6] text-[#DC5513] shadow-sm transition-transform duration-500 ease-out group-hover:rotate-45 group-hover:scale-115"
                >
                  <Sparkles className="size-6 transition-transform duration-500 group-hover:rotate-12" strokeWidth={1.4} />
                </span>
              </div>
              <div className="mb-4 flex gap-1 text-[#DC5513]" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }, (_, star) => (
                  <Star
                    key={star}
                    aria-hidden="true"
                    className="size-3.5 fill-current stroke-none transition-transform duration-300 group-hover:scale-110"
                    style={{ transitionDelay: `${star * 40}ms` }}
                  />
                ))}
              </div>
              <blockquote className="mb-7 font-primary text-[25px] leading-[1.4] tracking-tight lg:text-[28px] transition-colors duration-300 group-hover:text-[#0D03AE]">
                “{review.quote}”
              </blockquote>
              <figcaption className="mt-auto border-t border-[#292240]/10 pt-5 font-secondary">
                <span className="block text-sm font-semibold">{review.author}</span>
                <span className={`mt-1 block text-xs ${review.ink}`}>{review.note}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-8 flex items-center justify-center gap-2 font-primary text-lg text-[#786C65]"><Heart aria-hidden="true" className="size-4 text-[#DC5513]" /> Little outfits. Lovely memories.</p>
      </div>
    </section>
  );
}
