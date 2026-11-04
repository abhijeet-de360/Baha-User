"use client";

import React from "react";
import { X, Ruler, Sparkles, CheckCircle2 } from "lucide-react";
import { useScrollLock } from "@/lib/scroll-lock";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SIZE_CHART = [
  { size: "0-3M", age: "0 - 3 Months", height: "55 - 61 cm", weight: "3.5 - 5.5 kg", chest: "40 cm" },
  { size: "3-6M", age: "3 - 6 Months", height: "61 - 68 cm", weight: "5.5 - 7.5 kg", chest: "43 cm" },
  { size: "6-12M", age: "6 - 12 Months", height: "68 - 76 cm", weight: "7.5 - 10.0 kg", chest: "46 cm" },
  { size: "12-18M", age: "12 - 18 Months", height: "76 - 83 cm", weight: "10.0 - 11.5 kg", chest: "48 cm" },
  { size: "18-24M", age: "18 - 24 Months", height: "83 - 89 cm", weight: "11.5 - 13.0 kg", chest: "51 cm" },
  { size: "2-3Y", age: "2 - 3 Years", height: "89 - 96 cm", weight: "13.0 - 15.0 kg", chest: "53 cm" },
  { size: "3-4Y", age: "3 - 4 Years", height: "96 - 104 cm", weight: "15.0 - 17.5 kg", chest: "56 cm" },
];

export function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  useScrollLock(isOpen);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        data-lenis-prevent="true"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-white rounded-3xl p-5 sm:p-7 md:p-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-black/5 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FFF8E0] text-[#0D03AE] flex items-center justify-center">
              <Ruler className="w-5 h-5 text-[#DC5513]" />
            </div>
            <div>
              <h3 className="font-['Didot',_'Playfair_Display',_'Times_New_Roman',_Georgia,_serif] italic font-bold text-xl sm:text-2xl text-[#0D03AE]">
                Size &amp; Fit Guide
              </h3>
              <p className="font-secondary text-xs sm:text-sm text-neutral-500">
                Designed with room for diapers and natural baby growth spurts.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close size guide"
            className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Table Area */}
        <div className="overflow-x-auto flex-1 no-scrollbar my-2">
          <table className="w-full text-left text-xs sm:text-sm font-secondary border-collapse">
            <thead>
              <tr className="bg-[#FAF8E8] text-[#793A20] font-semibold border-b border-black/5">
                <th className="py-3 px-3 sm:px-4 rounded-l-xl">Size</th>
                <th className="py-3 px-3 sm:px-4">Age Range</th>
                <th className="py-3 px-3 sm:px-4">Height / Length</th>
                <th className="py-3 px-3 sm:px-4">Baby Weight</th>
                <th className="py-3 px-3 sm:px-4 rounded-r-xl">Chest</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 text-neutral-700">
              {SIZE_CHART.map((row, idx) => (
                <tr
                  key={row.size}
                  className={`hover:bg-[#FFF8E0]/40 transition-colors ${
                    idx % 2 === 0 ? "bg-white" : "bg-neutral-50/50"
                  }`}
                >
                  <td className="py-3 px-3 sm:px-4 font-bold text-[#0D03AE]">
                    {row.size}
                  </td>
                  <td className="py-3 px-3 sm:px-4 text-neutral-600">{row.age}</td>
                  <td className="py-3 px-3 sm:px-4">{row.height}</td>
                  <td className="py-3 px-3 sm:px-4 font-medium">{row.weight}</td>
                  <td className="py-3 px-3 sm:px-4">{row.chest}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Measuring Tips Card */}
        <div className="mt-4 p-4 rounded-2xl bg-[#FFF8E0] border border-[#FED174]/40 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between text-xs font-secondary text-[#793A20]">
          <div className="flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-[#DC5513] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-neutral-900 block sm:inline mr-1">
                Parent Tip:
              </span>
              Babies grow quickly! If your little one is in between sizes or on the verge of a growth spurt, we recommend choosing one size up for longer wear.
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0 text-[#0D03AE] font-semibold">
            <CheckCircle2 className="w-4 h-4 text-[#DC5513]" />
            Free Exchanges
          </div>
        </div>
      </div>
    </div>
  );
}

