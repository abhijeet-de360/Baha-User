"use client";

import React, { useEffect } from "react";
import { LogOut, X, AlertCircle } from "lucide-react";
import { useScrollLock } from "@/lib/scroll-lock";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
}

export function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
  useScrollLock(isOpen);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLogout = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 select-none font-jost"
    >
      {/* Frosted Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div
        data-lenis-prevent="true"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm sm:max-w-md bg-[#fffcf6] rounded-3xl p-6 sm:p-7 shadow-2xl z-10 border border-[#E7DEC8] animate-in zoom-in-95 duration-200"
      >
        {/* Top Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 text-neutral-600 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Content */}
        <div className="flex flex-col items-center text-center">
          {/* Badge Icon */}
          <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200/80 text-rose-600 flex items-center justify-center mb-4 shadow-2xs">
            <LogOut className="w-6 h-6 ml-0.5" />
          </div>

          {/* Heading */}
          <h3 className="font-primary text-2xl text-neutral-900 mb-1.5">
            Log Out of Baha?
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-neutral-500 max-w-xs leading-relaxed mb-6 font-secondary">
            Are you sure you want to log out? You will need to sign back in to view your orders, saved kids&apos; sizes, and Baha Coins balance.
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 w-full">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-full border border-[#E7DEC8] bg-[#FAF8E8] hover:bg-[#EFE8DC] text-neutral-700 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="flex-1 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>Yes, Log Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

