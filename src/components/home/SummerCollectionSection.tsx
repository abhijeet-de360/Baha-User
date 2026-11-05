"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ShoppingCart } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export interface SummerProductItem {
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

const DEFAULT_SUMMER_PRODUCTS: SummerProductItem[] = [
  {
    id: 1,
    category: "Little Girl",
    name: "Nap-Bottom One-Piece Worn Alone",
    price: 249,
    originalPrice: 499,
    discount: "50% OFF",
    image: "/assets/temp/pr1.webp",
    hoverImage: "/assets/temp/pr2.webp",
    video: "/assets/temp/pr1.mp4",
    link: "/products",
  },
  {
    id: 2,
    category: "Little Girl",
    name: "Nap-Bottom One-Piece Worn Alone",
    price: 249,
    originalPrice: 499,
    discount: "50% OFF",
    image: "/assets/temp/pr2.webp",
    hoverImage: "/assets/temp/pr3.webp",
    link: "/products",
  },
  {
    id: 3,
    category: "Little Girl",
    name: "Nap-Bottom One-Piece Worn Alone",
    price: 249,
    originalPrice: 499,
    discount: "50% OFF",
    image: "/assets/temp/pr3.webp",
    hoverImage: "/assets/temp/pr1.webp",
    link: "/products",
  },
  {
    id: 4,
    category: "Little Girl",
    name: "Nap-Bottom One-Piece Worn Alone",
    price: 249,
    originalPrice: 499,
    discount: "50% OFF",
    image: "/assets/temp/pr4.webp",
    hoverImage: "/assets/temp/pr6.webp",
    link: "/products",
  },
  {
    id: 5,
    category: "Little Girl",
    name: "Nap-Bottom One-Piece Worn Alone",
    price: 249,
    originalPrice: 499,
    discount: "50% OFF",
    image: "/assets/temp/pr5.webp",
    hoverImage: "/assets/temp/pr7.webp",
    link: "/products",
  },
  {
    id: 6,
    category: "Little Girl",
    name: "Nap-Bottom One-Piece Worn Alone",
    price: 249,
    originalPrice: 499,
    discount: "50% OFF",
    image: "/assets/temp/pr6.webp",
    hoverImage: "/assets/temp/pr11.webp",
    link: "/products",
  },
  {
    id: 7,
    category: "Little Girl",
    name: "Nap-Bottom One-Piece Worn Alone",
    price: 249,
    originalPrice: 499,
    discount: "50% OFF",
    image: "/assets/temp/pr7.webp",
    hoverImage: "/assets/temp/pr5.webp",
    link: "/products",
  },
  {
    id: 8,
    category: "Little Girl",
    name: "Nap-Bottom One-Piece Worn Alone",
    price: 249,
    originalPrice: 499,
    discount: "50% OFF",
    image: "/assets/temp/pr8.webp",
    hoverImage: "/assets/temp/pr4.webp",
    link: "/products",
  },
  {
    id: 9,
    category: "Little Boy",
    name: "Nap-Bottom One-Piece Worn Alone",
    price: 249,
    originalPrice: 499,
    discount: "50% OFF",
    image: "/assets/temp/pr9.webp",
    hoverImage: "/assets/temp/pr10.webp",
    link: "/products",
  },
  {
    id: 10,
    category: "Little Boy",
    name: "Nap-Bottom One-Piece Worn Alone",
    price: 249,
    originalPrice: 499,
    discount: "50% OFF",
    image: "/assets/temp/pr10.webp",
    hoverImage: "/assets/temp/pr12.webp",
    link: "/products",
  },
  {
    id: 11,
    category: "Little Girl",
    name: "Nap-Bottom One-Piece Worn Alone",
    price: 249,
    originalPrice: 499,
    discount: "50% OFF",
    image: "/assets/temp/pr11.webp",
    hoverImage: "/assets/temp/pr6.webp",
    link: "/products",
  },
  {
    id: 12,
    category: "Little Boy",
    name: "Nap-Bottom One-Piece Worn Alone",
    price: 249,
    originalPrice: 499,
    discount: "50% OFF",
    image: "/assets/temp/pr12.webp",
    hoverImage: "/assets/temp/pr9.webp",
    link: "/products",
  },
];

