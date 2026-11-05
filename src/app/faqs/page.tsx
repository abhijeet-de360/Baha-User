"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, MessageSquare, ArrowRight, Sparkles } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: "Orders & Shipping" | "Returns & Exchanges" | "Fabrics & Care" | "Payments";
}

const FAQS_DATA: FAQItem[] = [
  // Orders & Shipping
  {
    category: "Orders & Shipping",
    question: "How long does standard delivery take across India?",
    answer: "Most orders are delivered within 2 to 4 business days for major metropolitan hubs (Delhi NCR, Mumbai, Bengaluru, etc.) and 4 to 6 business days for Tier 2 and Tier 3 cities. You will receive live WhatsApp & SMS tracking links as soon as your parcel is dispatched.",
  },
  {
    category: "Orders & Shipping",
    question: "Do you offer free shipping?",
    answer: "Yes! All prepaid orders above ₹499 enjoy 100% Free Shipping. For orders below ₹499, a flat nominal delivery fee of ₹79 is applied at checkout.",
  },
  {
    category: "Orders & Shipping",
    question: "Can I modify my shipping address after placing an order?",
    answer: "You can modify your address within 2 hours of placing the order by reaching our WhatsApp support helpline (+91 98765 43210). Once dispatched from our fulfillment center, addresses cannot be modified in transit.",
  },

  // Returns & Exchanges
  {
    category: "Returns & Exchanges",
    question: "What is your return and size exchange policy?",
    answer: "We offer a hassle-free 7-day return and exchange window from the delivery date. If sizing isn't perfect, your first size exchange is completely free with doorstep pickup.",
  },
  {
    category: "Returns & Exchanges",
    question: "How are refunds processed for Cash on Delivery (COD)?",
    answer: "For COD orders, refunds can be instantly credited to your Baha Store Wallet (with an extra 5% bonus credit) or transferred directly to your bank account via UPI / NEFT within 48 hours of warehouse inspection.",
  },
  {
    category: "Returns & Exchanges",
    question: "Are any products non-returnable?",
    answer: "For pediatric hygiene and safety reasons, opened innerwear, bloomers, cloth diapers, and baby socks/mittens cannot be returned once opened.",
  },

  // Fabrics & Care
  {
    category: "Fabrics & Care",
    question: "What fabrics do you use for Baha Kids clothing?",
    answer: "We exclusively craft our garments using 100% organic, combed cotton, breathable waffle knits, and pre-washed ribbed textiles dyed with child-safe, non-toxic colors. All pieces feature tagless necklines to prevent scratching.",
  },
  {
    category: "Fabrics & Care",
    question: "How should I wash and care for Baha baby clothes?",
    answer: "We recommend gentle machine washing with cold water and mild baby detergent. Avoid bleach or heavy tumble-drying. Line dry in shade to preserve natural fabric softness and vibrant prints.",
  },

  // Payments
  {
    category: "Payments",
    question: "Is Cash on Delivery (COD) available?",
    answer: "Yes, COD is supported for over 19,000 postal codes across India with a minimal ₹49 courier handling fee. You can also scan and pay via UPI QR directly with the delivery executive.",
  },
  {
    category: "Payments",
    question: "Are online payment gateways secure?",
    answer: "All online transactions are processed through certified PCI-DSS Level 1 encrypted payment gateways (supporting GPay, PhonePe, Paytm, Visa, Mastercard, and NetBanking). We never view or store your card CVVs or passwords.",
  },
];

export default function FAQsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = ["All", "Orders & Shipping", "Returns & Exchanges", "Fabrics & Care", "Payments"];

  const filteredFaqs =
    activeCategory === "All"
      ? FAQS_DATA
      : FAQS_DATA.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#fffcf6] text-[#292240] pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-12 select-none">
      <div className="w-full max-w-[1200px] mx-auto space-y-10">
        {/* Breadcrumb Navigation */}
        <nav className="text-xs sm:text-sm text-[#786C65] flex items-center gap-2">
          <Link href="/" className="hover:text-[#0D03AE] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#0D03AE] font-medium">FAQs</span>
        </nav>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDE5FA] text-[#0D03AE] text-xs sm:text-sm font-semibold">
            <HelpCircle className="w-4 h-4" />
            <span>Got Questions? We Have Answers</span>
          </div>
          <h1 className="font-primary text-3xl sm:text-4xl md:text-5xl text-[#0D03AE]">
            Frequently Asked Questions
          </h1>
          <p className="text-sm sm:text-base text-[#786C65]">
            Quick answers to the most common questions from parents about our shipping, sizes, and fabrics.
          </p>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenIndex(null);
              }}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#0D03AE] text-white border-[#0D03AE] shadow-xs"
                  : "bg-[#FFFBF0] text-neutral-700 border-[#E7DEC8] hover:bg-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3 pt-4">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="border border-[#E7DEC8] rounded-2xl bg-[#FFFBF0]/60 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-primary text-base sm:text-lg text-neutral-900 font-semibold">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-white border border-[#E7DEC8] flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-[#0D03AE] text-white border-[#0D03AE]" : "text-neutral-500"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[#4A4458] leading-relaxed border-t border-[#E7DEC8]/60 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Need Help Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl border border-[#E7DEC8] bg-[#FFF8E0]/60 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#DC5513] text-white flex items-center justify-center shrink-0">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-primary text-xl sm:text-2xl text-[#292240]">Still have questions?</h3>
              <p className="text-xs sm:text-sm text-[#786C65] mt-0.5">
                Our care team is happy to assist you with baby sizing, orders, and gift recommendations.
              </p>
            </div>
          </div>

          <Link
            href="/contact-us"
            className="px-6 py-3 rounded-full bg-[#0D03AE] hover:bg-[#090280] text-white font-primary text-base shadow-sm transition-all shrink-0"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}

