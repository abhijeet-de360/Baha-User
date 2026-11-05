"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  Sparkles,
  Camera,
  Upload,
  X,
  Check,
  RotateCcw,
  UserCheck,
  ChevronRight,
  ShieldCheck,
  Sliders,
  Maximize2,
} from "lucide-react";
import { Product } from "@/data/products";
import { useScrollLock } from "@/lib/scroll-lock";

interface VirtualTryOnProps {
  product: Product;
}

const SAMPLE_MODELS = [
  { id: "sample1", name: "Aarav (2-3Y)", image: "/assets/temp/baby1.webp" },
  { id: "sample2", name: "Ananya (1-2Y)", image: "/assets/temp/baby2.webp" },
  { id: "sample3", name: "Kabir (6-12M)", image: "/assets/temp/baby3.webp" },
  { id: "sample4", name: "Meera (3-4Y)", image: "/assets/temp/baby4.webp" },
];

export function VirtualTryOn({ product }: VirtualTryOnProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChildPhoto, setSelectedChildPhoto] = useState<string>("/assets/temp/baby1.webp");
  const [childName, setChildName] = useState<string>("Little Explorer");
  const [childAge, setChildAge] = useState<string>("2-3 Years");
  const [step, setStep] = useState<"select" | "processing" | "result">("select");
  const [fitFitDrape, setFitDrape] = useState<"Standard" | "Relaxed">("Standard");
  const [mounted, setMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent background scrolling when modal is open
  useScrollLock(isOpen);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedChildPhoto(url);
      setChildName(file.name.replace(/\.[^/.]+$/, "").slice(0, 15) || "Your Child");
    }
  };

  const handleStartVirtualTryOn = () => {
    setStep("processing");
    // Simulate smart AI try-on alignment on child photo
    setTimeout(() => {
      setStep("result");
    }, 1800);
  };

  const handleReset = () => {
    setStep("select");
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      setStep("select");
    }, 250);
  };

  return (
    <>
      {/* 1. Sleek Compact Card placed below gallery to fill the space cleanly without burning AI credits */}
      <div className="w-full mt-4 sm:mt-5 rounded-3xl border border-[#E7DEC8] bg-gradient-to-r from-[#FFFBF0] via-[#FFF8E7] to-[#FFFBF0] p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="relative w-12 h-12 rounded-2xl bg-[#0D03AE] text-white flex items-center justify-center shrink-0 shadow-sm overflow-hidden">
            <Sparkles className="w-6 h-6 text-[#FED174]" />
            <div className="absolute inset-0 bg-white/10 [mask-image:linear-gradient(135deg,black,transparent)]" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-primary text-lg sm:text-xl text-[#0D03AE] leading-none">
                Virtual 3D Try-On
              </h4>
              <span className="px-2 py-0.5 rounded-full bg-[#DC5513] text-white text-[9px] font-bold uppercase tracking-wider">
                Instant Fit Preview
              </span>
            </div>
            <p className="text-xs text-[#786C65] font-jost mt-1 leading-snug">
              Upload your child&apos;s photo or pick a model to see how this outfit looks before buying.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#0D03AE] hover:bg-[#090280] text-white font-jost font-semibold text-xs sm:text-sm shadow-sm transition-all active:scale-95 cursor-pointer shrink-0"
        >
          <Camera className="w-4 h-4" />
          <span>Try on Your Child</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 2. Interactive Modal Dialog (Portal rendered to document body with z-[9999] so it stays above all headers & sticky size selectors) */}
      {isOpen && mounted && typeof document !== "undefined" &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            onClick={closeModal}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200 cursor-pointer"
          >
            <div
              data-lenis-prevent="true"
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#fffcf6] border border-[#E7DEC8] shadow-2xl flex flex-col animate-in zoom-in-95 duration-200 cursor-default"
            >
            {/* Modal Header */}
            <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#fffcf6]/95 backdrop-blur-md border-b border-[#E7DEC8]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#0D03AE]/10 text-[#0D03AE] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 fill-[#0D03AE]" />
                </div>
                <div>
                  <h3 className="font-primary text-xl text-[#0D03AE] leading-none">
                    Virtual Try-On Studio
                  </h3>
                  <p className="text-[11px] text-[#786C65] font-jost mt-0.5">
                    {product.name}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="w-8 h-8 rounded-full border border-[#E7DEC8] flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {step === "select" && (
                <>
                  {/* Step 1: Upload or Choose Model */}
                  <div>
                    <h4 className="text-sm font-jost font-bold text-neutral-900 mb-1">
                      Step 1: Choose or Upload Child Photo
                    </h4>
                    <p className="text-xs text-neutral-500 font-jost mb-3">
                      Select a standard sample kid profile below, or upload a clear front-facing picture of your little one.
                    </p>

                    {/* Quick Sample Avatars */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-3.5">
                      {SAMPLE_MODELS.map((item) => {
                        const isSelected = selectedChildPhoto === item.image;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              setSelectedChildPhoto(item.image);
                              setChildName(item.name.split(" ")[0]);
                            }}
                            className={`group relative p-2 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center ${
                              isSelected
                                ? "border-[#0D03AE] bg-white ring-2 ring-[#0D03AE] shadow-xs"
                                : "border-[#E7DEC8] bg-white hover:border-[#0D03AE]/60"
                            }`}
                          >
                            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden mb-1.5 border border-black/5">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                sizes="80px"
                                className="object-cover"
                              />
                              {isSelected && (
                                <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-[#0D03AE] text-white flex items-center justify-center shadow-xs">
                                  <Check className="w-3 h-3 stroke-[3]" />
                                </div>
                              )}
                            </div>
                            <span className="text-xs font-jost font-semibold text-neutral-900 truncate w-full">
                              {item.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Custom Child Photo Upload */}
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-[#E7DEC8] hover:border-[#0D03AE] bg-[#FFFBF0]/60 hover:bg-white rounded-2xl p-4 text-center cursor-pointer transition-colors"
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <Upload className="w-5 h-5 text-[#DC5513] mx-auto mb-1.5" />
                      <p className="text-xs font-jost font-semibold text-neutral-900">
                        Upload Your Child&apos;s Photo
                      </p>
                      <p className="text-[11px] text-neutral-500 font-jost mt-0.5">
                        JPEG or PNG &bull; Face &amp; body clearly visible for best results
                      </p>
                    </div>
                  </div>
                  {/* Trigger AI Button (Explicit Click - Saves Cost) */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleStartVirtualTryOn}
                      className="w-full py-3.5 rounded-full bg-[#0D03AE] hover:bg-[#090280] text-white font-jost font-semibold text-sm shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-[#FED174]" />
                      <span>Generate Virtual Try-On</span>
                    </button>
                  </div>
                </>
              )}

              {/* Processing Screen */}
              {step === "processing" && (
                <div className="py-14 flex flex-col items-center justify-center text-center">
                  <div className="relative w-24 h-24 mb-5">
                    <div className="absolute inset-0 rounded-full border-4 border-[#0D03AE]/15 border-t-[#0D03AE] animate-spin" />
                    <div className="absolute inset-3 rounded-full overflow-hidden">
                      <Image
                        src={selectedChildPhoto}
                        alt="Scanning child photo"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <h4 className="font-primary text-2xl text-[#0D03AE] mb-1">
                    Aligning 3D Garment...
                  </h4>
                  <p className="text-xs text-neutral-500 font-jost max-w-sm">
                    Simulating fabric drape, seam stretch, and collar proportions on {childName}&apos;s posture.
                  </p>
                </div>
              )}

              {/* Result Stage */}
              {step === "result" && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                    {/* Rendered Preview Canvas */}
                    <div className="sm:col-span-7 relative aspect-[4/5] rounded-3xl overflow-hidden bg-neutral-900 border border-[#E7DEC8] shadow-lg">
                      <Image
                        src={selectedChildPhoto}
                        alt="Simulated Try-On"
                        fill
                        className="object-cover"
                      />
                      {/* AI Overlaid Badge */}
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-jost font-medium flex items-center gap-1.5 border border-white/20">
                        <Sparkles className="w-3 h-3 text-[#FED174]" />
                        <span>AI Rendered Preview</span>
                      </div>

                      {/* Bottom result banner */}
                      <div className="absolute inset-x-3 bottom-3 p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-white/80 shadow-md">
                        <div className="flex items-center justify-between text-xs font-jost">
                          <div>
                            <p className="font-bold text-neutral-900">
                              {childName} &bull; {childAge}
                            </p>
                            <p className="text-[11px] text-neutral-500 mt-0.5">
                              Fit: {fitFitDrape} &bull; Recommended: Size 2-3Y
                            </p>
                          </div>
                          <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            98% Fit Match
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Summary & Actions */}
                    <div className="sm:col-span-5 flex flex-col justify-between space-y-4">
                      <div className="p-4 rounded-2xl bg-[#FFFBF0] border border-[#E7DEC8] space-y-2.5 text-xs font-jost">
                        <div className="flex items-center gap-2 text-emerald-700 font-bold">
                          <Check className="w-4 h-4" />
                          <span>Perfect Stretch &amp; Neckline Room</span>
                        </div>
                        <p className="text-neutral-600 text-[11px] leading-relaxed">
                          Based on our GOTS organic cotton stretch index, this outfit offers +1.5 inches of diaper allowance with zero pinch points.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <button
                          type="button"
                          onClick={closeModal}
                          className="w-full py-3 rounded-full bg-[#0D03AE] hover:bg-[#090280] text-white font-jost font-semibold text-xs sm:text-sm shadow-md transition-all active:scale-[0.99] cursor-pointer"
                        >
                          Add Size 2-3Y to Bag
                        </button>
                        <button
                          type="button"
                          onClick={handleReset}
                          className="w-full py-2.5 rounded-full border border-[#E7DEC8] hover:bg-white text-neutral-700 font-jost font-medium text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Try Another Photo / Age</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
