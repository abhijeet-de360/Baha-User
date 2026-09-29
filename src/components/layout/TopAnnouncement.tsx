'use client';

import React, { useState } from 'react';
import { Sparkles, X, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useShop } from '@/context/ShopContext';

// interface TopAnnouncementProps {
//   onPromoClick?: (code: string) => void;
// }

export const TopAnnouncement: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  const { setAppliedPromo, setIsCartOpen } = useShop();

  if (!isVisible) return null;

  const onPromoClick = (code: string) => {
    setAppliedPromo(code);
    setIsCartOpen(true);
  };

  return (
    <aside aria-label="Announcement" className="bg-brand-purple text-white text-xs sm:text-sm font-medium py-2 px-4 relative z-40 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 sm:gap-4 text-center">
        <div className="flex items-center gap-1.5 bg-white/20 px-2.5 py-0.5 rounded-full text-xs font-semibold backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-brand-yellow fill-brand-yellow" />
          <span>Spring Drop</span>
        </div>
        
        <p className="flex items-center gap-2 flex-wrap justify-center text-xs sm:text-sm">
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
          <span className="hidden md:inline text-white/90 font-medium">for 10% off</span>
        </p>

        <Button 
          type="button"
          variant="ghost"
          size="iconSm"
          onClick={() => setIsVisible(false)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white hover:bg-white/10 rounded-full size-7"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </aside>
  );
};
