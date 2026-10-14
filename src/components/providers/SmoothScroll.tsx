'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowUp } from 'lucide-react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

interface SmoothScrollContextType {
  lenis: Lenis | null;
  scrollToTop: (smooth?: boolean) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  scrollToTop: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();
  const prevPathname = useRef(pathname);
  const [showScrollTopBtn, setShowScrollTopBtn] = useState(false);

  useEffect(() => {
    // Disable native browser scroll restoration so it doesn't fight smooth scroll transitions
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
      autoResize: true,
    });

    lenisRef.current = lenis;

    // Listen to scroll position for floating back-to-top button
    const handleScroll = () => {
      const scrollY = lenis.scroll || window.scrollY || 0;
      setShowScrollTopBtn(scrollY > 350);
    };

    lenis.on('scroll', handleScroll);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.off('scroll', handleScroll);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Smooth scroll to top automatically on route/page change
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;

      const performScroll = () => {
        // If there's an anchor hash in the URL (e.g. #reviews), scroll to that target element
        const hash = typeof window !== 'undefined' ? window.location.hash : '';
        if (hash) {
          try {
            const target = document.querySelector(hash);
            if (target && lenisRef.current) {
              lenisRef.current.scrollTo(target as HTMLElement, {
                immediate: false,
                duration: 0.8,
                offset: -80,
              });
              return;
            }
          } catch {
            // Ignore invalid CSS selector
          }
        }

        // Smoothly scroll to the very top
        if (lenisRef.current) {
          lenisRef.current.resize();
          lenisRef.current.scrollTo(0, {
            immediate: false,
            duration: 0.8,
          });
        } else if (typeof window !== 'undefined') {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
        }
      };

      // Trigger scroll immediately on route change, plus a short timeout to account for dynamic DOM paint
      performScroll();
      const timer = setTimeout(performScroll, 50);

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const scrollToTop = (smooth = true) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, {
        immediate: !smooth,
        duration: smooth ? 0.8 : 0,
      });
    } else if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: smooth ? 'smooth' : 'auto',
      });
    }
  };

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisRef.current, scrollToTop }}>
      {children}

      {/* Floating Smooth Scroll to Top Button */}
      <button
        type="button"
        onClick={() => scrollToTop(true)}
        aria-label="Scroll to top"
        className={`fixed bottom-6 right-4 sm:bottom-8 sm:right-8 z-40 w-11 h-11 rounded-2xl bg-white/90 backdrop-blur-md shadow-md border border-[#EFECE6] text-text-main hover:text-brand-purple hover:border-brand-purple hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer ${
          showScrollTopBtn
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <ArrowUp className="w-5 h-5 stroke-[2.2]" />
      </button>
    </SmoothScrollContext.Provider>
  );
}
