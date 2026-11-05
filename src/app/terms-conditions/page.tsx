import React from "react";
import Link from "next/link";
import { FileText } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions | Baha Kids",
  description: "Terms and conditions governing the use of Baha Kids website and services.",
};

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-[#fffcf6] text-[#292240] pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-12 select-none">
      <div className="w-full max-w-[1600px] mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-6 text-xs sm:text-sm text-[#786C65] flex items-center gap-2">
          <Link href="/" className="hover:text-[#0D03AE] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#0D03AE] font-medium">Terms &amp; Conditions</span>
        </nav>

        {/* Header */}
        <div className="mb-10 border-b border-[#E7DEC8] pb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDE5FA] text-[#0D03AE] text-xs sm:text-sm font-semibold mb-3">
            <FileText className="w-4 h-4" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="font-primary text-3xl sm:text-4xl md:text-5xl text-[#0D03AE]">
            Terms &amp; Conditions
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#786C65]">
            Last updated: January 2026. Please read these terms carefully before accessing or shopping at Baha Kids.
          </p>
        </div>

        {/* Extended Prose Content */}
        <div className="prose prose-neutral max-w-none text-[#4A4458] space-y-8 text-sm sm:text-base leading-relaxed">
          <div>
            <h2 className="font-primary text-2xl text-[#0D03AE] mb-3">1. Introduction &amp; Binding Agreement</h2>
            <p className="mb-3">
              Welcome to <strong>Baha Kids</strong> (&ldquo;Website&rdquo;, &ldquo;Site&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), a premium direct-to-consumer children&apos;s apparel platform owned and operated in India.
            </p>
            <p>
              By accessing, browsing, registering an account, or placing an order through this website, you agree to comply with and be bound by these Terms and Conditions (&ldquo;Terms&rdquo;), our Privacy Policy, and our Shipping, Return &amp; Exchange Policies. If you disagree with any portion of these provisions, you must discontinue your use of our platform.
            </p>
          </div>

          <div>
            <h2 className="font-primary text-2xl text-[#0D03AE] mb-3">2. Eligibility &amp; User Account Security</h2>
            <p className="mb-3">
              The services provided by Baha Kids are intended solely for individuals capable of entering legally binding contracts under the Indian Contract Act, 1872. While our products cater to babies, toddlers, and young children, purchases must be executed exclusively by parents, legal guardians, or adults aged 18 and older.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#554E62]">
              <li>You are responsible for maintaining the confidentiality of your account credentials, passwords, and OTP verification codes.</li>
              <li>You agree to provide true, accurate, current, and complete details during checkout and registration.</li>
              <li>Baha Kids reserves the right to suspend or terminate accounts that provide fictitious details or engage in fraudulent purchase activities.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-primary text-2xl text-[#0D03AE] mb-3">3. Product Descriptions, Fabric Specifications &amp; Color Accuracy</h2>
            <p className="mb-3">
              We take great pride in our certified soft baby cotton, breathable knits, and kid-safe dyes. We make every possible technical effort to display fabric textures, silhouettes, and colors as authentically as possible:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#554E62]">
              <li><strong>Screen Color Variances:</strong> The actual hues you see may vary slightly depending on your smartphone or monitor display panel calibrations (OLED vs. IPS, warm night-light modes).</li>
              <li><strong>Artisan Craftsmanship &amp; Dye Lots:</strong> Natural organic dyes and handmade garment washes may showcase subtle organic variations between distinct production batches, which is a hallmark of authentic craftsmanship rather than a defect.</li>
              <li><strong>Care Instructions:</strong> Parents are advised to adhere strictly to the sewn-in care tags (cold water wash, mild detergent, shade drying) to preserve softness and print vitality.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-primary text-2xl text-[#0D03AE] mb-3">4. Pricing, Taxes &amp; Order Acceptance</h2>
            <p className="mb-3">
              All prices shown on the catalog and checkout page are expressed in Indian Rupees (INR) and are inclusive of all applicable Goods and Services Taxes (GST):
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#554E62]">
              <li>We reserve the right to revise prices, discontinue styles, or adjust promotional discount codes without prior public notice.</li>
              <li>Receipt of an electronic order confirmation email does not signify our final acceptance of your order. Baha Kids reserves the right to cancel or limit quantities on any order due to inventory discrepancies, typographical pricing errors, or unverified shipping addresses.</li>
              <li>In the event of cancellation after your card or UPI account has been debited, the full amount will be reversed to your original source within 3-5 business days.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-primary text-2xl text-[#0D03AE] mb-3">5. Intellectual Property Rights</h2>
            <p className="mb-3">
              All intellectual property rights associated with this platform—including but not limited to the Baha Kids logo, brand mascots (the curious bunny, smiling monkey, and custom illustrations), UI designs, apparel pattern prints, lookbook photography, code, and editorial copy—are the exclusive intellectual property of Baha Kids.
            </p>
            <p>
              No user or commercial entity may copy, reproduce, publish, transmit, or exploit any artwork or content without explicit prior written authorization from our legal counsel.
            </p>
          </div>

          <div>
            <h2 className="font-primary text-2xl text-[#0D03AE] mb-3">6. Coupon Codes, Promotions &amp; Store Credits</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#554E62]">
              <li>Promotional coupon codes cannot be stacked together unless explicitly stated in a campaign banner.</li>
              <li>Discount vouchers cannot be redeemed for liquid cash or transferred between distinct user accounts.</li>
              <li>Baha Wallet Store Credits issued as part of customer refunds have lifetime validity and can be redeemed across any catalog collection.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-primary text-2xl text-[#0D03AE] mb-3">7. Limitation of Liability &amp; Disclaimers</h2>
            <p className="mb-3">
              To the maximum extent permitted by Indian statutory law, Baha Kids shall not be liable for any indirect, incidental, punitive, or consequential damages resulting from the use of, or inability to use, this website or products purchased herein.
            </p>
            <p>
              Our maximum aggregate liability for any claim arising from an order shall under no circumstances exceed the total monetary price actually paid by you for that specific order.
            </p>
          </div>

          <div>
            <h2 className="font-primary text-2xl text-[#0D03AE] mb-3">8. Governing Law &amp; Dispute Resolution</h2>
            <p>
              These Terms and Conditions and any disputes arising out of your relationship with Baha Kids shall be governed by, interpreted, and construed strictly in accordance with the substantive laws of India. Any legal proceedings or claims shall fall under the exclusive jurisdiction of the competent courts in <strong>New Delhi, India</strong>.
            </p>
          </div>

          <div>
            <h2 className="font-primary text-2xl text-[#0D03AE] mb-3">9. Modifications to Terms</h2>
            <p>
              We reserve the right to review and amend these Terms periodically to reflect evolving legal regulations or operational upgrades. Updated terms will take immediate effect once published on this page with an updated &ldquo;Last Updated&rdquo; date stamp.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
