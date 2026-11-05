"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock, MessageSquare, CheckCircle2, Sparkles, Send } from "lucide-react";

export default function ContactUsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    orderId: "",
    subject: "Order Inquiry",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        orderId: "",
        subject: "Order Inquiry",
        message: "",
      });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#fffcf6] text-[#292240] pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-12 select-none">
      <div className="w-full max-w-[1600px] mx-auto space-y-10">
        {/* Breadcrumb Navigation */}
        <nav className="text-xs sm:text-sm text-[#786C65] flex items-center gap-2">
          <Link href="/" className="hover:text-[#0D03AE] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#0D03AE] font-medium">Contact Us</span>
        </nav>

        {/* Header */}
        <div className="border-b border-[#E7DEC8] pb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDE5FA] text-[#0D03AE] text-xs sm:text-sm font-semibold mb-3">
            <MessageSquare className="w-4 h-4" />
            <span>We&apos;re Here to Help</span>
          </div>
          <h1 className="font-primary text-3xl sm:text-4xl md:text-5xl text-[#0D03AE]">
            Get In Touch With Our Care Team
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#786C65]">
            Have a question about an outfit, order delivery, or baby sizing? Our friendly parenting concierge is ready to assist.
          </p>
        </div>

        {/* 2-Column Layout: Contact Channels & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Direct Contacts (Span 5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="border border-[#E7DEC8] rounded-3xl p-6 sm:p-7 bg-[#FFFBF0]/60 space-y-6">
              <h2 className="font-primary text-xl sm:text-2xl text-[#0D03AE] border-b border-[#E7DEC8] pb-3">
                Direct Communication Channels
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-[#4A4458]">
                {/* Email Card */}
                <a
                  href="mailto:support@bahakids.com"
                  className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#fffcf6] border border-[#E7DEC8] hover:border-[#0D03AE] transition-colors group"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#EDE5FA] text-[#0D03AE] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#786C65] block font-medium">Customer Support Email</span>
                    <strong className="text-neutral-900 group-hover:text-[#0D03AE] transition-colors">
                      support@bahakids.com
                    </strong>
                    <p className="text-[11px] text-[#786C65] mt-0.5">Average response within 3 hours</p>
                  </div>
                </a>

                {/* Phone & WhatsApp Card */}
                <a
                  href="tel:+919876543210"
                  className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#fffcf6] border border-[#E7DEC8] hover:border-[#0D03AE] transition-colors group"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#FFE4CF] text-[#DC5513] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#786C65] block font-medium">Helpline &amp; WhatsApp</span>
                    <strong className="text-neutral-900 group-hover:text-[#DC5513] transition-colors">
                      +91 98765 43210
                    </strong>
                    <p className="text-[11px] text-[#786C65] mt-0.5">Available on call &amp; instant WhatsApp chat</p>
                  </div>
                </a>

                {/* Operating Hours */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#fffcf6] border border-[#E7DEC8]">
                  <div className="w-9 h-9 rounded-xl bg-[#E8EEDC] text-[#596F3D] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#786C65] block font-medium">Support Hours</span>
                    <strong className="text-neutral-900">Mon &ndash; Sat, 10:00 AM &ndash; 7:00 PM</strong>
                    <p className="text-[11px] text-[#786C65] mt-0.5">Closed on National Public Holidays</p>
                  </div>
                </div>

                {/* Office Address */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#fffcf6] border border-[#E7DEC8]">
                  <div className="w-9 h-9 rounded-xl bg-[#FCE4E8] text-[#B84C6B] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#786C65] block font-medium">Fulfillment Center &amp; HQ</span>
                    <p className="text-xs text-neutral-900 font-semibold leading-relaxed">
                      Baha Kids Retail Pvt. Ltd.<br />
                      Sector 44, Institutional Area, Gurugram, Haryana - 122003, India
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form (Span 7) */}
          <div className="lg:col-span-7">
            <div className="border border-[#E7DEC8] rounded-3xl p-6 sm:p-8 bg-[#FFFBF0]/60 space-y-5">
              <h2 className="font-primary text-xl sm:text-2xl text-[#0D03AE] border-b border-[#E7DEC8] pb-3">
                Send Us a Message
              </h2>

              {submitted ? (
                <div className="p-8 text-center space-y-3 bg-[#E8EEDC]/50 rounded-2xl border border-emerald-200">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-primary text-2xl text-emerald-900">Thank You! Message Received</h3>
                  <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
                    We&apos;ve logged your query and our care specialist will reach back to your email or WhatsApp within 2-3 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sneha Roy"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7DEC8] bg-[#fffcf6] text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-[#0D03AE]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. sneha@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7DEC8] bg-[#fffcf6] text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-[#0D03AE]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Phone / WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        placeholder="10-digit mobile number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7DEC8] bg-[#fffcf6] text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-[#0D03AE]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Order ID (If applicable)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. #BK-82914"
                        value={formData.orderId}
                        onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7DEC8] bg-[#fffcf6] text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-[#0D03AE]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7DEC8] bg-[#fffcf6] text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-[#0D03AE]"
                    >
                      <option value="Order Inquiry">Order Inquiry / Delivery Tracking</option>
                      <option value="Size Exchange">Size Exchange or Return Help</option>
                      <option value="Product Details">Product Fabric &amp; Sizing Question</option>
                      <option value="Wholesale">Bulk / Wholesale Query</option>
                      <option value="Feedback">Feedback / Suggestions</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us what you need help with..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7DEC8] bg-[#fffcf6] text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-[#0D03AE]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#0D03AE] hover:bg-[#090280] text-white font-primary text-base shadow-sm hover:shadow transition-all active:scale-95 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

