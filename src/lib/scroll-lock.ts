"use client";

import { useEffect } from "react";
import type Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function lockScroll() {
  if (typeof window === "undefined") return;

  if (window.__lenis) {
    window.__lenis.stop();
  }

  document.documentElement.classList.add("lenis-stopped");
  document.body.style.overflow = "hidden";
}

export function unlockScroll() {
  if (typeof window === "undefined") return;

  if (window.__lenis) {
    window.__lenis.start();
  }

  document.documentElement.classList.remove("lenis-stopped");
  document.body.style.overflow = "";
}

/**
 * React hook to stop background page scrolling while a drawer or modal is open.
 */
export function useScrollLock(lock: boolean) {
  useEffect(() => {
    if (lock) {
      lockScroll();
      return () => {
        unlockScroll();
      };
    }
  }, [lock]);
}

