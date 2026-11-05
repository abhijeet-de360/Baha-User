"use client";

import React from "react";
import { Truck, RotateCcw, ShieldCheck, Users } from "lucide-react";

export interface TrustItem {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  badgeColor: string;
}

const TRUST_FEATURES: TrustItem[] = [
  {
    id: "shipping",
    title: "Free Shipping",
    subtitle: "On orders above ₹999",
    icon: Truck,
    badgeColor: "bg-[#EDE5FA] text-[#0D03AE]",
  },
  {
    id: "returns",
    title: "Easy Returns",
    subtitle: "Hassle-free 7-day returns",
    icon: RotateCcw,
    badgeColor: "bg-[#FFE4CF] text-[#DC5513]",
  },
  {
    id: "fabric",
    title: "Safe & Premium Fabric",
    subtitle: "Gentle on delicate baby skin",
    icon: ShieldCheck,
    badgeColor: "bg-[#E8EEDC] text-[#596F3D]",
  },
  {
    id: "parents",
    title: "10K+ Happy Parents",
    subtitle: "Loved and trusted across India",
    icon: Users,
    badgeColor: "bg-[#FCE4E8] text-[#B84C6B]",
  },
];

export default function TrustCountBar() {
  return (
    <section aria-label="The Baha promise" className="relative bg-[#FCF6E6] pt-6 pb-28 sm:pt-8 sm:pb-6">
      <div className="mx-auto max-w-[1600px] px-5 py-4 sm:px-8 sm:py-5 lg:px-12">
        <p className="mb-8 text-center font-primary text-2xl text-[#0D03AE] sm:text-3xl">A little care, in every order.</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-6">
          {TRUST_FEATURES.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="flex flex-col items-center text-center">
                <div className={`mb-4 flex size-14 items-center justify-center rounded-[40%_55%_42%_50%] sm:size-16 ${item.badgeColor} ${index % 2 ? "rotate-6" : "-rotate-6"}`}>
                  <Icon aria-hidden="true" className="size-6 sm:size-7" strokeWidth={1.5} />
                </div>
                <h3 className="font-primary text-lg leading-snug text-[#292240] sm:text-xl">{item.title}</h3>
                <p className="mt-2 max-w-[180px] font-secondary text-xs leading-relaxed text-[#786C65] sm:text-sm">{item.subtitle}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
