"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";

export interface CategoryCard {
  id: string | number;
  name: string;
  itemCount?: string;
  image: string;
  link: string;
  color?: string;
}

const DEFAULT_CATEGORIES: CategoryCard[] = [
  {
    id: 1,
    name: "T-Shirts & Tops",
    itemCount: "42 items",
    image: "/assets/temp/cat-tshirt.jpg",
    link: "/products?category=tshirts",
    color: "bg-brand-based-2/20",
  },
  {
    id: 2,
    name: "Dresses & Rompers",
    itemCount: "35 items",
    image: "/assets/temp/cat-dresses.jpg",
    link: "/products?category=dresses",
    color: "bg-brand-based-3/20",
  },
  {
    id: 3,
    name: "Sets & Co-ords",
    itemCount: "28 items",
    image: "/assets/temp/cat-sets.jpg",
    link: "/products?category=sets",
    color: "bg-brand-based-1/15",
  },
  {
    id: 4,
    name: "Bottoms & Shorts",
    itemCount: "30 items",
    image: "/assets/temp/cat-bottoms.jpg",
    link: "/products?category=bottoms",
    color: "bg-brand-accent/10",
  },
  {
    id: 5,
    name: "Accessories",
    itemCount: "19 items",
    image: "/assets/temp/cat-accessories.jpg",
    link: "/products?category=accessories",
    color: "bg-brand-primary/10",
  },
];

export function FeaturedCategories({
  categories = DEFAULT_CATEGORIES,
}: {
  categories?: CategoryCard[];
}) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".category-card",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="w-full py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="font-secondary text-xs uppercase tracking-wider text-brand-accent font-semibold">
              Explore Collections
            </span>
            <h2 className="font-primary text-4xl sm:text-5xl text-brand-accent-2 mt-1">
              Shop by Category
            </h2>
          </div>
          <Link
            href="/products"
            className="font-secondary text-sm font-semibold text-brand-primary hover:text-brand-accent transition-colors"
          >
            View All &rarr;
          </Link>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1.3}
          breakpoints={{
            480: { slidesPerView: 2.2 },
            768: { slidesPerView: 3.2 },
            1024: { slidesPerView: 4.2 },
            1280: { slidesPerView: 4.8 },
          }}
          className="pb-4"
        >
          {categories.map((cat) => (
            <SwiperSlide key={cat.id}>
              <Link
                href={cat.link}
                className={`category-card group block rounded-2xl p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${
                  cat.color || "bg-gray-50"
                }`}
              >
                <div className="w-full aspect-square rounded-xl overflow-hidden bg-white/60 mb-4 flex items-center justify-center relative">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                  <span className="font-primary text-xl text-brand-primary/40 select-none">
                    {cat.name}
                  </span>
                </div>
                <h3 className="font-primary text-2xl text-brand-accent-2 group-hover:text-brand-primary transition-colors">
                  {cat.name}
                </h3>
                {cat.itemCount && (
                  <p className="font-secondary text-xs text-brand-accent-2/60 mt-1">
                    {cat.itemCount}
                  </p>
                )}
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

