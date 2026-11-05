"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  X,
  RotateCcw,
  CheckCircle2,
  UploadCloud,
  Image as ImageIcon,
  Trash2,
  Camera,
  ShieldCheck,
  MapPin,
  Truck,
  Sparkles,
  Check,
  AlertCircle,
  FileText,
  CreditCard,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { OrderRecord, OrderItem } from "@/data/orders";
import { useScrollLock } from "@/lib/scroll-lock";

interface ExchangeReturnModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderRecord | null;
}

const EXCHANGE_REASONS = [
  { id: "size_small", label: "Size is too small / tight", category: "Size & Fit" },
  { id: "size_large", label: "Size is too large / loose", category: "Size & Fit" },
  { id: "quality_fabric", label: "Fabric / material not as expected", category: "Quality" },
  { id: "defective", label: "Defective stitching / torn or soiled", category: "Defect" },
  { id: "wrong_item", label: "Received incorrect product or color", category: "Fulfillment" },
  { id: "changed_mind", label: "Changed mind / No longer required", category: "Preference" },
];

const AVAILABLE_SIZES = ["0-3M", "3-6M", "6-12M", "12-18M", "18-24M", "2-3Y", "3-4Y"];

export function ExchangeReturnModal({
  isOpen,
  onClose,
  order,
}: ExchangeReturnModalProps) {
  // Lock body & Lenis scroll when modal is open
  useScrollLock(isOpen);

  const [requestType, setRequestType] = useState<"exchange" | "return">("exchange");
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
  const [exchangeSizes, setExchangeSizes] = useState<Record<string, string>>({});
  const [selectedReason, setSelectedReason] = useState<string>("size_small");
  const [comment, setComment] = useState("");
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [refundMode, setRefundMode] = useState<"original" | "coins">("original");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize selected items and sizes when order changes
  useEffect(() => {
    if (order && order.items.length > 0) {
      setSelectedItemIds([order.items[0].id]);
      const initialSizes: Record<string, string> = {};
      order.items.forEach((item) => {
        initialSizes[item.id] = item.size;
      });
      setExchangeSizes(initialSizes);
      setSubmitted(false);
      setUploadedImages([]);
      setComment("");
    }
  }, [order, isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !order) return null;

  const handleToggleItem = (itemId: string) => {
    setSelectedItemIds((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSizeChange = (itemId: string, newSize: string) => {
    setExchangeSizes((prev) => ({
      ...prev,
      [itemId]: newSize,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newUrls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const url = URL.createObjectURL(files[i]);
      newUrls.push(url);
    }
    setUploadedImages((prev) => [...prev, ...newUrls].slice(0, 5));
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setUploadedImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItemIds.length === 0) {
      alert("Please select at least one item to proceed.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 900);
  };

  // Selected items array
  const selectedItems = order.items.filter((item) =>
    selectedItemIds.includes(item.id)
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl max-h-[92vh] bg-[#FFFDF7] rounded-3xl border border-[#E7DEC8] shadow-[0_24px_60px_rgba(25,30,45,0.25)] flex flex-col overflow-hidden z-10 animate-in zoom-in-95 fade-in duration-200 font-jost">
        {/* Sticky Header */}
        <div className="px-5 sm:px-6 py-4 bg-[#FFFBF0] border-b border-[#E7DEC8] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0D03AE] text-white flex items-center justify-center shadow-xs">
              <RotateCcw className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-primary text-lg sm:text-xl text-neutral-900 leading-tight">
                  Exchange or Return Request
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#FAF8E8] border border-[#E7DEC8] text-[11px] font-bold text-neutral-700 font-mono">
                  #{order.orderNumber}
                </span>
              </div>
              <p className="text-xs text-neutral-500 font-secondary mt-0.5">
                Free doorstep reverse pickup &bull; Instant exchange approval
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close Modal"
            className="w-9 h-9 rounded-full bg-[#FAF8E8] hover:bg-[#FAF8E8]/80 border border-[#E7DEC8] flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div
          data-lenis-prevent="true"
          className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 no-scrollbar font-secondary text-neutral-800"
        >
          {submitted ? (
            /* Success Confirmation Screen */
            <div className="py-6 sm:py-8 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300 flex items-center justify-center mx-auto shadow-xs">
                <Check className="w-8 h-8 stroke-[2.5]" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold uppercase tracking-wider font-jost">
                  Request Registered
                </span>
                <h4 className="font-primary text-2xl text-neutral-900 mt-2 font-bold">
                  {requestType === "exchange"
                    ? "Size Exchange Scheduled!"
                    : "Return & Refund Request Submitted!"}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto mt-1 leading-relaxed">
                  We have booked a free doorstep reverse pickup for{" "}
                  <strong className="text-neutral-900">Tomorrow between 10 AM &ndash; 2 PM</strong>.
                </p>
              </div>

              {/* Reference Details Box */}
              <div className="p-4 rounded-2xl bg-[#FFFBF0] border border-[#E7DEC8] max-w-md mx-auto text-left text-xs space-y-2 font-jost">
                <div className="flex items-center justify-between pb-2 border-b border-[#E7DEC8]">
                  <span className="text-neutral-500">Request Reference:</span>
                  <strong className="font-mono text-neutral-900 font-bold">
                    REQ-{requestType === "exchange" ? "EX" : "RT"}-99214
                  </strong>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">Selected Items:</span>
                  <strong className="text-neutral-900 font-bold">
                    {selectedItems.length} item{selectedItems.length > 1 ? "s" : ""}
                  </strong>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">Pickup Address:</span>
                  <span className="text-neutral-800 text-right truncate max-w-[220px]">
                    {order.deliveryAddress.street}, {order.deliveryAddress.city}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-neutral-500">
                    {requestType === "exchange" ? "New Item Dispatch:" : "Refund Mode:"}
                  </span>
                  <strong className="text-[#0D03AE] font-bold">
                    {requestType === "exchange"
                      ? "Dispatches upon courier scan"
                      : refundMode === "coins"
                      ? "Instant Baha Coins"
                      : "Original Payment (₹" + order.total + ")"}
                  </strong>
                </div>
              </div>

              {/* Instructions Pill */}
              <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/80 max-w-md mx-auto flex items-start gap-2.5 text-left text-xs text-amber-900">
                <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  Please keep items clean with original tags attached. Handover the parcel to our pickup executive upon verification.
                </span>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-[#0D03AE] hover:bg-[#DC5513] text-white text-xs font-bold transition-all shadow-xs cursor-pointer font-jost"
                >
                  Back to Orders
                </button>
              </div>
            </div>
          ) : (
            /* Multi-Step Request Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Choose Intent (Exchange vs Return) */}
              <div>
                <label className="text-xs uppercase tracking-wider font-extrabold text-neutral-500 font-jost block mb-2.5">
                  1. What would you like to do?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Exchange Option */}
                  <div
                    onClick={() => setRequestType("exchange")}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${
                      requestType === "exchange"
                        ? "bg-[#FAF8E8] border-[#0D03AE] shadow-sm ring-2 ring-[#0D03AE]/15"
                        : "bg-[#FFFBF0] border-[#E7DEC8] hover:border-neutral-400"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-7 h-7 rounded-xl flex items-center justify-center ${
                            requestType === "exchange"
                              ? "bg-[#0D03AE] text-white"
                              : "bg-[#FAF8E8] text-neutral-600 border border-[#E7DEC8]"
                          }`}
                        >
                          <RotateCcw className="w-4 h-4" />
                        </div>
                        <span className="font-jost font-bold text-sm text-neutral-900">
                          Exchange Item
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase font-jost">
                        Free &bull; Fastest
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 mt-1 pl-9">
                      Swap for a different size or color. Immediate dispatch of replacement garment.
                    </p>
                  </div>

                  {/* Return Option */}
                  <div
                    onClick={() => setRequestType("return")}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${
                      requestType === "return"
                        ? "bg-[#FAF8E8] border-[#0D03AE] shadow-sm ring-2 ring-[#0D03AE]/15"
                        : "bg-[#FFFBF0] border-[#E7DEC8] hover:border-neutral-400"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-7 h-7 rounded-xl flex items-center justify-center ${
                            requestType === "return"
                              ? "bg-[#0D03AE] text-white"
                              : "bg-[#FAF8E8] text-neutral-600 border border-[#E7DEC8]"
                          }`}
                        >
                          <CreditCard className="w-4 h-4" />
                        </div>
                        <span className="font-jost font-bold text-sm text-neutral-900">
                          Return for Refund
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-neutral-500 mt-1 pl-9">
                      Return the item and get 100% refund to original payment source or Baha Coins.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2: Select Items in this Order (with Product Images) */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-xs uppercase tracking-wider font-extrabold text-neutral-500 font-jost block">
                    2. Select Item(s) to {requestType === "exchange" ? "Exchange" : "Return"}
                  </label>
                  <span className="text-[11px] text-neutral-400 font-medium font-jost">
                    {selectedItemIds.length} of {order.items.length} selected
                  </span>
                </div>

                <div className="space-y-3">
                  {order.items.map((item) => {
                    const isSelected = selectedItemIds.includes(item.id);

                    return (
                      <div
                        key={item.id}
                        className={`p-4 rounded-2xl border transition-all ${
                          isSelected
                            ? "bg-[#FAF8E8] border-[#0D03AE] shadow-2xs ring-1 ring-[#0D03AE]/15"
                            : "bg-[#FFFBF0]/60 border-[#E7DEC8] opacity-75"
                        }`}
                      >
                        <div className="flex items-start gap-3.5">
                          {/* Checkbox */}
                          <button
                            type="button"
                            onClick={() => handleToggleItem(item.id)}
                            className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-1 transition-colors cursor-pointer ${
                              isSelected
                                ? "bg-[#0D03AE] border-[#0D03AE] text-white"
                                : "border-neutral-400 bg-[#FAF8E8]"
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                          </button>

                          {/* Product Image */}
                          <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#FAF8E8] border border-[#E7DEC8] shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          </div>

                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            <h5 className="font-jost font-bold text-sm text-neutral-900 truncate">
                              {item.name}
                            </h5>
                            <div className="flex items-center gap-2 text-xs text-neutral-500 mt-0.5">
                              <span>
                                Current Size: <strong className="text-neutral-800">{item.size}</strong>
                              </span>
                              <span>&bull;</span>
                              <span>
                                Color: <strong className="text-neutral-800">{item.color}</strong>
                              </span>
                              <span>&bull;</span>
                              <span>
                                Qty: <strong className="text-neutral-800">{item.quantity}</strong>
                              </span>
                            </div>
                            <span className="font-jost font-extrabold text-sm text-[#0D03AE] block mt-1">
                              ₹{item.price * item.quantity}
                            </span>
                          </div>
                        </div>

                        {/* If Exchange is selected, show New Size Selector */}
                        {requestType === "exchange" && isSelected && (
                          <div className="mt-3 pt-3 border-t border-[#E7DEC8]/80 pl-8">
                            <div className="flex items-center gap-2 mb-2">
                              <Sparkles className="w-3.5 h-3.5 text-[#DC5513]" />
                              <span className="text-xs font-bold text-neutral-800 font-jost">
                                Choose Replacement Size:
                              </span>
                            </div>

                            <div className="flex flex-wrap gap-1.5 font-jost">
                              {AVAILABLE_SIZES.map((sz) => {
                                const isCurrentSize = sz === item.size;
                                const isChosenSize = exchangeSizes[item.id] === sz;

                                return (
                                  <button
                                    key={sz}
                                    type="button"
                                    onClick={() => handleSizeChange(item.id, sz)}
                                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                                      isChosenSize
                                        ? "bg-[#0D03AE] text-white shadow-2xs"
                                        : isCurrentSize
                                        ? "bg-neutral-100 text-neutral-400 border border-neutral-300 line-through"
                                        : "bg-[#FAF8E8] border border-[#E7DEC8] text-neutral-700 hover:border-[#0D03AE]"
                                    }`}
                                  >
                                    {sz} {isCurrentSize && "(Current)"}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Select Reason */}
              <div>
                <label className="text-xs uppercase tracking-wider font-extrabold text-neutral-500 font-jost block mb-2.5">
                  3. Reason for {requestType === "exchange" ? "Exchange" : "Return"}
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {EXCHANGE_REASONS.map((reason) => {
                    const isSelected = selectedReason === reason.id;

                    return (
                      <div
                        key={reason.id}
                        onClick={() => setSelectedReason(reason.id)}
                        className={`p-3 rounded-xl border text-xs font-medium cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? "bg-[#FAF8E8] border-[#0D03AE] font-bold text-[#0D03AE] shadow-2xs"
                            : "bg-[#FFFBF0]/60 border-[#E7DEC8] text-neutral-700 hover:bg-[#FAF8E8]"
                        }`}
                      >
                        <span>{reason.label}</span>
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-2 ${
                            isSelected
                              ? "bg-[#0D03AE] border-[#0D03AE]"
                              : "border-neutral-300 bg-[#FAF8E8]"
                          }`}
                        >
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Additional Comments Textarea */}
                <div className="mt-3">
                  <textarea
                    rows={2}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Additional notes or details (e.g. fit issue or defect description)..."
                    className="w-full p-3 rounded-2xl bg-[#FAF8E8] border border-[#E7DEC8] text-xs text-neutral-800 placeholder:text-neutral-400 outline-none focus:border-[#0D03AE] shadow-2xs font-secondary resize-none"
                  />
                </div>
              </div>

              {/* Step 4: Attach Defect / Product Images ("withimages") */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs uppercase tracking-wider font-extrabold text-neutral-500 font-jost block">
                    4. Attach Product Photos / Proof Images
                  </label>
                  <span className="text-[11px] text-neutral-400 font-medium">
                    Up to 5 images
                  </span>
                </div>

                <div className="space-y-3">
                  {/* Upload Dropzone */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="p-4 sm:p-5 rounded-2xl border-2 border-dashed border-[#E7DEC8] hover:border-[#0D03AE] bg-[#FFFBF0]/50 hover:bg-[#FAF8E8] transition-all cursor-pointer flex flex-col items-center justify-center text-center group"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#FAF8E8] border border-[#E7DEC8] flex items-center justify-center text-[#0D03AE] group-hover:scale-105 transition-transform shadow-2xs mb-2">
                      <Camera className="w-5 h-5 text-[#0D03AE]" />
                    </div>
                    <span className="font-jost text-xs sm:text-sm font-bold text-neutral-900">
                      Click to upload photos of the item / tag / defect
                    </span>
                    <span className="text-[11px] text-neutral-500 mt-0.5">
                      Supports JPG, PNG, WEBP (Clear photos expedite instant approval)
                    </span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>

                  {/* Uploaded Images Gallery Strip */}
                  {uploadedImages.length > 0 && (
                    <div className="flex flex-wrap gap-2.5 pt-1">
                      {uploadedImages.map((imgUrl, idx) => (
                        <div
                          key={idx}
                          className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-[#E7DEC8] group shadow-2xs"
                        >
                          <Image
                            src={imgUrl}
                            alt={`Uploaded proof ${idx + 1}`}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            aria-label="Remove image"
                            className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-rose-600 transition-colors shadow-xs"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Step 5: If Return, choose refund preference */}
              {requestType === "return" && (
                <div className="p-4 rounded-2xl bg-[#FAF8E8] border border-[#E7DEC8] space-y-3 font-jost">
                  <span className="text-xs uppercase tracking-wider font-extrabold text-neutral-600 block">
                    5. Refund Destination
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div
                      onClick={() => setRefundMode("original")}
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        refundMode === "original"
                          ? "bg-[#FAF8E8] border-[#0D03AE] shadow-2xs font-bold text-[#0D03AE]"
                          : "bg-[#FFFBF0] border-[#E7DEC8] text-neutral-700"
                      }`}
                    >
                      <span>Original Payment Method</span>
                      <p className="text-[11px] text-neutral-500 font-normal font-secondary mt-0.5">
                        Credited back to bank/card within 3-5 days of pickup.
                      </p>
                    </div>

                    <div
                      onClick={() => setRefundMode("coins")}
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        refundMode === "coins"
                          ? "bg-[#FAF8E8] border-[#0D03AE] shadow-2xs font-bold text-[#0D03AE]"
                          : "bg-[#FFFBF0] border-[#E7DEC8] text-neutral-700"
                      }`}
                    >
                      <span>Baha Wallet Coins</span>
                      <p className="text-[11px] text-neutral-500 font-normal font-secondary mt-0.5">
                        Instant credit with zero waiting time. Valid on all orders.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Reverse Pickup Address Confirmation */}
              <div className="p-3.5 rounded-2xl bg-[#FFFBF0] border border-[#E7DEC8] flex items-start gap-2.5 text-xs">
                <MapPin className="w-4 h-4 text-[#0D03AE] shrink-0 mt-0.5" />
                <div className="text-neutral-600">
                  <span className="font-bold text-neutral-900 font-jost block">
                    Pickup from: {order.deliveryAddress.name}
                  </span>
                  <span>
                    {order.deliveryAddress.street}, {order.deliveryAddress.city} &bull;{" "}
                    {order.deliveryAddress.phone}
                  </span>
                </div>
              </div>

              {/* Form Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3 font-jost">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full border border-[#E7DEC8] hover:bg-[#FAF8E8] text-xs font-bold text-neutral-700 transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting || selectedItemIds.length === 0}
                  className="px-6 py-2.5 rounded-full bg-[#0D03AE] hover:bg-[#DC5513] text-white text-xs font-bold transition-all shadow-xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
                >
                  {isSubmitting ? (
                    <span>Processing Request...</span>
                  ) : (
                    <>
                      <span>
                        Confirm {requestType === "exchange" ? "Exchange" : "Return"}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

