"use client";

import React, { useState, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Filter,
  SlidersHorizontal,
  ChevronDown,
  ShoppingCart,
  Sparkles,
  Check,
  X,
  Search,
} from "lucide-react";
import { PRODUCTS, Product } from "@/data/products";

function CatalogProductCard({ product }: { product: Product }) {
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
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 select-none border border-black/5 shadow-2xs hover:shadow-md"
    >
      {/* Visual Canvas (Image & Video Hover) */}
      <Link
        href={`/products/${product.id}`}
        className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#FAF8E8]/70 block transition-transform duration-300 group-hover:scale-[1.01]"
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

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
          {product.discount && (
            <span className="px-2 py-0.5 rounded-full bg-[#DC5513] text-white text-[10px] font-bold shadow-xs">
              {product.discount}
            </span>
          )}
          {product.badge && (
            <span className="px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-[#0D03AE] text-[9px] font-bold shadow-2xs">
              {product.badge}
            </span>
          )}
        </div>
      </Link>

      {/* Info Body */}
      <div className="p-3.5 flex flex-col">
        <div className="flex items-center justify-between gap-1">
          <span className="text-[10px] uppercase font-bold text-[#DC5513] tracking-wide">
            {product.category}
          </span>
          <span className="text-[10px] text-neutral-400">
            ★ {product.rating}
          </span>
        </div>

        <Link
          href={`/products/${product.id}`}
          className="font-secondary text-xs sm:text-[13px] font-semibold text-neutral-900 line-clamp-1 hover:text-[#0D03AE] transition-colors mt-0.5"
        >
          {product.name}
        </Link>

        {/* Price Row */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-black/5">
          <div className="flex items-center gap-1.5 font-secondary">
            <span className="font-extrabold text-xs sm:text-sm text-neutral-950">
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

export default function ProductsPage() {
  const [selectedGender, setSelectedGender] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedSize, setSelectedSize] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("featured");

  const categories = ["All", "Little Girl", "Little Boy", "Unisex Wear"];
  const genders = ["All", "Girls", "Boys", "Unisex"];
  const sizes = ["All", "0-3M", "3-6M", "6-12M", "12-18M", "18-24M", "2-3Y", "3-4Y"];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (selectedGender !== "All" && p.gender !== selectedGender) return false;
      if (selectedCategory !== "All" && p.category !== selectedCategory) return false;
      if (
        selectedSize !== "All" &&
        !p.sizes.some((s) => s.label === selectedSize && s.inStock)
      ) {
        return false;
      }
      if (
        searchQuery &&
        !p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0; // featured default
    });
  }, [selectedGender, selectedCategory, selectedSize, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedGender("All");
    setSelectedCategory("All");
    setSelectedSize("All");
    setSearchQuery("");
  };

  const hasActiveFilters =
    selectedGender !== "All" ||
    selectedCategory !== "All" ||
    selectedSize !== "All" ||
    searchQuery !== "";

  return (
    <div className="w-full min-h-screen bg-white font-secondary">
      {/* Top Banner Stage with Floating Offset */}
      <section className="relative w-full bg-gradient-to-b from-[#FAF8E8] via-[#FFF8E0] to-white pt-28 sm:pt-32 md:pt-36 pb-10 sm:pb-14 border-b border-black/5">
        <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-neutral-400 mb-4">
            <Link href="/" className="hover:text-[#0D03AE] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-neutral-800 font-medium">Shop All Products</span>
          </nav>

          {/* Headline */}
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#DC5513] mb-2">
            <Sparkles className="w-4 h-4" />
            Pure Organic Comfort
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-neutral-900 leading-tight">
            <span className="font-['Didot',_'Playfair_Display',_'Times_New_Roman',_Georgia,_serif] italic text-[#0D03AE] mr-2">
              Explore Our
            </span>
            <span className="font-primary text-4xl sm:text-5xl md:text-6xl text-[#DC5513] font-normal">
              Collections
            </span>
          </h1>

          <p className="mt-2.5 max-w-xl text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Feather-soft, breathable essentials tailored for sensitive little skin. From cozy playwear to naptime favorites.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Controls Bar: Filters & Sort */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-black/5">
          {/* Gender Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {genders.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setSelectedGender(g)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedGender === g
                    ? "bg-[#0D03AE] text-white shadow-xs"
                    : "bg-[#FFF8E0] text-[#793A20] hover:bg-[#FED174]/40"
                }`}
              >
                {g === "All" ? "All Genders" : g}
              </button>
            ))}
          </div>

          {/* Right Controls: Sort & Product Count */}
          <div className="flex items-center justify-between md:justify-end gap-3 text-xs">
            <span className="text-neutral-500 font-medium">
              Showing <strong>{filteredProducts.length}</strong> styles
            </span>

            <div className="flex items-center gap-2">
              <span className="text-neutral-500 hidden sm:inline">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-neutral-200 rounded-xl px-3 py-2 text-xs font-semibold text-neutral-800 cursor-pointer focus:outline-none focus:border-[#0D03AE]"
              >
                <option value="featured">Featured Favourites</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Secondary Filter Row: Category & Sizes */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 bg-[#FAF8E8]/60 p-4 rounded-2xl border border-[#FED174]/30">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-[#793A20] mr-1">
              Category:
            </span>
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setSelectedCategory(c)}
                className={`px-3 py-1 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  selectedCategory === c
                    ? "bg-[#DC5513] text-white font-semibold"
                    : "bg-white text-neutral-700 hover:bg-neutral-100 border border-black/5"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Size Filter */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold text-[#793A20] mr-1">Size:</span>
            {sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSelectedSize(s)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  selectedSize === s
                    ? "bg-[#0D03AE] text-white font-semibold"
                    : "bg-white text-neutral-700 hover:bg-neutral-100 border border-black/5"
                }`}
              >
                {s}
              </button>
            ))}

            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="ml-2 flex items-center gap-1 text-xs text-[#DC5513] font-semibold hover:underline cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="w-full py-20 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#FFF8E0] text-[#DC5513] flex items-center justify-center mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-neutral-800 mb-1">
              No matching cuddly styles found
            </h3>
            <p className="text-xs text-neutral-500 max-w-sm mb-4">
              Try adjusting your gender, category, or size filters to find the right fit.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="px-5 py-2.5 rounded-full bg-[#0D03AE] text-white text-xs font-semibold cursor-pointer hover:bg-[#0a028a] transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-4 md:gap-5">
            {filteredProducts.map((prod) => (
              <CatalogProductCard key={prod.id} product={prod} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
