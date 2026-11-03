"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export interface ProductItem {
  id: string | number;
  category: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: string;
  image: string;
  hoverImage?: string;
  video?: string;
  link: string;
}

// Backward-compatibility alias
export type SummerProduct = ProductItem;

export interface CollectionSectionProps {
  title?: string;
  highlightTitle?: string;
  products?: ProductItem[];
  showDecorations?: boolean;
}

const DEFAULT_PRODUCTS: ProductItem[] = [
  {
    id: 1,
    category: "Co-ord Sets",
    name: "2-Piece Cotton Ribbed Co-ord Set",
    price: 249,
    originalPrice: 499,
    discount: "50% OFF",
    video: "/assets/temp/pr1.mp4",
    image: "/assets/temp/pr1.webp",
    hoverImage: "/assets/temp/pr2.webp",
    link: "/products",
  },
  {
    id: 2,
    category: "Co-ord Sets",
    name: "Waffle Knit Top & Shorts Set",
    price: 249,
    originalPrice: 499,
    discount: "50% OFF",
    image: "/assets/temp/pr2.webp",
    hoverImage: "/assets/temp/pr3.webp",
    link: "/products",
  },
  {
    id: 3,
    category: "Co-ord Sets",
    name: "Breezy Linen Blend Play Set",
    price: 249,
    originalPrice: 499,
    discount: "50% OFF",
    image: "/assets/temp/pr3.webp",
    hoverImage: "/assets/temp/pr4.webp",
    link: "/products",
  },
  {
    id: 4,
    category: "Co-ord Sets",
    name: "Pastel Stripe Lounge Set",
    price: 249,
    originalPrice: 499,
    discount: "50% OFF",
    image: "/assets/temp/pr4.webp",
    hoverImage: "/assets/temp/pr5.webp",
    link: "/products",
  },
  {
    id: 5,
    category: "Co-ord Sets",
    name: "Cozy Fleece Tracksuit Co-ord",
    price: 249,
    originalPrice: 499,
    discount: "50% OFF",
    image: "/assets/temp/pr5.webp",
    hoverImage: "/assets/temp/pr1.webp",
    link: "/products",
  },
  {
    id: 6,
    category: "Co-ord Sets",
    name: "Floral Print Tiered Peplum Set",
    price: 249,
    originalPrice: 499,
    discount: "50% OFF",
    image: "/assets/temp/pr6.webp",
    hoverImage: "/assets/temp/pr2.webp",
    link: "/products",
  },
  {
    id: 7,
    category: "Co-ord Sets",
    name: "Sun-Dappled Safari Co-ord Set",
    price: 249,
    originalPrice: 499,
    discount: "50% OFF",
    image: "/assets/temp/pr7.webp",
    hoverImage: "/assets/temp/pr3.webp",
    link: "/products",
  },
  {
    id: 8,
    category: "Co-ord Sets",
    name: "Playful Pocket Tee & Short Set",
    price: 249,
    originalPrice: 499,
    discount: "50% OFF",
    image: "/assets/temp/pr8.webp",
    hoverImage: "/assets/temp/pr4.webp",
    link: "/products",
  },
  {
    id: 9,
    category: "Co-ord Sets",
    name: "Everyday Active Summer Co-ord",
    price: 249,
    originalPrice: 499,
    discount: "50% OFF",
    image: "/assets/temp/pr9.webp",
    hoverImage: "/assets/temp/pr5.webp",
    link: "/products",
  },
  {
    id: 10,
    category: "Co-ord Sets",
    name: "Cloud-Soft Organic Cord Set",
    price: 249,
    originalPrice: 499,
    discount: "50% OFF",
    image: "/assets/temp/pr10.webp",
    hoverImage: "/assets/temp/pr2.webp",
    link: "/products",
  },
  {
    id: 11,
    category: "Co-ord Sets",
    name: "Weekend Picnic Romper & Tee Set",
    price: 249,
    originalPrice: 499,
    discount: "50% OFF",
    image: "/assets/temp/pr11.webp",
    hoverImage: "/assets/temp/pr3.webp",
    link: "/products",
  },
  {
    id: 12,
    category: "Co-ord Sets",
    name: "Classic Striped Cotton Co-ord",
    price: 249,
    originalPrice: 499,
    discount: "50% OFF",
    image: "/assets/temp/pr12.webp",
    hoverImage: "/assets/temp/pr4.webp",
    link: "/products",
  },
];

function ProductCardMedia({ item }: { item: ProductItem }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div
      className="relative aspect-square w-full bg-[#f8f6f0] overflow-hidden block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Primary Image: Lightweight WebP loaded by default (saves 95%+ CDN bandwidth) */}
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        onError={(e) => {
          const target = e.target as HTMLElement;
          target.style.display = "none";
          if (target.nextElementSibling) {
            (target.nextElementSibling as HTMLElement).style.display = "flex";
          }
        }}
      />

      {/* Video on Hover (zero data fetched until user hovers) */}
      {item.video ? (
        <video
          ref={videoRef}
          src={item.video}
          loop
          muted
          playsInline
          preload="none"
          poster={item.image}
          className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:scale-105"
        />
      ) : item.hoverImage ? (
        /* Alternate View on Hover for image-only products */
        <img
          src={item.hoverImage}
          alt={`${item.name} alternate view`}
          className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 pointer-events-none"
        />
      ) : null}

      {/* Clean Placeholder Background while images are being placed */}
      <div className="hidden absolute inset-0 items-center justify-center bg-brand-primary/5 text-brand-primary/40 font-primary text-xs p-2 text-center">
        {item.category}
      </div>
    </div>
  );
}

