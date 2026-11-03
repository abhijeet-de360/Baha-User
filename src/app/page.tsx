"use client";

import dynamic from "next/dynamic";
import SuperFlowBanner from "@/components/home/SuperFlowBanner";

const PanoramaSlider = dynamic(() => import("@/components/home/PanoramaSlider"), {
  ssr: false,
  loading: () => <div className="h-[480px] bg-white" aria-label="Loading gallery" />,
});

const NewbornArrivals = dynamic(() => import("@/components/home/NewbornArrivals"), {
  ssr: true,
});

const CollectionSection = dynamic(
  () => import("@/components/home/CollectionSection"),
  { ssr: true }
);

const MarqueeBanner = dynamic(
  () => import("@/components/home/MarqueeBanner"),
  { ssr: true }
);

const BabyMoodSection = dynamic(
  () => import("@/components/home/BabyMoodSection"),
  { ssr: true }
);

const SummerCollectionSection = dynamic(
  () => import("@/components/home/SummerCollectionSection"),
  { ssr: true }
);

const ReviewsClotheslineSection = dynamic(
  () => import("@/components/home/ReviewsClotheslineSection"),
  { ssr: true }
);

const WatchAndShopSection = dynamic(
  () => import("@/components/home/WatchAndShopSection"),
  { ssr: true }
);

const FeaturedCategories = dynamic(
  () =>
    import("@/components/home/FeaturedCategories").then(
      (mod) => mod.FeaturedCategories
    ),
  {
    ssr: false,
    loading: () => (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="h-8 w-48 bg-gray-100 rounded-md animate-pulse mb-8" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-square bg-gray-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    ),
  }
);

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      {/* Full-screen Super Flow banner */}
      <SuperFlowBanner />

      <PanoramaSlider />

      {/* Newborn Baby Arrivals Section */}
      <NewbornArrivals />

      {/* Featured Collection Section (Cord Sets by default, admin controllable) */}
      <CollectionSection />

      {/* Tilted Orange Marquee Ribbon Section */}
      <MarqueeBanner />

      {/* Shop As Per Your Baby's Mood Section */}
      <BabyMoodSection />

      {/* Summer Collection's Section */}
      <SummerCollectionSection />

      {/* Customer Reviews & Testimonials Hanging Clothesline Section */}
      <ReviewsClotheslineSection />

      {/* Watch, Play & Shop The Look Reels Section */}
      <WatchAndShopSection />

      {/* Featured Categories Carousel with ScrollTrigger animations */}
    </div>
  );
}
