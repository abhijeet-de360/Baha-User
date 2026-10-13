'use client';

import React from 'react';
import Link from 'next/link';
import {
  Truck,
  ChevronRight,
  Clock,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

const SECTIONS = [
  { id: 'shipping-coverage', label: '1. Shipping Reach & Domestic Coverage' },
  { id: 'processing-dispatch', label: '2. Order Processing & Dispatch Times' },
  { id: 'transit-timelines', label: '3. Estimated Delivery Timelines' },
  { id: 'shipping-charges', label: '4. Shipping Charges & Free Delivery' },
  { id: 'order-tracking', label: '5. Real-Time Tracking & Notifications' },
  { id: 'eco-packaging', label: '6. Sustainable & Eco-Friendly Packaging' },
  { id: 'handover-failed-delivery', label: '7. Doorstep Handover & Failed Deliveries' },
  { id: 'cod-policies', label: '8. Cash on Delivery (COD) Terms' },
  { id: 'shipping-support', label: '9. Logistics Queries & Delivery Help' },
];

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF8] text-text-main flex flex-col font-body selection:bg-brand-yellow relative overflow-hidden">
      {/* ── Soft Ambient Glow Orbs ── */}
      <div className="absolute top-0 left-[-8%] w-80 sm:w-[34rem] h-80 sm:h-[34rem] bg-purple-200/35 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-28 right-[-8%] w-72 sm:w-[30rem] h-72 sm:h-[30rem] bg-amber-200/35 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-[45%] left-[5%] w-64 sm:w-80 h-64 sm:h-80 bg-rose-100/30 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-16 right-[-5%] w-80 sm:w-[30rem] h-80 sm:h-[30rem] bg-brand-yellow/20 rounded-full blur-3xl pointer-events-none -z-0" />

      <main className="flex-1 py-8 sm:py-12 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* ── Breadcrumb ── */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-text-muted">
            <Link href="/" className="hover:text-brand-purple transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-text-muted/60" />
            <span className="font-semibold text-brand-purple">Shipping Policy</span>
          </nav>

          {/* ── Document Header ── */}
          <header className="mb-10 sm:mb-14 pb-8 border-b border-[#EAE6DE]">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-purple-light text-brand-purple border border-brand-purple/20 mb-3">
              <Truck className="w-3.5 h-3.5" />
              <span>Fast &amp; Eco-Friendly Delivery</span>
            </div>
            <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-text-main tracking-tight">
              Shipping &amp; Delivery Policy
            </h1>
            <p className="mt-4 text-base sm:text-lg text-text-muted leading-relaxed">
              We know how eagerly little ones await their new outfits. Discover our delivery timelines,
              express dispatch guidelines, and sustainable plastic-free packaging commitments.
            </p>
            <div className="mt-4 flex items-center gap-3 text-xs text-text-muted font-medium">
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-brand-purple" />
                <span>Last Updated: October 12, 2026</span>
              </span>
              <span>•</span>
              <span>Version 2.5</span>
            </div>

            {/* Quick Table of Contents */}
            <div className="mt-8 pt-6 border-t border-[#EAE6DE]/60">
              <p className="text-xs font-bold uppercase tracking-wider text-text-muted/80 mb-3">
                Contents
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs sm:text-sm">
                {SECTIONS.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="text-brand-purple hover:underline hover:text-brand-purple-dark transition-colors"
                  >
                    {sec.label}
                  </a>
                ))}
              </div>
            </div>
          </header>

          {/* ── Document Paragraph Sections ── */}
          <div className="space-y-10 sm:space-y-12 text-sm sm:text-base text-text-muted leading-relaxed">
            {/* 1. Coverage */}
            <section id="shipping-coverage" className="scroll-mt-24">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-text-main mb-3">
                1. Shipping Reach &amp; Domestic Coverage
              </h2>
              <div className="space-y-3">
                <p>
                  <strong>Baha Fashion</strong> ships pan-India across <strong>19,000+ postal pin codes</strong> spanning all states and union territories. We partner with India&apos;s leading logistics networks—including Blue Dart, Delhivery, Shadowfax, and India Post Speed Post—to guarantee dependable doorstep delivery even in remote regions.
                </p>
                <p>
                  At this stage, we primarily cater to domestic deliveries within India. For international delivery requests to the UAE, UK, and US, please contact our parent concierge team directly.
                </p>
              </div>
            </section>

            <hr className="border-t border-[#EAE6DE]" />

            {/* 2. Processing & Dispatch */}
            <section id="processing-dispatch" className="scroll-mt-24">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-text-main mb-3">
                2. Order Processing &amp; Dispatch Times
              </h2>
              <p className="mb-4">
                We take immense pride in prompt fulfillment from our central organic apparel warehouse:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-text-main">Standard Dispatch:</strong> Orders placed before 1:00 PM IST on working days (Monday to Saturday) are packed and dispatched within <strong>24 hours</strong>.
                </li>
                <li>
                  <strong className="text-text-main">Afternoon &amp; Weekend Orders:</strong> Orders placed after 1:00 PM or on Sundays and national public holidays are processed on the subsequent working morning.
                </li>
                <li>
                  <strong className="text-text-main">Quality Check:</strong> Every garment undergoes a thorough hand-steamed inspection and button security check prior to sealing.
                </li>
              </ul>
            </section>

            <hr className="border-t border-[#EAE6DE]" />

            {/* 3. Delivery Timelines */}
            <section id="transit-timelines" className="scroll-mt-24">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-text-main mb-3">
                3. Estimated Delivery Timelines
              </h2>
              <p className="mb-3">
                Once handed over to our courier partner, estimated transit durations are as follows:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-text-main">Delhi NCR, Mumbai, Bengaluru, Hyderabad, Chennai &amp; Kolkata:</strong> 2 to 3 business days.
                </li>
                <li>
                  <strong className="text-text-main">Tier 2 &amp; Tier 3 Cities (State Capitals &amp; Major Hubs):</strong> 3 to 5 business days.
                </li>
                <li>
                  <strong className="text-text-main">Northeastern States &amp; Remote Islands:</strong> 5 to 7 business days via air cargo or express speed post.
                </li>
              </ul>
              <p className="mt-3 text-xs sm:text-sm">
                <em>Note: Unexpected weather conditions, regional festivals, or local transport restrictions may occasionally cause minor transit delays.</em>
              </p>
            </section>

            <hr className="border-t border-[#EAE6DE]" />

            {/* 4. Shipping Charges */}
            <section id="shipping-charges" className="scroll-mt-24">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-text-main mb-3">
                4. Shipping Charges &amp; Free Delivery
              </h2>
              <p className="mb-3">
                We believe in simple, transparent pricing with no hidden checkout surprises:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-text-main">Free Pan-India Delivery:</strong> Available on all orders with a cart value of <strong>₹999 or above</strong>.
                </li>
                <li>
                  <strong className="text-text-main">Standard Shipping Fee:</strong> For orders under ₹999, a flat delivery fee of <strong>₹69</strong> is applied at checkout to support express courier routing.
                </li>
                <li>
                  <strong className="text-text-main">COD Handling Fee:</strong> Cash on Delivery orders incur a nominal convenience fee of ₹49 charged by courier collection partners.
                </li>
              </ul>
            </section>

            <hr className="border-t border-[#EAE6DE]" />

            {/* 5. Tracking & Notifications */}
            <section id="order-tracking" className="scroll-mt-24">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-text-main mb-3">
                5. Real-Time Tracking &amp; Notifications
              </h2>
              <p className="mb-3">
                As soon as your package is dispatched, we send you an automated confirmation via email, SMS, and WhatsApp containing:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Assigned logistics partner name and Air Waybill (AWB) tracking number.</li>
                <li>Direct live tracking link showing current transit checkpoint milestones.</li>
                <li>Expected day of doorstep arrival.</li>
              </ul>
              <p className="mt-3">
                You can also track your shipment anytime directly from our <Link href="/orders" className="text-brand-purple font-medium hover:underline">Track Order Page</Link>.
              </p>
            </section>

            <hr className="border-t border-[#EAE6DE]" />

            {/* 6. Sustainable Packaging */}
            <section id="eco-packaging" className="scroll-mt-24">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-text-main mb-3">
                6. Sustainable &amp; Eco-Friendly Packaging
              </h2>
              <p className="mb-3">
                As an organic children&apos;s brand, we care deeply about preserving our planet for the next generation:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-text-main">100% Plastic-Free:</strong> We never use petroleum-based bubble wraps or single-use plastics.
                </li>
                <li>
                  <strong className="text-text-main">Compostable Mailers:</strong> Our outer courier mailers are made from certified biodegradable cornstarch that dissolves naturally without toxic residue.
                </li>
                <li>
                  <strong className="text-text-main">Reusable Cotton Bags:</strong> Garments are protected inside breathable, reusable muslin cotton pouches that parents can repurpose for baby essentials.
                </li>
              </ul>
            </section>

            <hr className="border-t border-[#EAE6DE]" />

            {/* 7. Doorstep Handover & Failed Deliveries */}
            <section id="handover-failed-delivery" className="scroll-mt-24">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-text-main mb-3">
                7. Doorstep Handover &amp; Failed Deliveries
              </h2>
              <p className="mb-3">
                Our courier partners attempt delivery up to <strong>3 consecutive times</strong> before returning an undelivered parcel to our warehouse:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>If you are unavailable during the first attempt, the delivery agent will call to reschedule at your convenience.</li>
                <li>To correct or amend an incorrect address after placing an order, please contact our support team within 2 hours of purchase before packaging completes.</li>
                <li>If a shipment returns to us marked as &ldquo;Undelivered / Incorrect Address&rdquo;, we can re-dispatch it upon address confirmation or process a full refund to your source account.</li>
              </ul>
            </section>

            <hr className="border-t border-[#EAE6DE]" />

            {/* 8. COD Policies */}
            <section id="cod-policies" className="scroll-mt-24">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-text-main mb-3">
                8. Cash on Delivery (COD) Terms
              </h2>
              <p className="mb-3">
                For parents who prefer paying upon arrival, Cash on Delivery (COD) is available across most serviceable pin codes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Maximum allowable COD order limit is ₹5,000 per transaction.</li>
                <li>Please keep exact cash ready or request the delivery agent&apos;s digital UPI QR code upon arrival.</li>
                <li>Parcels cannot be opened or inspected prior to handing over the payment to the delivery executive. If you notice any defect after opening, our <Link href="/return-and-refund-policy" className="text-brand-purple font-medium hover:underline">30-day return policy</Link> ensures complete protection.</li>
              </ul>
            </section>

            <hr className="border-t border-[#EAE6DE]" />

            {/* 9. Support */}
            <section id="shipping-support" className="scroll-mt-24">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-text-main mb-3">
                9. Logistics Queries &amp; Delivery Help
              </h2>
              <p className="mb-4">
                Have an urgent delivery requirement for an upcoming birthday or family function? Our logistics team is happy to assist:
              </p>

              <div className="space-y-2.5 text-sm sm:text-base">
                <p>
                  <strong className="text-text-main">Logistics Support Desk:</strong> Baha Dispatch Operations
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-brand-purple shrink-0" />
                  <span>
                    Email:{' '}
                    <a href="mailto:shipping@bahafashion.com" className="text-brand-purple font-semibold hover:underline">
                      shipping@bahafashion.com
                    </a>
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-brand-purple shrink-0" />
                  <span>Helpline: +91 98765 43210 (Mon–Sat, 10 AM – 7 PM IST)</span>
                </p>
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-brand-purple shrink-0 mt-1" />
                  <span>Fulfillment Center: Baha Retail Lifestyle Pvt. Ltd., Hub 3, Palam Vihar Road, Gurugram, Haryana - 122017, India</span>
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
