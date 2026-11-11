import React from "react";
import type { Metadata } from "next";
import { PRODUCTS, getProductById, getRelatedProducts } from "@/data/products";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { VirtualTryOn } from "@/components/product/VirtualTryOn";
import { CompleteTheLook } from "@/components/product/CompleteTheLook";
import { ProductReviews } from "@/components/product/ProductReviews";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { StickyMobileCart } from "@/components/product/StickyMobileCart";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    id: String(product.id),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id) || PRODUCTS[0];

  return {
    title: `${product.name} — Baha Kids`,
    description: product.tagline,
    openGraph: {
      title: `${product.name} | Baha Kids`,
      description: product.tagline,
      images: [{ url: product.images[0] }],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = getProductById(id) || PRODUCTS[0];
  const relatedProducts = getRelatedProducts(product.id, 4);

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Main Content Container with Top Offset for Floating Liquid Glass Header */}
      <main className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 lg:pt-36 pb-48 sm:pb-32 lg:pb-24">
        {/* Top 2-Column Product Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 xl:gap-14 items-start">
          {/* Left Column: Multi-Image Gallery, Reel Video & Virtual Try-On */}
          <div className="lg:col-span-6 xl:col-span-6 lg:sticky lg:top-32 xl:top-36 space-y-4">
            <ProductGallery
              images={product.images}
              video={product.video}
              name={product.name}
              badge={product.badge}
              discount={product.discount}
            />
            {/* AI Virtual Try-On Child Simulation Box */}
            <VirtualTryOn product={product} />
          </div>

          {/* Right Column: Product Title, Pricing, Color, Size, and Buy CTA */}
          <div className="lg:col-span-6 xl:col-span-6">
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Frequently Bought Together / Complete The Look */}
        <CompleteTheLook product={product} />

        {/* Customer Reviews & Testimonial Stage */}
        <ProductReviews
          rating={product.rating}
          reviewsCount={product.reviewsCount}
          reviews={product.reviews}
        />

        {/* Related Products / More You'll Love */}
        <RelatedProducts products={relatedProducts} />

        {/* Dedicated Mobile Spacer to prevent overlap with floating bottom nav */}
        <div className="h-24 lg:hidden" aria-hidden="true" />
      </main>

      {/* Sticky Mobile Add To Bag Bar */}
      <StickyMobileCart product={product} />
    </div>
  );
}
