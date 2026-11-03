"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import "swiper/css";
import { PanoramaEffect } from "./panorama-effect";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export type PanoramaImage = { src: string; alt: string };

// Demo photos from https://uiinitiative.com/p/panorama-slider/
// Replace these local paths with your own images whenever they are ready.
export const PANORAMA_IMAGES: PanoramaImage[] = Array.from({ length: 9 }, (_, i) => ({
  src: `/assets/temp/panaroma${i + 1}.webp`,
  alt: `Landscape inspiration ${i + 1}`,
}));

export default function PanoramaSlider({ images = PANORAMA_IMAGES }: { images?: PanoramaImage[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const slider = useRef<SwiperInstance | null>(null);
  const [active, setActive] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(true);

  useGSAP(
    () => {
      // Soft entrance for the headline and bunny
      gsap.fromTo(
        ".panorama-header",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Delayed entrance for the panoramic cards carousel
      gsap.fromTo(
        ".panorama-carousel",
        { opacity: 0, scale: 0.96, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
          },
        }
      );

      // Delayed entrance for the drag ticker dial
      gsap.fromTo(
        ".panorama-dial",
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.45,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 68%",
          },
        }
      );
    },
    { scope: sectionRef }
  );
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  if (!images.length) return null;
  // Keep enough panels on both sides for seamless wrapping at every width.
  const panels = images.length > 1
    ? Array.from({ length: Math.max(2, Math.ceil(14 / images.length)) }, () => images).flat()
    : images;
  const selectImage = (index: number) => {
    const instance = slider.current;
    if (!instance) return;
    let distance = index - (instance.realIndex % images.length);
    if (distance > images.length / 2) distance -= images.length;
    if (distance < -images.length / 2) distance += images.length;
    instance.slideToLoop((instance.realIndex + distance + panels.length) % panels.length);
  };

  return (
    <section
      ref={sectionRef}
      id="panorama"
      aria-label="Panorama gallery"
      className="w-full min-w-0 overflow-hidden bg-white py-12 sm:py-16"
    >
      <div className="panorama-header mb-8 px-6 flex justify-center opacity-0">
        <div className="relative inline-flex flex-col items-start font-primary select-none">
          {/* Top Line: Choose Your Baby's */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-brand-primary leading-tight flex items-center">
            <span>Choose Your</span>
            <span className="invisible w-[0.3em]" aria-hidden="true"> </span>
            <span>Baby&apos;s</span>
          </h2>

          {/* Bottom Line: Starts after "Choose Your " */}
          <div className="relative inline-flex items-center -mt-1 sm:-mt-2">
            <span className="invisible text-3xl sm:text-4xl md:text-5xl" aria-hidden="true">
              Choose Your
            </span>
            <span className="invisible w-[0.3em]" aria-hidden="true"> </span>
            
            <div className="relative inline-flex items-center">
              <span className="text-4xl sm:text-5xl md:text-6xl text-brand-accent leading-none">
                Perfect{" "}
              </span>

              {/* "Look" container with bunny positioned directly above it */}
              <span className="relative inline-block text-4xl sm:text-5xl md:text-6xl text-brand-accent leading-none ml-[0.25em]">
                {/* Bunny centered and peeking over the top of the word Look */}
                <span className="absolute left-1/2 -translate-x-1/2 bottom-[30%] w-12 h-12 sm:w-16 sm:h-16 md:w-30 md:h-30 pointer-events-none select-none block">
                  <Image
                    src="/assets/bunny.webp"
                    alt="Cute bunny"
                    fill
                    sizes="(max-width: 640px) 48px, (max-width: 768px) 64px, 120px"
                    className="object-contain"
                    priority
                  />
                </span>
                Look
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="panorama-carousel opacity-0 w-full">
        <Swiper
          key={images.length}
          modules={[PanoramaEffect, A11y]}
          onSwiper={instance => { slider.current = instance; }}
          onSlideChange={instance => setActive(instance.realIndex % images.length)}
          centeredSlides
          slidesPerView={1.8}
          breakpoints={{
            480: { slidesPerView: 2.2 },
            640: { slidesPerView: 3.2 },
            1024: { slidesPerView: 4.8 },
            1280: { slidesPerView: 5.2 },
          }}
          spaceBetween={10}
          loop={images.length > 1}
          loopAdditionalSlides={2}
          speed={reducedMotion ? 0 : 1500}
          touchRatio={0.75}
          resistanceRatio={0.85}
          touchReleaseOnEdges={true}
          grabCursor={images.length > 1}
          watchSlidesProgress
          a11y={{ containerMessage: "Panorama image gallery" }}
          className="!w-full !max-w-none !overflow-visible !pt-2 !pb-0 ![perspective:1400px] [&_.swiper-wrapper]:!ease-[cubic-bezier(.16,1,.3,1)]"
          dir="ltr"
        >
          {panels.map((image, i) => (
            <SwiperSlide key={`${image.src}-${i}`} className="!transition-none [backface-visibility:hidden] [transform-style:preserve-3d]">
              <div className="mx-0.5 aspect-[2/3] overflow-hidden rounded-2xl bg-[#f4f0e8] shadow-sm transform-gpu">
                {/* Native images allow replaceable remote URLs without domain configuration. */}
                <img src={image.src} alt={image.alt} loading="eager" decoding="async" draggable={false} className="h-full w-full select-none object-cover transform-gpu" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* Vertical Ticker / Dial Indicator matching reference */}
      {images.length > 1 && (
        <div className="panorama-dial opacity-0 -mt-1 sm:-mt-2 flex flex-col items-center select-none font-secondary relative z-10">
          {/* DRAG TO EXPLORE Label */}
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.22em] text-brand-primary">
            Drag to Explore
          </p>

          {/* Ticker / Dial Hash Marks */}
          <div className="relative mt-1.5 flex items-center justify-center gap-2 sm:gap-2.5 px-4 overflow-hidden">
            {images.map((_, index) => {
              const isActive = active === index;
              // Distance from active center index (accounting for loop distance)
              const rawDiff = Math.abs(index - active);
              const distance = Math.min(rawDiff, images.length - rawDiff);

              // Progressive opacity roll-off towards outer sideways edges
              const opacityClass =
                distance === 0
                  ? "opacity-100"
                  : distance === 1
                  ? "opacity-55"
                  : distance === 2
                  ? "opacity-30"
                  : "opacity-15";

              return (
                <button
                  key={index}
                  type="button"
                  aria-label={`Jump to slide ${index + 1}`}
                  onClick={() => selectImage(index)}
                  className={`group py-2 px-0.5 cursor-pointer focus:outline-none flex flex-col items-center justify-center transition-opacity duration-300 ${opacityClass}`}
                >
                  {isActive ? (
                    /* Active Selected Tick: Clean, crisp, no border or yellow highlight */
                    <div className="px-1 py-0.5 flex items-center justify-center">
                      <span className="block w-1 sm:w-1.5 h-4 sm:h-5 rounded-xs bg-brand-primary shadow-xs" />
                    </div>
                  ) : (
                    /* Inactive Ticks */
                    <div className="px-1 py-0.5 flex items-center justify-center">
                      <span className="block w-0.5 sm:w-1 h-3.5 sm:h-4 rounded-xs bg-brand-primary/40 transition-all duration-300 group-hover:bg-brand-primary/70" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
