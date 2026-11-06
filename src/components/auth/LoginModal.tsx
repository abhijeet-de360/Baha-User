"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, ArrowRight, ShieldCheck, Sparkles, Edit2, RotateCcw } from "lucide-react";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { useScrollLock } from "@/lib/scroll-lock";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(30);

  useScrollLock(isOpen);

  // Resend Countdown Timer (30s)
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (step === "otp" && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [step, resendTimer]);

  if (!isOpen) return null;

  const handleOtpChange = (index: number, val: string) => {
    val = val.replace(/\D/g, "");
    if (val.length > 1) val = val.slice(-1);

    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    // Auto-focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim() || phone.length < 10) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }
    setStep("otp");
    setResendTimer(30);
    setOtp(["", "", "", "", "", ""]);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp.length < 6) {
      alert("Please enter the complete 6-digit OTP");
      return;
    }
    // Verify & dismiss
    onClose();
  };

  const handleResendOtp = () => {
    if (resendTimer > 0) return;
    setResendTimer(30);
    setOtp(["", "", "", "", "", ""]);
  };

  const handleChangeNumber = () => {
    setStep("phone");
    setOtp(["", "", "", "", "", ""]);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 font-jost"
    >
      {/* Light Frosted Backdrop so the glass surface stays bright */}
      <div
        className="fixed inset-0 bg-neutral-900/25 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Liquid Glass Modal Container */}
      <div
        data-lenis-prevent="true"
        className="relative w-full max-w-md z-10 animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <LiquidGlass
          radius={32}
          bevelDepth={28}
          scale={80}
          aberration={0}
          frost={1}
          tint={0.04}
          className="border border-white/60 shadow-[0_20px_50px_rgba(25,30,45,0.14),0_8px_20px_rgba(0,0,0,0.06),inset_0_1.5px_2px_rgba(255,255,255,0.95),inset_0_-1px_1px_rgba(255,255,255,0.5)]"
          contentClassName="relative p-6 sm:p-8"
        >
          {/* Light Milk-Glass Body Underlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[32px] bg-white/75 backdrop-blur-xl"
          />

          {/* Specular Edge Highlights (matches Header liquid-glass lens) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[32px] bg-[linear-gradient(135deg,rgba(255,255,255,0.45),rgba(255,255,255,0.08)_35%,transparent_65%,rgba(255,255,255,0.25))]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-px rounded-[31px] border border-white/40 [mask-image:linear-gradient(135deg,black,transparent_35%,transparent_65%,black)]"
          />

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-neutral-800 shadow-xs border border-white/80 flex items-center justify-center transition-all cursor-pointer z-10 hover:scale-105 active:scale-95"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Brand Header */}
          <div className="relative z-10 text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#0D03AE] text-white shadow-[0_6px_20px_rgba(13,3,174,0.32),0_0_0_3px_#ffffff] mb-3 p-2">
              <div className="relative w-full h-full">
                <Image
                  src="/assets/logo.webp"
                  alt="Baha Kids"
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>
            </div>
            <h3 className="font-primary text-2xl sm:text-3xl text-neutral-900 leading-tight">
              {step === "phone" ? "Login with Mobile" : "Verify with OTP"}
            </h3>
            <p className="text-xs text-neutral-600 mt-1">
              {step === "phone"
                ? "Enter your mobile number to get an instant OTP for login"
                : "Enter the verification code to access your account"}
            </p>
          </div>

          {/* STEP 1: Enter Phone Number */}
          {step === "phone" && (
            <form onSubmit={handlePhoneSubmit} className="relative z-10 space-y-4 animate-in fade-in duration-200">
              <div>
                <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wide mb-1.5">
                  Mobile Number
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-xs font-bold text-neutral-600">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    className="w-full bg-white/90 backdrop-blur-md border border-black/10 rounded-2xl pl-12 pr-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-[#0D03AE] focus:bg-white focus:ring-2 focus:ring-[#0D03AE]/20 transition-all font-medium shadow-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-[#0D03AE] text-white text-xs font-bold transition-all duration-200 cursor-pointer shadow-md hover:shadow-[0_8px_25px_-4px_rgba(13,3,174,0.45)] hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 mt-4"
              >
                <span>Get OTP</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* STEP 2: Dedicated OTP Verification Step */}
          {step === "otp" && (
            <form onSubmit={handleOtpSubmit} className="relative z-10 space-y-5 animate-in fade-in duration-200">
              {/* Sent-to & Change Number Banner */}
              <div className="p-3.5 rounded-2xl bg-white/80 backdrop-blur-md border border-black/10 flex items-center justify-between gap-3 shadow-2xs">
                <div className="flex flex-col text-left">
                  <span className="text-[11px] text-neutral-500 font-medium">
                    We have sent an OTP to
                  </span>
                  <span className="text-xs font-bold text-neutral-900">
                    +91 {phone}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleChangeNumber}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-neutral-300 text-xs font-bold text-[#0D03AE] hover:border-[#0D03AE] transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Change</span>
                </button>
              </div>

              {/* 6-Digit OTP Box Grid */}
              <div>
                <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wide mb-2 text-center">
                  Enter 6-Digit OTP
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <input
                      key={i}
                      id={`otp-input-${i}`}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      autoFocus={i === 0}
                      value={otp[i]}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(i, e)}
                      className="w-full h-12 text-center text-lg font-bold bg-white/95 backdrop-blur-md border border-black/10 rounded-xl outline-none focus:border-[#0D03AE] focus:bg-white focus:ring-2 focus:ring-[#0D03AE]/20 transition-all text-neutral-900 shadow-2xs"
                    />
                  ))}
                </div>
              </div>

              {/* Resend Timer & Action */}
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-neutral-500">
                  Didn&apos;t receive the code?
                </span>
                {resendTimer > 0 ? (
                  <span className="font-bold text-neutral-600">
                    Resend in <strong className="text-[#0D03AE] font-black">{resendTimer}s</strong>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="flex items-center gap-1 font-bold text-[#0D03AE] hover:underline cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Resend OTP</span>
                  </button>
                )}
              </div>

              {/* Verify & Sign In Action */}
              <button
                type="submit"
                className="w-full py-3 rounded-full bg-[#0D03AE] text-white text-xs font-bold transition-all duration-200 cursor-pointer shadow-md hover:shadow-[0_8px_25px_-4px_rgba(13,3,174,0.45)] hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 mt-3"
              >
                <span>Verify &amp; Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </LiquidGlass>
      </div>
    </div>
  );
};
