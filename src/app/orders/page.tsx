"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  ChevronRight,
  RotateCcw,
  Download,
  AlertCircle,
} from "lucide-react";

export interface OrderRecord {
  id: string;
  orderNumber: string;
  date: string;
  status: "In Transit" | "Delivered" | "Processing";
  statusColor: string;
  expectedDelivery?: string;
  deliveredDate?: string;
  total: number;
  itemsCount: number;
  courier: string;
  trackingNumber: string;
  items: {
    id: string;
    name: string;
    size: string;
    color: string;
    price: number;
    image: string;
    quantity: number;
  }[];
}

const DEMO_ORDERS: OrderRecord[] = [
  {
    id: "o1",
    orderNumber: "BAHA-8921",
    date: "03 Nov 2026",
    status: "In Transit",
    statusColor: "text-amber-700 bg-amber-50 border-amber-200",
    expectedDelivery: "Tomorrow by 6:00 PM",
    total: 498,
    itemsCount: 2,
    courier: "Bluedart Express",
    trackingNumber: "AWB-7891230491",
    items: [
      {
        id: "p1",
        name: "Nap-Bottom One-Piece (Cherry Garden)",
        size: "3-6M",
        color: "Cream Cherry",
        price: 249,
        image: "/assets/temp/pr1.webp",
        quantity: 1,
      },
      {
        id: "p2",
        name: "Pink Bunny Bow Fluffy Dress Set",
        size: "6-12M",
        color: "Blush Pink",
        price: 249,
        image: "/assets/temp/pr2.webp",
        quantity: 1,
      },
    ],
  },
  {
    id: "o2",
    orderNumber: "BAHA-7742",
    date: "28 Oct 2026",
    status: "Delivered",
    statusColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
    deliveredDate: "Delivered on 30 Oct 2026",
    total: 747,
    itemsCount: 3,
    courier: "Delhivery Surface",
    trackingNumber: "DEL-992014184",
    items: [
      {
        id: "p3",
        name: "Teddy Bear Cotton Pajama Pants",
        size: "12-18M",
        color: "Vanilla",
        price: 249,
        image: "/assets/temp/pr4.webp",
        quantity: 1,
      },
      {
        id: "p4",
        name: "Baby Bear Fleece Romper",
        size: "6-12M",
        color: "Navy Blue",
        price: 249,
        image: "/assets/temp/pr3.webp",
        quantity: 2,
      },
    ],
  },
];

export default function MyOrdersPage() {
  const [filter, setFilter] = useState<"all" | "In Transit" | "Delivered">("all");

  const filteredOrders =
    filter === "all"
      ? DEMO_ORDERS
      : DEMO_ORDERS.filter((o) => o.status === filter);

  return (
    <div className="min-h-screen bg-[#FAF8E8]/40 pt-28 sm:pt-32 pb-20 font-secondary">
      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-500 mb-6">
          <Link
            href="/profile"
            className="flex items-center gap-1.5 hover:text-[#0D03AE] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Profile</span>
          </Link>
          <span>/</span>
          <span className="font-semibold text-neutral-800">My Orders</span>
        </div>

        {/* Heading & Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-black/5">
          <div>
            <h1 className="font-primary text-3xl sm:text-4xl text-neutral-900">
              My Orders &amp; Returns
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Track live shipments, download invoices, and request hassle-free returns.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {[
              { id: "all", label: "All Orders" },
              { id: "In Transit", label: "In Transit" },
              { id: "Delivered", label: "Delivered" },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setFilter(t.id as typeof filter)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  filter === t.id
                    ? "bg-[#0D03AE] text-white shadow-xs"
                    : "bg-white border border-black/10 text-neutral-600 hover:bg-neutral-50"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-3xl border border-black/5 p-6 shadow-xs overflow-hidden"
            >
              {/* Order Header Meta */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/5">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-bold text-sm sm:text-base text-neutral-900">
                    Order #{order.orderNumber}
                  </span>
                  <span className="text-xs text-neutral-400">&bull;</span>
                  <span className="text-xs text-neutral-500">Placed on {order.date}</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${order.statusColor}`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => alert(`Downloading Invoice for ${order.orderNumber}...`)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-black/10 hover:border-[#0D03AE] text-xs font-semibold text-neutral-700 hover:text-[#0D03AE] transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Invoice</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => alert(`Tracking live dispatch for ${order.trackingNumber}...`)}
                    className="px-4 py-1.5 rounded-full bg-[#0D03AE] text-white hover:bg-[#DC5513] text-xs font-bold transition-colors cursor-pointer"
                  >
                    Track Package
                  </button>
                </div>
              </div>

              {/* Status Banner */}
              <div className="mt-4 p-3.5 rounded-2xl bg-[#FAF8E8] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-semibold text-neutral-800">
                  {order.status === "In Transit" ? (
                    <>
                      <Truck className="w-4 h-4 text-[#DC5513]" />
                      <span>
                        Courier: <strong>{order.courier}</strong> ({order.trackingNumber}) &bull; Expected Delivery:{" "}
                        <strong className="text-[#0D03AE]">{order.expectedDelivery}</strong>
                      </span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{order.deliveredDate} &bull; Delivered to Bangalore</span>
                    </>
                  )}
                </div>

                {order.status === "Delivered" && (
                  <button
                    type="button"
                    onClick={() => alert("Initiating return or exchange window...")}
                    className="text-xs font-bold text-[#DC5513] hover:underline cursor-pointer"
                  >
                    Exchange / Return
                  </button>
                )}
              </div>

              {/* Items List */}
              <div className="divide-y divide-black/5 mt-4">
                {order.items.map((item) => (
                  <div key={item.id} className="py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-neutral-100 shrink-0 border border-black/5">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-neutral-900">
                          {item.name}
                        </h4>
                        <p className="text-xs text-neutral-500 mt-0.5">
                          Size: {item.size} &bull; Color: {item.color} &bull; Qty: {item.quantity}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-bold text-xs sm:text-sm text-neutral-900">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer Total */}
              <div className="mt-4 pt-4 border-t border-black/5 flex items-center justify-between text-xs sm:text-sm">
                <span className="text-neutral-500">
                  Total for {order.itemsCount} items (including taxes &amp; shipping):
                </span>
                <span className="font-black text-base sm:text-lg text-[#0D03AE]">
                  ₹{order.total}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

