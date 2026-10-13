'use client';

import React from 'react';
import Link from 'next/link';
import {
  FileText,
  ChevronRight,
  Clock,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

const SECTIONS = [
  { id: 'introduction', label: '1. Introduction & Acceptance of Terms' },
  { id: 'eligibility-account', label: '2. User Eligibility & Account Security' },
  { id: 'product-authenticity', label: '3. Products, Fabric Authenticity & Sizing' },
  { id: 'pricing-payments', label: '4. Pricing, Taxes & Payment Terms' },
  { id: 'order-acceptance', label: '5. Order Processing & Limitations' },
  { id: 'intellectual-property', label: '6. Intellectual Property & Trademarks' },
  { id: 'prohibited-conduct', label: '7. Prohibited Website Use & Conduct' },
  { id: 'liability-disclaimers', label: '8. Disclaimers & Limitation of Liability' },
  { id: 'governing-law-contact', label: '9. Governing Law & Dispute Resolution' },
];

export default function TermsAndConditionsPage() {
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
            <span className="font-semibold text-brand-purple">Terms &amp; Conditions</span>
          </nav>

          {/* ── Document Header ── */}
          <header className="mb-10 sm:mb-14 pb-8 border-b border-[#EAE6DE]">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-purple-light text-brand-purple border border-brand-purple/20 mb-3">
              <FileText className="w-3.5 h-3.5" />
              <span>Legal Agreement &amp; Terms of Use</span>
            </div>
            <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-text-main tracking-tight">
              Terms &amp; Conditions
            </h1>
            <p className="mt-4 text-base sm:text-lg text-text-muted leading-relaxed">
              These Terms &amp; Conditions govern your access to and use of Baha Fashion&apos;s website,
              mobile services, parent concierge, and purchase of our organic kidswear collections.
            </p>
            <div className="mt-4 flex items-center gap-3 text-xs text-text-muted font-medium">
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-brand-purple" />
                <span>Last Updated: October 12, 2026</span>
              </span>
              <span>•</span>
              <span>Version 3.1</span>
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
            {/* 1. Introduction */}
            <section id="introduction" className="scroll-mt-24">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-text-main mb-3">
                1. Introduction &amp; Acceptance of Terms
              </h2>
              <div className="space-y-3">
                <p>
                  Welcome to <strong>Baha Fashion</strong> (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;), operated by <em>Baha Retail Lifestyle Private Limited</em>. By browsing our website (<strong className="text-text-main">www.bahafashion.com</strong>), registering an account, or purchasing garments, you expressly agree to be bound by these Terms &amp; Conditions, our <Link href="/privacy-policy" className="text-brand-purple font-medium hover:underline">Privacy Policy</Link>, and any referenced operational guidelines.
                </p>
                <p>
                  If you disagree with any portion of these Terms, your sole remedy is to immediately discontinue your access to our boutique platform. We reserve the right to revise or update these terms at our discretion, and continuous use of the store constitutes acceptance of revised terms.
                </p>
              </div>
            </section>

            <hr className="border-t border-[#EAE6DE]" />

            {/* 2. Eligibility & Account Security */}
            <section id="eligibility-account" className="scroll-mt-24">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-text-main mb-3">
                2. User Eligibility &amp; Account Security
              </h2>
              <p className="mb-4">
                Although our garments are designed for infants, toddlers, and young kids, our commercial transactions are exclusively intended for adult consumers capable of entering legally binding contracts under the Indian Contract Act, 1872.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-text-main">Age Requirement:</strong> You must be at least 18 years of age or possess legal parental authorization to place an order.
                </li>
                <li>
                  <strong className="text-text-main">Account Credentials:</strong> You are responsible for maintaining the confidentiality of your username and password, as well as restricting access to your personal devices.
                </li>
                <li>
                  <strong className="text-text-main">Information Accuracy:</strong> You agree to provide true, current, and complete details during checkout and customer profile updates.
                </li>
              </ul>
            </section>

            <hr className="border-t border-[#EAE6DE]" />

            {/* 3. Products, Fabric Authenticity & Sizing */}
            <section id="product-authenticity" className="scroll-mt-24">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-text-main mb-3">
                3. Products, Fabric Authenticity &amp; Sizing
              </h2>
              <p className="mb-3">
                We make every effort to display garment colors, embroidery patterns, and textures with absolute fidelity. However, as screen calibrations and natural lighting vary, actual fabric hues may exhibit minor natural variations.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-text-main">GOTS Certified Organic Fibers:</strong> Our garments use non-toxic, chemical-free dyes and certified organic cotton. Minor natural slubs in artisanal weaves are hallmarks of authentic organic weaving.
                </li>
                <li>
                  <strong className="text-text-main">Children&apos;s Size Charts:</strong> Sizing references (e.g., 0–3M, 2–3Y, 4–5Y) are recommendations based on standard Indian pediatric growth averages. We recommend measuring before ordering or consulting our Parent Concierge.
                </li>
              </ul>
            </section>

            <hr className="border-t border-[#EAE6DE]" />

            {/* 4. Pricing, Taxes & Payment Terms */}
            <section id="pricing-payments" className="scroll-mt-24">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-text-main mb-3">
                4. Pricing, Taxes &amp; Payment Terms
              </h2>
              <p className="mb-3">
                All prices listed on our platform are denominated in Indian Rupees (INR) and are inclusive of all statutory Goods and Services Taxes (GST).
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-text-main">Price Revisions:</strong> Prices are subject to change without prior notice. However, orders already confirmed will be honored at the agreed purchase price.
                </li>
                <li>
                  <strong className="text-text-main">Payment Options:</strong> We accept all major Indian credit/debit cards, UPI (Google Pay, PhonePe, Paytm), Net Banking, and select Cash on Delivery (COD) destinations.
                </li>
                <li>
                  <strong className="text-text-main">Payment Security:</strong> Card information is processed securely through PCI-DSS Level 1 compliant gateway partners; raw card numbers are never stored on Baha servers.
                </li>
              </ul>
            </section>

            <hr className="border-t border-[#EAE6DE]" />

            {/* 5. Order Processing & Limitations */}
            <section id="order-acceptance" className="scroll-mt-24">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-text-main mb-3">
                5. Order Processing &amp; Limitations
              </h2>
              <p className="mb-3">
                Receipt of an electronic order confirmation does not signify our final acceptance of your purchase. Baha reserves the right to accept or decline your order for any legitimate commercial reason, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Sudden inventory exhaustion or factory quality inspection failures.</li>
                <li>Inaccurate pricing or typographic errors published on our catalog.</li>
                <li>Suspected fraudulent, unauthorized, or commercial reseller transactions.</li>
                <li>Delivery address lying outside serviceable courier pin codes.</li>
              </ul>
              <p className="mt-3">
                In any case where an order is canceled after payment processing, the entire billed amount will be refunded directly to your original source within 3 to 5 business days.
              </p>
            </section>

            <hr className="border-t border-[#EAE6DE]" />

            {/* 6. Intellectual Property & Trademarks */}
            <section id="intellectual-property" className="scroll-mt-24">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-text-main mb-3">
                6. Intellectual Property &amp; Trademarks
              </h2>
              <p className="mb-3">
                All website designs, brand logos, illustrations, photographs, color palettes, textile prints, and copy are the proprietary intellectual property of <em>Baha Retail Lifestyle Private Limited</em> protected by Indian and international copyright and trademark laws.
              </p>
              <p>
                You may not copy, reproduce, distribute, republish, or create derivative works from any Baha creative assets without express written prior consent.
              </p>
            </section>

            <hr className="border-t border-[#EAE6DE]" />

            {/* 7. Prohibited Website Use */}
            <section id="prohibited-conduct" className="scroll-mt-24">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-text-main mb-3">
                7. Prohibited Website Use &amp; Conduct
              </h2>
              <p className="mb-3">
                While interacting with Baha Fashion, you agree not to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Deploy automated scrapers, spiders, or bots to harvest product data or pricing information.</li>
                <li>Interfere with website speed, server stability, or security defenses.</li>
                <li>Transmit malicious code, viruses, or spam through contact forms or review sections.</li>
                <li>Impersonate another user, parent, or Baha representative.</li>
              </ul>
            </section>

            <hr className="border-t border-[#EAE6DE]" />

            {/* 8. Disclaimers & Limitation of Liability */}
            <section id="liability-disclaimers" className="scroll-mt-24">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-text-main mb-3">
                8. Disclaimers &amp; Limitation of Liability
              </h2>
              <p className="mb-3">
                Our services and merchandise are delivered on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. To the fullest extent permitted by Indian statutory law, Baha disclaims all warranties, express or implied, including merchantability and fitness for a particular purpose.
              </p>
              <p>
                In no circumstance shall Baha Fashion, its directors, or employees be liable for indirect, incidental, or consequential damages resulting from website downtime, delivery delays by third-party couriers, or unauthorized account access. Our aggregate liability shall never exceed the purchase price paid for the specific order in question.
              </p>
            </section>

            <hr className="border-t border-[#EAE6DE]" />

            {/* 9. Governing Law & Dispute Resolution */}
            <section id="governing-law-contact" className="scroll-mt-24">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-text-main mb-3">
                9. Governing Law &amp; Dispute Resolution
              </h2>
              <p className="mb-4">
                These Terms &amp; Conditions are constructed in accordance with the laws of the Republic of India. Any legal dispute or controversy arising out of these terms shall be subject to the exclusive jurisdiction of the competent courts in Gurugram, Haryana.
              </p>

              <div className="space-y-2.5 text-sm sm:text-base">
                <p>
                  <strong className="text-text-main">Legal &amp; Compliance Desk:</strong> Legal Affairs Department
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-brand-purple shrink-0" />
                  <span>
                    Email:{' '}
                    <a href="mailto:legal@bahafashion.com" className="text-brand-purple font-semibold hover:underline">
                      legal@bahafashion.com
                    </a>
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-brand-purple shrink-0" />
                  <span>Parent Care Line: +91 98765 43210 (Mon–Sat, 10 AM – 7 PM IST)</span>
                </p>
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-brand-purple shrink-0 mt-1" />
                  <span>Registered Office: Baha Retail Lifestyle Pvt. Ltd., Plot No. 44, Udyog Vihar Phase 4, Gurugram, Haryana - 122016, India</span>
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
