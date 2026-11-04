"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Check, ShoppingBag, Sparkles } from "lucide-react";
import { Product } from "@/data/products";

interface CompleteTheLookProps {
  product: Product;
}

export function CompleteTheLook({ product }: CompleteTheLookProps) {
  if (!product.bundleItems || product.bundleItems.length === 0) return null;

  const [selectedAddons, setSelectedAddons] = useState<string[]>(
    product.bundleItems.map((item) => item.id)
  );
  const [bundleAdded, setBundleAdded] = useState(false);

  const toggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((item) => item !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const addonTotal = product.bundleItems
    .filter((item) => selectedAddons.includes(item.id))
    .reduce((acc, curr) => acc + curr.price, 0);

  const totalBundlePrice = product.price + addonTotal;
  const originalBundlePrice = Math.round(totalBundlePrice * 1.6);
  const savings = originalBundlePrice - totalBundlePrice;

  const handleAddBundle = () => {
    setBundleAdded(true);
    setTimeout(() => setBundleAdded(false), 2200);
  };

  return (
    <section className="w-full my-12 sm:my-16 p-6 sm:p-8 rounded-3xl bg-[#FFF8E0]/60 border border-[#FED174]/40 font-secondary">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#DC5513] mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            Style Synergy
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 font-secondary">
            Frequently Bought Together
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600">
            Hand-picked by our stylists to create a complete, picture-perfect outfit.
          </p>
        </div>

        {/* Savings Badge */}
        <div className="self-start md:self-auto px-3.5 py-1.5 rounded-full bg-[#DC5513] text-white font-bold text-xs shadow-xs">
          Save Extra ₹{savings} with Bundle
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        {/* Visual Stack with Plus Icons */}
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar py-2">
          {/* Main Item */}
          <div className="relative w-24 h-30 sm:w-28 sm:h-36 rounded-2xl overflow-hidden border-2 border-[#0D03AE] shadow-sm shrink-0 bg-white">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="112px"
              className="object-cover"
            />
            <span className="absolute bottom-1 inset-x-1 text-[9px] font-bold bg-[#0D03AE] text-white py-0.5 rounded text-center truncate px-1">
              This Item
            </span>
          </div>

          {/* Plus Separators & Addon Items */}
          {product.bundleItems.map((item) => {
            const isChecked = selectedAddons.includes(item.id);
            return (
              <React.Fragment key={item.id}>
                <div className="w-7 h-7 rounded-full bg-white text-[#793A20] shadow-2xs flex items-center justify-center shrink-0">
                  <Plus className="w-4 h-4 text-[#DC5513]" />
                </div>

                <div
                  onClick={() => toggleAddon(item.id)}
                  className={`relative w-24 h-30 sm:w-28 sm:h-36 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 bg-white ${
                    isChecked
                      ? "border-[#0D03AE] shadow-sm opacity-100"
                      : "border-black/10 opacity-45 grayscale"
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                  <div
                    className={`absolute top-1.5 right-1.5 w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                      isChecked ? "bg-[#0D03AE] text-white" : "bg-black/30 text-white"
                    }`}
                  >
                    {isChecked && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <span className="absolute bottom-1 inset-x-1 text-[9px] font-bold bg-white/90 backdrop-blur-xs text-neutral-800 py-0.5 rounded text-center truncate px-1 shadow-2xs">
                    ₹{item.price}
                  </span>
                </div>
              </React.Fragment>
            );
          })}
        </div>

        {/* Pricing & CTA Column */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4 border-t lg:border-t-0 pt-4 lg:pt-0 border-black/10">
          <div>
            <div className="flex items-baseline gap-2.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-neutral-950">
                ₹{totalBundlePrice}
              </span>
              <span className="text-sm text-neutral-400 line-through">
                ₹{originalBundlePrice}
              </span>
            </div>
            <p className="text-xs text-emerald-700 font-semibold mt-0.5">
              Includes {1 + selectedAddons.length} coordinating pieces
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddBundle}
            className={`px-6 py-3.5 rounded-2xl font-semibold text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer ${
              bundleAdded
                ? "bg-emerald-600 text-white"
                : "bg-[#DC5513] hover:bg-[#c2460c] text-white active:scale-98"
            }`}
          >
            {bundleAdded ? (
              <>
                <Check className="w-4 h-4" /> Added Bundle to Bag!
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" /> Add Complete Look &bull; ₹{totalBundlePrice}
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

