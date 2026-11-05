"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Play, Pause, Volume2, VolumeX, Heart, Sparkles, ZoomIn } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  video?: string;
  name: string;
  badge?: string;
  discount?: string;
}

export function ProductGallery({
  images,
  video,
  name,
  badge = "Bestseller",
  discount = "50% OFF",
}: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const videoRef = useRef<HTMLVideoElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const toggleVideoPlayback = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const currentImage = images[selectedIndex] || images[0];

  return (
    <div className="w-full flex flex-col-reverse lg:flex-row gap-3.5 sm:gap-4 lg:gap-5 select-none items-start">
      {/* Thumbnail Bar (Horizontal on mobile/tablet, Vertical on desktop) */}
      <div className="flex lg:flex-col gap-2 sm:gap-2.5 overflow-x-auto lg:overflow-y-auto no-scrollbar shrink-0 py-0.5 lg:max-h-[490px]">
        {images.map((img, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setSelectedIndex(idx);
              setShowVideo(false);
            }}
            aria-label={`View photo ${idx + 1}`}
            className={`relative w-14 h-14 sm:w-16 sm:h-16 lg:w-[58px] lg:h-[58px] xl:w-[62px] xl:h-[62px] aspect-square rounded-xl sm:rounded-2xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
              !showVideo && selectedIndex === idx
                ? "border-[#0D03AE] shadow-md ring-2 ring-[#0D03AE]/20 scale-102"
                : "border-black/5 opacity-75 hover:opacity-100 hover:border-black/20"
            }`}
          >
            <Image
              src={img}
              alt={`${name} thumbnail ${idx + 1}`}
              fill
              sizes="62px"
              className="object-cover object-center"
            />
          </button>
        ))}

        {/* Video Thumbnail Button if video is available */}
        {video && (
          <button
            type="button"
            onClick={() => setShowVideo(true)}
            aria-label="Watch video reel preview"
            className={`relative w-14 h-14 sm:w-16 sm:h-16 lg:w-[58px] lg:h-[58px] xl:w-[62px] xl:h-[62px] aspect-square rounded-xl sm:rounded-2xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer bg-neutral-900 flex flex-col items-center justify-center text-white ${
              showVideo
                ? "border-[#DC5513] shadow-md ring-2 ring-[#DC5513]/30 scale-102"
                : "border-black/5 opacity-85 hover:opacity-100"
            }`}
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#DC5513] flex items-center justify-center shadow-xs mb-0.5">
              <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-white text-white ml-0.5" />
            </div>
            <span className="text-[8px] sm:text-[9px] font-bold tracking-tight uppercase">
              Reel
            </span>
          </button>
        )}
      </div>

      {/* Main Viewport: Balanced height & true 1:1 square ratio preventing cropping */}
      <div className="relative flex-1 aspect-square w-full max-w-[420px] sm:max-w-[450px] md:max-w-[470px] lg:max-w-[470px] xl:max-w-[490px] max-h-[420px] sm:max-h-[450px] md:max-h-[470px] lg:max-h-[470px] xl:max-h-[490px] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#FAF8E8]/60 border border-black/5 shadow-xs">
        {/* Floating Badges */}
        <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-20 flex flex-col gap-2 items-start pointer-events-none">
          {discount && (
            <span className="px-3 py-1 rounded-full bg-[#DC5513] text-white font-secondary text-xs sm:text-sm font-bold shadow-md tracking-wide">
              {discount}
            </span>
          )}
          {badge && (
            <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#0D03AE] border border-[#0D03AE]/20 font-secondary text-[11px] sm:text-xs font-semibold shadow-xs flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#DC5513]" />
              {badge}
            </span>
          )}
        </div>

        {/* Wishlist Heart Toggle */}
        <button
          type="button"
          onClick={() => setIsWishlisted(!isWishlisted)}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-110 active:scale-95 ${
            isWishlisted
              ? "bg-[#DC5513] text-white"
              : "bg-white/85 text-neutral-700 hover:text-[#DC5513] hover:bg-white"
          }`}
        >
          <Heart
            className={`w-5 h-5 transition-transform ${
              isWishlisted ? "fill-white stroke-none scale-110" : ""
            }`}
          />
        </button>

        {/* Zoom Hint Icon on Desktop */}
        {!showVideo && (
          <div className="hidden lg:flex absolute bottom-4 right-4 z-20 px-2.5 py-1 rounded-full bg-black/45 backdrop-blur-md text-white text-[11px] font-medium items-center gap-1.5 pointer-events-none opacity-80">
            <ZoomIn className="w-3.5 h-3.5" />
            Hover to zoom
          </div>
        )}

        {/* Content: Video or Image */}
        {showVideo && video ? (
          <div className="relative w-full h-full bg-black flex items-center justify-center">
            <video
              ref={videoRef}
              src={video}
              autoPlay
              loop
              playsInline
              muted={isMuted}
              className="w-full h-full object-cover"
              onClick={toggleVideoPlayback}
            />

            {/* Video Controls Bar */}
            <div className="absolute bottom-4 inset-x-4 z-20 flex items-center justify-between px-3 py-2 rounded-2xl bg-black/60 backdrop-blur-md text-white text-xs">
              <button
                type="button"
                onClick={toggleVideoPlayback}
                className="flex items-center gap-1.5 hover:text-[#FED174] transition-colors cursor-pointer"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" /> Play
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={toggleSound}
                className="flex items-center gap-1.5 hover:text-[#FED174] transition-colors cursor-pointer"
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-4 h-4" /> Unmute
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4" /> Muted
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div
            ref={imageContainerRef}
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
            className="relative w-full h-full overflow-hidden cursor-crosshair"
          >
            <Image
              src={currentImage}
              alt={name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={`object-cover object-center transition-transform duration-200 ${
                isZoomed ? "scale-175" : "scale-100"
              }`}
              style={{
                transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

