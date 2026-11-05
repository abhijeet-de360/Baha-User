"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Trash2, ArrowRight, Sparkles } from "lucide-react";

interface WishlistItem {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: string;
  image: string;
  size: string;
  inStock: boolean;
  link: string;
}

const INITIAL_WISHLIST: WishlistItem[] = [
  {
    id: 1,
    name: "2-Piece Cotton Ribbed Co-ord Set",
    category: "Co-ord Sets",
    price: 249,
    originalPrice: 499,
    discount: "50% OFF",
    image: "/assets/temp/pr1.webp",
    size: "12-18M",
    inStock: true,
    link: "/products/1",
  },
  {
    id: 2,
    name: "Waffle Knit Top & Shorts Set",
    category: "Co-ord Sets",
    price: 249,
    originalPrice: 499,
    discount: "50% OFF",
    image: "/assets/temp/pr2.webp",
    size: "18-24M",
    inStock: true,
    link: "/products/2",
  },
  {
    id: 3,
    name: "Pastel Lemon Button-Down Romper",
    category: "Rompers",
    price: 299,
    originalPrice: 599,
    discount: "50% OFF",
    image: "/assets/temp/pr3.webp",
    size: "6-12M",
    inStock: true,
    link: "/products/3",
  },
  {
    id: 4,
    name: "Vintage Floral Tiered Baby Dress",
    category: "Dresses",
    price: 349,
    originalPrice: 699,
    discount: "50% OFF",
    image: "/assets/temp/pr4.webp",
    size: "2-3Y",
    inStock: false,
    link: "/products/4",
  },
  {
    id: 5,
    name: "Vintage Floral Tiered Baby Dress",
    category: "Dresses",
    price: 349,
    originalPrice: 699,
    discount: "50% OFF",
    image: "/assets/temp/pr4.webp",
    size: "2-3Y",
    inStock: false,
    link: "/products/4",
  }
];

export default function WishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>(INITIAL_WISHLIST);
  const [movedId, setMovedId] = useState<number | null>(null);

  const handleRemove = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleMoveToCart = (id: number) => {
    setMovedId(id);
    setTimeout(() => {
      setItems((prev) => prev.filter((item) => item.id !== id));
      setMovedId(null);
    }, 900);
  };

  const handleMoveAllToCart = () => {
    setItems([]);
  };

  return (
    <div className="min-h-screen bg-[#fffcf6] text-[#292240] pt-24 sm:pt-28 pb-36 sm:pb-28 lg:pb-20 px-4 sm:px-6 lg:px-12 select-none">
      <div className="w-full max-w-[1600px] mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-6 text-xs sm:text-sm text-[#786C65] flex items-center gap-2">
          <Link href="/" className="hover:text-[#0D03AE] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#0D03AE] font-medium">My Wishlist</span>
        </nav>

        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E7DEC8] pb-6">
          <div>
            <h1 className="font-primary text-3xl sm:text-4xl md:text-5xl text-[#0D03AE] flex items-center gap-3">
              <span>My Wishlist</span>
              <span className="text-xl sm:text-2xl text-[#786C65] font-normal">
                ({items.length} {items.length === 1 ? "item" : "items"})
              </span>
            </h1>
          </div>

          {items.length > 0 && (
            <button
              onClick={handleMoveAllToCart}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#0D03AE] hover:bg-[#090280] text-white font-primary text-base shadow-sm transition-all active:scale-95 self-start sm:self-auto"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Move All to Bag</span>
            </button>
          )}
        </div>

        {/* Empty State */}
        {items.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center justify-center max-w-md mx-auto">
            <div className="w-20 h-20 rounded-full bg-[#FFE4CF] text-[#DC5513] flex items-center justify-center mb-5 shadow-xs">
              <Heart className="w-9 h-9" />
            </div>
            <h2 className="font-primary text-2xl sm:text-3xl text-[#0D03AE]">
              Your wishlist is currently empty!
            </h2>
            <p className="mt-2 text-sm text-[#786C65] leading-relaxed">
              Found something darling for your little one? Tap the heart icon on any outfit to save it here for later.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#0D03AE] hover:bg-[#090280] text-white font-primary text-lg shadow-md transition-all active:scale-95"
            >
              <span>Explore Collections</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          /* Products Grid (Responsive 2/3/4/5 columns) */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className={`group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-[#E7DEC8] shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 ${
                  movedId === item.id ? "opacity-50 scale-95 pointer-events-none" : ""
                }`}
              >
                {/* Product Photo Container */}
                <div className="relative aspect-square w-full bg-[#f8f6f0] overflow-hidden">
                  <Link href={item.link} className="block w-full h-full">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  {/* Remove Button (Top-Right) */}
                  <button
                    onClick={() => handleRemove(item.id)}
                    aria-label="Remove item"
                    className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs text-neutral-500 hover:text-red-600 hover:bg-white flex items-center justify-center transition-all shadow-xs cursor-pointer z-10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {/* Discount Badge */}
                  {item.discount && (
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-[#DC5513] text-white text-[10px] sm:text-xs font-bold tracking-wide shadow-2xs">
                      {item.discount}
                    </span>
                  )}

                  {/* Out of Stock Overlay */}
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] flex items-center justify-center z-10">
                      <span className="px-3 py-1 rounded-full bg-neutral-900 text-white text-xs font-medium tracking-wide">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                {/* Details Container */}
                <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="font-jost text-[11px] sm:text-xs text-[#DC5513] font-medium leading-none">
                      {item.category}
                    </span>
                    <Link href={item.link}>
                      <h3 className="font-primary text-sm sm:text-base text-neutral-900 font-semibold mt-1 leading-snug line-clamp-2 hover:text-[#0D03AE] transition-colors">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="mt-1 text-xs text-[#786C65]">
                      Size: <span className="font-semibold text-neutral-800">{item.size}</span>
                    </p>
                  </div>

                  {/* Price & Action Button */}
                  <div className="mt-3 pt-3 border-t border-[#F2ECE1] flex items-center justify-between gap-2">
                    <div className="flex items-baseline gap-1.5 flex-wrap">
                      <span className="text-sm sm:text-base font-bold text-neutral-900">
                        ₹{item.price}
                      </span>
                      <span className="text-xs text-neutral-400 line-through">
                        ₹{item.originalPrice}
                      </span>
                    </div>

                    <button
                      onClick={() => handleMoveToCart(item.id)}
                      disabled={!item.inStock}
                      className="px-3 sm:px-3.5 py-1.5 rounded-full bg-[#0D03AE] hover:bg-[#090280] disabled:bg-neutral-300 disabled:cursor-not-allowed text-white text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 shadow-xs cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Add to Bag</span>
                      <span className="sm:hidden">Add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
