import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Sparkles, ShieldCheck, Smile, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Our Story | Baha Kids",
  description: "Learn about the heart behind Baha Kids: gentle organic cotton, thoughtful baby designs, and playful everyday memories.",
};

export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-[#fffcf6] text-[#292240] pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-12 select-none">
      <div className="w-full max-w-[1600px] mx-auto space-y-12">
        {/* Breadcrumb Navigation */}
        <nav className="text-xs sm:text-sm text-[#786C65] flex items-center gap-2">
          <Link href="/" className="hover:text-[#0D03AE] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#0D03AE] font-medium">Our Story</span>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFE4CF] text-[#DC5513] text-xs sm:text-sm font-semibold">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Crafted with Motherly Love</span>
          </div>

          <h1 className="font-primary text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#0D03AE] tracking-tight">
            Little Outfits. Lovely Memories.
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[#786C65] leading-relaxed">
            Born out of a simple desire: clothes that are as gentle as a parent&apos;s hug, sturdy enough for tree-climbing, and fun enough for everyday giggle fits.
          </p>
        </div>

        {/* 2-Column Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-6">
          <div className="lg:col-span-6 space-y-5 text-sm sm:text-base text-[#4A4458] leading-relaxed">
            <h2 className="font-primary text-2xl sm:text-3xl md:text-4xl text-[#0D03AE]">
              How Baha Came to Life
            </h2>
            <p>
              Like most great baby brands, Baha began with a fussy toddler and a pile of scratchy clothes. As young parents, we were tired of stiff fabrics, tight necklines, and polyester blends masquerading as &ldquo;cute&rdquo; babywear.
            </p>
            <p>
              We believed baby clothing should celebrate the messy, magical chaos of early childhood: chocolate ice cream dripping down sleeves, crawl marks on knees, and quick-snap changes in the back of the car.
            </p>
            <p>
              So we set out to craft pieces made from 100% breathable organic cotton, tagless backs, expandable envelopes, and natural non-toxic vegetable dyes that stay wonderfully soft wash after wash.
            </p>

            <div className="pt-2 flex items-center gap-6">
              <div>
                <span className="block font-primary text-3xl sm:text-4xl text-[#0D03AE]">10,000+</span>
                <span className="text-xs text-[#786C65]">Happy Baha Families</span>
              </div>
              <div className="h-10 w-px bg-[#E7DEC8]" />
              <div>
                <span className="block font-primary text-3xl sm:text-4xl text-[#DC5513]">100%</span>
                <span className="text-xs text-[#786C65]">Skin-Safe Baby Cotton</span>
              </div>
              <div className="h-10 w-px bg-[#E7DEC8]" />
              <div>
                <span className="block font-primary text-3xl sm:text-4xl text-[#596F3D]">Zero</span>
                <span className="text-xs text-[#786C65]">Scratchy Tags</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden border border-[#E7DEC8] shadow-sm bg-[#FAF8E8]">
              <Image
                src="/assets/temp/baby2.webp"
                alt="Happy baby wearing comfortable Baha outfits"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* 3 Pillars Values */}
        <div className="pt-10 border-t border-[#E7DEC8]">
          <h2 className="font-primary text-2xl sm:text-3xl text-center text-[#0D03AE] mb-8">
            The 3 Promises Behind Every Stitched Seam
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl border border-[#E7DEC8] bg-[#FFFBF0]/60 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#EDE5FA] text-[#0D03AE] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-primary text-xl text-[#0D03AE]">Gentle On Delicate Skin</h3>
              <p className="text-xs sm:text-sm text-[#786C65] leading-relaxed">
                Pre-washed, hypoallergenic, and OEKO-TEX certified fabrics that never irritate eczema-prone or sensitive baby skin.
              </p>
            </div>

            <div className="p-6 rounded-3xl border border-[#E7DEC8] bg-[#FFFBF0]/60 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FFE4CF] text-[#DC5513] flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-primary text-xl text-[#DC5513]">Made For Mischief</h3>
              <p className="text-xs sm:text-sm text-[#786C65] leading-relaxed">
                Reinforced seams, stretchy ribbing, and tear-resistant buttons made to survive park slides, sand pits, and 50+ wash cycles.
              </p>
            </div>

            <div className="p-6 rounded-3xl border border-[#E7DEC8] bg-[#FFFBF0]/60 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#E8EEDC] text-[#596F3D] flex items-center justify-center">
                <Smile className="w-6 h-6" />
              </div>
              <h3 className="font-primary text-xl text-[#596F3D]">Fuss-Free Dressing</h3>
              <p className="text-xs sm:text-sm text-[#786C65] leading-relaxed">
                Snap-bottom gussets and wide envelope necks that make diaper changes smooth and struggle-free for tired parents.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="text-center pt-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#0D03AE] hover:bg-[#090280] text-white font-primary text-lg shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            <span>Explore the Latest Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

