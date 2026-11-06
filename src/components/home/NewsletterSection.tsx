"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;
    setSubmitted(true);
    setTimeout(() => {
      setEmail("");
      setSubmitted(false);
    }, 3500);
  };

  return (
    <>
      {/* Top Spacer Section: width full, height 100px, padding-bottom 10 (pb-10) */}
      <section className="w-full h-[100px] pb-10" />

      <section className="relative w-full overflow-hidden bg-[#FCF6E6] pt-10 sm:pt-14 md:pt-16 pb-0 flex flex-col justify-between min-h-[440px] sm:min-h-[500px]">
        {/* Top Scallop Wave Divider */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-10 w-full overflow-hidden leading-none text-white"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 1440 48"
            preserveAspectRatio="none"
            className="relative block w-full h-7 sm:h-9 md:h-12 text-white fill-current"
          >
            <path d="M0,0 L1440,0 L1440,20 C1395,42 1365,42 1320,20 C1275,0 1245,0 1200,20 C1155,42 1125,42 1080,20 C1035,0 1005,0 960,20 C915,42 885,42 840,20 C795,0 765,0 720,20 C675,42 645,42 600,20 C555,0 525,0 480,20 C435,42 405,42 360,20 C315,0 285,0 240,20 C195,42 165,42 120,20 C75,0 45,0 0,20 Z" />
          </svg>
        </div>

        {/* Center Content Section */}
        <div className="relative z-30 w-full max-w-3xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center pt-2 sm:pt-4">
          {/* Main Heading */}
          <h2 className="font-primary text-4xl sm:text-5xl md:text-6xl tracking-tight text-[#0D03AE] flex items-center justify-center gap-2.5 sm:gap-3.5 flex-wrap">
            <span>Join Our</span>
            <span className="text-[#FF6B00]">Little</span>
            <span>Family</span>
            {/* Whimsical Heart Outline */}
            <svg
              className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 text-[#FF6B00] inline-block -rotate-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </h2>

          {/* Subtitle */}
          <p className="mt-2.5 sm:mt-3 text-sm sm:text-base md:text-lg text-[#556987] font-medium max-w-xl mx-auto leading-relaxed">
            Get exclusive offers, new arrivals and parenting tips straight to your inbox!
          </p>

          {/* Email Subscription Form Pill */}
          <form
            onSubmit={handleSubmit}
            suppressHydrationWarning
            className="mt-6 sm:mt-7 w-full max-w-xl mx-auto"
          >
            <div className="relative flex items-center bg-white rounded-full p-1.5 sm:p-2 border-2 border-[#0D03AE]/15 shadow-[0_8px_25px_rgba(13,3,174,0.08)] hover:border-[#0D03AE]/30 transition-all">
              <input
                type="email"
                required
                suppressHydrationWarning
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full bg-transparent pl-4 sm:pl-6 pr-3 py-2.5 sm:py-3 text-sm sm:text-base text-gray-800 placeholder-gray-400 focus:outline-none font-medium"
              />
              <button
                type="submit"
                disabled={submitted}
                className="font-primary flex-shrink-0 inline-flex items-center justify-center gap-1.5 sm:gap-2 px-5 sm:px-7 py-2.5 sm:py-3 bg-[#0D03AE] hover:bg-[#090280] text-white text-base sm:text-lg rounded-full shadow-md transition-all active:scale-95 disabled:opacity-80"
              >
                {submitted ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#86efac]" />
                    <span>Subscribed!</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Feature Badges under input */}
          <div className="mt-4 sm:mt-5 flex items-center justify-center flex-wrap gap-x-4 sm:gap-x-6 gap-y-2 text-xs sm:text-sm font-semibold text-[#4A5568]">
            <span className="inline-flex items-center gap-1.5">
              <span className="flex items-center justify-center w-4 h-4 rounded-full bg-[#FF6B00] text-white">
                <svg className="w-2.5 h-2.5" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M2.5 6L5 8.5L9.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              Special Discounts
            </span>

            <span className="inline-flex items-center gap-1.5">
              <span className="flex items-center justify-center w-4 h-4 rounded-full bg-[#FF6B00] text-white">
                <svg className="w-2.5 h-2.5" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M2.5 6L5 8.5L9.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              New Arrivals
            </span>

            <span className="inline-flex items-center gap-1.5">
              <span className="flex items-center justify-center w-4 h-4 rounded-full bg-[#FF6B00] text-white">
                <svg className="w-2.5 h-2.5" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M2.5 6L5 8.5L9.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              Parenting Tips
            </span>

            <span className="inline-flex items-center gap-1.5">
              <span className="flex items-center justify-center w-4 h-4 rounded-full bg-[#FF6B00] text-white">
                <svg className="w-2.5 h-2.5" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M2.5 6L5 8.5L9.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              No Spam, We Promise!
            </span>
          </div>
        </div>

        {/* Left Illustration / Element: Bottom Left on top of all sections */}
        <div className="absolute left-0 sm:left-4 md:left-6 lg:left-10 bottom-0 z-30 pointer-events-none select-none">
          <Image
            src="/assets/newsletter2.webp"
            alt="Baha Newsletter Illustration"
            width={480}
            height={480}
            priority
            style={{ height: "auto" }}
            className="w-[200px] sm:w-[270px] md:w-[340px] lg:w-[400px] xl:w-[460px] object-contain drop-shadow-md"
          />
        </div>

        {/* Mascot / Character Illustration: Bottom Right on top of all sections */}
        <div className="absolute -right-2 bottom-0 z-30 pointer-events-none select-none">
          <Image
            src="/assets/newsletter1.webp"
            alt="Baha Newsletter Mascot"
            width={460}
            height={460}
            priority
            style={{ height: "auto" }}
            className="w-[200px] sm:w-[280px] md:w-[350px] lg:w-[420px] xl:w-[460px] object-contain drop-shadow-md"
          />
        </div>

        {/* Main Landscape Container: 100% width flush bottom */}
        <div className="relative w-full bg-[#fde2adb9] mx-auto flex flex-col items-center h-[190px] sm:h-[220px] z-10 mt-auto overflow-hidden">
          {/* Uneven organic undulating wave dipping to 15% in the center */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-10 w-full overflow-hidden leading-none text-[#FCF6E6]"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 1440 200"
              preserveAspectRatio="none"
              className="relative block w-full h-[190px] sm:h-[220px] text-[#FCF6E6] fill-current"
            >
              {/* Left side has organic ups & downs (peaks around y=140-150 / 25-30% height, troughs at y=175), dips to touch bottom at y=200, then rises curvy on right */}
              <path d="M0,0 L1440,0 L1440,10 C1380,85 1310,-10 1230,95 C1160,175 1090,130 1020,175 C950,200 900,200 850,200 L590,200 C530,200 480,180 430,158 C380,136 340,172 290,175 C240,178 200,140 150,142 C100,144 60,168 0,150 Z" />
            </svg>
          </div>

        </div>
        {/* Soften the landscape edge into the matching cream trust section. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-7 bg-gradient-to-t from-[#FCF6E6] to-transparent" />
      </section>
    </>
  );
}
