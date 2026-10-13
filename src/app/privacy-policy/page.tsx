'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronRight,
  Clock,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

const SECTIONS = [
  { id: 'introduction', label: '1. Introduction & Overview' },
  { id: 'information-collected', label: '2. Information We Collect' },
  { id: 'how-we-use-info', label: '3. How We Use Your Information' },
  { id: 'children-privacy', label: "4. Children's Privacy Commitment" },
  { id: 'sharing-third-parties', label: '5. Sharing & Third Parties' },
  { id: 'data-security', label: '6. Data Security & Storage' },
  { id: 'cookies-tracking', label: '7. Cookies & Tracking Technologies' },
  { id: 'your-rights', label: '8. Your Rights & Data Choices' },
  { id: 'contact-grievance', label: '9. Contact & Grievance Officer' },
];

export default function PrivacyPolicyPage() {
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
            <span className="font-semibold text-brand-purple">Privacy Policy</span>
          </nav>

          {/* ── Document Header ── */}
          <header className="mb-10 sm:mb-14 pb-8 border-b border-[#EAE6DE]">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-purple-light text-brand-purple border border-brand-purple/20 mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Trust &amp; Data Protection</span>
            </div>
            <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-text-main tracking-tight">
              Privacy Policy
            </h1>
            <p className="mt-4 text-base sm:text-lg text-text-muted leading-relaxed">
              At Baha, your privacy and your family&apos;s data security are at the heart of our mission.
              This document outlines how we collect, use, protect, and handle your personal information.
            </p>
            <div className="mt-4 flex items-center gap-3 text-xs text-text-muted font-medium">
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-brand-purple" />
                <span>Last Updated: October 12, 2026</span>
              </span>
              <span>•</span>
              <span>Version 2.4</span>
            </div>
          </header>

          {/* ── Document Paragraph Sections ── */}
          <div className="space-y-10 sm:space-y-12 text-sm sm:text-base text-text-muted leading-relaxed">
            {/* 1. Introduction */}
            <section id="introduction" className="scroll-mt-24">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-text-main mb-3">
                1. Introduction &amp; Overview
              </h2>
              <div className="space-y-3">
                <p>
                  Welcome to <strong>Baha</strong> (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;), operated by <em>Baha Retail Lifestyle Private Limited</em>. We design and deliver pure organic kidswear crafted with GOTS-certified fabrics for baby, toddler, and junior wear.
                </p>
                <p>
                  This Privacy Policy outlines our guidelines concerning the collection, storage, use, and disclosure of personal information when you access or interact with our website (<strong className="text-text-main">www.bahafashion.com</strong>), mobile applications, social shopping features, or parent concierge services.
                </p>
                <p>
                  By browsing our online boutique, registering an account, or placing an order, you agree to the collection and handling of your information as detailed in this policy. If you do not agree with any part of this document, please discontinue using our platforms.
                </p>
              </div>
            </section>

            <hr className="border-t border-[#EAE6DE]" />

            {/* 2. Information We Collect */}
            <section id="information-collected" className="scroll-mt-24">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-text-main mb-3">
                2. Information We Collect
              </h2>
              <p className="mb-4">
                We collect information in three ways: information you directly provide, information collected automatically during your visit, and details provided by trusted partners.
              </p>

              <h3 className="font-heading font-bold text-base sm:text-lg text-text-main mt-5 mb-2">
                A. Information You Provide Voluntarily
              </h3>
              <ul className="list-disc pl-6 space-y-2 mb-5">
                <li>
                  <strong className="text-text-main">Contact &amp; Account Details:</strong> Full name, email address, mobile phone number, shipping address, and password.
                </li>
                <li>
                  <strong className="text-text-main">Order &amp; Billing Data:</strong> Products ordered, payment method preferences, delivery instructions, and invoice notes. <em>(Note: We do not store raw credit/debit card numbers; transactions are handled by RBI-approved payment gateways).</em>
                </li>
                <li>
                  <strong className="text-text-main">Parent Preferences:</strong> Optional age group selections (baby, toddler, junior) to customize recommended organic bundles.
                </li>
              </ul>

              <h3 className="font-heading font-bold text-base sm:text-lg text-text-main mt-5 mb-2">
                B. Automatically Collected Technical Data
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-text-main">Device &amp; Browser Info:</strong> IP address, browser type, operating system, device identifiers, and language preferences.
                </li>
                <li>
                  <strong className="text-text-main">Usage Analytics:</strong> Pages visited, time spent browsing, search terms, and items added to your wishlist or shopping cart.
                </li>
              </ul>
            </section>

            <hr className="border-t border-[#EAE6DE]" />

            {/* 3. How We Use Your Information */}
            <section id="how-we-use-info" className="scroll-mt-24">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-text-main mb-3">
                3. How We Use Your Information
              </h2>
              <p className="mb-4">
                We use your information strictly for legitimate commercial, operational, and customer support purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-text-main">Fulfill &amp; Deliver Orders:</strong> Process payments, dispatch eco-friendly packages via courier partners, and provide live shipment tracking updates.
                </li>
                <li>
                  <strong className="text-text-main">Parent Concierge Support:</strong> Assist with sizing inquiries, fabric questions, order cancellations, and smooth returns or exchanges.
                </li>
                <li>
                  <strong className="text-text-main">Security &amp; Fraud Prevention:</strong> Verify payment transactions, detect automated bot traffic, and maintain authentic customer reviews.
                </li>
                <li>
                  <strong className="text-text-main">Personalized Collections:</strong> Suggest season-appropriate organic cotton clothes and notify you when out-of-stock items return to our boutique.
                </li>
              </ul>
            </section>

            <hr className="border-t border-[#EAE6DE]" />

            {/* 4. Children's Privacy Commitment */}
            <section id="children-privacy" className="scroll-mt-24">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-text-main mb-3">
                4. Children&apos;s Privacy Commitment
              </h2>
              <p className="mb-3">
                While our products are thoughtfully crafted for babies and young children, our website is intended exclusively for purchase by parents, guardians, and adult family members over 18 years of age.
              </p>
              <p>
                We do not knowingly gather, store, or solicit personal data from children under 13. If you believe your child has registered an account or provided personal details without parental supervision, please alert our team immediately at <strong className="text-text-main">privacy@bahafashion.com</strong>, and we will delete the data without delay.
              </p>
            </section>

            <hr className="border-t border-[#EAE6DE]" />

            {/* 5. Sharing & Third Parties */}
            <section id="sharing-third-parties" className="scroll-mt-24">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-text-main mb-3">
                5. Sharing &amp; Third Parties
              </h2>
              <p className="mb-3">
                <strong className="text-text-main">We never sell or rent your personal data to advertisers.</strong> We only share minimal necessary information with vetted third-party service providers bound by strict confidentiality and data protection agreements:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-text-main">Logistics Partners:</strong> Blue Dart, Delhivery, and India Post for delivering your package and providing real-time SMS tracking updates.
                </li>
                <li>
                  <strong className="text-text-main">Payment Gateways:</strong> PCI-DSS compliant providers (Razorpay, UPI, Visa, Mastercard) for secure cashless checkouts.
                </li>
                <li>
                  <strong className="text-text-main">Cloud &amp; Hosting Infrastructure:</strong> Encrypted databases hosted on secure data centers.
                </li>
                <li>
                  <strong className="text-text-main">Legal &amp; Compliance:</strong> If mandated by law, court order, or governmental authorities under Indian jurisdiction.
                </li>
              </ul>
            </section>

            <hr className="border-t border-[#EAE6DE]" />

            {/* 6. Data Security & Storage */}
            <section id="data-security" className="scroll-mt-24">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-text-main mb-3">
                6. Data Security &amp; Storage
              </h2>
              <p className="mb-3">
                We implement industry-standard organizational, physical, and technological safeguards to shield your personal details against unauthorized access, loss, alteration, or disclosure.
              </p>
              <p>
                All sensitive traffic between your browser and our store is guarded by <strong>TLS 1.3 / 256-bit SSL encryption</strong>. Access to internal customer databases is limited strictly to authorized support personnel on a need-to-know basis.
              </p>
            </section>

            <hr className="border-t border-[#EAE6DE]" />

            {/* 7. Cookies & Tracking Technologies */}
            <section id="cookies-tracking" className="scroll-mt-24">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-text-main mb-3">
                7. Cookies &amp; Tracking Technologies
              </h2>
              <p className="mb-3">
                We use cookies and similar lightweight storage mechanisms to provide a seamless browsing experience, keep items in your shopping bag while you browse, and understand which organic styles parents love most.
              </p>
              <p>
                You can manage or disable cookie preferences through your browser settings anytime. Note that disabling essential cookies may impact certain store features, like your saved bag or quick checkout.
              </p>
            </section>

            <hr className="border-t border-[#EAE6DE]" />

            {/* 8. Your Rights & Data Choices */}
            <section id="your-rights" className="scroll-mt-24">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-text-main mb-3">
                8. Your Rights &amp; Data Choices
              </h2>
              <p className="mb-3">
                As a valued parent and customer, you have full sovereignty over your information under applicable Indian data privacy regulations:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-text-main">Right to Access &amp; Portability:</strong> Request an export of all personal data held in your account.
                </li>
                <li>
                  <strong className="text-text-main">Right to Rectification:</strong> Edit or correct any inaccurate delivery addresses, contact numbers, or profile details directly from your account page.
                </li>
                <li>
                  <strong className="text-text-main">Right to Erasure (&ldquo;Right to be Forgotten&rdquo;):</strong> Request complete deletion of your account and customer history.
                </li>
                <li>
                  <strong className="text-text-main">Marketing Opt-Out:</strong> Unsubscribe from promotional email newsletters or SMS notifications anytime with 1 click.
                </li>
              </ul>
            </section>

            <hr className="border-t border-[#EAE6DE]" />

            {/* 9. Contact & Grievance Officer */}
            <section id="contact-grievance" className="scroll-mt-24">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-text-main mb-3">
                9. Contact &amp; Grievance Officer
              </h2>
              <p className="mb-4">
                Under the Information Technology Act 2000 and the Digital Personal Data Protection Act (DPDPA), if you have any questions, feedback, or grievances regarding our privacy practices, our designated Data Grievance Officer is available to assist you:
              </p>

              <div className="space-y-2.5 text-sm sm:text-base">
                <p>
                  <strong className="text-text-main">Grievance Officer:</strong> Mr. Sameer Verma
                </p>
                <p>
                  <strong className="text-text-main">Designation:</strong> Head of Trust, Safety &amp; Data Privacy
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-brand-purple shrink-0" />
                  <span>
                    Email:{' '}
                    <a href="mailto:grievance@bahafashion.com" className="text-brand-purple font-semibold hover:underline">
                      grievance@bahafashion.com
                    </a>
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-brand-purple shrink-0" />
                  <span>Parent Support: +91 98765 43210 (Mon–Sat, 10 AM – 7 PM IST)</span>
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
