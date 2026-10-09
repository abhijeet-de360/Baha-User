'use client';

import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Heart, Eye, ShoppingBag, Star, Sparkles, ShoppingCart, Share2, Check } from 'lucide-react';
import type { ProductReel, Product } from '@/types';

interface ReelCardProps {
  reel: ProductReel;
  product?: Product;
  onQuickView: (product: Product) => void;
  onAddToCart?: (product: Product, selectedColor: string, selectedSize: string) => void;
}

export const ReelCard: React.FC<ReelCardProps> = ({
  reel,
  product,
  onQuickView,
  onAddToCart,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.log('Autoplay prevented:', err);
      });
    }
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.log('Play error:', err);
      });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleShopClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product) {
      onQuickView(product);
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: reel.title,
        text: `Check out ${reel.title} on Baha Fashion!`,
        url: window.location.href,
      }).catch(() => { });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className="group relative aspect-[9/16] rounded-3xl overflow-hidden bg-slate-950 border border-[#EFECE6] shadow-card hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer select-none"
      onClick={togglePlay}
    >
      {/* 1. HTML5 Video Player */}
      <video
        ref={videoRef}
        src={reel.videoUrl}
        autoPlay
        loop
        playsInline
        muted={isMuted}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* 2. Top Header Gradient & Reel Badges */}
      <div className="relative z-10 p-3 sm:p-4 bg-gradient-to-b from-black/80 via-black/30 to-transparent flex items-start justify-end text-white pointer-events-none">
        

        <div className="flex items-center gap-1.5 pointer-events-auto">
          <button
            type="button"
            onClick={toggleMute}
            className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
            title={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-brand-yellow" />}
          </button>
        </div>
      </div>

      {/* 3. Center Play/Pause Overlay Indicator */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        {!isPlaying && (
          <div className="w-14 h-14 rounded-full bg-black/50 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-2xl transition-all transform scale-100 group-hover:scale-110">
            <Play className="w-6 h-6 fill-white ml-1 text-white" />
          </div>
        )}
      </div>

      {/* 4. Side Social Actions (Likes, Share & Views) */}
      <div className="absolute right-3 bottom-24 z-20 flex flex-col items-center gap-3">
        {/* Like Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className="flex flex-col items-center gap-1 group/like cursor-pointer"
        >
          <div className={`w-9 h-9 rounded-full backdrop-blur-md border flex items-center justify-center transition-all ${isLiked
              ? 'bg-rose-500 border-rose-400 text-white scale-110'
              : 'bg-black/40 border-white/20 text-white hover:bg-black/60'
            }`}>
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-white' : ''}`} />
          </div>
          <span className="text-[10px] font-bold text-white drop-shadow-md">{reel.likes}</span>
        </button>

        {/* Share Button */}
        <button
          type="button"
          onClick={handleShare}
          className="flex flex-col items-center gap-1 group/share cursor-pointer"
          title="Share Reel"
        >
          <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/60 hover:scale-105 active:scale-95 transition-all">
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </div>
          <span className="text-[10px] font-bold text-white drop-shadow-md">
            {copied ? 'Copied' : 'Share'}
          </span>
        </button>
      </div>

      {/* 5. Bottom Gradient & Product Buy Box */}
      <div className="relative z-20 p-3 sm:p-3.5 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col gap-2">
        {/* Reel Title Caption */}
        <div className="text-white px-0.5 ">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-brand-yellow text-text-main flex items-center justify-center font-bold text-xs shadow-md">
              <Sparkles className="w-3.5 h-3.5 fill-text-main" />
            </span>
            <h4 className="font-heading font-medium text-sm leading-snug drop-shadow-md line-clamp-1">
              {reel.title}
            </h4>
          </div>

        </div>

        {/* Modern Minimalist Product Card */}
        {product ? (
          <div
            onClick={handleShopClick}
            className="bg-white/70 hover:bg-white backdrop-blur-xl p-2 rounded-lg border border-white/60 shadow-2xl flex items-center justify-between gap-2.5 transition-all duration-300 group/buy cursor-pointer hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={product.featuredImage}
                alt={product.name}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg object-cover shrink-0 border border-black/10 shadow-xs"
              />
              <div className="min-w-0">
                <h5 className="font-bold text-xs text-text-main line-clamp-1 group-hover/buy:text-brand-purple transition-colors">
                  {product.name}
                </h5>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-extrabold text-xs text-brand-purple">
                    ₹{product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-[10px] text-text-muted line-through font-semibold">
                      ₹{product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  <div className="flex items-center gap-0.5 text-[10px] font-bold text-amber-500 bg-amber-50 px-1.5 py-0.5 rounded-md border border-amber-200/60">
                    <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleShopClick}
              className="bg-brand-purple hover:bg-brand-purple/95 text-white font-extrabold text-xs w-8 h-8 flex items-center justify-center rounded-lg shrink-0 flex items-center gap-1.5 shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="bg-white/20 backdrop-blur-md p-2 rounded-xl text-white text-xs font-semibold text-center">
            Featured Look
          </div>
        )}
      </div>
    </div>
  );
};
