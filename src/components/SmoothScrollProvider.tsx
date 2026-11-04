"use client";

import React, { Suspense, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Isolated inner listener wrapped in Suspense so that Next.js prerendering
 * does not fail due to usePathname() outside Suspense boundaries.
 */
function ScrollResetOnNavigate({ lenisRef }: { lenisRef: React.RefObject<Lenis | null> }) {
  const pathname = usePathname();

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Refresh ScrollTrigger and Lenis dimensions for the new page layout
    const timer = setTimeout(() => {
      if (lenisRef.current) {
        lenisRef.current.resize();
      }
      ScrollTrigger.refresh();
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname, lenisRef]);

  return null;
}

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Disable native browser scroll restoration so page transitions always start at top
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      naiveDimensions: true,
      autoResize: true,
      stopInertiaOnNavigate: true,
    });

    lenisRef.current = lenis;
    if (typeof window !== "undefined") {
      window.__lenis = lenis;
    }

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    const refreshLayout = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };

    // Keep Lenis and GSAP updated whenever DOM content expands (images, dynamic sections)
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && document.body) {
      resizeObserver = new ResizeObserver(() => {
        refreshLayout();
      });
      resizeObserver.observe(document.body);
    }

    window.addEventListener("load", refreshLayout);
    window.addEventListener("resize", refreshLayout);

    // Initial sequence to recalculate as client components mount and lazy images load
    const timers = [150, 400, 800, 1500, 3000].map((delay) =>
      setTimeout(refreshLayout, delay)
    );

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("load", refreshLayout);
      window.removeEventListener("resize", refreshLayout);
      resizeObserver?.disconnect();
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
      if (typeof window !== "undefined") {
        window.__lenis = undefined;
      }
    };
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <ScrollResetOnNavigate lenisRef={lenisRef} />
      </Suspense>
      {children}
    </>
  );
}

