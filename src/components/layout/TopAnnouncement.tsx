'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, X, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useShopState } from '@/hooks/useShopState';

const ANNOUNCEMENT_STORAGE_KEY = 'baha_announcement_visible';

export const TopAnnouncement: React.FC = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const { setAppliedPromo } = useShopState();

  useEffect(() => {
    setIsMounted(true);
    try {
      const stored = localStorage.getItem(ANNOUNCEMENT_STORAGE_KEY);
      // If user closed it previously ('false'), keep it hidden
      if (stored === 'false') {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    } catch {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    try {
      localStorage.setItem(ANNOUNCEMENT_STORAGE_KEY, 'false');
    } catch (e) {
      console.error('Failed to save announcement preference to localStorage:', e);
    }
  };

  if (!isMounted || !isVisible) return null;

  const onPromoClick = (code: string) => {
    setAppliedPromo(code);
    router.push('/cart');
  };

  const renderContent = () => (
    <div className="flex items-center gap-3 shrink-0">
      <div className="inline-flex items-center gap-1.5 bg-white/20 px-2.5 py-0.5 rounded-full text-[11px] font-semibold backdrop-blur-sm shrink-0">
        <Sparkles className="w-3 h-3 text-brand-yellow fill-brand-yellow" />
        <span>Spring Drop</span>
      </div>
      <span className="text-xs whitespace-nowrap">Free shipping on orders over ₹499! Use code</span>
      <button 
        type="button"
        onClick={() => onPromoClick('LITTLEJOY10')}
        className="h-5.5 px-2.5 py-0 rounded-md bg-[#FFD66B] hover:bg-brand-yellow-dark text-[#292936] text-[11px] font-bold inline-flex items-center gap-1 cursor-pointer transition-transform active:scale-95 shadow-xs shrink-0"
        title="Click to apply promo code"
      >
        <Gift className="w-3 h-3" />
        LITTLEJOY10
      </button>
      <span className="text-white/90 text-xs font-medium whitespace-nowrap">for 10% off</span>
      <span className="text-white/40 mx-3">•</span>
    </div>
  );

  return (
    <aside aria-label="Announcement" className="bg-brand-purple text-white text-xs sm:text-sm font-medium py-2 px-3 sm:px-4 relative z-40 transition-all overflow-hidden">
      {/* ── Mobile Marquee Ticker (Small Screens) ── */}
      <div className="sm:hidden overflow-hidden relative pr-8">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] active:[animation-play-state:paused] items-center">
          {renderContent()}
          {renderContent()}
        </div>
        {/* Soft edge gradient before the close button */}
        <div className="absolute right-7 top-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-brand-purple pointer-events-none" />
      </div>

      {/* ── Desktop Centered Bar (Tablet & Desktop) ── */}
      <div className="hidden sm:flex max-w-7xl mx-auto items-center justify-center gap-2 sm:gap-4 text-center">
        <div className="flex items-center gap-1.5 bg-white/20 px-2.5 py-0.5 rounded-full text-xs font-semibold backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-brand-yellow fill-brand-yellow" />
          <span>Spring Drop</span>
        </div>
        
        <p className="flex items-center gap-2 justify-center text-xs sm:text-sm">
          <span>Free shipping on orders over ₹499! Use code</span>
          <Button 
            type="button"
            variant="yellow"
            size="sm"
            onClick={() => onPromoClick('LITTLEJOY10')}
            className="h-6 px-2.5 py-0 rounded-md text-xs font-bold gap-1 cursor-pointer"
            title="Click to apply promo code"
          >
            <Gift className="w-3 h-3" />
            LITTLEJOY10
          </Button>
          <span className="text-white/90 font-medium">for 10% off</span>
        </p>
      </div>

      {/* ── Close Button (Always Accessible) ── */}
      <Button 
        type="button"
        variant="ghost"
        size="iconSm"
        onClick={handleClose}
        className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white hover:bg-white/10 rounded-full size-7 cursor-pointer z-10"
        aria-label="Dismiss banner"
      >
        <X className="w-4 h-4" />
      </Button>
    </aside>
  );
};
