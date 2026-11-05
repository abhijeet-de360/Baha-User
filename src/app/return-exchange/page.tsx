import React from "react";
import Link from "next/link";
import { RotateCcw } from "lucide-react";

export const metadata = {
  title: "Return & Exchange Policy | Baha Kids",
  description: "Hassle-free 7-day return and exchange policy for clothes and accessories at Baha Kids.",
};

export default function ReturnExchangePage() {
  return (
    <div className="min-h-screen bg-[#fffcf6] text-[#292240] pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-12 select-none">
      <div className="w-full max-w-[1600px] mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-6 text-xs sm:text-sm text-[#786C65] flex items-center gap-2">
          <Link href="/" className="hover:text-[#0D03AE] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#0D03AE] font-medium">Return &amp; Exchange</span>
        </nav>

        {/* Header */}
        <div className="mb-10 border-b border-[#E7DEC8] pb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFE4CF] text-[#DC5513] text-xs sm:text-sm font-semibold mb-3">
            <RotateCcw className="w-4 h-4" />
            <span>Hassle-Free Guarantee</span>
          </div>
          <h1 className="font-primary text-3xl sm:text-4xl md:text-5xl text-[#0D03AE]">
            Return &amp; Exchange Policy
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#786C65]">
            Last updated: January 2026. Because babies grow fast and comfort matters most, we make returns and size exchanges simple and worry-free.
          </p>
        </div>

        {/* Extended Prose Content */}
        <div className="prose prose-neutral max-w-none text-[#4A4458] space-y-8 text-sm sm:text-base leading-relaxed">
          <div>
            <h2 className="font-primary text-2xl text-[#0D03AE] mb-3">1. Our 7-Day &ldquo;No Stress&rdquo; Window</h2>
            <p className="mb-3">
              We understand that guessing the right fit for your rapidly growing toddler can sometimes be tricky! That is why Baha Kids provides an easy <strong>7-calendar-day return and exchange window</strong> starting from the timestamp your parcel is delivered.
            </p>
            <p>
              Whether you need to size up from 12-18M to 18-24M, swap colors, or return an outfit entirely, our doorstep pickup network covers your home with zero courier coordination headaches.
            </p>
          </div>

          <div>
            <h2 className="font-primary text-2xl text-[#0D03AE] mb-3">2. Conditions for a Valid Return or Exchange</h2>
            <p className="mb-3">
              To ensure all garments delivered to other babies remain 100% hygienic, safe, and brand-new, returned items must satisfy the following criteria:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#554E62]">
              <li><strong>Unused &amp; Unwashed:</strong> Garments must not have been laundered, altered, worn outdoors, or stained by food, spit-up, or perfumes.</li>
              <li><strong>Original Tags Attached:</strong> The Baha woven fabric labels and cardboard swing tags must remain intact and untampered.</li>
              <li><strong>Original Packaging:</strong> The branded ziplock polybags and protective dust packaging must be returned alongside the garment.</li>
              <li><strong>Complete Sets:</strong> For cord sets, rompers with matching headbands, and co-ords, all pieces must be handed over together. Incomplete sets cannot be credited.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-primary text-2xl text-[#0D03AE] mb-3">3. Non-Returnable &amp; Final Sale Categories</h2>
            <p className="mb-2">
              For baby safety, pediatric hygiene, and sanitation regulations, the following categories are strictly non-returnable:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#554E62]">
              <li>Baby cloth diapers, cloth inserts, and waterproof diaper covers.</li>
              <li>Baby innerwear, bloomers, underpants, and vests once the primary seal is unfastened.</li>
              <li>Baby socks, booties, hair clips, and mittens.</li>
              <li>Personalized items with bespoke embroidered names or initial monograms.</li>
              <li>Items marked explicitly as &ldquo;Final Clearance&rdquo; or &ldquo;Flash Deal&rdquo; during clearance warehouse sales.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-primary text-2xl text-[#0D03AE] mb-3">4. Free Size Exchanges (Step-by-Step)</h2>
            <p className="mb-3">
              Got the wrong size? Don&apos;t worry, your first size exchange on every order is <strong>completely free of charge</strong>:
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-xs sm:text-sm text-[#554E62]">
              <li>Log in to your account and navigate to <Link href="/orders" className="text-[#0D03AE] underline font-medium">My Orders</Link>.</li>
              <li>Select the item and click <strong>&ldquo;Exchange Size&rdquo;</strong>, then choose the required alternative size.</li>
              <li>Our logistics partner will arrive within 2 to 3 days to collect the existing piece.</li>
              <li>As soon as the pickup scan is recorded by the courier rider, the newly requested size is triggered for dispatch from our warehouse.</li>
            </ol>
          </div>

          <div>
            <h2 className="font-primary text-2xl text-[#0D03AE] mb-3">5. Refund Methods &amp; Processing Timelines</h2>
            <p className="mb-3">
              Once returned packages are delivered to our Gurugram facility, our Quality Check (QC) team examines the merchandise within 24 to 48 business hours:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#554E62]">
              <li><strong>Prepaid Payments (UPI, Debit/Credit Card, NetBanking):</strong> Refund credited back to your original payment source within 3 to 5 banking business days following QC approval.</li>
              <li><strong>Cash on Delivery (COD) Orders:</strong> You can select between an instant <em>Baha Wallet Store Credit</em> (comes with a bonus 5% shopping credit and never expires) or provide your Bank Account IFSC details / UPI ID for an instant NEFT bank transfer.</li>
              <li><strong>Initial Shipping / COD Convenience Fees:</strong> Please note that convenience fees paid for original COD handling are non-refundable service fees disbursed directly to third-party couriers.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-primary text-2xl text-[#0D03AE] mb-3">6. Self-Ship Option (For Unserviceable Reverse Pincodes)</h2>
            <p>
              In rare instances where reverse doorstep pickup is unserviceable in your postal circle, you can courier the package back via any reputable postal provider (e.g., India Post Speed Post). Upon sharing the shipping receipt with our care team, we will reimburse up to ₹100 as store credit for your courier expenses.
            </p>
          </div>

          <div>
            <h2 className="font-primary text-2xl text-[#0D03AE] mb-3">7. Defective, Wrong, or Missing Items</h2>
            <p>
              Every garment is double-checked by our quality inspection staff. However, if you receive a manufacturing flaw, broken button, or an incorrect style, notify us within <strong>48 hours of delivery</strong>. We will arrange an express doorstep replacement or full reimbursement without questioning.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
