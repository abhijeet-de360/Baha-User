"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, CheckCircle2, ThumbsUp, Heart, MessageSquarePlus } from "lucide-react";
import { ProductReview } from "@/data/products";

interface ProductReviewsProps {
  rating: number;
  reviewsCount: number;
  reviews: ProductReview[];
}

export function ProductReviews({
  rating,
  reviewsCount,
  reviews,
}: ProductReviewsProps) {
  const [filterWithPhoto, setFilterWithPhoto] = useState(false);
  const [helpfulCounts, setHelpfulCounts] = useState<Record<string, number>>({});
  const [votedReviews, setVotedReviews] = useState<Record<string, boolean>>({});

  const handleVote = (id: string | number) => {
    const key = String(id);
    if (votedReviews[key]) return;
    setHelpfulCounts((prev) => ({
      ...prev,
      [key]: (prev[key] || 0) + 1,
    }));
    setVotedReviews((prev) => ({ ...prev, [key]: true }));
  };

  const displayedReviews = filterWithPhoto
    ? reviews.filter((r) => !!r.photo)
    : reviews;

  return (
    <section id="reviews" className="w-full my-12 sm:my-16 font-secondary scroll-mt-28">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs uppercase tracking-wider font-bold text-[#DC5513]">
            Real Parent Stories
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mt-1">
            <span className="font-['Didot',_'Playfair_Display',_'Times_New_Roman',_Georgia,_serif] italic text-[#0D03AE] mr-1.5">
              Customer
            </span>
            Reviews &amp; Ratings
          </h2>
        </div>

        <button
          type="button"
          onClick={() => alert("Review submission form opens here!")}
          className="self-start sm:self-auto px-5 py-2.5 rounded-full border border-[#0D03AE] text-[#0D03AE] hover:bg-[#0D03AE] hover:text-white transition-colors text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-2xs"
        >
          <MessageSquarePlus className="w-4 h-4" />
          Write a Review
        </button>
      </div>

      {/* Ratings Aggregate Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 sm:p-8 rounded-3xl bg-[#FFF8E0]/70 border border-[#FED174]/40 mb-10 shadow-xs">
        {/* Left Column: Big Score */}
        <div className="flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-black/10 pb-6 md:pb-0 md:pr-6">
          <span className="text-5xl sm:text-6xl font-extrabold text-[#793A20] leading-none mb-2">
            {rating}
          </span>
          <div className="flex items-center gap-1 text-[#DC5513] mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-[#DC5513] stroke-none" />
            ))}
          </div>
          <span className="text-xs text-neutral-500 font-medium">
            Based on {reviewsCount} verified reviews
          </span>
          <span className="text-[11px] text-emerald-700 font-semibold mt-1">
            98% of parents recommend this style
          </span>
        </div>

        {/* Center Column: Rating Distribution Bars */}
        <div className="flex flex-col justify-center space-y-2 md:col-span-2">
          {[
            { stars: "5 Star", pct: 88 },
            { stars: "4 Star", pct: 9 },
            { stars: "3 Star", pct: 2 },
            { stars: "2 Star", pct: 1 },
            { stars: "1 Star", pct: 0 },
          ].map((bar) => (
            <div key={bar.stars} className="flex items-center gap-3 text-xs">
              <span className="w-12 text-neutral-600 font-medium shrink-0">
                {bar.stars}
              </span>
              <div className="flex-1 h-2 rounded-full bg-black/5 overflow-hidden">
                <div
                  className="h-full bg-[#DC5513] rounded-full transition-all duration-500"
                  style={{ width: `${bar.pct}%` }}
                />
              </div>
              <span className="w-8 text-neutral-400 text-right text-[11px]">
                {bar.pct}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between border-b border-black/10 pb-4 mb-6">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFilterWithPhoto(false)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
              !filterWithPhoto
                ? "bg-[#0D03AE] text-white"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            All Reviews ({reviews.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterWithPhoto(true)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
              filterWithPhoto
                ? "bg-[#0D03AE] text-white"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            With Photos ({reviews.filter((r) => !!r.photo).length})
          </button>
        </div>

        <span className="text-xs text-neutral-400 hidden sm:inline">
          Showing {displayedReviews.length} reviews
        </span>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {displayedReviews.length === 0 ? (
          <div className="text-center py-12 text-neutral-400 text-sm">
            No photo reviews available for this product yet.
          </div>
        ) : (
          displayedReviews.map((rev) => {
            const currentHelpful =
              (rev.helpfulCount || 0) + (helpfulCounts[String(rev.id)] || 0);
            const hasVoted = !!votedReviews[String(rev.id)];

            return (
              <div
                key={rev.id}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-neutral-100 shadow-2xs hover:shadow-sm transition-shadow flex flex-col sm:flex-row gap-5 items-start"
              >
                {/* Photo attachment if present */}
                {rev.photo && (
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden shrink-0 bg-neutral-100 border border-black/5 shadow-2xs">
                    <Image
                      src={rev.photo}
                      alt={`Photo review by ${rev.author}`}
                      fill
                      sizes="128px"
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      {/* 5 Stars */}
                      <div className="flex items-center gap-0.5 text-[#DC5513]">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-[#DC5513] stroke-none"
                          />
                        ))}
                      </div>
                      <span className="text-xs text-neutral-400">{rev.date}</span>
                    </div>

                    <h4 className="font-semibold text-sm sm:text-base text-neutral-900 mb-1">
                      &ldquo;{rev.title}&rdquo;
                    </h4>

                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-3">
                      {rev.comment}
                    </p>
                  </div>

                  {/* Reviewer Meta & Helpful Vote */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-black/5 text-xs text-neutral-500">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-neutral-800">
                        {rev.author}
                      </span>
                      {rev.relation && (
                        <span className="text-[#793A20] font-medium bg-[#FFF8E0] px-2 py-0.5 rounded-full">
                          {rev.relation}
                        </span>
                      )}
                      {rev.verified && (
                        <span className="flex items-center gap-1 text-emerald-700 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Verified Buyer
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleVote(rev.id)}
                      className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                        hasVoted
                          ? "text-[#DC5513] font-bold"
                          : "hover:text-neutral-900"
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      Helpful ({currentHelpful})
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}

