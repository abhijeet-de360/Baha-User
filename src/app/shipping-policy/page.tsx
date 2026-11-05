import React from "react";
import Link from "next/link";
import { Truck } from "lucide-react";

export const metadata = {
  title: "Shipping Policy | Baha Kids",
  description: "Learn about Baha Kids shipping timelines, rates, and delivery details across India.",
};

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-[#fffcf6] text-[#292240] pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-12 select-none">
      <div className="w-full max-w-[1600px] mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-6 text-xs sm:text-sm text-[#786C65] flex items-center gap-2">
          <Link href="/" className="hover:text-[#0D03AE] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#0D03AE] font-medium">Shipping Policy</span>
        </nav>

        {/* Header */}
        <div className="mb-10 border-b border-[#E7DEC8] pb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDE5FA] text-[#0D03AE] text-xs sm:text-sm font-semibold mb-3">
            <Truck className="w-4 h-4" />
            <span>Fast &amp; Safe Delivery</span>
          </div>
          <h1 className="font-primary text-3xl sm:text-4xl md:text-5xl text-[#0D03AE]">
            Shipping Policy
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#786C65]">
            Last updated: January 2026. Everything you need to know about our dispatch, packaging, and delivery promises across India.
          </p>
        </div>

        {/* Extended Prose Content */}
        <div className="prose prose-neutral max-w-none text-[#4A4458] space-y-8 text-sm sm:text-base leading-relaxed">
          <div>
            <h2 className="font-primary text-2xl text-[#0D03AE] mb-3">1. Order Processing &amp; Dispatch Timeline</h2>
            <p className="mb-3">
              At Baha Kids, we treat every order like a special present for your little explorer. Once your order is confirmed, our warehouse team in Gurugram, Haryana begins inspecting, hand-folding, and packing each piece with care.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#554E62]">
              <li><strong>Standard Ready-to-Ship Items:</strong> Dispatched within 24 to 48 business hours from the time of confirmation.</li>
              <li><strong>Personalized / Embroidered Apparel:</strong> Dispatched within 3 to 4 business days due to custom craftsmanship.</li>
              <li><strong>Orders Placed on Weekends / Public Holidays:</strong> Processed on the following immediate business day.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-primary text-2xl text-[#0D03AE] mb-3">2. Domestic Delivery Timelines &amp; Courier Partners</h2>
            <p className="mb-3">
              We partner with Tier-1 logistics carriers including Delhivery, Blue Dart, DTDC, and Amazon Shipping to ensure quick, contactless, and damage-free deliveries across over 19,000 pincodes in India:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#554E62]">
              <li><strong>Tier 1 Metro Hubs (Delhi NCR, Mumbai, Bengaluru, Chennai, Hyderabad, Kolkata):</strong> Delivered within 2 to 4 business days.</li>
              <li><strong>Tier 2 &amp; Tier 3 Cities (Pune, Ahmedabad, Jaipur, Chandigarh, Lucknow, Kochi, etc.):</strong> Delivered within 4 to 6 business days.</li>
              <li><strong>North-East, J&amp;K, Himachal, and Remote Rural Regions:</strong> Delivered within 6 to 9 business days.</li>
            </ul>
            <p className="mt-2 text-xs sm:text-sm text-[#786C65]">
              <em>Note: During national peak sale seasons, severe weather disruptions, or regional festivals (Diwali, Eid, Christmas), transit timelines may face minor unavoidable extensions.</em>
            </p>
          </div>

          <div>
            <h2 className="font-primary text-2xl text-[#0D03AE] mb-3">3. Shipping Rates &amp; COD Handling Charges</h2>
            <p className="mb-3">
              We strive to keep shopping seamless and economical for every growing family:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#554E62]">
              <li><strong>Prepaid Orders Above ₹999:</strong> 100% Free Standard Delivery across India.</li>
              <li><strong>Prepaid Orders Below ₹999:</strong> A nominal flat shipping fee of ₹79 is calculated at checkout.</li>
              <li><strong>Cash on Delivery (COD):</strong> Available for eligible postal codes up to a cart value of ₹5,000 with a minimal convenience fee of ₹49 per order. COD is non-refundable upon cancellation after dispatch.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-primary text-2xl text-[#0D03AE] mb-3">4. Eco-Friendly &amp; Child-Safe Packaging</h2>
            <p>
              We care about the planet our children will grow up in. All Baha Kids products are delivered in recyclable cardboard boxes and biodegradable polybags sealed with tamper-proof security tape. No harmful phthalates, sharp pins, or toxic chemical odor are present in our packaging materials.
            </p>
          </div>

          <div>
            <h2 className="font-primary text-2xl text-[#0D03AE] mb-3">5. Live Order Tracking &amp; Delivery Attempts</h2>
            <p className="mb-3">
              Real-time transparency is our commitment to parents:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#554E62]">
              <li>You will receive an automated WhatsApp, SMS, and Email alert containing your unique Air Waybill (AWB) number as soon as the manifest is generated.</li>
              <li>Our delivery partners attempt delivery up to <strong>3 times</strong> before returning an undelivered parcel to our fulfillment warehouse (Return to Origin - RTO).</li>
              <li>If you miss a delivery, you can reschedule via the courier link or reach our care team before the third attempt.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-primary text-2xl text-[#0D03AE] mb-3">6. Address Modifications &amp; Cancellations</h2>
            <p>
              Address modifications or cancellations are accepted within <strong>2 hours of order placement</strong> or before dispatch status is updated. Once your parcel has left our facility, addresses cannot be altered in transit. If an order is cancelled before dispatch, the complete amount including any shipping fees will be refunded immediately.
            </p>
          </div>

          <div>
            <h2 className="font-primary text-2xl text-[#0D03AE] mb-3">7. Damaged, Missing, or Tampered Shipments</h2>
            <p className="mb-2">
              In the unlikely event that your parcel arrives crushed, wet, torn, or with missing tamper seals:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#554E62]">
              <li>Refuse acceptance from the courier executive and mark &ldquo;Damaged Delivery Refused&rdquo; on the delivery sheet.</li>
              <li>If already delivered, email unboxing photos or videos to <a href="mailto:support@bahakids.com" className="text-[#0D03AE] underline">support@bahakids.com</a> within <strong>48 hours</strong> of receipt. We will initiate an immediate replacement or full refund.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-primary text-2xl text-[#0D03AE] mb-3">8. International Shipping</h2>
            <p>
              Currently, Baha Kids delivers exclusively across domestic India. We are working diligently to launch cross-border international deliveries to North America, Europe, and the Middle East in late 2026.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
