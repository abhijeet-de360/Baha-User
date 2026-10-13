'use client';

import React from 'react';
import Link from 'next/link';
import {
  RotateCcw,
  ChevronRight,
  Clock,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

const SECTIONS = [
  { id: 'guarantee-overview', label: '1. 30-Day Happiness Guarantee' },
  { id: 'return-eligibility', label: '2. Return Eligibility & Fabric Condition' },
  { id: 'exchanges', label: '3. Size & Color Exchange Policy' },
  { id: 'non-returnable', label: '4. Non-Returnable & Final Sale Items' },
  { id: 'pickup-process', label: '5. Doorstep Reverse Pickup Process' },
  { id: 'refund-modes', label: '6. Refund Modes & Bank Timelines' },
  { id: 'damaged-defective', label: '7. Damaged, Defective or Incorrect Items' },
  { id: 'reverse-shipping-fees', label: '8. Shipping Charges & Free Returns' },
  { id: 'return-support', label: '9. Return Assistance & Help Desk' },
];

export default function ReturnAndRefundPolicyPage() {
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
            <span className="font-semibold text-brand-purple">Return &amp; Refund Policy</span>
          </nav>

          {/* ── Document Header ── */}
          <header className="mb-10 sm:mb-14 pb-8 border-b border-[#EAE6DE]">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-purple-light text-brand-purple border border-brand-purple/20 mb-3">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Hassle-Free Returns &amp; Exchanges</span>
            </div>
            <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-text-main tracking-tight">
              Return &amp; Refund Policy
            </h1>
            <p className="mt-4 text-base sm:text-lg text-text-muted leading-relaxed">
              We want you and your little one to be completely delighted with every garment.
              If something doesn&apos;t fit or feel right, our easy 30-day return policy has you covered.
            </p>
            <div className="mt-4 flex items-center gap-3 text-xs text-text-muted font-medium">
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-brand-purple" />
                <span>Last Updated: October 12, 2026</span>
              </span>
              <span>•</span>
              <span>Version 2.8</span>
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
            {/* 1. Guarantee Overview */}
            <section id="guarantee-overview" className="scroll-mt-24">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-text-main mb-3">
                1. 30-Day Happiness Guarantee
              </h2>
              <div className="space-y-3">
                <p>
                  At <strong>Baha Fashion</strong>, we stand behind the craftsmanship, gentleness, and durability of our organic baby and kidswear collections. If you are not completely satisfied with your order, you can initiate a return or exchange request within <strong>30 days of the recorded delivery date</strong>.
                </p>
                <p>
                  Our goal is to make shopping for growing children stress-free. Whether it is an unexpected growth spurt, a sizing change, or simply a change of heart, our customer-first policy is designed to assist you quickly.
                </p>
              </div>
            </section>

            <hr className="border-t border-[#EAE6DE]" />

            {/* 2. Return Eligibility */}
            <section id="return-eligibility" className="scroll-mt-24">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-text-main mb-3">
                2. Return Eligibility &amp; Fabric Condition
              </h2>
              <p className="mb-4">
                To safeguard the delicate skin of infants and young children, returned items must comply with hygienic and quality standards:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-text-main">Unworn &amp; Unwashed:</strong> Garments must not have been washed, dry-cleaned, soiled, or worn outdoors. Trying on clothes gently for sizing at home is welcomed.
                </li>
                <li>
                  <strong className="text-text-main">Original Tags Attached:</strong> Baha branded swing tags, GOTS organic certification labels, and price barcodes must remain intact and uncut.
                </li>
                <li>
                  <strong className="text-text-main">Original Packaging:</strong> Products should ideally be returned with their original eco-friendly cotton pouch or biodegradable bag.
                </li>
                <li>
                  <strong className="text-text-main">Complete Bundles:</strong> Co-ord sets, twin packs, and multi-piece bundles must be returned together with all matching components.
                </li>
              </ul>
            </section>

            <hr className="border-t border-[#EAE6DE]" />

            {/* 3. Exchanges */}
            <section id="exchanges" className="scroll-mt-24">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-text-main mb-3">
                3. Size &amp; Color Exchange Policy
              </h2>
              <p className="mb-3">
                Children grow remarkably fast! If you ordered a size that is too small or too large, you can request a <strong>complimentary size exchange</strong> with zero reverse pickup fees.
              </p>
              <p>
                Once your return pickup is confirmed, our logistics team immediately reserves the replacement size in our inventory and dispatches it promptly. If the desired replacement size is out of stock, we offer a full refund or instant store credit.
              </p>
            </section>

            <hr className="border-t border-[#EAE6DE]" />

            {/* 4. Non-Returnable Items */}
            <section id="non-returnable" className="scroll-mt-24">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-text-main mb-3">
                4. Non-Returnable &amp; Final Sale Items
              </h2>
              <p className="mb-3">
                For health, safety, and personal hygiene reasons, certain categories cannot be accepted for return once their security seals have been broken:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Cloth diapers, underwear briefs, training pants, and organic baby bibs.</li>
                <li>Baby headbands, pacifier clips, hair accessories, and socks once opened.</li>
                <li>Items clearly designated as &ldquo;Clearance Flash Sale&rdquo; or &ldquo;Final Sale&rdquo; on the product page.</li>
                <li>Digital gift cards and parent vouchers.</li>
              </ul>
            </section>

            <hr className="border-t border-[#EAE6DE]" />

            {/* 5. Pickup Process */}
            <section id="pickup-process" className="scroll-mt-24">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-text-main mb-3">
                5. Doorstep Reverse Pickup Process
              </h2>
              <p className="mb-4">
                Initiating a return is simple and automated through your Baha account:
              </p>
              <ol className="list-decimal pl-6 space-y-2.5">
                <li>
                  Go to your <Link href="/orders" className="text-brand-purple font-medium hover:underline">My Orders</Link> page and locate the delivered shipment.
                </li>
                <li>
                  Click <strong>&ldquo;Return / Exchange&rdquo;</strong>, select the specific garments, and indicate your reason (e.g., sizing, style preference).
                </li>
                <li>
                  Our verified courier partner (Delhivery or Blue Dart) will arrange doorstep pickup within <strong>24 to 48 business hours</strong>.
                </li>
                <li>
                  Hand the packed parcel to the courier executive. You will receive an instant digital pickup receipt on your registered mobile number.
                </li>
              </ol>
            </section>

            <hr className="border-t border-[#EAE6DE]" />

            {/* 6. Refund Modes & Timelines */}
            <section id="refund-modes" className="scroll-mt-24">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-text-main mb-3">
                6. Refund Modes &amp; Bank Timelines
              </h2>
              <p className="mb-3">
                Once the parcel reaches our fulfillment hub and passes the quality audit (usually within 24 hours of arrival), your refund will be processed immediately:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-text-main">Prepaid Orders (Cards, Net Banking, UPI):</strong> Refunded directly to the original bank account or card within <strong>3 to 5 business days</strong>.
                </li>
                <li>
                  <strong className="text-text-main">Cash on Delivery (COD) Orders:</strong> Transferred via instant IMPS/UPI directly to your preferred bank account or credited as Baha Store Wallet credits upon your instruction.
                </li>
                <li>
                  <strong className="text-text-main">Baha Wallet Credit:</strong> Issued instantly upon return approval, with lifetime validity and applicable on all future purchases.
                </li>
              </ul>
            </section>

            <hr className="border-t border-[#EAE6DE]" />

            {/* 7. Damaged, Defective or Incorrect Items */}
            <section id="damaged-defective" className="scroll-mt-24">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-text-main mb-3">
                7. Damaged, Defective or Incorrect Items
              </h2>
              <p className="mb-3">
                Every Baha piece undergoes meticulous multi-point stitching and fabric quality inspections. In the unlikely event that your garment arrives damaged, torn, stained, or does not match what you ordered:
              </p>
              <p>
                Please notify us within <strong>48 hours of delivery</strong> by sending a photo of the defect to <strong className="text-text-main">care@bahafashion.com</strong> or WhatsApp concierge at <strong className="text-text-main">+91 98765 43210</strong>. We will arrange a priority same-day replacement dispatch or full instant refund.
              </p>
            </section>

            <hr className="border-t border-[#EAE6DE]" />

            {/* 8. Reverse Shipping Charges */}
            <section id="reverse-shipping-fees" className="scroll-mt-24">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-text-main mb-3">
                8. Reverse Shipping Charges &amp; Free Returns
              </h2>
              <p className="mb-3">
                We believe in fair, transparent terms for parents:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-text-main">Exchanges:</strong> 100% Free of charge. We cover all reverse collection and forward dispatch logistics costs.
                </li>
                <li>
                  <strong className="text-text-main">Returns for Full Refund:</strong> Free reverse pickup on orders above ₹999. For low-value orders under ₹999, a nominal courier handling fee of ₹79 is adjusted against the refund.
                </li>
              </ul>
            </section>

            <hr className="border-t border-[#EAE6DE]" />

            {/* 9. Support Desk */}
            <section id="return-support" className="scroll-mt-24">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-text-main mb-3">
                9. Return Assistance &amp; Help Desk
              </h2>
              <p className="mb-4">
                Need help requesting a return, changing a pickup time, or tracking your refund status? Our Parent Concierge team is always on standby:
              </p>

              <div className="space-y-2.5 text-sm sm:text-base">
                <p>
                  <strong className="text-text-main">Customer Happiness Desk:</strong> Baha Parent Concierge
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-brand-purple shrink-0" />
                  <span>
                    Email:{' '}
                    <a href="mailto:returns@bahafashion.com" className="text-brand-purple font-semibold hover:underline">
                      returns@bahafashion.com
                    </a>
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-brand-purple shrink-0" />
                  <span>Phone &amp; WhatsApp: +91 98765 43210 (Mon–Sat, 10 AM – 7 PM IST)</span>
                </p>
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-brand-purple shrink-0 mt-1" />
                  <span>Returns Warehouse: Baha Logistics Hub, Sector 18, Phase 2, Gurugram, Haryana - 122015, India</span>
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
