"use client";

import React, { useEffect } from "react";
import { X, Truck, ShieldCheck, HelpCircle } from "lucide-react";
import { LiveShipmentData } from "@/data/shipmentTracking";
import { ShipmentMilestoneTimeline } from "./ShipmentMilestoneTimeline";
import { useScrollLock } from "@/lib/scroll-lock";

interface LiveTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  shipment: LiveShipmentData | null;
}

export function LiveTrackingModal({
  isOpen,
  onClose,
  shipment,
}: LiveTrackingModalProps) {
  // Prevent background scrolling when modal is visible
  useScrollLock(isOpen);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !shipment) return null;

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
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-[#FFFDF7] rounded-3xl border border-[#E7DEC8] shadow-[0_24px_60px_rgba(25,30,45,0.25)] flex flex-col overflow-hidden z-10 animate-in zoom-in-95 fade-in duration-200 font-jost">
        {/* Sticky Header */}
        <div className="px-5 sm:px-6 py-4 bg-[#FFFBF0] border-b border-[#E7DEC8] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0D03AE] text-white flex items-center justify-center shadow-xs">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-primary text-lg sm:text-xl text-neutral-900 leading-tight">
                  Track Order
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#FAF8E8] border border-[#E7DEC8] text-[11px] font-bold text-neutral-700 font-mono">
                  #{shipment.orderNumber}
                </span>
              </div>
              <p className="text-xs text-neutral-500 font-secondary mt-0.5">
                Real-time milestone tracking via {shipment.courier}
              </p>
            </div>
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Tracking Modal"
            className="w-9 h-9 rounded-full bg-[#FAF8E8] hover:bg-[#FAF8E8]/80 border border-[#E7DEC8] flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Milestone Content */}
        <div
          data-lenis-prevent="true"
          className="flex-1 overflow-y-auto p-5 sm:p-6 no-scrollbar"
        >
          <ShipmentMilestoneTimeline shipment={shipment} />
        </div>

        {/* Footer */}
        <div className="px-5 sm:px-6 py-3.5 bg-[#FFFBF0] border-t border-[#E7DEC8] flex items-center justify-between gap-3 shrink-0 text-xs font-secondary text-neutral-600">
          <a
            href="/contact-us"
            className="flex items-center gap-1.5 hover:text-[#0D03AE] transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5 text-neutral-400" />
            <span>Need Help with Delivery?</span>
          </a>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#0D03AE] hover:bg-[#DC5513] text-white font-bold transition-colors cursor-pointer shadow-xs font-jost"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

