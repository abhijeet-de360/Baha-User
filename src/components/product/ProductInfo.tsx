"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Star,
  ShoppingBag,
  Zap,
  Ruler,
  Truck,
  RotateCcw,
  ShieldCheck,
  Feather,
  ChevronDown,
  Check,
  Plus,
  Minus,
  Sparkles,
} from "lucide-react";
import { Product, ProductColor, ProductSize } from "@/data/products";
import { SizeGuideModal } from "./SizeGuideModal";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product.colors[0] || { name: "Default", hex: "#FFF8F0" }
  );
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(
    product.sizes.find((s) => s.inStock) || null
  );
  const [quantity, setQuantity] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>("features");

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size first");
      return;
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2200);
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div className="w-full flex flex-col font-secondary">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-neutral-400 mb-3 flex-wrap">
        <Link href="/" className="hover:text-[#0D03AE] transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-[#0D03AE] transition-colors">
          Products
        </Link>
        <span>/</span>
        <Link
          href={`/products?category=${encodeURIComponent(product.category)}`}
          className="hover:text-[#0D03AE] transition-colors"
        >
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-neutral-700 font-medium truncate max-w-[200px]">
          {product.name}
        </span>
      </nav>

      {/* Category Pill & SKU */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-xs uppercase tracking-wider font-bold text-[#DC5513]">
          {product.category} &bull; {product.gender}
        </span>
        <span className="text-[11px] text-neutral-400 font-jost font-medium tracking-wide">
          SKU: {product.sku}
        </span>
      </div>

      {/* Product Title */}
      <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-neutral-900 leading-tight mb-2 font-jost">
        {product.name}
      </h1>

      {/* Tagline */}
      <p className="text-sm text-neutral-600 mb-4 leading-relaxed">
        {product.tagline}
      </p>

      {/* Ratings & Reviews Jump Link */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex items-center gap-1 bg-[#FFF8E0] px-2.5 py-1 rounded-full border border-[#FED174]/40">
          <Star className="w-3.5 h-3.5 fill-[#DC5513] text-[#DC5513]" />
          <span className="text-xs font-bold text-[#793A20]">
            {product.rating}
          </span>
        </div>
        <a
          href="#reviews"
          className="text-xs text-[#0D03AE] font-medium underline underline-offset-2 hover:text-[#DC5513] transition-colors"
        >
          Based on {product.reviewsCount} verified reviews
        </a>
      </div>

      {/* Pricing Block */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFDF7] border border-[#EFE8DC] mb-6 shadow-xs">
        <div className="flex items-baseline gap-3 flex-wrap">
          <span className="text-3xl sm:text-4xl font-extrabold text-neutral-950 font-secondary">
            ₹{product.price}
          </span>
          <span className="text-lg sm:text-xl text-neutral-400 line-through">
            ₹{product.originalPrice}
          </span>
          <span className="px-3 py-1 rounded-full bg-[#DC5513]/10 text-[#DC5513] font-bold text-xs uppercase tracking-wide">
            {product.discount}
          </span>
        </div>
        <p className="text-[11px] text-neutral-500 mt-1">
          Inclusive of all taxes &bull; Standard delivery in 2–4 business days
        </p>
      </div>

      {/* Color Selection */}
      {product.colors.length > 0 && (
        <div className="mb-5">
          <div className="flex items-center justify-between text-xs mb-2.5">
            <span className="font-bold text-neutral-800">
              Color:{" "}
              <span className="font-normal text-neutral-600">
                {selectedColor.name}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {product.colors.map((color) => {
              const isSelected = selectedColor.name === color.name;
              return (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  aria-label={`Select color ${color.name}`}
                  className={`group relative w-9 h-9 rounded-full p-0.5 border-2 transition-all cursor-pointer flex items-center justify-center ${
                    isSelected
                      ? "border-[#0D03AE] scale-110 shadow-sm"
                      : "border-black/10 hover:border-black/30"
                  }`}
                >
                  <span
                    className="w-full h-full rounded-full border border-black/10 block shadow-inner"
                    style={{ backgroundColor: color.hex }}
                  />
                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-neutral-800 absolute inset-0 m-auto pointer-events-none drop-shadow-xs" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Size Selection */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs mb-2.5">
          <span className="font-bold text-neutral-800">
            Select Size / Age:{" "}
            {selectedSize && (
              <span className="font-normal text-[#0D03AE]">
                {selectedSize.label} ({selectedSize.age})
              </span>
            )}
          </span>
          <button
            type="button"
            onClick={() => setSizeGuideOpen(true)}
            className="flex items-center gap-1 text-[#0D03AE] font-semibold hover:text-[#DC5513] transition-colors cursor-pointer text-xs"
          >
            <Ruler className="w-3.5 h-3.5" />
            Size Guide
          </button>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {product.sizes.map((size) => {
            const isSelected = selectedSize?.label === size.label;
            return (
              <button
                key={size.label}
                type="button"
                disabled={!size.inStock}
                onClick={() => setSelectedSize(size)}
                className={`relative py-2.5 px-2 rounded-xl text-xs font-semibold flex flex-col items-center justify-center transition-all cursor-pointer border ${
                  !size.inStock
                    ? "bg-neutral-100 border-neutral-200 text-neutral-300 line-through cursor-not-allowed"
                    : isSelected
                    ? "bg-[#0D03AE] border-[#0D03AE] text-white shadow-md scale-102"
                    : "bg-white border-neutral-200 text-neutral-800 hover:border-[#0D03AE]/50 hover:bg-[#FFF8E0]/30"
                }`}
              >
                <span>{size.label}</span>
                <span className={`text-[10px] font-normal ${isSelected ? "text-white/80" : "text-neutral-500"}`}>
                  {size.age.split(" ")[0]} {size.age.split(" ")[1]}
                </span>

                {size.lowStock && size.inStock && !isSelected && (
                  <span className="absolute -top-1.5 -right-1 px-1 py-0.2 rounded-full bg-[#DC5513] text-[8px] text-white font-bold">
                    Few
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {selectedSize?.lowStock && (
          <p className="text-[11px] text-[#DC5513] font-semibold flex items-center gap-1 mt-2 animate-pulse">
            <Zap className="w-3 h-3 fill-[#DC5513]" />
            Hurry, only 3 pieces left in {selectedSize.label}!
          </p>
        )}
      </div>

      {/* Quantity & CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8">
        {/* Quantity Stepper */}
        <div className="flex items-center justify-between border border-neutral-200 rounded-2xl p-1 bg-white sm:w-36 shrink-0 h-[52px] shadow-2xs">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
            className="w-10 h-full rounded-xl flex items-center justify-center text-neutral-700 hover:bg-neutral-100 disabled:opacity-30 cursor-pointer transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="font-bold text-sm text-neutral-900 w-8 text-center">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            aria-label="Increase quantity"
            className="w-10 h-full rounded-xl flex items-center justify-center text-neutral-700 hover:bg-neutral-100 cursor-pointer transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Add to Bag Button */}
        <button
          type="button"
          onClick={handleAddToCart}
          className={`w-full sm:flex-1 h-[52px] min-h-[52px] px-6 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shrink-0 ${
            addedToCart
              ? "bg-emerald-600 text-white"
              : "bg-[#DC5513] hover:bg-[#c2460c] active:scale-98 text-white"
          }`}
        >
          {addedToCart ? (
            <>
              <Check className="w-5 h-5" /> Added to Bag!
            </>
          ) : (
            <>
              <ShoppingBag className="w-5 h-5" /> Add to Bag &bull; ₹{product.price * quantity}
            </>
          )}
        </button>

        {/* Instant Buy Now Button */}
        <button
          type="button"
          onClick={() => {
            handleAddToCart();
            // In a full flow this would navigate to checkout
          }}
          className="w-full sm:w-auto h-[52px] min-h-[52px] px-8 rounded-2xl bg-[#0D03AE] hover:bg-[#0a028a] active:scale-98 text-white font-semibold text-sm flex items-center justify-center transition-all cursor-pointer shadow-md shrink-0"
        >
          Buy Now
        </button>
      </div>

      {/* The Baha Promise / Value Props */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#FFF8E0]/70 border border-[#FED174]/50 mb-8">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#DC5513] shrink-0 shadow-2xs">
            <Feather className="w-4 h-4" />
          </div>
          <div className="flex flex-col text-[11px] leading-tight">
            <span className="font-bold text-[#793A20]">100% Organic</span>
            <span className="text-neutral-500">GOTS Certified</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#DC5513] shrink-0 shadow-2xs">
            <Truck className="w-4 h-4" />
          </div>
          <div className="flex flex-col text-[11px] leading-tight">
            <span className="font-bold text-[#793A20]">Free Shipping</span>
            <span className="text-neutral-500">On orders &gt; ₹499</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#DC5513] shrink-0 shadow-2xs">
            <RotateCcw className="w-4 h-4" />
          </div>
          <div className="flex flex-col text-[11px] leading-tight">
            <span className="font-bold text-[#793A20]">Easy 7-Day</span>
            <span className="text-neutral-500">Hassle-Free Returns</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#DC5513] shrink-0 shadow-2xs">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="flex flex-col text-[11px] leading-tight">
            <span className="font-bold text-[#793A20]">Safe For Baby</span>
            <span className="text-neutral-500">Zero Toxic Dyes</span>
          </div>
        </div>
      </div>

      {/* Accordion Sections: Features, Fabric & Care, Delivery */}
      <div className="divide-y divide-black/5 border-t border-b border-black/5">
        {/* 1. Features & Fit */}
        <div className="py-4">
          <button
            type="button"
            onClick={() => toggleAccordion("features")}
            className="w-full flex items-center justify-between text-sm font-bold text-neutral-900 text-left cursor-pointer"
          >
            <span>Product Highlights &amp; Thoughtful Details</span>
            <ChevronDown
              className={`w-4 h-4 text-neutral-500 transition-transform duration-200 ${
                openAccordion === "features" ? "rotate-180" : ""
              }`}
            />
          </button>
          {openAccordion === "features" && (
            <div className="pt-3 text-xs sm:text-sm text-neutral-600 leading-relaxed space-y-2 animate-in fade-in duration-200">
              <p>{product.description}</p>
              <ul className="list-disc pl-5 space-y-1.5 text-neutral-700 pt-2">
                {product.features.map((feat, idx) => (
                  <li key={idx}>{feat}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* 2. Fabric & Care */}
        <div className="py-4">
          <button
            type="button"
            onClick={() => toggleAccordion("fabric")}
            className="w-full flex items-center justify-between text-sm font-bold text-neutral-900 text-left cursor-pointer"
          >
            <span>Fabric Composition &amp; Gentle Care</span>
            <ChevronDown
              className={`w-4 h-4 text-neutral-500 transition-transform duration-200 ${
                openAccordion === "fabric" ? "rotate-180" : ""
              }`}
            />
          </button>
          {openAccordion === "fabric" && (
            <div className="pt-3 text-xs sm:text-sm text-neutral-600 leading-relaxed space-y-2 animate-in fade-in duration-200">
              <div className="p-3 rounded-xl bg-[#FAF8E8] text-[#793A20] font-medium">
                <span className="font-bold block text-neutral-900">Material:</span>
                {product.fabric}
              </div>
              <ul className="list-disc pl-5 space-y-1 text-neutral-700 pt-1">
                {product.careInstructions.map((care, idx) => (
                  <li key={idx}>{care}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* 3. Shipping & Delivery */}
        <div className="py-4">
          <button
            type="button"
            onClick={() => toggleAccordion("shipping")}
            className="w-full flex items-center justify-between text-sm font-bold text-neutral-900 text-left cursor-pointer"
          >
            <span>Shipping, Delivery &amp; Exchanges</span>
            <ChevronDown
              className={`w-4 h-4 text-neutral-500 transition-transform duration-200 ${
                openAccordion === "shipping" ? "rotate-180" : ""
              }`}
            />
          </button>
          {openAccordion === "shipping" && (
            <div className="pt-3 text-xs sm:text-sm text-neutral-600 leading-relaxed space-y-2 animate-in fade-in duration-200">
              <p>
                &bull; <strong>Fast Dispatch:</strong> Orders placed before 2 PM IST are packaged with love and shipped within 24 hours.
              </p>
              <p>
                &bull; <strong>Transit Times:</strong> Metro cities: 2–3 business days. Rest of India: 3–5 business days.
              </p>
              <p>
                &bull; <strong>Hassle-Free Exchanges:</strong> Did baby outgrow the size unexpectedly? Don’t worry! We offer simple 7-day pickup and size exchange right at your doorstep.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
      />
    </div>
  );
}

