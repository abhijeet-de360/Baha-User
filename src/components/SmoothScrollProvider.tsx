"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
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
    });

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
    };
  }, []);

  return <>{children}</>;
}