export default function CollectionSection({
  title = "Cord Sets",
  highlightTitle = "Collections",
  products = DEFAULT_PRODUCTS,
  showDecorations = true,
}: CollectionSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const displayTitle = title;
  const displayHighlight = highlightTitle;

  useGSAP(
    () => {
      // Gentle entrance for headline
      gsap.fromTo(
        ".collection-header",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Stagger in cards smoothly
      gsap.fromTo(
        ".collection-product-card",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.06,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-gradient-to-b from-[#FAF8E8] via-[#FAF8E8] to-white min-h-[580px] sm:min-h-[640px] flex flex-col justify-between overflow-hidden pb-8 sm:pb-12"
    >
      {/* Top Wave: Prominent white scalloped crests matching the banner */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-20 w-full overflow-hidden leading-none text-white"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 48"
          preserveAspectRatio="none"
          className="relative block w-full h-8 sm:h-11 md:h-14 fill-current"
        >
          <path d="M0,0 L1440,0 L1440,24 C1395,44 1365,44 1320,24 C1275,4 1245,4 1200,24 C1155,44 1125,44 1080,24 C1035,4 1005,4 960,24 C915,44 885,44 840,24 C795,4 765,4 720,24 C675,44 645,44 600,24 C555,4 525,4 480,24 C435,44 405,44 360,24 C315,4 285,4 240,24 C195,44 165,44 120,24 C75,4 45,4 0,24 Z" />
        </svg>
      </div>

      {/* Decorative Branding Illustrations */}
      {showDecorations && (
        <div
          className="pointer-events-none absolute top-2 sm:top-4 lg:top-6 z-0 w-48 sm:w-64 md:w-80 lg:w-[380px] h-72 sm:h-96 md:h-[440px] lg:h-[500px] select-none transition-transform duration-300"
          aria-hidden="true"
        >
          <Image
            src="/assets/icecream.webp"
            alt="Playful Branding Decoration"
            fill
            sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, 380px"
            priority
            className="object-contain object-left-top"
          />
        </div>
      )}

      {/* Main Container */}
      <div className="relative w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 pt-10 sm:pt-14 md:pt-16 flex-1 flex flex-col z-10">
        {/* Dynamic Admin-Controllable Headline */}
        <div className="collection-header mb-8 sm:mb-12 flex flex-col items-center justify-center text-center font-primary opacity-0">
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-brand-primary leading-tight">
            {displayTitle}
          </h2>
          {displayHighlight && (
            <span className="text-4xl sm:text-5xl md:text-6xl text-brand-accent leading-none -mt-1 sm:-mt-2">
              {displayHighlight}
            </span>
          )}
        </div>

        {/* 5-Column Grid of Product Cards: 2 on mobile, 3 on sm, 4 on md, 5 on lg */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
          {products.map((item, index) => {
            const visibilityClass = index >= 10 ? "lg:hidden" : "";

            return (
              <div
                key={item.id}
                className={`collection-product-card group relative flex flex-col bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-xs hover:shadow-md border border-black/5 transition-all duration-300 hover:-translate-y-1 opacity-0 ${visibilityClass}`}
              >
                {/* Product Photo: Locked to 1:1 Aspect Ratio on ALL screens */}
                <Link href={item.link} className="block">
                  <ProductCardMedia item={item} />
                </Link>

                {/* Product Details Section */}
                <div className="p-2.5 sm:p-3 flex flex-col flex-1 justify-between gap-1.5 bg-white">
                  <div>
                    {/* Category Tag */}
                    <span className="text-[10px] sm:text-[11px] font-medium text-brand-accent italic tracking-wide block">
                      {item.category}
                    </span>

                    {/* Product Title in Brand Font */}
                    <Link
                      href={item.link}
                      className="font-primary text-xs sm:text-[13px] text-text-black line-clamp-2 leading-snug hover:text-brand-primary transition-colors mt-0.5 block"
                    >
                      {item.name}
                    </Link>
                  </div>

                  {/* Pricing & Add to Cart Action */}
                  <div className="flex items-center justify-between gap-1 pt-1.5 mt-auto">
                    <div className="flex items-baseline gap-1.5 flex-wrap">
                      <span className="font-secondary font-bold text-xs sm:text-sm text-black">
                        ₹{item.price}
                      </span>
                      <span className="font-secondary text-[10px] sm:text-xs text-black/40 line-through">
                        ₹{item.originalPrice}
                      </span>
                      <span className="font-secondary text-[9px] sm:text-[11px] font-bold text-green-600">
                        {item.discount}
                      </span>
                    </div>

                    {/* Circular Orange Cart Button */}
                    <button
                      type="button"
                      aria-label="Add to cart"
                      className="p-1.5 rounded-full bg-brand-accent text-white hover:bg-brand-primary transition-colors cursor-pointer shrink-0 shadow-xs active:scale-95"
                    >
                      <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2]" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Right Paint Handprint (behind the cards) */}
      {showDecorations && (
        <div
          className="pointer-events-none absolute right-0 -bottom-0 sm:-bottom-10 lg:-bottom-12 z-0 w-44 sm:w-56 md:w-68 lg:w-80 aspect-square select-none opacity-90 transition-transform duration-300"
          aria-hidden="true"
        >
          <Image
            src="/assets/handprint.webp"
            alt="Playful Branding Handprint"
            fill
            sizes="(max-width: 640px) 176px, (max-width: 768px) 224px, 320px"
            className="object-contain object-right-bottom"
            onError={(e) => {
              (e.target as HTMLElement).style.display = "none";
            }}
          />
        </div>
      )}
    </section>
  );
}

