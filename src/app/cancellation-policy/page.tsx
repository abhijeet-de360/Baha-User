'use client';

import React from 'react';
import Link from 'next/link';
import {
  Ban,
  ChevronRight,
  Clock,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

const SECTIONS = [
  { id: 'cancellation-overview', label: '1. Overview & Customer Flexibility' },
  { id: 'pre-dispatch-cancel', label: '2. Pre-Dispatch Cancellation Window' },
  { id: 'post-dispatch-rules', label: '3. Post-Dispatch & In-Transit Orders' },
  { id: 'partial-cancellations', label: '4. Partial Order Modifications' },
  { id: 'coupons-discounts', label: '5. Coupons & Promotional Discounts' },
  { id: 'automatic-cancellations', label: '6. Cancellations Initiated by Baha' },
  { id: 'refund-timelines', label: '7. Refund Process & Banking Timelines' },
  { id: 'cod-cancellations', label: '8. Cash on Delivery (COD) Cancellations' },
  { id: 'cancellation-support', label: '9. Cancellation Assistance & Help Desk' },
];

export default function CancellationPolicyPage() {
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
            <span className="font-semibold text-brand-purple">Cancellation Policy</span>
          </nav>

          {/* ── Document Header ── */}
          <header className="mb-10 sm:mb-14 pb-8 border-b border-[#EAE6DE]">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-purple-light text-brand-purple border border-brand-purple/20 mb-3">
              <Ban className="w-3.5 h-3.5" />
              <span>Flexible Order Modifications</span>
            </div>
            <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-text-main tracking-tight">
              Cancellation Policy
            </h1>
            <p className="mt-4 text-base sm:text-lg text-text-muted leading-relaxed">
              We understand plans can change. Here is a clear guide on how to cancel or adjust your order,
              our pre-dispatch grace window, and how refunds are automatically credited back.
            </p>
            <div className="mt-4 flex items-center gap-3 text-xs text-text-muted font-medium">
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-brand-purple" />
                <span>Last Updated: October 12, 2026</span>
              </span>
              <span>•</span>
              <span>Version 2.3</span>
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
            {/* 1. Overview */}
            <section id="cancellation-overview" className="scroll-mt-24">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-text-main mb-3">
                1. Overview &amp; Customer Flexibility
              </h2>
              <div className="space-y-3">
                <p>
                  At <strong>Baha Fashion</strong>, we aim to offer maximum flexibility to parents. Whether you ordered the wrong size, selected an incorrect delivery address, or simply changed your mind, our cancellation process is designed to be swift, transparent, and hassle-free.
                </p>
                <p>
                  Orders can be cancelled free of charge at any moment prior to hand-off to our third-party logistics courier. Once cancelled, 100% of your paid amount will be reversed to your account with zero deduction or restocking fees.
                </p>
              </div>
            </section>

            <hr className="border-t border-[#EAE6DE]" />

            {/* 2. Pre-Dispatch */}
            <section id="pre-dispatch-cancel" className="scroll-mt-24">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-text-main mb-3">
                2. Pre-Dispatch Cancellation Window
              </h2>
              <p className="mb-4">
                You can cancel your order directly from your customer dashboard with a single click:
              </p>
              <ol className="list-decimal pl-6 space-y-2.5">
                <li>
                  Sign in and visit your <Link href="/orders" className="text-brand-purple font-medium hover:underline">My Orders</Link> section.
                </li>
                <li>
                  If the order status displays <strong>&ldquo;Confirmed&rdquo;</strong> or <strong>&ldquo;Processing&rdquo;</strong>, click the <strong>&ldquo;Cancel Order&rdquo;</strong> button.
                </li>
                <li>
                  Choose a cancellation reason (optional) and confirm. The order will be immediately cancelled in our automated warehouse system.
                </li>
                <li>
                  You will receive an instant email and SMS confirmation verifying the cancellation and initiate of the full refund.
                </li>
              </ol>
            </section>

            <hr className="border-t border-[#EAE6DE]" />

            {/* 3. Post-Dispatch */}
            <section id="post-dispatch-rules" className="scroll-mt-24">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-text-main mb-3">
                3. Post-Dispatch &amp; In-Transit Orders
              </h2>
              <p className="mb-3">
                Once an order transitions to <strong>&ldquo;Shipped&rdquo;</strong> or <strong>&ldquo;In Transit&rdquo;</strong> and an Air Waybill (AWB) has been generated with our courier partner, it cannot be intercepted or cancelled digitally via the website.
              </p>
              <p className="mb-3">
                However, you can still easily cancel the delivery by taking either of the following steps:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-text-main">Refuse Delivery at Doorstep:</strong> When the courier executive arrives for delivery, inform them that you wish to decline the package. The parcel will be marked as &ldquo;Delivery Refused / Return to Origin (RTO)&rdquo;.
                </li>
                <li>
                  <strong className="text-text-main">30-Day Return After Acceptance:</strong> If you or a family member accidentally accepted the parcel, you can still initiate an effortless return under our <Link href="/return-and-refund-policy" className="text-brand-purple font-medium hover:underline">30-Day Return Policy</Link>.
                </li>
              </ul>
            </section>

            <hr className="border-t border-[#EAE6DE]" />

            {/* 4. Partial Cancellations */}
            <section id="partial-cancellations" className="scroll-mt-24">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-text-main mb-3">
                4. Partial Order Modifications
              </h2>
              <p className="mb-3">
                If your order contains multiple products and you wish to cancel only one specific garment before dispatch:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You can contact our parent support desk via phone or WhatsApp at <strong className="text-text-main">+91 98765 43210</strong> to remove individual items.</li>
                <li>The value of the cancelled item will be immediately refunded to your source account.</li>
                <li>The remaining items in your parcel will continue on schedule for fulfillment without disruption.</li>
              </ul>
            </section>

            <hr className="border-t border-[#EAE6DE]" />

            {/* 5. Coupons & Discounts */}
            <section id="coupons-discounts" className="scroll-mt-24">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-text-main mb-3">
                5. Coupons &amp; Promotional Discounts
              </h2>
              <p className="mb-3">
                When an order placed with a promotional discount or coupon code is cancelled:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-text-main">Single-Use Coupons:</strong> If the coupon was valid for a single redemption, our customer support can reactivate the promotional code for your account upon request.
                </li>
                <li>
                  <strong className="text-text-main">Threshold Promotions:</strong> If a partial cancellation reduces your revised cart value below the qualifying threshold (e.g., &ldquo;₹300 off on ₹2,500&rdquo;), the applied discount will be recalculated based on the remaining items retained.
                </li>
              </ul>
            </section>

            <hr className="border-t border-[#EAE6DE]" />

            {/* 6. Automatic Cancellations by Baha */}
            <section id="automatic-cancellations" className="scroll-mt-24">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-text-main mb-3">
                6. Cancellations Initiated by Baha Fashion
              </h2>
              <p className="mb-3">
                While exceptionally rare, Baha reserves the right to cancel an order under specific unforeseen circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-text-main">Quality Inspection Failure:</strong> If the last remaining inventory piece fails our organic fabric or seam durability inspection prior to packing.
                </li>
                <li>
                  <strong className="text-text-main">Unserviceable Pin Code:</strong> If regional courier networks experience an indefinite lockdown, natural disaster, or loss of transport connectivity.
                </li>
                <li>
                  <strong className="text-text-main">Typographical Catalog Error:</strong> In cases of inadvertent technical pricing discrepancies published on the store.
                </li>
              </ul>
              <p className="mt-3">
                In all such events, our customer care manager will personally contact you with an explanation, and an instant 100% full refund will be triggered immediately.
              </p>
            </section>

            <hr className="border-t border-[#EAE6DE]" />

            {/* 7. Refund Timelines */}
            <section id="refund-timelines" className="scroll-mt-24">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-text-main mb-3">
                7. Refund Process &amp; Banking Timelines
              </h2>
              <p className="mb-3">
                Refunds for cancelled prepaid orders are triggered automatically at the moment of cancellation:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-text-main">UPI &amp; Net Banking:</strong> 24 to 48 hours to reflect back in your linked savings account.
                </li>
                <li>
                  <strong className="text-text-main">Credit &amp; Debit Cards:</strong> 3 to 5 business days, subject to your issuing bank&apos;s settlement schedule.
                </li>
                <li>
                  <strong className="text-text-main">Baha Store Credits:</strong> Instant credit (within 5 minutes), usable for future purchases without expiration.
                </li>
              </ul>
            </section>

            <hr className="border-t border-[#EAE6DE]" />

            {/* 8. COD Cancellations */}
            <section id="cod-cancellations" className="scroll-mt-24">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-text-main mb-3">
                8. Cash on Delivery (COD) Cancellations
              </h2>
              <p className="mb-3">
                For Cash on Delivery orders, no monetary refund is necessary since payment has not been collected:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Pre-dispatch cancellations for COD orders incur zero penalties or charges.</li>
                <li>We request parents to cancel COD orders as early as possible to reduce unnecessary courier fuel emissions and support our eco-friendly mission.</li>
              </ul>
            </section>

            <hr className="border-t border-[#EAE6DE]" />

            {/* 9. Support Desk */}
            <section id="cancellation-support" className="scroll-mt-24">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-text-main mb-3">
                9. Cancellation Assistance &amp; Help Desk
              </h2>
              <p className="mb-4">
                Have questions regarding a cancellation or need urgent assistance before your order is dispatched? We are here to help:
              </p>

              <div className="space-y-2.5 text-sm sm:text-base">
                <p>
                  <strong className="text-text-main">Order Modifications Desk:</strong> Baha Customer Care
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-brand-purple shrink-0" />
                  <span>
                    Email:{' '}
                    <a href="mailto:orders@bahafashion.com" className="text-brand-purple font-semibold hover:underline">
                      orders@bahafashion.com
                    </a>
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-brand-purple shrink-0" />
                  <span>Direct Helpdesk: +91 98765 43210 (Mon–Sat, 10 AM – 7 PM IST)</span>
                </p>
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-brand-purple shrink-0 mt-1" />
                  <span>Corporate Office: Baha Retail Lifestyle Pvt. Ltd., Plot No. 44, Udyog Vihar Phase 4, Gurugram, Haryana - 122016, India</span>
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
