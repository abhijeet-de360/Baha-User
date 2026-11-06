"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, ShoppingBag, X, Volume2, VolumeX } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useScrollLock } from "@/lib/scroll-lock";

export interface ReelItem {
  id: string | number;
  title: string;
  category: string;
  price: number;
  originalPrice: number;
  image: string;
  video?: string;
  link: string;
}

const DEFAULT_REELS: ReelItem[] = [
  {
    id: 1,
    title: "Baby Bear Fleece Romper",
    category: "Newborn Set",
    price: 249,
    originalPrice: 499,
    image: "/assets/temp/reel1.webp",
    video: "/assets/temp/reel1.mp4",
    link: "/products/1",
  },
  {
    id: 2,
    title: "Pink Bunny Tutu Dress",
    category: "Infant Wear",
    price: 249,
    originalPrice: 499,
    image: "/assets/temp/reel2.webp",
    video: "/assets/temp/reel2.mp4",
    link: "/products/2",
  },
  {
    id: 3,
    title: "Lilac Butterfly Ruffle Dress",
    category: "Toddler Dress",
    price: 249,
    originalPrice: 499,
    image: "/assets/temp/reel3.webp",
    video: "/assets/temp/reel1.mp4",
    link: "/products/3",
  },
  {
    id: 4,
    title: "Teddy Bear Cotton Pajama Pants",
    category: "Kids Sleepwear",
    price: 249,
    originalPrice: 499,
    image: "/assets/temp/reel4.webp",
    video: "/assets/temp/pr1.mp4",
    link: "/products/4",
  },
  {
    id: 5,
    title: "Little Bunny Floral One-Piece",
    category: "Little Girl",
    price: 249,
    originalPrice: 499,
    image: "/assets/temp/reel5.webp",
    video: "/assets/temp/reel2.mp4",
    link: "/products/5",
  },
];

function ReelCard({
  reel,
  onOpenModal,
}: {
  reel: ReelItem;
  onOpenModal: (reel: ReelItem) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = isMuted;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback to muted if browser policy requires a user click before audio
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().catch(() => {});
          }
        });
      }
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  return (
    <div
      onClick={() => onOpenModal(reel)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="reel-card group relative aspect-[9/13] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-900 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer opacity-0 select-none"
    >
      {/* Poster Image */}
      <Image
        src={reel.image}
        alt={reel.title}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
      />

      {/* Video Preview on Hover (with audio enabled) */}
      {reel.video && (
        <video
          ref={videoRef}
          src={reel.video}
          loop
          playsInline
          preload="none"
          poster={reel.image}
          className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:scale-105"
        />
      )}

      {/* Sound / Mute Toggle Button */}
      {reel.video && (
        <button
          type="button"
          onClick={toggleSound}
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          className="absolute top-2.5 right-2.5 z-20 w-8 h-8 rounded-full bg-black/45 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/75 hover:scale-105 transition-all cursor-pointer"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-white" />
          ) : (
            <Volume2 className="w-4 h-4 text-white" />
          )}
        </button>
      )}

      {/* Subtle Ambient Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 group-hover:from-black/60 transition-colors duration-300 pointer-events-none" />

      {/* Centered Frosted Play Button (fades away smoothly while video plays) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/75 backdrop-blur-md shadow-md flex items-center justify-center text-neutral-800 group-hover:opacity-0 group-hover:scale-75 transition-all duration-300">
          <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-neutral-800 text-neutral-800 ml-0.5" />
        </div>
      </div>

      {/* Bottom Shoppable Peek Pill */}
      <div className="absolute bottom-2.5 sm:bottom-3 inset-x-2.5 sm:inset-x-3 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-white/90 backdrop-blur-md shadow-sm flex items-center justify-between text-xs transition-transform duration-300 group-hover:bg-white z-10">
        <div className="flex flex-col min-w-0 pr-2">
          <span className="font-primary text-[11px] sm:text-xs text-neutral-900 font-semibold truncate leading-tight">
            {reel.title}
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="font-bold text-xs text-black">
              ₹{reel.price}
            </span>
            <span className="text-[10px] text-neutral-400 line-through">
              ₹{reel.originalPrice}
            </span>
          </div>
        </div>

        <div className="w-7 h-7 rounded-full bg-[#DE5416] text-white flex items-center justify-center shrink-0 shadow-xs">
          <ShoppingBag className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
}

export default function WatchAndShopSection({
  reels = DEFAULT_REELS,
}: {
  reels?: ReelItem[];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeReel, setActiveReel] = useState<ReelItem | null>(null);

  useScrollLock(!!activeReel);

  useGSAP(
    () => {
      // Header Animation
      gsap.fromTo(
        ".watch-shop-header",
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

      // Stagger Cards In
      gsap.fromTo(
        ".reel-card",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          delay: 0.15,
          ease: "power2.out",
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
      id="reels"
      ref={sectionRef}
      className="relative w-full bg-white py-12 sm:py-16 md:py-20 overflow-hidden"
    >
      <div className="w-full max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Headline */}
        <div className="watch-shop-header text-center mb-8 sm:mb-10 md:mb-12 flex flex-col items-center justify-center opacity-0 font-jost">
          <h2 className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
            <span className="font-['Didot',_'Playfair_Display',_'Times_New_Roman',_Georgia,_serif] italic font-semibold text-2xl sm:text-3xl md:text-4xl text-[#0D03AE] leading-tight tracking-tight">
              Watch, Play &amp; Shop The
            </span>
            <span className="font-primary text-3xl sm:text-4xl md:text-5xl lg:text-[52px] text-[#DC5513] font-normal leading-none -mt-1 sm:-mt-1.5">
              Look
            </span>
          </h2>
          <Link
            href="/reels"
            className="mt-2.5 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FAF8E8] border border-[#E7DEC8] text-xs font-bold text-[#DC5513] hover:text-[#0D03AE] hover:border-[#0D03AE] transition-all shadow-2xs"
          >
            <span>View All Shoppable Reels &rarr;</span>
          </Link>
        </div>

        {/* 5-Column Grid: 2 on mobile, 3 on sm, 5 on lg */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 md:gap-5">
          {reels.map((reel) => (
            <ReelCard key={reel.id} reel={reel} onOpenModal={setActiveReel} />
          ))}
        </div>
      </div>

      {/* Interactive Modal Video / Reel Player */}
      {activeReel && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setActiveReel(null)}
        >
          <div
            data-lenis-prevent="true"
            className="relative w-full max-w-sm sm:max-w-md aspect-[9/16] max-h-[90vh] bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveReel(null)}
              aria-label="Close video"
              className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/75 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video / Poster in Modal */}
            <div className="relative w-full h-full flex items-center justify-center bg-black">
              {activeReel.video ? (
                <video
                  src={activeReel.video}
                  autoPlay
                  controls
                  playsInline
                  loop
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={activeReel.image}
                  alt={activeReel.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>

            {/* Bottom Modal Purchase Card */}
            <div className="absolute bottom-4 inset-x-4 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg flex items-center justify-between z-20">
              <div className="flex flex-col">
                <span className="text-xs text-[#DE5416] font-medium">
                  {activeReel.category}
                </span>
                <span className="font-primary text-sm font-semibold text-black leading-tight">
                  {activeReel.title}
                </span>
                <span className="font-bold text-sm text-black mt-0.5">
                  ₹{activeReel.price}
                </span>
              </div>

              <Link
                href={activeReel.link}
                onClick={() => setActiveReel(null)}
                className="px-4 py-2 rounded-full bg-[#DE5416] text-white font-secondary text-xs font-semibold hover:bg-[#c44710] transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

