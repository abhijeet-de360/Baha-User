"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Sparkles,
  ShieldCheck,
  Smile,
  ArrowRight,
  Sun,
  Leaf,
  CheckCircle2,
  Package,
  Award,
  Scissors,
  Users,
  Compass,
  ChevronRight,
  Baby,
} from "lucide-react";

const GARMENT_FEATURES = [
  {
    id: "envelope-neck",
    title: "Origami Envelope Neckline",
    subtitle: "Blowout-Proof Dressing",
    description:
      "Engineered with overlapping shoulder flaps that glide down over baby's torso instead of pulling up over a messy head during diaper blowouts. Easy on, easy off, zero tears.",
    badge: "Parent Favorite",
    tag: "Origami Stretch",
    icon: Baby,
    color: "from-[#EDE5FA] to-[#FFFBF0]",
    accentColor: "#0D03AE",
    image: "/assets/temp/baby1.webp",
  },
  {
    id: "tagless",
    title: "Zero-Scratch Tagless Design",
    subtitle: "100% Gentle on Delicate Nape",
    description:
      "No scratchy woven nylon labels digging into tender baby necks. All sizing and care instructions are silk-screened directly onto fabric using water-based, non-toxic inks.",
    badge: "Eczema Friendly",
    tag: "Heat-Transferred",
    icon: Scissors,
    color: "from-[#FFE4CF] to-[#FFFBF0]",
    accentColor: "#DC5513",
    image: "/assets/temp/baby2.webp",
  },
  {
    id: "quick-snaps",
    title: "Nickel-Free YKK Snaps",
    subtitle: "5-Second Diaper Changes",
    description:
      "Smooth, rounded nickel-free snaps coated in baby-safe enamel. We use a 3-snap quick glide layout so you never have to fumble with 12 confusing buttons in pitch dark at 3:00 AM.",
    badge: "Hypoallergenic",
    tag: "Zero-Rust",
    icon: ShieldCheck,
    color: "from-[#E8EEDC] to-[#FFFBF0]",
    accentColor: "#596F3D",
    image: "/assets/temp/baby3.webp",
  },
  {
    id: "grow-cuffs",
    title: "Grow-With-Me Roll Cuffs",
    subtitle: "2x Longer Wearable Life",
    description:
      "Extra-long 100% rib-knit ankle and wrist cuffs that roll down as baby sprouts. Designed to comfortably stretch through 2 full growth spurts, saving you money and closet space.",
    badge: "Eco Value",
    tag: "Extra Stretch",
    icon: Sparkles,
    color: "from-[#FFF8E0] to-[#FFFBF0]",
    accentColor: "#B48312",
    image: "/assets/temp/baby4.webp",
  },
];

const TIMELINE_MILESTONES = [
  {
    year: "May 2023",
    title: "The 2:00 AM Nursery Epiphany",
    description:
      "Frustrated by scratchy neck tags and tight collar holes on our 4-month-old daughter Rhea, we took to the kitchen table with our first bolt of unbleached GOTS organic cotton muslin.",
    tag: "Day One",
  },
  {
    year: "Nov 2023",
    title: "The Dermatologist Safety Badge",
    description:
      "Partnered with leading organic knitters in Coimbatore to achieve 100% hypoallergenic, OEKO-TEX Class 1 certification. Safe even for the most sensitive newborn skin.",
    tag: "Zero Toxins",
  },
  {
    year: "Oct 2024",
    title: "10,000 Smiles Across India",
    description:
      "Word of mouth spread like wildfire among conscious parents. We launched our signature festive baby kurta collection and signature grow-with-me rompers nationwide.",
    tag: "Community",
  },
  {
    year: "Today",
    title: "The Baha Family (45,000+ Strong)",
    description:
      "Still family-owned, still strictly plastic-free. Dressing little bundles of joy from their very first hospital ride home to their first adventurous sandbox run.",
    tag: "Present",
  },
];

