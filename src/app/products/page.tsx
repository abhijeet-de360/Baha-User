"use client";

import React, { useState, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  SlidersHorizontal,
  X,
  Search,
  Check,
  ChevronDown,
  ShoppingBag,
} from "lucide-react";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { PRODUCTS, Product } from "@/data/products";

function CatalogProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
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
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover object-center transition-all duration-500 group-hover:opacity-0"
        />

        {/* Video or Secondary Image on Hover */}
        {product.video ? (
          <video
            ref={videoRef}
            src={product.video}
            loop
            muted
            playsInline
            preload="none"
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        ) : product.images[1] ? (
          <Image
            src={product.images[1]}
            alt={`${product.name} alternate view`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-center absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        ) : null}

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10">
          {product.badge && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#0D03AE] text-white text-[10px] font-bold tracking-wide uppercase shadow-2xs">
              {product.badge}
            </span>
          )}
          {product.discount && (
            <span className="px-2 py-0.5 rounded-md bg-[#DC5513] text-white text-[10px] font-bold tracking-wide shadow-2xs">
              {product.discount}
            </span>
          )}
        </div>
      </Link>

      {/* Product Details */}
      <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center justify-between gap-1">
            <span className="font-jost text-[11px] sm:text-xs text-[#DC5513] font-medium leading-none">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-neutral-800 bg-amber-50 px-1.5 py-0.5 rounded-full border border-amber-200/60 leading-none">
              <span className="text-amber-500">★</span>
              <span>{product.rating}</span>
            </div>
          </div>
          <Link href={`/products/${product.id}`}>
            <h3 className="font-jost text-sm sm:text-base text-text-black line-clamp-2 leading-snug mt-1 block font-medium">
              {product.name}
            </h3>
          </Link>

          {/* Color preview dots */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2">
              {product.colors.slice(0, 4).map((c) => (
                <span
                  key={c.name}
                  title={c.name}
                  style={{ backgroundColor: c.hex }}
                  className="w-3 h-3 rounded-full border border-black/15 shadow-2xs"
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-[10px] text-neutral-400 font-medium">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Price & Add to Cart */}
        <div className="mt-3 pt-2.5 border-t border-black/5 flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-sm sm:text-base font-bold text-text-black">
              ₹{product.price}
            </span>
            <span className="text-xs text-text-muted line-through">
              ₹{product.originalPrice}
            </span>
          </div>

          <button
            type="button"
            aria-label={`Add ${product.name} to cart`}
            className="p-1.5 sm:p-2 rounded-full bg-[#DC5513] text-white hover:bg-[#0D03AE] transition-colors cursor-pointer shrink-0 shadow-xs active:scale-95"
          >
            <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const [selectedGender, setSelectedGender] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedSize, setSelectedSize] = useState<string>("All");
  const [selectedColor, setSelectedColor] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Accordion Expand/Collapse States (1st section Color open by default, rest closed)
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    color: true,
    gender: false,
    category: false,
    size: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const categories = ["All", ...Array.from(new Set(PRODUCTS.map((p) => p.category)))];
  const genders = ["All", "Girls", "Boys", "Unisex"];
  const sizes = ["All", "0-3M", "3-6M", "6-12M", "12-18M", "18-24M", "2-3Y", "3-4Y"];

  // Distinct colors palette matching your design reference
  const availableColors = useMemo(() => {
    return [
      { name: "Navy", hex: "#0E1A40" },
      { name: "Sky Blue", hex: "#2563EB" },
      { name: "Pink", hex: "#EC4899" },
      { name: "Yellow", hex: "#EAB308" },
      { name: "Green", hex: "#16A34A" },
      { name: "Cream", hex: "#F5F0E6" },
      { name: "Lavender", hex: "#C084FC" },
    ];
  }, []);

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
        selectedColor !== "All" &&
        !p.colors?.some((c) =>
          c.name.toLowerCase().includes(selectedColor.toLowerCase()) ||
          selectedColor.toLowerCase().includes(c.name.toLowerCase())
        )
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
  }, [selectedGender, selectedCategory, selectedSize, selectedColor, sortBy]);

  const resetFilters = () => {
    setSelectedGender("All");
    setSelectedCategory("All");
    setSelectedSize("All");
    setSelectedColor("All");
  };

  const hasActiveFilters =
    selectedGender !== "All" ||
    selectedCategory !== "All" ||
    selectedSize !== "All" ||
    selectedColor !== "All";

// Filter content component for desktop sidebar & mobile drawer
interface FilterContentProps {
  openSections: { [key: string]: boolean };
  toggleSection: (section: string) => void;
  availableColors: { name: string; hex: string }[];
  selectedColor: string;
  setSelectedColor: (c: string) => void;
  genders: string[];
  selectedGender: string;
  setSelectedGender: (g: string) => void;
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
  sizes: string[];
  selectedSize: string;
  setSelectedSize: (s: string) => void;
}

function FilterContent({
  openSections,
  toggleSection,
  availableColors,
  selectedColor,
  setSelectedColor,
  genders,
  selectedGender,
  setSelectedGender,
  categories,
  selectedCategory,
  setSelectedCategory,
  sizes,
  selectedSize,
  setSelectedSize,
}: FilterContentProps) {
  return (
    <div className="space-y-4 text-xs sm:text-sm divide-y divide-[#E7DEC8]">
      {/* 1. Color Filter Accordion */}
      <div className="pt-2">
        <button
          type="button"
          onClick={() => toggleSection("color")}
          className="w-full flex items-center justify-between py-2 text-left cursor-pointer group"
        >
          <span className="font-semibold text-sm text-[#292240] group-hover:text-[#0D03AE] transition-colors">
            Color
          </span>
          <ChevronDown
            className={`w-4 h-4 text-neutral-500 transition-transform duration-200 ${
              openSections.color ? "rotate-180" : ""
            }`}
          />
        </button>

        {openSections.color && (
          <div className="pt-2 pb-3">
            <div className="flex items-center gap-2.5 flex-wrap">
              {availableColors.map((color) => {
                const isSelected = selectedColor === color.name;
                return (
                  <button
                    key={color.name}
                    type="button"
                    title={color.name}
                    onClick={() => setSelectedColor(isSelected ? "All" : color.name)}
                    className={`relative w-7 h-7 rounded-full transition-all cursor-pointer shadow-xs ${
                      isSelected
                        ? "ring-2 ring-offset-2 ring-[#0D03AE] scale-110"
                        : "hover:scale-110"
                    }`}
                    style={{ backgroundColor: color.hex }}
                  >
                    {isSelected && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <Check
                          className={`w-3.5 h-3.5 stroke-[3] ${
                            color.name === "Cream" || color.name === "Yellow"
                              ? "text-neutral-900"
                              : "text-white"
                          }`}
                        />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            {selectedColor !== "All" && (
              <div className="mt-2.5 flex items-center justify-between text-[11px] text-[#786C65]">
                <span>
                  Selected: <strong className="text-neutral-900">{selectedColor}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedColor("All")}
                  className="text-[#DC5513] hover:underline cursor-pointer"
                >
                  Clear
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 2. Shopping For (Gender) Accordion */}
      <div className="pt-4">
        <button
          type="button"
          onClick={() => toggleSection("gender")}
          className="w-full flex items-center justify-between py-2 text-left cursor-pointer group"
        >
          <span className="font-semibold text-sm text-[#292240] group-hover:text-[#0D03AE] transition-colors">
            Shopping For
          </span>
          <ChevronDown
            className={`w-4 h-4 text-neutral-500 transition-transform duration-200 ${
              openSections.gender ? "rotate-180" : ""
            }`}
          />
        </button>

        {openSections.gender && (
          <div className="pt-2 pb-3 flex flex-wrap gap-1.5">
            {genders.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setSelectedGender(g)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                  selectedGender === g
                    ? "border-[#0D03AE] bg-[#0D03AE] text-white shadow-xs"
                    : "border-[#E7DEC8] bg-[#fffcf6] text-[#4A4458] hover:border-[#0D03AE]"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 4. Categories Accordion */}
      <div className="pt-4">
        <button
          type="button"
          onClick={() => toggleSection("category")}
          className="w-full flex items-center justify-between py-2 text-left cursor-pointer group"
        >
          <span className="font-semibold text-sm text-[#292240] group-hover:text-[#0D03AE] transition-colors">
            Categories
          </span>
          <ChevronDown
            className={`w-4 h-4 text-neutral-500 transition-transform duration-200 ${
              openSections.category ? "rotate-180" : ""
            }`}
          />
        </button>

        {openSections.category && (
          <div className="pt-2 pb-3 space-y-1">
            {categories.map((c) => {
              const isSelected = selectedCategory === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setSelectedCategory(c)}
                  className={`w-full text-left px-3 py-1.5 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-[#0D03AE] text-white font-semibold"
                      : "text-[#4A4458] hover:bg-neutral-100"
                  }`}
                >
                  <span>{c}</span>
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. Age & Size Accordion */}
      <div className="pt-4">
        <button
          type="button"
          onClick={() => toggleSection("size")}
          className="w-full flex items-center justify-between py-2 text-left cursor-pointer group"
        >
          <span className="font-semibold text-sm text-[#292240] group-hover:text-[#0D03AE] transition-colors">
            Age &amp; Size
          </span>
          <ChevronDown
            className={`w-4 h-4 text-neutral-500 transition-transform duration-200 ${
              openSections.size ? "rotate-180" : ""
            }`}
          />
        </button>

        {openSections.size && (
          <div className="pt-2 pb-3 grid grid-cols-3 gap-1.5">
            {sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSelectedSize(s)}
                className={`py-1.5 rounded-xl text-xs text-center border font-medium transition-all cursor-pointer ${
                  selectedSize === s
                    ? "border-[#0D03AE] bg-[#0D03AE] text-white shadow-xs"
                    : "border-[#E7DEC8] bg-[#fffcf6] text-[#4A4458] hover:border-[#0D03AE]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

  return (
    <div className="w-full min-h-screen bg-[#fffcf6] font-secondary">
      {/* Main Content Area */}
      <main className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 pt-24 sm:pt-28 md:pt-32 pb-36 sm:pb-28 lg:pb-16">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-neutral-400 mb-6">
          <Link href="/" className="hover:text-[#0D03AE] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-neutral-800 font-medium">All Products</span>
        </nav>

        {/* Top Header & Mobile Filter Trigger */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E7DEC8] pb-5">
          <div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-[#DC5513]">
              Pure Organic Cotton Comfort
            </p>
            <h1 className="font-primary text-3xl sm:text-4xl text-[#0D03AE]">
              Explore Little Outfits
            </h1>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
            {/* Mobile Filter Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E7DEC8] bg-[#FFFBF0] text-xs font-semibold text-[#0D03AE] shadow-xs cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters {hasActiveFilters ? "(Active)" : ""}</span>
            </button>

            {/* Sort Dropdown */}
            <label className="flex items-center gap-2 text-xs text-[#746B60]">
              <span>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-full border border-[#E7DEC8] bg-[#FFFBF0] px-3.5 py-2 text-xs font-medium text-[#292240] outline-none focus:border-[#0D03AE]"
              >
                <option value="featured">Featured Favourites</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </label>
          </div>
        </div>

        {/* 2-Column Layout: Left Sticky Sidebar Filter + Right Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Filter Sidebar (Desktop) */}
          <aside
            data-lenis-prevent="true"
            className="hidden lg:flex lg:col-span-3 sticky top-20 sm:top-24 lg:top-28 max-h-[calc(100dvh-6rem)] lg:max-h-[calc(100dvh-8rem)] rounded-3xl overflow-hidden border border-white/60 shadow-[0_8px_24px_rgba(25,30,45,0.08),inset_0_1px_1px_rgba(255,255,255,0.85),inset_0_-1px_1px_rgba(255,255,255,0.45)] bg-[#FFFBF0]/85 backdrop-blur-md flex-col z-20"
          >
            {/* Ambient specular highlights matching header liquid glass */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(135deg,rgba(255,255,255,0.45),rgba(255,255,255,0.06)_35%,transparent_65%,rgba(255,255,255,0.25))]"
            />

            {/* Fixed Header */}
            <div className="relative z-10 shrink-0 px-6 pt-5 pb-3 border-b border-[#E7DEC8]/80 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#0D03AE]">
                <SlidersHorizontal className="w-4 h-4" />
                <h2 className="font-primary text-xl">Filter Styles</h2>
              </div>
              <button
                type="button"
                onClick={resetFilters}
                disabled={!hasActiveFilters}
                className="text-xs font-semibold text-[#DC5513] hover:underline disabled:text-neutral-400 disabled:no-underline disabled:cursor-default cursor-pointer transition-colors"
              >
                Reset Filters
              </button>
            </div>

            {/* Scrollable Filters Body (Guaranteed internal scroll on any dvh) */}
            <div
              data-lenis-prevent="true"
              className="relative z-10 flex-1 min-h-0 overflow-y-auto overscroll-contain px-6 py-4"
              style={{ touchAction: "pan-y" }}
            >
              <FilterContent
                openSections={openSections}
                toggleSection={toggleSection}
                availableColors={availableColors}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                genders={genders}
                selectedGender={selectedGender}
                setSelectedGender={setSelectedGender}
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                sizes={sizes}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
              />
            </div>
          </aside>

          {/* Right Column: Products Grid (Span 9) */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="w-full py-20 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#FFE4CF] text-[#DC5513] flex items-center justify-center mb-4 shadow-xs">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="font-primary text-2xl text-neutral-800 mb-1">
                  No matching cuddly styles found
                </h3>
                <p className="text-xs text-neutral-500 max-w-sm mb-4">
                  Try adjusting your color, gender, category, or size filters to find the right fit.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="px-6 py-2.5 rounded-full bg-[#0D03AE] hover:bg-[#090280] text-white text-xs font-semibold cursor-pointer shadow-sm transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                {filteredProducts.map((prod, index) => (
                  <CatalogProductCard
                    key={prod.id}
                    product={prod}
                    priority={index === 0}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Filter Slide-over Drawer */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex justify-end bg-black/40 backdrop-blur-xs">
            <div
              data-lenis-prevent="true"
              className="w-full max-w-xs h-full bg-[#fffcf6] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto overscroll-contain"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#E7DEC8] mb-5">
                  <div className="flex items-center gap-2 text-[#0D03AE]">
                    <SlidersHorizontal className="w-4 h-4" />
                    <h2 className="font-primary text-xl">Filter Styles</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    {hasActiveFilters && (
                      <button
                        type="button"
                        onClick={resetFilters}
                        className="text-xs font-semibold text-[#DC5513] hover:underline cursor-pointer"
                      >
                        Reset
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setMobileFilterOpen(false)}
                      className="w-8 h-8 rounded-full border border-[#E7DEC8] flex items-center justify-center text-neutral-500 hover:text-neutral-900 cursor-pointer"
                      aria-label="Close filters"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <FilterContent
                  openSections={openSections}
                  toggleSection={toggleSection}
                  availableColors={availableColors}
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                  genders={genders}
                  selectedGender={selectedGender}
                  setSelectedGender={setSelectedGender}
                  categories={categories}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  sizes={sizes}
                  selectedSize={selectedSize}
                  setSelectedSize={setSelectedSize}
                />
              </div>

              <div className="pt-6 mt-6 border-t border-[#E7DEC8]">
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full py-3 rounded-full bg-[#0D03AE] text-white font-primary text-base shadow-sm"
                >
                  Show {filteredProducts.length} Results
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
