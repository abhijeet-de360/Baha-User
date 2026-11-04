"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/data/products";

interface RelatedProductsProps {
  products: Product[];
}

function ProductCardItem({ product }: { product: Product }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 select-none"
    >
      {/* Visual Canvas (Image & Video Hover) */}
      <Link
        href={`/products/${product.id}`}
        className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#FAF8E8]/70 block transition-transform duration-300 group-hover:scale-[1.02] shadow-xs group-hover:shadow-md"
      >
        {/* Main Base Image */}
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover object-center transition-all duration-500 group-hover:opacity-0"
        />

        {/* Hover Alternate Image */}
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt={`${product.name} Alternate`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-cover object-center transition-opacity duration-500 absolute inset-0 ${
              product.video ? "opacity-0" : "opacity-0 group-hover:opacity-100"
            }`}
          />
        )}

        {/* Hover Video Preview if present */}
        {product.video && (
          <video
            ref={videoRef}
            src={product.video}
            loop
            muted
            playsInline
            preload="none"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          />
        )}

        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-[#DC5513] text-white text-[10px] font-bold shadow-xs">
            {product.discount}
          </div>
        )}
      </Link>

      {/* Info Body */}
      <div className="pt-2.5 pb-1 flex flex-col">
        <span className="text-[10px] uppercase font-bold text-[#DC5513] tracking-wide">
          {product.category}
        </span>

        <Link
          href={`/products/${product.id}`}
          className="font-secondary text-xs sm:text-[13px] font-semibold text-neutral-800 line-clamp-1 hover:text-[#0D03AE] transition-colors mt-0.5"
        >
          {product.name}
        </Link>

        {/* Price Row */}
        <div className="flex items-center justify-between mt-1.5">
          <div className="flex items-center gap-1.5 font-secondary">
            <span className="font-extrabold text-xs sm:text-sm text-neutral-900">
              ₹{product.price}
            </span>
            <span className="text-[10px] text-neutral-400 line-through">
              ₹{product.originalPrice}
            </span>
          </div>

          <Link
            href={`/products/${product.id}`}
            aria-label={`View ${product.name}`}
            className="w-7 h-7 rounded-full bg-[#DC5513] hover:bg-[#c2460c] text-white flex items-center justify-center transition-all shadow-xs hover:scale-105 active:scale-95"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="w-full my-12 sm:my-16 font-secondary">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs uppercase tracking-wider font-bold text-[#DC5513]">
            More Cuddly Favourites
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mt-1">
            <span className="font-['Didot',_'Playfair_Display',_'Times_New_Roman',_Georgia,_serif] italic text-[#0D03AE] mr-1.5">
              You May Also
            </span>
            Love
          </h2>
        </div>

        <Link
          href="/products"
          className="text-xs font-semibold text-[#0D03AE] hover:text-[#DC5513] transition-colors underline underline-offset-4"
        >
          View All Products &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 sm:gap-4 md:gap-5">
        {products.map((prod) => (
          <ProductCardItem key={prod.id} product={prod} />
        ))}
      </div>
    </section>
  );
}

