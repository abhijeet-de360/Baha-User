"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Ruler, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

const BABY_SIZE_DATA = [
  { size: "0-3M", age: "0 - 3 Months", heightCm: "52 - 60 cm", heightIn: "20.5 - 23.5 in", weightKg: "3.5 - 5.5 kg", chestCm: "40 - 43 cm" },
  { size: "3-6M", age: "3 - 6 Months", heightCm: "60 - 68 cm", heightIn: "23.5 - 26.5 in", weightKg: "5.5 - 7.5 kg", chestCm: "43 - 46 cm" },
  { size: "6-12M", age: "6 - 12 Months", heightCm: "68 - 76 cm", heightIn: "26.5 - 30 in", weightKg: "7.5 - 9.5 kg", chestCm: "46 - 49 cm" },
  { size: "12-18M", age: "12 - 18 Months", heightCm: "76 - 83 cm", heightIn: "30 - 32.5 in", weightKg: "9.5 - 11.5 kg", chestCm: "49 - 52 cm" },
  { size: "18-24M", age: "18 - 24 Months", heightCm: "83 - 90 cm", heightIn: "32.5 - 35.5 in", weightKg: "11.5 - 13.5 kg", chestCm: "52 - 54 cm" },
  { size: "2-3Y", age: "2 - 3 Years", heightCm: "90 - 98 cm", heightIn: "35.5 - 38.5 in", weightKg: "13.5 - 15.5 kg", chestCm: "54 - 56 cm" },
  { size: "3-4Y", age: "3 - 4 Years", heightCm: "98 - 105 cm", heightIn: "38.5 - 41.5 in", weightKg: "15.5 - 17.5 kg", chestCm: "56 - 58 cm" },
];

export default function SizeGuidePage() {
  const [unit, setUnit] = useState<"cm" | "in">("cm");

  return (
    <div className="min-h-screen bg-[#fffcf6] text-[#292240] pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-12 select-none">
      <div className="w-full max-w-[1600px] mx-auto space-y-10">
        {/* Breadcrumb Navigation */}
        <nav className="text-xs sm:text-sm text-[#786C65] flex items-center gap-2">
          <Link href="/" className="hover:text-[#0D03AE] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#0D03AE] font-medium">Size Guide</span>
        </nav>

        {/* Header */}
        <div className="border-b border-[#E7DEC8] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFE4CF] text-[#DC5513] text-xs sm:text-sm font-semibold mb-3">
              <Ruler className="w-4 h-4" />
              <span>Perfect Fit Guarantee</span>
            </div>
            <h1 className="font-primary text-3xl sm:text-4xl md:text-5xl text-[#0D03AE]">
              Baby &amp; Toddler Size Chart
            </h1>
            <p className="mt-2 text-sm sm:text-base text-[#786C65]">
              Babies grow quickly! Use our standardized growth measurements to pick the coziest fit.
            </p>
          </div>

          {/* Unit Toggle Switch */}
          <div className="flex items-center gap-2 bg-[#FFFBF0] border border-[#E7DEC8] p-1 rounded-full self-start sm:self-auto">
            <button
              onClick={() => setUnit("cm")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                unit === "cm"
                  ? "bg-[#0D03AE] text-white shadow-xs"
                  : "text-[#786C65] hover:text-neutral-900"
              }`}
            >
              Centimeters (cm)
            </button>
            <button
              onClick={() => setUnit("in")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                unit === "in"
                  ? "bg-[#0D03AE] text-white shadow-xs"
                  : "text-[#786C65] hover:text-neutral-900"
              }`}
            >
              Inches (in)
            </button>
          </div>
        </div>

        {/* Size Chart Table */}
        <div className="border border-[#E7DEC8] rounded-3xl bg-[#FFFBF0]/60 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#FAF8E8] border-b border-[#E7DEC8] text-[#0D03AE] font-primary text-sm sm:text-base">
                <tr>
                  <th className="py-4 px-5">Standard Size</th>
                  <th className="py-4 px-5">Age Bracket</th>
                  <th className="py-4 px-5">Baby Height</th>
                  <th className="py-4 px-5">Typical Weight</th>
                  <th className="py-4 px-5">Chest Circumference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7DEC8] text-[#4A4458]">
                {BABY_SIZE_DATA.map((row) => (
                  <tr key={row.size} className="hover:bg-white/40 transition-colors">
                    <td className="py-3.5 px-5 font-bold text-neutral-900">
                      <span className="px-2.5 py-1 rounded-md bg-[#EDE5FA] text-[#0D03AE] font-semibold">
                        {row.size}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 font-medium">{row.age}</td>
                    <td className="py-3.5 px-5">{unit === "cm" ? row.heightCm : row.heightIn}</td>
                    <td className="py-3.5 px-5">{row.weightKg}</td>
                    <td className="py-3.5 px-5">{row.chestCm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Helpful Sizing Tips */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-6 rounded-3xl border border-[#E7DEC8] bg-[#FFFBF0]/60 space-y-2">
            <h3 className="font-primary text-xl text-[#0D03AE] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#DC5513]" />
              <span>When In Doubt, Size Up</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#786C65] leading-relaxed">
              Babies grow faster than you think! If your baby is close to the top edge of a weight bracket, we recommend selecting the next size up.
            </p>
          </div>

          <div className="p-6 rounded-3xl border border-[#E7DEC8] bg-[#FFFBF0]/60 space-y-2">
            <h3 className="font-primary text-xl text-[#0D03AE] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#DC5513]" />
              <span>Diaper Space Included</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#786C65] leading-relaxed">
              All Baha onesies, rompers, and pants are crafted with generous gussets designed to accommodate cloth diapers and disposable nappies.
            </p>
          </div>

          <div className="p-6 rounded-3xl border border-[#E7DEC8] bg-[#FFFBF0]/60 space-y-2">
            <h3 className="font-primary text-xl text-[#0D03AE] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#DC5513]" />
              <span>Free Size Exchange</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#786C65] leading-relaxed">
              Ordered the wrong size? Don&apos;t stress! We offer a 100% free doorstep size exchange on every order within 7 days of delivery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

