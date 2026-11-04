"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

export type BannerSlide = {
  title: string;
  image: string;
  mobileImage?: string;
  imagePosition?: string;
  headline?: { text: string; accent?: boolean }[];
  description?: string;
  ctaText?: string;
  ctaHref?: string;
};

const DEFAULT_BANNER_SLIDES: BannerSlide[] = [
  {
    title: "Every Little Adventure Begins With Comfort, Colour And Joy",
    image: "/assets/temp/banner1.webp",
    mobileImage: "/assets/temp/banner1-mobile.webp",
    headline: [
      { text: "Every Little Adventure Begins With\n" },
      { text: "Comfort", accent: true }, { text: ", Colour And " },
      { text: "Joy", accent: true },
    ],
    description: "Made for little explorers and their big imaginations. Discover everyday favourites for play, laughter and everything in between.",
  },
  {
    title: "Let Their Personality Shine In Bright, Playful Little Looks",
    image: "/assets/temp/banner2.webp",
    mobileImage: "/assets/temp/banner2-mobile.webp",
    headline: [
      { text: "Let Their Personality Shine In\n" },
      { text: "Bright", accent: true }, { text: ", " },
      { text: "Playful", accent: true }, { text: " Little Looks" },
    ],
    description: "A little colour, a lot of character. Find cheerful styles for their everyday adventures and special little moments.",
  },
  {
    title: "For Every Wiggle, Giggle And Hug, A Little Comfort And A Lot Of Love",
    image: "/assets/temp/banner3.webp",
    mobileImage: "/assets/temp/banner3-mobile.webp",
    headline: [
      { text: "For Every Wiggle, Giggle And Hug,\nA Little " },
      { text: "Comfort", accent: true }, { text: " And A Lot Of " },
      { text: "Love", accent: true },
    ],
    description: "From slow mornings to busy playdays, explore easy-to-wear favourites made for all the moments of childhood.",
  },
  {
    title: "For Every Wiggle, Giggle And Hug, A Little Comfort And A Lot Of Love",
    image: "/assets/temp/banner4.webp",
    mobileImage: "/assets/temp/banner4-mobile.webp",
    headline: [
      { text: "For Every Wiggle, Giggle And Hug,\nA Little " },
      { text: "Comfort", accent: true }, { text: " And A Lot Of " },
      { text: "Love", accent: true },
    ],
    description: "From slow mornings to busy playdays, explore easy-to-wear favourites made for all the moments of childhood.",
  },
  {
    title: "For Every Wiggle, Giggle And Hug, A Little Comfort And A Lot Of Love",
    image: "/assets/temp/banner5.webp",
    mobileImage: "/assets/temp/banner5-mobile.webp",
    headline: [
      { text: "For Every Wiggle, Giggle And Hug,\nA Little " },
      { text: "Comfort", accent: true }, { text: " And A Lot Of " },
      { text: "Love", accent: true },
    ],
    description: "From slow mornings to busy playdays, explore easy-to-wear favourites made for all the moments of childhood.",
  },
  {
    title: "For Every Wiggle, Giggle And Hug, A Little Comfort And A Lot Of Love",
    image: "/assets/temp/banner6.webp",
    mobileImage: "/assets/temp/banner6-mobile.webp",
    headline: [
      { text: "For Every Wiggle, Giggle And Hug,\nA Little " },
      { text: "Comfort", accent: true }, { text: " And A Lot Of " },
      { text: "Love", accent: true },
    ],
    description: "From slow mornings to busy playdays, explore easy-to-wear favourites made for all the moments of childhood.",
  },
];

export type SuperFlowBannerProps = {
  slides?: BannerSlide[];
  autoPlay?: boolean;
  interval?: number;
  /** Optional fixed-height override; responsive minimum heights still apply. */
  height?: string;
  className?: string;
  label?: string;
};

