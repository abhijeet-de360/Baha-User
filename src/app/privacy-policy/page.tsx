import React from "react";
import Link from "next/link";
import { Lock } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Baha Kids",
  description: "Learn how Baha Kids collects, protects, and handles your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#fffcf6] text-[#292240] pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-12 select-none">
      <div className="w-full max-w-[1600px] mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-6 text-xs sm:text-sm text-[#786C65] flex items-center gap-2">
          <Link href="/" className="hover:text-[#0D03AE] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#0D03AE] font-medium">Privacy Policy</span>
        </nav>

        {/* Header */}
        <div className="mb-10 border-b border-[#E7DEC8] pb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8EEDC] text-[#596F3D] text-xs sm:text-sm font-semibold mb-3">
            <Lock className="w-4 h-4" />
            <span>Your Privacy Matters</span>
          </div>
          <h1 className="font-primary text-3xl sm:text-4xl md:text-5xl text-[#0D03AE]">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#786C65]">
            Effective Date: January 1, 2026. This comprehensive privacy policy outlines the strict measures and ethical practices Baha Kids undertakes to safeguard your and your family&apos;s data.
          </p>
        </div>

        {/* Extended Prose Content */}
        <div className="prose prose-neutral max-w-none text-[#4A4458] space-y-8 text-sm sm:text-base leading-relaxed">
          <div>
            <h2 className="font-primary text-2xl text-[#0D03AE] mb-3">1. Overview &amp; Commitment to Families</h2>
            <p className="mb-3">
              Baha Kids (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) operates this digital storefront to bring premium, certified-safe organic cotton children&apos;s apparel to modern families. Because we cater directly to parents and caretakers, safeguarding personal privacy and keeping childhood data confidential is at the heart of everything we build.
            </p>
            <p>
              We comply with the Digital Personal Data Protection Act (DPDP Act 2023) of India and applicable international best standards.
            </p>
          </div>

          <div>
            <h2 className="font-primary text-2xl text-[#0D03AE] mb-3">2. Information We Collect</h2>
            <p className="mb-3">
              When you browse, register an account, or order through our platform, we gather specific categories of information:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#554E62]">
              <li><strong>Parent / Guardian Contact Information:</strong> Your full name, mobile telephone number, email address, billing address, and residential shipping destinations.</li>
              <li><strong>Child Profile Attributes (Voluntary):</strong> Baby&apos;s nickname, gender, age or birth month, and size preferences. This information is purely voluntary and utilized exclusively to filter curated sizes and birthday surprise coupons.</li>
              <li><strong>Payment &amp; Transaction Logs:</strong> Order totals, transaction reference IDs, and payment method used (UPI / Card / NetBanking / COD). <em>Crucially, Baha Kids never views, logs, or stores full debit/credit card CVVs, PINs, or net banking passwords. All payments are tokenized via certified PCI-DSS Level 1 gateways (e.g., Razorpay, Cashfree).</em></li>
              <li><strong>Technical &amp; Browsing Analytics:</strong> IP address, device type, browser platform, approximate geographic location, and interaction events via session cookies to ensure the website renders quickly and accurately on your screen.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-primary text-2xl text-[#0D03AE] mb-3">3. How Your Information Is Used</h2>
            <p className="mb-3">We utilize collected data solely for legitimate business operations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#554E62]">
              <li>Validating, packing, and dispatching your merchandise to the correct address.</li>
              <li>Sending live delivery milestone notifications via WhatsApp, SMS, and transactional emails.</li>
              <li>Facilitating seamless 7-day doorstep size exchanges, returns, and wallet refunds.</li>
              <li>Preventing unauthorized transactions, fake accounts, and fraudulent COD orders.</li>
              <li>Dispatching curated parenting guides, seasonal lookbooks, and exclusive VIP discounts (only when you explicitly opt in to our newsletter).</li>
            </ul>
          </div>

          <div>
            <h2 className="font-primary text-2xl text-[#0D03AE] mb-3">4. Strict Zero-Sale Policy on Personal Data</h2>
            <p>
              <strong>We never sell, rent, monetize, or trade your personal information, phone numbers, or baby profiles with third-party brokers, advertisement networks, or telemarketers. Period.</strong>
            </p>
            <p className="mt-2">
              Information is shared strictly on a confidential need-to-know basis with audited operational partners:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#554E62]">
              <li><strong>Logistics Carriers:</strong> Delhivery, Blue Dart, and DTDC receive your delivery address and contact phone number exclusively to execute parcel drop-off.</li>
              <li><strong>Cloud Hosting &amp; Security:</strong> Enterprise data centers hosted in secure regional AWS facilities featuring TLS 1.3 encryption and automated threat defense.</li>
              <li><strong>Legal Authorities:</strong> Only when strictly mandated by valid legal court orders, search warrants, or Indian statutory regulations.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-primary text-2xl text-[#0D03AE] mb-3">5. Cookie Policy &amp; Tracking Technologies</h2>
            <p>
              Cookies are tiny text files placed on your browser that help us remember what items you placed in your shopping bag and maintain your logged-in session between pages. You can disable non-essential cookies via your browser settings at any time, though some interactive cart capabilities may function with limitations.
            </p>
          </div>

          <div>
            <h2 className="font-primary text-2xl text-[#0D03AE] mb-3">6. Your Rights &amp; Data Deletion Requests</h2>
            <p className="mb-3">
              As a user and parent, you maintain complete ownership of your personal data:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#554E62]">
              <li><strong>Access &amp; Edit:</strong> You can review and update addresses, telephone numbers, and child profiles anytime inside <Link href="/profile" className="text-[#0D03AE] underline font-medium">My Account</Link>.</li>
              <li><strong>Opt-Out of Marketing:</strong> Every promotional email contains a 1-click &ldquo;Unsubscribe&rdquo; link, or you can reply &ldquo;STOP&rdquo; to promotional SMS notifications.</li>
              <li><strong>Right to Be Forgotten / Erasure:</strong> To request full deletion of your customer profile, email our Data Protection Officer at <a href="mailto:privacy@bahakids.com" className="text-[#0D03AE] underline">privacy@bahakids.com</a>. We will wipe all non-financial records within 30 days.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-primary text-2xl text-[#0D03AE] mb-3">7. Contact the Grievance &amp; Privacy Officer</h2>
            <p>
              In accordance with the Information Technology Act 2000 and the DPDP Act 2023, the details of our appointed Grievance Officer are:
            </p>
            <div className="mt-2 text-xs sm:text-sm text-[#554E62] space-y-1">
              <p><strong>Name:</strong> Mr. Raghav Mehra</p>
              <p><strong>Designation:</strong> Head of Trust &amp; Customer Privacy, Baha Kids India</p>
              <p><strong>Email:</strong> <a href="mailto:privacy@bahakids.com" className="text-[#0D03AE] underline">privacy@bahakids.com</a></p>
              <p><strong>Postal Address:</strong> Baha Kids Retail HQ, Sector 44, Gurugram, Haryana - 122003, India</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
