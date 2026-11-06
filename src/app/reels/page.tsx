"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Share2,
  Volume2,
  VolumeX,
  Play,
  ShoppingBag,
  ChevronUp,
  ChevronDown,
  Check,
} from "lucide-react";
import { REELS_DATA, ReelData } from "@/data/reels";

interface ReelSlideProps {
  reel: ReelData;
  index: number;
  totalCount: number;
  isActive: boolean;
  isMuted: boolean;
  onToggleMute: () => void;
  isLiked: boolean;
  onToggleLike: () => void;
  onShare: (reel: ReelData) => void;
  onPrev: () => void;
  onNext: () => void;
}

function ReelSlide({
  reel,
  index,
  totalCount,
  isActive,
  isMuted,
  onToggleMute,
  isLiked,
  onToggleLike,
  onShare,
  onPrev,
  onNext,
}: ReelSlideProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showHeartBurst, setShowHeartBurst] = useState(false);
  const lastTapRef = useRef<number>(0);

  // Auto-play / pause based on active state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      video.muted = isMuted;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Autoplay policy fallback: mute and play
            video.muted = true;
            video.play().catch(() => {});
            setIsPlaying(true);
          });
      }
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [isActive, isMuted]);

  // Sync mute state dynamically
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Tap video to play/pause or double-tap to like
  const handleVideoClick = () => {
    const now = Date.now();
    const timeSinceLastTap = now - lastTapRef.current;
    lastTapRef.current = now;

    if (timeSinceLastTap < 300) {
      // Double tap detected: like!
      if (!isLiked) {
        onToggleLike();
      }
      setShowHeartBurst(true);
      setTimeout(() => setShowHeartBurst(false), 800);
      return;
    }

    // Single tap: toggle play/pause
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div
      data-reel-index={index}
      className="relative w-full h-[100dvh] snap-start snap-always flex items-center justify-center bg-black overflow-hidden select-none"
    >
      {/* Video Container (Full-bleed on mobile, phone-aspect ratio on desktop) */}
      <div
        className="relative w-full h-full sm:max-w-[430px] sm:max-h-[100dvh] flex items-center justify-center cursor-pointer bg-neutral-950 overflow-hidden"
        onClick={handleVideoClick}
      >
        <video
          ref={videoRef}
          src={reel.video}
          poster={reel.image}
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
        />

        {/* Ambient Dark Gradient Vignette for readable overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/85 pointer-events-none" />

        {/* Play / Pause Central Overlay Indicator */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 animate-in zoom-in-75 fade-in duration-150">
            <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white shadow-xl">
              <Play className="w-7 h-7 fill-white text-white ml-1" />
            </div>
          </div>
        )}

        {/* Double-tap animated heart burst */}
        {showHeartBurst && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 animate-in zoom-in-50 fade-in duration-150">
            <Heart className="w-24 h-24 text-[#DC5513] fill-[#DC5513] drop-shadow-[0_8px_20px_rgba(220,85,19,0.5)]" />
          </div>
        )}

        {/* Top Sound Toggle Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleMute();
          }}
          className="absolute top-16 sm:top-20 right-4 z-30 w-10 h-10 rounded-full bg-black/45 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer active:scale-90"
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-white" />
          ) : (
            <Volume2 className="w-5 h-5 text-white" />
          )}
        </button>

        {/* Right Action Floating Column (Like, Share) */}
        <div className="absolute right-3.5 bottom-28 sm:bottom-24 flex flex-col items-center gap-4 z-30">
          {/* Like Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleLike();
            }}
            className="flex flex-col items-center gap-1 group cursor-pointer active:scale-90 transition-transform"
            aria-label="Like reel"
          >
            <div
              className={`w-11 h-11 rounded-full backdrop-blur-md flex items-center justify-center transition-all shadow-md ${
                isLiked
                  ? "bg-[#DC5513] text-white"
                  : "bg-black/45 text-white hover:bg-black/65"
              }`}
            >
              <Heart
                className={`w-5 h-5 ${isLiked ? "fill-white text-white" : "text-white"}`}
              />
            </div>
            <span className="text-[11px] font-bold text-white drop-shadow font-jost">
              {reel.likes + (isLiked ? 1 : 0)}
            </span>
          </button>

          {/* Share Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onShare(reel);
            }}
            className="flex flex-col items-center gap-1 group cursor-pointer active:scale-90 transition-transform"
            aria-label="Share reel"
          >
            <div className="w-11 h-11 rounded-full bg-black/45 hover:bg-black/65 backdrop-blur-md flex items-center justify-center text-white transition-all shadow-md">
              <Share2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-[11px] font-bold text-white drop-shadow font-jost">
              Share
            </span>
          </button>
        </div>

        {/* Desktop Side Floating Next / Previous Buttons */}
        <div className="hidden lg:flex flex-col gap-2.5 absolute -right-16 top-1/2 -translate-y-1/2 z-40">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            disabled={index === 0}
            className="w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-md text-white flex items-center justify-center transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed shadow-md"
            title="Previous Reel"
            aria-label="Previous reel"
          >
            <ChevronUp className="w-6 h-6 text-white" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            disabled={index === totalCount - 1}
            className="w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-md text-white flex items-center justify-center transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed shadow-md"
            title="Next Reel"
            aria-label="Next reel"
          >
            <ChevronDown className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Shoppable Product Card Overlay */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-22 sm:bottom-6 left-3 sm:left-4 right-16 sm:right-20 max-w-[340px] p-2.5 sm:p-3 rounded-2xl bg-white/95 backdrop-blur-md shadow-[0_12px_32px_rgba(0,0,0,0.35)] border border-white/50 flex items-center justify-between gap-3 z-30 font-jost"
        >
          {/* Thumbnail & Title/Price */}
          <Link
            href={reel.link}
            className="flex items-center gap-2.5 min-w-0 flex-1 group"
          >
            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#FAF8E8] shrink-0 border border-[#E7DEC8]">
              <Image
                src={reel.image}
                alt={reel.title}
                fill
                sizes="48px"
                className="object-cover group-hover:scale-105 transition-transform"
              />
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="font-bold text-xs sm:text-sm text-neutral-900 truncate leading-tight group-hover:text-[#0D03AE] transition-colors">
                {reel.title}
              </h4>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="font-black text-sm text-[#0D03AE]">
                  ₹{reel.price}
                </span>
                <span className="text-[10px] text-neutral-400 line-through">
                  ₹{reel.originalPrice}
                </span>
                <span className="text-[10px] font-bold text-[#DC5513]">
                  {reel.discount}
                </span>
              </div>
            </div>
          </Link>

          {/* Shop Button */}
          <Link
            href={reel.link}
            className="px-3.5 py-2 rounded-xl bg-[#0D03AE] hover:bg-[#DC5513] text-white text-xs font-bold transition-colors shrink-0 shadow-xs flex items-center gap-1.5 active:scale-95"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-white" />
            <span>Shop</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ReelsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [likedReelIds, setLikedReelIds] = useState<Set<string>>(new Set());
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2200);
  }, []);

  const toggleLike = (reelId: string) => {
    setLikedReelIds((prev) => {
      const next = new Set(prev);
      if (next.has(reelId)) {
        next.delete(reelId);
      } else {
        next.add(reelId);
        showToast("Liked outfit! ❤️");
      }
      return next;
    });
  };

  const handleShare = (reel: ReelData) => {
    if (navigator.share) {
      navigator.share({
        title: `${reel.title} | Baha Kids`,
        text: `Look at this adorable baby outfit from Baha Kids: ${reel.title} for ₹${reel.price}!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast("Link copied to clipboard! 📋");
    }
  };

  // Scroll to slide by index
  const scrollToSlide = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const clampedIndex = Math.max(0, Math.min(index, REELS_DATA.length - 1));
    const targetChild = container.children[clampedIndex] as HTMLElement;
    if (targetChild) {
      targetChild.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "j") {
        e.preventDefault();
        scrollToSlide(activeIndex + 1);
      } else if (e.key === "ArrowUp" || e.key === "k") {
        e.preventDefault();
        scrollToSlide(activeIndex - 1);
      } else if (e.key === "m") {
        setIsMuted((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  // Track active slide on scroll using IntersectionObserver
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const indexAttr = entry.target.getAttribute("data-reel-index");
            if (indexAttr !== null) {
              setActiveIndex(parseInt(indexAttr, 10));
            }
          }
        });
      },
      {
        root: container,
        threshold: 0.6,
      }
    );

    Array.from(container.children).forEach((child) => {
      observer.observe(child);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full h-[100dvh] bg-black overflow-hidden select-none">
      {/* Full-screen Snap Scroll Container */}
      <div
        ref={containerRef}
        data-lenis-prevent="true"
        className="w-full h-[100dvh] overflow-y-scroll snap-y snap-mandatory no-scrollbar bg-black"
      >
        {REELS_DATA.map((reel, idx) => (
          <ReelSlide
            key={reel.id}
            reel={reel}
            index={idx}
            totalCount={REELS_DATA.length}
            isActive={activeIndex === idx}
            isMuted={isMuted}
            onToggleMute={() => setIsMuted((prev) => !prev)}
            isLiked={likedReelIds.has(reel.id)}
            onToggleLike={() => toggleLike(reel.id)}
            onShare={handleShare}
            onPrev={() => scrollToSlide(idx - 1)}
            onNext={() => scrollToSlide(idx + 1)}
          />
        ))}
      </div>

      {/* Floating Action Toast */}
      {toastMessage && (
        <div className="fixed bottom-24 sm:bottom-12 left-1/2 -translate-x-1/2 z-[100] px-4 py-2 rounded-full bg-neutral-900/90 text-white text-xs font-bold shadow-xl border border-white/20 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200 font-jost pointer-events-none">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