/** Original, dependency-free interpretation of the Super Flow visual effect. */
export default function SuperFlowBanner({
  slides = DEFAULT_BANNER_SLIDES,
  autoPlay = true,
  interval = 6000,
  height,
  className = "",
  label = "Baha Kids collections",
}: SuperFlowBannerProps = {}) {
  const [index, setIndex] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(true);
  const locked = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const active = slides.length ? index % slides.length : 0;

  const [mounted, setMounted] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileMedia = window.matchMedia("(max-width: 639px)");
    const syncMotion = () => setReduced(media.matches);
    const syncMobile = () => setIsMobile(mobileMedia.matches);
    const syncVisibility = () => setVisible(!document.hidden);
    syncMotion(); syncMobile(); syncVisibility();
    media.addEventListener("change", syncMotion);
    mobileMedia.addEventListener("change", syncMobile);
    document.addEventListener("visibilitychange", syncVisibility);
    return () => {
      media.removeEventListener("change", syncMotion);
      mobileMedia.removeEventListener("change", syncMobile);
      document.removeEventListener("visibilitychange", syncVisibility);
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const go = useCallback((target: number) => {
    if (slides.length < 2 || locked.current) return;
    const next = (target + slides.length) % slides.length;
    if (next === active) return;
    setDirection(target > active ? 1 : -1);
    setPrevious(active);
    setIndex(next);
    locked.current = true;
    timer.current = setTimeout(() => { setPrevious(null); locked.current = false; }, reduced ? 0 : 1800);
  }, [active, slides.length, reduced]);

  useEffect(() => {
    if (!autoPlay || paused || reduced || !visible || slides.length < 2) return;
    const id = setInterval(() => go(active + 1), Math.max(interval, 3000));
    return () => clearInterval(id);
  }, [active, autoPlay, interval, paused, reduced, visible, slides.length, go]);

  if (!slides.length) return null;
  const layers = previous !== null && slides[previous] ? [previous, active] : [active];
  return (
    <section className={`relative isolate w-full md:aspect-[20/9] max-md:aspect-[1086/1448] overflow-hidden bg-[#172125] text-white font-secondary touch-pan-y focus-visible:outline-[3px] focus-visible:outline-white focus-visible:outline-offset-[-5px] motion-reduce:[&_*]:animate-none motion-reduce:[&_*]:transition-none ${className}`} style={{ height, "--direction": direction } as CSSProperties}
      aria-label={label} aria-roledescription="carousel" tabIndex={0}
      onKeyDown={e => {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
          e.preventDefault(); go(active + (e.key === "ArrowRight" ? 1 : -1));
        }
      }}
      onPointerDown={e => { pointer.current = { x: e.clientX, y: e.clientY }; }}
      onPointerCancel={() => { pointer.current = null; }}
      onPointerUp={e => {
        if (pointer.current) {
          const dx = e.clientX - pointer.current.x, dy = e.clientY - pointer.current.y;
          if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(active + (dx < 0 ? 1 : -1));
        }
        pointer.current = null;
      }}>
      {layers.map((slideIndex, layer) => {
        const slide = slides[slideIndex];
        const entering = previous !== null && layer === 1;
        const desktopImg = slide.image;
        const mobileImg = slide.mobileImage || slide.image;

        return (
          <div
            key={`${slideIndex}-${layer}`}
            className={`absolute inset-0 overflow-hidden ${
              entering
                ? "animate-[bahaFlow-reveal_1.6s_cubic-bezier(.45,0,.15,1)_both] z-1"
                : "z-0"
            }`}
            aria-hidden={slideIndex !== active}
            inert={slideIndex !== active}
            role="group"
            aria-roledescription="slide"
            aria-label={`${slideIndex + 1} of ${slides.length}: ${slide.title}`}
          >
            {/* Mobile Banner: Rendered below 768px (md:) via CSS media queries */}
            <div
              className={`block md:hidden absolute inset-0 bg-contain bg-top bg-no-repeat ${
                entering
                  ? "animate-[bahaFlow-mobileImageIn_1.8s_cubic-bezier(.2,.65,.2,1)_both]"
                  : ""
              }`}
              style={{
                backgroundImage: `url(${JSON.stringify(mobileImg)})`,
              }}
            />

            {/* Desktop Banner: Rendered on 768px (md:) and above */}
            <div
              className={`hidden md:block absolute inset-0 bg-cover bg-no-repeat md:[transform:scale(1.06)] ${
                entering
                  ? "animate-[bahaFlow-imageIn_1.8s_cubic-bezier(.2,.65,.2,1)_both]"
                  : ""
              }`}
              style={{
                backgroundImage: `url(${JSON.stringify(desktopImg)})`,
                backgroundPosition: slide.imagePosition || "center",
              }}
            />

            {/* Shard Fragment Animation (Desktop only) */}
            {entering &&
              !reduced &&
              [0, 1, 2, 3, 4, 5].map((fragment) => (
                <div
                  aria-hidden="true"
                  data-transition-fragment
                  key={fragment}
                  className="hidden md:block absolute inset-0 bg-cover bg-no-repeat md:[transform:scale(1.085)] [clip-path:polygon(calc(var(--fragment)*20%_-_12%)_0,calc(var(--fragment)*20%_-_11.8%)_0,calc(var(--fragment)*20%_+_8.2%)_100%,calc(var(--fragment)*20%_+_8%)_100%)] pointer-events-none animate-[bahaFlow-shardIn_1.6s_cubic-bezier(.2,.65,.2,1)_both] [animation-delay:calc(var(--fragment)*20ms)]"
                  style={
                    {
                      "--fragment": fragment,
                      backgroundImage: `url(${JSON.stringify(desktopImg)})`,
                      backgroundPosition: slide.imagePosition || "center",
                    } as CSSProperties
                  }
                />
              ))}

            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#fffdf566_0%,#fffdf51a_45%,transparent_70%)] md:block hidden" />
            <div
              className={`hidden md:flex flex-col items-center absolute top-[44%] md:top-[45%] lg:top-[46%] left-1/2 w-[92%] max-w-[1000px] [transform:translate(-50%,-50%)] text-center will-change-[transform,opacity] md:w-[84%] lg:w-[80%] ${
                slideIndex !== active
                  ? "animate-[bahaFlow-titleOut_.35s_ease-out_both]"
                  : "animate-[bahaFlow-titleIn_1.1s_.65s_cubic-bezier(.16,1,.3,1)_both]"
              }`}
            >
              <h2 className="m-0 whitespace-pre-line font-primary text-[clamp(1.75rem,3.4vw,3.75rem)] leading-[1.15] font-medium text-brand-primary text-balance">
                {slide.headline
                  ? slide.headline.map((part, partIndex) => (
                      <span
                        key={partIndex}
                        className={
                          part.accent ? "text-brand-accent" : undefined
                        }
                      >
                        {part.text}
                      </span>
                    ))
                  : slide.title}
              </h2>
              {slide.description && (
                <p className="mx-auto mt-3 max-w-[560px] font-secondary text-xs sm:text-sm lg:text-base leading-relaxed text-[#151515]">
                  {slide.description}
                </p>
              )}
              <a
                href={slide.ctaHref || "/products"}
                className="group mt-5 sm:mt-6 lg:mt-7 inline-flex min-h-10 sm:min-h-11 lg:min-h-12 items-center gap-3 lg:gap-3.5 rounded-full bg-brand-primary border-2 border-brand-primary py-1 pr-1 pl-5 sm:py-1.5 sm:pr-1.5 sm:pl-6 lg:py-1.5 lg:pr-1.5 lg:pl-7 font-secondary text-xs sm:text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-accent hover:border-brand-accent hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary"
              >
                {slide.ctaText || "Shop Now"}
                <span
                  aria-hidden="true"
                  className="grid h-7 w-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9 place-items-center rounded-full bg-white text-brand-primary transition-transform duration-300 group-hover:rotate-45 shrink-0"
                >
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 17L17 7M17 7H9M17 7V15"
                    />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        );
      })}
      {slides.length > 1 && (
        <div className="absolute z-[3] bottom-[max(36px,calc(env(safe-area-inset-bottom)+20px))] left-1/2 -translate-x-1/2 flex max-w-[95%] items-center gap-2">
          <div className="flex max-w-full overflow-x-auto rounded-full bg-[#ffffff30] px-2.5 backdrop-blur-[16px]" aria-label="Choose a slide">
            {slides.map((slide, n) => (
              <button
                key={n}
                type="button"
                className="group grid h-11 w-6 shrink-0 cursor-pointer place-items-center border-0 bg-transparent p-0 text-white focus-visible:rounded-full focus-visible:outline-2 focus-visible:outline-white focus-visible:-outline-offset-3"
                aria-label={`Go to slide ${n + 1}: ${slide.title}`}
                aria-current={n === active ? "true" : undefined}
                onClick={() => go(n)}
              >
                <span className="h-2.5 w-2.5 rounded-full bg-[#ffffff35] transition-[background-color,transform] duration-200 group-aria-current:bg-white group-hover:scale-120 group-hover:bg-[#ffffffaa]" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Decorative Scallop Wave at the bottom edge */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 w-full overflow-hidden leading-none text-white"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 48"
          preserveAspectRatio="none"
          className="relative block w-full h-7 sm:h-9 md:h-12 text-white fill-current"
        >
          <path d="M0,28 C45,6 75,6 120,28 C165,50 195,50 240,28 C285,6 315,6 360,28 C405,50 435,50 480,28 C525,6 555,6 600,28 C645,50 675,50 720,28 C765,6 795,6 840,28 C885,50 915,50 960,28 C1005,6 1035,6 1080,28 C1125,50 1155,50 1200,28 C1245,6 1275,6 1320,28 C1365,50 1395,50 1440,28 L1440,48 L0,48 Z" />
        </svg>
      </div>
    </section>
  );
}