const PARENT_TESTIMONIALS = [
  {
    quote:
      "As a pediatrician and first-time mom, I am ultra picky about baby fabrics. Baha rompers are buttery soft, breathe exceptionally well in hot weather, and don't shrink like high-street brands.",
    name: "Dr. Aarti Nair",
    child: "Mom to 8-Month-Old Kabir",
    city: "Mumbai",
    avatar: "/assets/temp/review-photo1.webp",
    rating: 5,
  },
  {
    quote:
      "The envelope neckline alone has saved our rugs from three major diaper catastrophes! You can literally roll the outfit down over the shoulders without touching baby's head. Genius design.",
    name: "Vikrant & Sanya",
    child: "Parents of 1-Year-Old Twins",
    city: "Bengaluru",
    avatar: "/assets/temp/review-photo2.webp",
    rating: 5,
  },
  {
    quote:
      "The seeded plantable tag was such a magical touch. We planted Rhea's first birthday romper tag in a little balcony pot, and now we have cheerful yellow marigolds blooming!",
    name: "Meera Khurana",
    child: "Mom to 14-Month-Old Rhea",
    city: "New Delhi",
    avatar: "/assets/temp/review-photo3.webp",
    rating: 5,
  },
];

export default function OurStoryPage() {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <div className="min-h-screen bg-[#fffcf6] text-[#292240] pt-24 sm:pt-28 pb-36 sm:pb-28 lg:pb-24 px-4 sm:px-6 lg:px-12 select-none overflow-x-hidden font-secondary">
      <div className="w-full max-w-[1600px] mx-auto space-y-16 sm:space-y-24">
        {/* ========================================================= */}
        {/* BREADCRUMB & HERO HEADER */}
        {/* ========================================================= */}
        <section className="relative pt-2">
          {/* Decorative floating mascot doodles */}
          <div className="hidden lg:block absolute -top-4 right-10 w-28 h-28 pointer-events-none opacity-85">
            <Image
              src="/assets/bunny.webp"
              alt="Cute playful bunny mascot"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Breadcrumb */}
          <nav className="text-xs sm:text-sm text-[#786C65] flex items-center gap-2 mb-6 font-jost">
            <Link href="/" className="hover:text-[#0D03AE] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#0D03AE] font-semibold">Our Story</span>
          </nav>

          {/* Main Hero Header Card */}
          <div className="relative rounded-3xl p-6 sm:p-10 md:p-14 bg-[#FFFBF0] border border-[#E7DEC8] shadow-xs text-center overflow-hidden">
            {/* Subtle decorative background gradient circles */}
            <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#FFE4CF]/40 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-[#EDE5FA]/40 blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto space-y-5">
              {/* Motherly Love Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFE4CF] text-[#DC5513] text-xs sm:text-sm font-bold font-jost shadow-2xs">
                <Heart className="w-4 h-4 fill-current" />
                <span>Crafted by Parents &bull; Loved by Littles</span>
              </div>

              {/* Display Headline */}
              <h1 className="font-primary text-3xl sm:text-5xl md:text-6xl text-[#0D03AE] leading-tight tracking-tight">
                Because Early Childhood Is Too Short for Scratchy Clothes.
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base md:text-lg text-[#786C65] leading-relaxed max-w-2xl mx-auto font-jost">
                Born out of 2:00 AM nursery fumbles, milk dribbles, and a simple desire:
                clothes that feel as gentle as a parent&apos;s warm embrace, sturdy enough
                for living room gymnastics, and whimsical enough for pure belly laughs.
              </p>

              {/* 4 Stat Highlights in Organic Capsule Badges */}
              <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto font-jost">
                <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF8E8] border border-[#E7DEC8] text-center shadow-2xs">
                  <span className="block font-primary text-2xl sm:text-3xl text-[#0D03AE]">
                    100%
                  </span>
                  <span className="text-xs font-semibold text-neutral-600 block mt-0.5">
                    GOTS Organic Cotton
                  </span>
                </div>

                <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF8E8] border border-[#E7DEC8] text-center shadow-2xs">
                  <span className="block font-primary text-2xl sm:text-3xl text-[#DC5513]">
                    Zero
                  </span>
                  <span className="text-xs font-semibold text-neutral-600 block mt-0.5">
                    Scratchy Neck Tags
                  </span>
                </div>

                <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF8E8] border border-[#E7DEC8] text-center shadow-2xs">
                  <span className="block font-primary text-2xl sm:text-3xl text-[#596F3D]">
                    45,000+
                  </span>
                  <span className="text-xs font-semibold text-neutral-600 block mt-0.5">
                    Happy Baha Babies
                  </span>
                </div>

                <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF8E8] border border-[#E7DEC8] text-center shadow-2xs">
                  <span className="block font-primary text-2xl sm:text-3xl text-[#B48312]">
                    100%
                  </span>
                  <span className="text-xs font-semibold text-neutral-600 block mt-0.5">
                    Plantable Seed Tags
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* CHAPTER 1: THE ORIGIN STORY COLLAGE */}
        {/* ========================================================= */}
        <section className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left: Polaroid Style Photo Collage */}
            <div className="lg:col-span-6 relative">
              {/* Floating Sticker */}
              <div className="absolute -top-6 -left-4 sm:-left-6 w-16 sm:w-20 h-16 sm:h-20 z-20 pointer-events-none drop-shadow-md">
                <Image
                  src="/assets/icecream.webp"
                  alt="Ice cream sticker"
                  fill
                  className="object-contain"
                />
              </div>

              {/* Main Photo (Tilted Polaroid) */}
              <div className="relative p-3.5 sm:p-4 bg-white rounded-3xl shadow-[0_16px_36px_rgba(25,30,45,0.12)] border border-[#E7DEC8] rotate-[-2deg] transition-transform hover:rotate-0 duration-300">
                <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#FAF8E8]">
                  <Image
                    src="/assets/temp/baby1.webp"
                    alt="Baby dressed in organic cotton Baha romper"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="pt-3 px-2 flex items-center justify-between">
                  <div>
                    <span className="font-primary text-base sm:text-lg text-neutral-900 block leading-tight">
                      Prototype No. 1: Pure Unbleached Cotton
                    </span>
                    <span className="text-[11px] text-neutral-500 font-jost">
                      Rhea tested &bull; Bangalore, 2023
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#FFF8E0] text-[#DC5513] text-[10px] font-bold border border-[#FED174]/60 font-jost">
                    Where it all began
                  </span>
                </div>
              </div>

              {/* Secondary Overlapping Mini Polaroid */}
              <div className="hidden sm:block absolute -bottom-8 -right-4 w-52 sm:w-60 p-2.5 bg-white rounded-2xl shadow-[0_14px_30px_rgba(25,30,45,0.14)] border border-[#E7DEC8] rotate-[4deg] transition-transform hover:rotate-0 duration-300 z-10">
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#FAF8E8]">
                  <Image
                    src="/assets/temp/baby3.webp"
                    alt="Organic cotton fabric swatch testing"
                    fill
                    sizes="240px"
                    className="object-cover"
                  />
                </div>
                <span className="text-[10px] text-neutral-600 font-bold block pt-1.5 text-center font-jost">
                  Testing breathable weaves in Coimbatore
                </span>
              </div>
            </div>

            {/* Right: Narrative Story Text */}
            <div className="lg:col-span-6 space-y-5 text-sm sm:text-base text-[#4A4458] leading-relaxed font-jost">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDE5FA] text-[#0D03AE] text-xs font-bold font-jost">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Baha Story &bull; Chapter 1</span>
              </div>

              <h2 className="font-primary text-3xl sm:text-4xl text-[#0D03AE] leading-tight">
                How a Fussy Toddler &amp; 14 Tight Snaps Sparked a Revolution.
              </h2>

              <p>
                Like many parenting ideas, Baha didn&apos;t hatch in a shiny corporate studio.
                It was born in a dimly lit bedroom at <strong>2:14 AM</strong>, with a teary-eyed
                baby and two exhausted parents wrestling with a row of 14 misaligned, stiff metal snaps.
              </p>

              <p>
                When our daughter Rhea arrived, we noticed something troubling: most baby clothes
                in store racks were either stiff synthetic polyester blends masquerading as &ldquo;cute,&rdquo;
                or had thick abrasive care tags stitched right where a newborn rests their sensitive neck.
              </p>

              <p>
                We asked ourselves: <em>Why should dressing your child feel like cracking a safe?</em> Why
                can&apos;t babywear celebrate the joyful, messy chaos of early childhood — mango stains,
                muddy knee crawls, and quick car-boot diaper swaps — without sacrificing silky skin comfort?
              </p>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFBF0] border border-[#E7DEC8] space-y-2">
                <h4 className="font-bold text-neutral-900 text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0D03AE]" />
                  <span>The Baha Golden Rule</span>
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  If it isn&apos;t soft enough for our own child to sleep soundly in for 12 hours,
                  we will never put it in your baby&apos;s drawer. Period.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* CHAPTER 2: INTERACTIVE GARMENT ANATOMY INNOVATION */}
        {/* ========================================================= */}
        <section className="space-y-8 pt-4">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E8EEDC] text-[#596F3D] text-xs font-bold font-jost">
              <Award className="w-3.5 h-3.5" />
              <span>Thoughtful Engineering</span>
            </div>
            <h2 className="font-primary text-3xl sm:text-4xl text-[#0D03AE]">
              The Anatomy of a Better Baby Romper
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 font-jost">
              Click through the 4 mindful innovations built into every single Baha garment.
            </p>
          </div>

          {/* Interactive Feature Selector */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center font-jost">
            {/* Left Tabs (Span 5) */}
            <div className="lg:col-span-5 space-y-3">
              {GARMENT_FEATURES.map((feature, idx) => {
                const IconComponent = feature.icon;
                const isSelected = activeFeature === idx;

                return (
                  <div
                    key={feature.id}
                    onClick={() => setActiveFeature(idx)}
                    className={`p-4 sm:p-5 rounded-3xl border transition-all duration-200 cursor-pointer text-left select-none group ${
                      isSelected
                        ? "bg-[#FAF8E8] border-[#0D03AE] shadow-[0_8px_24px_rgba(13,3,174,0.10)] ring-2 ring-[#0D03AE]/15"
                        : "bg-[#FFFBF0]/70 border-[#E7DEC8] hover:border-[#DC5513]/40 hover:bg-[#FAF8E8]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-8 h-8 rounded-xl flex items-center justify-center text-white shrink-0 shadow-2xs"
                          style={{ backgroundColor: feature.accentColor }}
                        >
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="font-bold text-sm sm:text-base text-neutral-900 group-hover:text-[#0D03AE] transition-colors">
                          {feature.title}
                        </h3>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-[#FAF8E8] border border-[#E7DEC8] text-[10px] font-bold text-neutral-600">
                        {feature.badge}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-500 pl-10.5 line-clamp-2">
                      {feature.subtitle} &mdash; {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Right Stage Display (Span 7) */}
            <div className="lg:col-span-7">
              <div className="relative rounded-3xl p-6 sm:p-8 bg-[#FFFBF0] border border-[#E7DEC8] shadow-xs overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  {/* Photo with Accent Tag */}
                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#FAF8E8] border border-[#E7DEC8] shadow-2xs">
                    <Image
                      src={GARMENT_FEATURES[activeFeature].image}
                      alt={GARMENT_FEATURES[activeFeature].title}
                      fill
                      sizes="(max-width: 768px) 100vw, 360px"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[11px] font-bold text-neutral-800 shadow-xs border border-[#E7DEC8]">
                      {GARMENT_FEATURES[activeFeature].tag}
                    </div>
                  </div>

                  {/* Feature Narrative & Benefits */}
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE4CF] text-[#DC5513] text-xs font-bold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{GARMENT_FEATURES[activeFeature].badge}</span>
                    </div>

                    <h3 className="font-primary text-2xl sm:text-3xl text-neutral-900 leading-tight">
                      {GARMENT_FEATURES[activeFeature].title}
                    </h3>

                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-secondary">
                      {GARMENT_FEATURES[activeFeature].description}
                    </p>

                    <div className="pt-2 border-t border-[#E7DEC8] space-y-2 text-xs text-neutral-700">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Pre-shrunk organic cotton jersey</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Tested for 50+ machine washes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Passed Bureau of Indian Standards (BIS)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* CHAPTER 3: FROM SEED TO SWADDLE (CONSCIOUS CRAFT) */}
        {/* ========================================================= */}
        <section className="rounded-3xl p-6 sm:p-10 md:p-12 bg-[#FFFBF0] border border-[#E7DEC8] shadow-xs space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E7DEC8]">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EDE5FA] text-[#0D03AE] text-xs font-bold font-jost mb-2">
                <Leaf className="w-3.5 h-3.5" />
                <span>Earth-Kind Promise</span>
              </div>
              <h2 className="font-primary text-3xl sm:text-4xl text-[#0D03AE] leading-tight">
                From Seed to Swaddle: The Clean Lifecycle
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-md font-jost">
              We care just as deeply about the world our babies will inherit as we do about the clothes they wear today.
            </p>
          </div>

          {/* 4 Process Step Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 font-jost">
            {/* Step 1 */}
            <div className="p-5 rounded-2xl bg-[#FAF8E8] border border-[#E7DEC8] space-y-3 relative group hover:border-[#0D03AE]/40 transition-colors">
              <span className="font-primary text-3xl text-[#0D03AE]/30 block leading-none">
                01
              </span>
              <div className="w-10 h-10 rounded-xl bg-[#EDE5FA] text-[#0D03AE] flex items-center justify-center font-bold">
                <Leaf className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-neutral-900">
                Rainfed Organic Cotton
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed font-secondary">
                Hand-harvested from certified organic co-ops in Gujarat and Tamil Nadu.
                No GMO seeds, no synthetic pesticides, consuming 80% less groundwater.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-2xl bg-[#FAF8E8] border border-[#E7DEC8] space-y-3 relative group hover:border-[#DC5513]/40 transition-colors">
              <span className="font-primary text-3xl text-[#DC5513]/30 block leading-none">
                02
              </span>
              <div className="w-10 h-10 rounded-xl bg-[#FFE4CF] text-[#DC5513] flex items-center justify-center font-bold">
                <Sun className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-neutral-900">
                Non-Toxic Vegetable Inks
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed font-secondary">
                Whimsical hand-drawn botanical illustrations dyed with zero heavy metals,
                zero formaldehyde, and zero harsh bleaches.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-2xl bg-[#FAF8E8] border border-[#E7DEC8] space-y-3 relative group hover:border-[#596F3D]/40 transition-colors">
              <span className="font-primary text-3xl text-[#596F3D]/30 block leading-none">
                03
              </span>
              <div className="w-10 h-10 rounded-xl bg-[#E8EEDC] text-[#596F3D] flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-neutral-900">
                Fair-Wage Women Artisans
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed font-secondary">
                Stitched with pride in safe, sunlit ateliers powered by rooftop solar.
                Every artisan receives above-market wages, childcare stipends, and medical coverage.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-5 rounded-2xl bg-[#FAF8E8] border border-[#E7DEC8] space-y-3 relative group hover:border-[#B48312]/40 transition-colors">
              <span className="font-primary text-3xl text-[#B48312]/30 block leading-none">
                04
              </span>
              <div className="w-10 h-10 rounded-xl bg-[#FFF8E0] text-[#B48312] flex items-center justify-center font-bold">
                <Package className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-neutral-900">
                100% Home-Compostable
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed font-secondary">
                No single-use plastic tape or cellophane wraps. We ship in biodegradable
                cornstarch mailers with seeded paper hangtags you can bury in soil!
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* CHAPTER 4: THE TIMELINE JOURNEY */}
        {/* ========================================================= */}
        <section className="space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FFE4CF] text-[#DC5513] text-xs font-bold font-jost">
              <Compass className="w-3.5 h-3.5" />
              <span>Our Footsteps</span>
            </div>
            <h2 className="font-primary text-3xl sm:text-4xl text-[#0D03AE]">
              Milestones Along the Way
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 font-jost">
              From a dining room table in Bengaluru to thousands of nursery drawers across India.
            </p>
          </div>

          {/* Timeline Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-jost relative">
            {TIMELINE_MILESTONES.map((item, idx) => (
              <div
                key={item.year}
                className="p-5 sm:p-6 rounded-3xl bg-[#FFFBF0] border border-[#E7DEC8] shadow-2xs relative flex flex-col justify-between group hover:border-[#0D03AE] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-bold text-xs px-2.5 py-1 rounded-full bg-[#0D03AE] text-white">
                      {item.year}
                    </span>
                    <span className="text-[11px] font-bold text-[#DC5513] bg-[#FFE4CF]/70 px-2 py-0.5 rounded-md">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="font-primary text-xl text-neutral-900 mb-2 leading-tight">
                    {item.title}
                  </h3>

                  <p className="text-xs text-neutral-600 leading-relaxed font-secondary">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#E7DEC8]/60 flex items-center justify-between text-[11px] text-neutral-400 font-semibold">
                  <span>Chapter {idx + 1}</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* CHAPTER 5: REAL PARENT EXPERIENCES */}
        {/* ========================================================= */}
        <section className="space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EDE5FA] text-[#0D03AE] text-xs font-bold font-jost">
              <Smile className="w-3.5 h-3.5" />
              <span>Real Parent Voices</span>
            </div>
            <h2 className="font-primary text-3xl sm:text-4xl text-[#0D03AE]">
              Loved in Living Rooms Everywhere
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 font-jost">
              Here is what real doctors, dads, and moms have to say about their little ones in Baha.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-jost">
            {PARENT_TESTIMONIALS.map((t, idx) => (
              <div
                key={t.name + idx}
                className="p-6 rounded-3xl bg-[#FFFBF0] border border-[#E7DEC8] shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 text-amber-500 text-sm">
                    {"★".repeat(t.rating)}
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed italic font-secondary">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                {/* Parent Profile */}
                <div className="pt-4 border-t border-[#E7DEC8] flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden bg-[#FAF8E8] border border-[#E7DEC8] shrink-0">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-neutral-900 leading-tight">
                      {t.name}
                    </h4>
                    <span className="text-[11px] text-neutral-500 block">
                      {t.child} &bull; {t.city}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* CHAPTER 6: FOUNDERS' PERSONAL LETTER */}
        {/* ========================================================= */}
        <section className="relative rounded-3xl p-6 sm:p-10 md:p-14 bg-[#FAF8E8] border border-[#E7DEC8] shadow-xs overflow-hidden">
          {/* Subtle mascot handprint stamp */}
          <div className="hidden sm:block absolute right-8 top-8 w-24 h-24 pointer-events-none opacity-20">
            <Image
              src="/assets/handprint.webp"
              alt="Baby handprint stamp"
              fill
              className="object-contain"
            />
          </div>

          <div className="max-w-3xl mx-auto space-y-6 text-center">
            <span className="font-primary text-2xl sm:text-3xl text-[#DC5513] block">
              A Personal Note from Our Family to Yours
            </span>

            <p className="text-xs sm:text-sm md:text-base text-neutral-700 leading-relaxed font-secondary">
              &ldquo;Thank you for letting Baha be part of your baby&apos;s sweetest, most fleeting moments &mdash;
              from the quiet sleepy cuddles in hospital blankets to the messy smash-cake first birthdays.
              We promise to keep stitching with the same devotion, obsessive softness, and gentle care
              that we gave our very first romper on our kitchen counter.&rdquo;
            </p>

            <div className="pt-2">
              <span className="font-primary text-2xl text-[#0D03AE] block">
                Abhijeet &amp; The Baha Family
              </span>
              <span className="text-xs text-neutral-500 font-jost mt-0.5 block">
                Founders &bull; Baha Kids &bull; Bengaluru, India
              </span>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* CHAPTER 7: CALL TO ACTION BANNER */}
        {/* ========================================================= */}
        <section className="relative rounded-3xl p-8 sm:p-12 md:p-16 bg-[#0D03AE] text-white text-center shadow-lg overflow-hidden font-jost">
          {/* Background whimsical accents */}
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-[#DC5513]/30 blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-white text-xs font-bold backdrop-blur-xs">
              <Sparkles className="w-4 h-4 text-[#FED174]" />
              <span>Experience The Difference</span>
            </div>

            <h2 className="font-primary text-3xl sm:text-5xl text-white leading-tight">
              Ready to Wrap Your Little One in Pure Cloud Softness?
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-white/80 max-w-lg mx-auto font-secondary leading-relaxed">
              Explore our new arrivals: gentle envelope-neck rompers, playful coord sets, and festive baby kurtas.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/products"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#DC5513] hover:bg-[#c4490f] text-white font-bold text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Baby Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/#ethnic-wear"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/15 hover:bg-white/25 text-white font-bold text-sm transition-all border border-white/25 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Festive Ethnic Wear</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Reassurance Badges */}
            <div className="pt-6 border-t border-white/15 flex flex-wrap items-center justify-center gap-6 text-xs text-white/80 font-secondary">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#FED174]" />
                <span>Free Shipping over ₹499</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#FED174]" />
                <span>7-Day Hassle-Free Returns</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#FED174]" />
                <span>100% Cotton Comfort Guarantee</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