function SummerProductCard({
  item,
  className = "",
}: {
  item: SummerProductItem;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const productHref = item.link && item.link !== "/products" ? item.link : `/products/${item.id}`;

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
      className={`summer-product-card group relative flex flex-col transition-all duration-300 hover:-translate-y-1 opacity-0 ${className}`}
    >
      {/* Product Image Container */}
      <Link
        href={productHref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative aspect-square w-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#f8f6f0] block transition-transform duration-300 group-hover:scale-[1.02] shadow-xs group-hover:shadow-md"
      >
        {/* Primary Image: Lightweight WebP loaded by default */}
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Video on Hover if available, else alternate image on hover */}
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
          <Image
            src={item.hoverImage}
            alt={`${item.name} alternate view`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
            className="object-cover object-center opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none group-hover:scale-105"
          />
        ) : null}
      </Link>

      {/* Product Information */}
      <div className="flex flex-col mt-2.5 px-0.5">
        <span className="font-jost text-[11px] sm:text-xs text-[#DE5416] font-medium leading-none">
          {item.category}
        </span>

        <Link href={productHref}>
          <h3 className="font-jost text-xs sm:text-sm text-black font-medium mt-1 leading-snug line-clamp-2">
            {item.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between mt-1.5">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="font-bold text-xs sm:text-sm text-black">
              ₹{item.price}
            </span>
            <span className="line-through text-[10px] sm:text-xs text-neutral-400 font-normal">
              ₹{item.originalPrice}
            </span>
            <span className="text-emerald-600 font-bold text-[9px] sm:text-[10px] tracking-tight">
              {item.discount}
            </span>
          </div>

          <button
            type="button"
            aria-label={`Add ${item.name} to cart`}
            className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#DE5416] text-white flex items-center justify-center hover:bg-[#c44710] hover:scale-110 active:scale-95 transition-all shadow-xs cursor-pointer shrink-0 ml-1"
          >
            <ShoppingCart className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.2]" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SummerCollectionSection({
  products = DEFAULT_SUMMER_PRODUCTS,
}: {
  products?: SummerProductItem[];
}) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Header Animation
      gsap.fromTo(
        ".summer-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Stagger Cards In
      gsap.fromTo(
        ".summer-product-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.05,
          delay: 0.15,
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
      className="relative w-full bg-white py-10 sm:py-14 md:py-16 overflow-hidden"
    >
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header: Title on Left, Show More Button on Right */}
        <div className="summer-header flex items-center justify-between mb-6 sm:mb-8 md:mb-10 opacity-0">
          <div className="flex flex-col">
            <h2 className="font-['Didot',_'Playfair_Display',_'Times_New_Roman',_Georgia,_serif] italic font-semibold text-2xl sm:text-3xl md:text-4xl text-[#0D03AE] leading-tight tracking-tight">
              Summer
            </h2>
            <span className="font-primary text-3xl sm:text-4xl md:text-5xl lg:text-[52px] text-[#DC5513] font-normal leading-none -mt-1 sm:-mt-1.5">
              Collection&apos;s
            </span>
          </div>

          <Link
            href="/products?collection=summer"
            className="group flex items-center gap-2 sm:gap-2.5 pl-3.5 sm:pl-4 pr-1 sm:pr-1.5 py-1 sm:py-1.5 rounded-full border border-[#0D03AE] text-[#0D03AE] hover:bg-[#0D03AE] hover:text-white transition-all duration-300"
          >
            <span className="font-secondary font-medium text-xs sm:text-sm">
              Show More
            </span>
            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#0D03AE] group-hover:bg-white text-white group-hover:text-[#0D03AE] flex items-center justify-center transition-colors duration-300">
              <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5]" />
            </span>
          </Link>
        </div>

        {/* 5-Column Grid: 2 on mobile, 3 on sm, 4 on md, max 5 on lg */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 sm:gap-x-5 lg:gap-x-6 gap-y-7 sm:gap-y-9 md:gap-y-10">
          {products.map((item, index) => {
            const visibilityClass = index >= 10 ? "lg:hidden" : "";
            return (
              <SummerProductCard
                key={item.id}
                item={item}
                className={visibilityClass}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

