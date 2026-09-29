'use client';

import React, { useState } from 'react';
import { Sparkles, Mail, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// interface FooterProps {
//   onCategoryClick: (category: string) => void;
// }

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#6C63A8', '#A8D8E8', '#FFD66B', '#A9D8B8', '#F28C82'],
      });
    }
  };

  return (
    <footer className="bg-white border-t border-[#EFECE6] text-text-main pt-16 pb-12">
      <div className="container">
        
        {/* Newsletter Box */}
        <div className="bg-gradient-to-r from-brand-purple-light via-[#FFF8E7] to-brand-blue-light rounded-4xl p-8 sm:p-12 border border-[#EBE7DF] mb-16 shadow-card text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-brand-yellow px-3 py-1 rounded-full text-xs font-bold text-text-main uppercase tracking-wider mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>VIP Parents Club</span>
          </div>

          <h3 className="font-heading text-3xl sm:text-4xl font-extrabold text-text-main mb-3">
            Get 15% Off Your First Play Drop!
          </h3>
          <p className="text-text-muted text-sm sm:text-base max-w-lg mx-auto mb-6">
            Join 35,000+ happy parents. Enjoy secret flash sales, playful parenting tips, and first dibs on limited drops.
          </p>

          {subscribed ? (
            <div className="bg-white p-4 rounded-2xl border border-emerald-300 max-w-md mx-auto animate-bounce-subtle text-emerald-800 shadow-xs">
              <p className="font-bold text-sm">🎉 Woohoo! Welcome to the Baha family!</p>
              <p className="text-xs text-text-muted mt-1">
                Use code <strong className="text-brand-purple font-bold">WELCOME15</strong> at checkout for 15% off.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-text-muted absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-[#DDD8CE] text-sm text-text-main placeholder-text-light focus:outline-none focus:ring-2 focus:ring-brand-purple shadow-sm"
                />
              </div>
              <Button
                type="submit"
                variant="default"
                size="lg"
                className="h-auto py-3.5 px-7 rounded-2xl font-bold text-sm shadow-card hover:shadow-soft"
              >
                <span>Join Club</span>
                <Send className="w-4 h-4" />
              </Button>
            </form>
          )}
          <p className="text-[11px] text-text-light mt-3">We respect your privacy. No spam, pinky promise! 🤙</p>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-[#EFECE6]">
          
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-2xl bg-brand-purple flex items-center justify-center text-white shadow-sm">
                <Sparkles className="w-4 h-4 text-brand-yellow fill-brand-yellow" />
              </span>
              <div>
                <span className="font-heading text-2xl font-extrabold text-brand-purple tracking-tight block leading-none">
                  Baha <span className="text-brand-yellow">Fashion</span>
                </span>
                <span className="font-body text-[10px] uppercase tracking-widest text-brand-coral font-bold">
                  Big Adventures ♥
                </span>
              </div>
            </div>
            
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed max-w-sm">
              Mindfully designed children's apparel made from premium fabrics. Crafted with love for curious little dreamers and explorers across India.
            </p>

            <div className="flex items-center gap-2 pt-2 text-xs font-semibold text-emerald-800 bg-brand-mint-light/80 px-3 py-1.5 rounded-xl inline-block">
              🌱 GOTS Certified Organic Cotton
            </div>
          </div>

          {/* Quick Collections */}
          <div>
            <h4 className="font-heading text-sm font-bold text-text-main uppercase tracking-wider mb-3">
              Collections
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-text-muted">
              <li>
                <Link href={`/products?category=${encodeURIComponent('Boys')}`} className="hover:text-brand-purple transition-colors cursor-pointer">
                  Boys Wear
                </Link>
              </li>
              <li>
                <Link href={`/products?category=${encodeURIComponent('Girls')}`} className="hover:text-brand-purple transition-colors cursor-pointer">
                  Girls Dresses
                </Link>
              </li>
              <li>
                <Link href={`/products?category=${encodeURIComponent('Baby')}`} className="hover:text-brand-purple transition-colors cursor-pointer">
                  Baby & Newborn
                </Link>
              </li>
              <li>
                <Link href={`/products?category=${encodeURIComponent('Ethnic Wear')}`} className="hover:text-brand-purple transition-colors cursor-pointer">
                  Festive Ethnic Wear
                </Link>
              </li>
              <li>
                <Link href={`/products?category=${encodeURIComponent('Party Wear')}`} className="hover:text-brand-purple transition-colors cursor-pointer">
                  Party Outfits
                </Link>
              </li>
            </ul>
          </div>

          {/* Parent Resources */}
          <div>
            <h4 className="font-heading text-sm font-bold text-text-main uppercase tracking-wider mb-3">
              Parents Hub
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-text-muted">
              <li className="hover:text-brand-purple cursor-pointer">Interactive Size Calculator</li>
              <li className="hover:text-brand-purple cursor-pointer">Organic Fabric Care Guide</li>
              <li className="hover:text-brand-purple cursor-pointer">Sensory-Friendly Design Notes</li>
              <li className="hover:text-brand-purple cursor-pointer">Pass-It-On Recycling Program</li>
              <li className="hover:text-brand-purple cursor-pointer">Gift Cards & Bundles</li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-heading text-sm font-bold text-text-main uppercase tracking-wider mb-3">
              Help & Support
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-text-muted">
              <li className="hover:text-brand-purple cursor-pointer">Track Your Package</li>
              <li className="hover:text-brand-purple cursor-pointer">Free 30-Day Returns</li>
              <li className="hover:text-brand-purple cursor-pointer">Shipping & Delivery Info</li>
              <li className="hover:text-brand-purple cursor-pointer">FAQ & Help Desk</li>
              <li className="hover:text-brand-purple cursor-pointer">Contact Parent Support</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <p>© 2026 Baha Fashion, Inc. All adventures reserved. Made with love for happy kids.</p>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium mr-1">Guaranteed Safe Checkout:</span>
            <span className="bg-background px-2 py-1 rounded border border-[#EBE7DF] font-bold text-[10px]">UPI</span>
            <span className="bg-background px-2 py-1 rounded border border-[#EBE7DF] font-bold text-[10px]">VISA</span>
            <span className="bg-background px-2 py-1 rounded border border-[#EBE7DF] font-bold text-[10px]">MasterCard</span>
            <span className="bg-background px-2 py-1 rounded border border-[#EBE7DF] font-bold text-[10px]">NetBanking</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
