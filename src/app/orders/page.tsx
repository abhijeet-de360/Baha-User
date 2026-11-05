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
  ChevronDown,
  ChevronRight,
  RotateCcw,
  Download,
  AlertCircle,
  MapPin,
  CreditCard,
  Calendar,
  ExternalLink,
} from "lucide-react";

export interface OrderItem {
  id: string;
  name: string;
  size: string;
  color: string;
  price: number;
  image: string;
  quantity: number;
}

export interface OrderRecord {
  id: string;
  orderNumber: string;
  date: string;
  time?: string;
  status: "In Transit" | "Delivered" | "Processing";
  statusColor: string;
  expectedDelivery?: string;
  deliveredDate?: string;
  total: number;
  subtotal: number;
  discount: number;
  shipping: number;
  itemsCount: number;
  courier: string;
  trackingNumber: string;
  deliveryAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
  };
  paymentMethod: string;
  paymentStatus: string;
  trackingTimeline: {
    status: string;
    time: string;
    location: string;
    completed: boolean;
    current?: boolean;
  }[];
  items: OrderItem[];
}

const DEMO_ORDERS: OrderRecord[] = [
  {
    id: "o1",
    orderNumber: "BAHA-8921",
    date: "03 Nov 2026",
    time: "02:45 PM",
    status: "In Transit",
    statusColor: "text-amber-800 bg-[#FFF8E0] border-[#FED174]",
    expectedDelivery: "Tomorrow by 6:00 PM",
    subtotal: 598,
    discount: 100,
    shipping: 0,
    total: 498,
    itemsCount: 2,
    courier: "Bluedart Express",
    trackingNumber: "AWB-7891230491",
    deliveryAddress: {
      name: "Priya Sharma",
      street: "Flat 402, Sunshine Meadows, 14th Main, Indiranagar",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560038",
      phone: "+91 98765 43210",
    },
    paymentMethod: "UPI (Google Pay)",
    paymentStatus: "Paid",
    trackingTimeline: [
      {
        status: "Order Confirmed",
        time: "03 Nov, 02:45 PM",
        location: "Bengaluru Hub",
        completed: true,
      },
      {
        status: "Dispatched & Quality Checked",
        time: "04 Nov, 10:15 AM",
        location: "Warehouse Central",
        completed: true,
      },
      {
        status: "Out for Delivery",
        time: "05 Nov, 09:30 AM",
        location: "Indiranagar Hub",
        completed: false,
        current: true,
      },
      {
        status: "Expected Delivery",
        time: "Tomorrow by 6:00 PM",
        location: "Doorstep",
        completed: false,
      },
    ],
    items: [
      {
        id: "p1",
        name: "Nap-Bottom One-Piece Romper (Cherry Garden)",
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
    time: "11:20 AM",
    status: "Delivered",
    statusColor: "text-emerald-800 bg-emerald-50 border-emerald-200",
    deliveredDate: "Delivered on 30 Oct 2026",
    subtotal: 747,
    discount: 0,
    shipping: 0,
    total: 747,
    itemsCount: 3,
    courier: "Delhivery Surface",
    trackingNumber: "DEL-992014184",
    deliveryAddress: {
      name: "Priya Sharma",
      street: "Flat 402, Sunshine Meadows, 14th Main, Indiranagar",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560038",
      phone: "+91 98765 43210",
    },
    paymentMethod: "Credit Card (HDFC ending in 4091)",
    paymentStatus: "Paid",
    trackingTimeline: [
      {
        status: "Order Confirmed",
        time: "28 Oct, 11:20 AM",
        location: "Bengaluru Hub",
        completed: true,
      },
      {
        status: "Dispatched",
        time: "29 Oct, 08:00 AM",
        location: "Warehouse Central",
        completed: true,
      },
      {
        status: "Delivered",
        time: "30 Oct, 03:15 PM",
        location: "Handed to recipient",
        completed: true,
      },
    ],
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
  // Default first order to open so user immediately sees accordion capability
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>("o1");

  const toggleOrderAccordion = (orderId: string) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  const filteredOrders =
    filter === "all"
      ? DEMO_ORDERS
      : DEMO_ORDERS.filter((o) => o.status === filter);

  return (
    <div className="min-h-screen bg-[#fffcf6] pt-28 sm:pt-32 pb-20 font-secondary">
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-500 mb-6 font-jost">
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#E7DEC8]">
          <div>
            <h1 className="font-primary text-3xl sm:text-4xl text-neutral-900">
              My Orders &amp; Returns
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1 font-jost">
              Click any order card to expand full item breakdown, delivery tracking, and invoice details.
            </p>
          </div>

          <div className="flex items-center gap-2 font-jost">
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
                    : "bg-[#FFFBF0] border border-[#E7DEC8] text-neutral-700 hover:bg-[#FAF8E8]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Accordion List */}
        <div className="space-y-4 font-jost">
          {filteredOrders.length === 0 ? (
            <div className="p-12 text-center bg-[#FFFBF0]/70 rounded-3xl border border-[#E7DEC8]">
              <Package className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
              <h3 className="font-bold text-base text-neutral-800">No orders found</h3>
              <p className="text-xs text-neutral-500 mt-1">
                You don&apos;t have any orders matching the &ldquo;{filter}&rdquo; filter.
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => {
              const isExpanded = expandedOrderId === order.id;

              return (
                <div
                  key={order.id}
                  className={`bg-[#FFFBF0]/80 rounded-3xl border transition-all duration-300 overflow-hidden shadow-xs ${
                    isExpanded
                      ? "border-[#0D03AE]/40 ring-1 ring-[#0D03AE]/15 bg-[#FFFBF0]"
                      : "border-[#E7DEC8] hover:border-neutral-400 hover:shadow-sm"
                  }`}
                >
                  {/* Accordion Clickable Header Summary */}
                  <div
                    onClick={() => toggleOrderAccordion(order.id)}
                    className="p-5 sm:p-6 cursor-pointer select-none transition-colors hover:bg-[#FAF8E8]/50 flex flex-col gap-4"
                  >
                    {/* Top row: Order # & Status Badge */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-[#0D03AE]" />
                          <span className="font-bold text-base sm:text-lg text-neutral-900">
                            #{order.orderNumber}
                          </span>
                        </div>
                        <span className="text-xs text-neutral-400">&bull;</span>
                        <span className="text-xs text-neutral-600 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                          {order.date}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold border ${order.statusColor}`}
                        >
                          {order.status}
                        </span>
                      </div>

                      {/* Right side: Total Price & Accordion Toggle Icon */}
                      <div className="flex items-center justify-between sm:justify-end gap-4">
                        <div className="text-left sm:text-right">
                          <span className="text-[11px] text-neutral-500 block">Total Amount</span>
                          <span className="font-black text-base sm:text-lg text-[#0D03AE]">
                            ₹{order.total}
                          </span>
                        </div>

                        <div
                          className={`w-9 h-9 rounded-full border border-[#E7DEC8] bg-[#FAF8E8] flex items-center justify-center text-neutral-700 transition-transform duration-300 shrink-0 ${
                            isExpanded ? "rotate-180 bg-[#0D03AE] text-white border-[#0D03AE]" : ""
                          }`}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    {/* Middle summary row: Preview Thumbnails + Delivery snippet */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#E7DEC8]/60">
                      {/* Image avatars preview */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center -space-x-2 overflow-hidden">
                          {order.items.map((item, idx) => (
                            <div
                              key={item.id + idx}
                              className="relative w-10 h-10 rounded-xl overflow-hidden border-2 border-[#FFFBF0] bg-[#FAF8E8] shrink-0"
                            >
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                sizes="40px"
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                        <div className="text-xs text-neutral-700">
                          <span className="font-semibold text-neutral-900">
                            {order.items[0]?.name}
                          </span>
                          {order.items.length > 1 && (
                            <span className="text-neutral-500">
                              {" "}
                              + {order.items.length - 1} more item
                              {order.items.length > 2 ? "s" : ""}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Status hint pill */}
                      <div className="text-xs text-neutral-600 flex items-center gap-1.5 self-start sm:self-auto">
                        {order.status === "In Transit" ? (
                          <>
                            <Truck className="w-3.5 h-3.5 text-[#DC5513]" />
                            <span>
                              Arriving:{" "}
                              <strong className="text-neutral-900">{order.expectedDelivery}</strong>
                            </span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>
                              Delivered on:{" "}
                              <strong className="text-neutral-900">
                                {order.deliveredDate?.replace("Delivered on ", "")}
                              </strong>
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Accordion Expandable Detailed Content */}
                  {isExpanded && (
                    <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-[#E7DEC8] space-y-6 animate-in slide-in-from-top-2 duration-300">
                      {/* Quick Actions Bar inside Details */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-neutral-600">
                            Tracking:{" "}
                            <strong className="text-neutral-900 font-bold">
                              {order.trackingNumber}
                            </strong>{" "}
                            via {order.courier}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              alert(`Downloading official tax invoice for #${order.orderNumber}...`);
                            }}
                            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#E7DEC8] hover:border-[#0D03AE] bg-[#FAF8E8] text-xs font-semibold text-neutral-700 hover:text-[#0D03AE] transition-all cursor-pointer shadow-2xs"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download Invoice</span>
                          </button>

                          {order.status === "Delivered" ? (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                alert("Return / Exchange request opened for Order #" + order.orderNumber);
                              }}
                              className="px-4 py-1.5 rounded-full bg-[#FAF8E8] border border-[#DC5513] text-[#DC5513] hover:bg-[#DC5513] hover:text-white text-xs font-bold transition-colors cursor-pointer"
                            >
                              Exchange / Return
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                alert(`Live GPS dispatch tracking for ${order.trackingNumber}`);
                              }}
                              className="px-4 py-1.5 rounded-full bg-[#0D03AE] text-white hover:bg-[#DC5513] text-xs font-bold transition-colors cursor-pointer shadow-xs"
                            >
                              Track Live Shipment
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Live Tracking Journey Timeline */}
                      <div className="p-4 rounded-2xl bg-[#FAF8E8] border border-[#E7DEC8]">
                        <h4 className="text-xs uppercase font-bold text-neutral-600 tracking-wider mb-4 flex items-center gap-2">
                          <Truck className="w-4 h-4 text-[#DC5513]" />
                          Delivery Progress &bull; {order.courier}
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 relative">
                          {order.trackingTimeline.map((step, idx) => (
                            <div key={step.status + idx} className="relative flex flex-col">
                              <div className="flex items-center gap-2 mb-1.5">
                                <div
                                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                                    step.completed
                                      ? "bg-[#0D03AE] text-white"
                                      : step.current
                                      ? "bg-[#DC5513] text-white ring-4 ring-[#DC5513]/20"
                                      : "bg-[#E7DEC8] text-neutral-500"
                                  }`}
                                >
                                  {step.completed ? "✓" : idx + 1}
                                </div>
                                <span
                                  className={`text-xs font-bold ${
                                    step.completed
                                      ? "text-neutral-900"
                                      : step.current
                                      ? "text-[#DC5513]"
                                      : "text-neutral-400"
                                  }`}
                                >
                                  {step.status}
                                </span>
                              </div>
                              <span className="text-[11px] text-neutral-500 pl-8">
                                {step.time}
                              </span>
                              <span className="text-[11px] text-neutral-400 pl-8">
                                {step.location}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Items Purchased in this order */}
                      <div>
                        <h4 className="text-xs uppercase font-bold text-neutral-600 tracking-wider mb-3">
                          Items in this Order ({order.items.length})
                        </h4>

                        <div className="divide-y divide-[#E7DEC8] border-y border-[#E7DEC8]">
                          {order.items.map((item) => (
                            <div
                              key={item.id}
                              className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                            >
                              <div className="flex items-center gap-4">
                                <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-[#FAF8E8] shrink-0 border border-[#E7DEC8]">
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    sizes="64px"
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <Link
                                    href="/products"
                                    className="font-bold text-sm text-neutral-900 hover:text-[#0D03AE] transition-colors flex items-center gap-1 group"
                                  >
                                    <span>{item.name}</span>
                                    <ExternalLink className="w-3 h-3 text-neutral-400 group-hover:text-[#0D03AE]" />
                                  </Link>
                                  <div className="flex items-center gap-2 text-xs text-neutral-500 mt-1 flex-wrap">
                                    <span className="px-2 py-0.5 rounded-md bg-[#FAF8E8] border border-[#E7DEC8] text-neutral-700 font-semibold">
                                      Size: {item.size}
                                    </span>
                                    <span>&bull;</span>
                                    <span>Color: {item.color}</span>
                                    <span>&bull;</span>
                                    <span>Qty: {item.quantity}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="text-left sm:text-right flex sm:flex-col items-center sm:items-end justify-between">
                                <span className="font-bold text-sm sm:text-base text-neutral-900">
                                  ₹{item.price * item.quantity}
                                </span>
                                <span className="text-[11px] text-neutral-500">
                                  ₹{item.price} each
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Grid: Delivery Address & Payment Summary */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        {/* Delivery Address */}
                        <div className="p-4 rounded-2xl bg-[#FAF8E8]/70 border border-[#E7DEC8] flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                              <MapPin className="w-3.5 h-3.5 text-[#DC5513]" />
                              <span>Delivery Address</span>
                            </div>
                            <p className="text-sm font-bold text-neutral-900">
                              {order.deliveryAddress.name}
                            </p>
                            <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">
                              {order.deliveryAddress.street},{" "}
                              {order.deliveryAddress.city},{" "}
                              {order.deliveryAddress.state} -{" "}
                              {order.deliveryAddress.pincode}
                            </p>
                            <p className="text-xs text-neutral-500 mt-1">
                              Phone: {order.deliveryAddress.phone}
                            </p>
                          </div>
                        </div>

                        {/* Price & Payment Breakdown */}
                        <div className="p-4 rounded-2xl bg-[#FAF8E8]/70 border border-[#E7DEC8] space-y-2 text-xs">
                          <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-neutral-700 mb-2">
                            <CreditCard className="w-3.5 h-3.5 text-[#0D03AE]" />
                            <span>Payment &amp; Price Breakdown</span>
                          </div>

                          <div className="flex items-center justify-between text-neutral-600">
                            <span>Subtotal</span>
                            <span>₹{order.subtotal}</span>
                          </div>

                          {order.discount > 0 && (
                            <div className="flex items-center justify-between text-emerald-700 font-semibold">
                              <span>Promo / Coins Discount</span>
                              <span>-₹{order.discount}</span>
                            </div>
                          )}

                          <div className="flex items-center justify-between text-neutral-600">
                            <span>Delivery Fee</span>
                            <span className="text-emerald-700 font-semibold">FREE</span>
                          </div>

                          <div className="pt-2 border-t border-[#E7DEC8] flex items-center justify-between text-sm font-bold text-neutral-900">
                            <span>Total Paid</span>
                            <span className="text-[#0D03AE] font-black text-base">
                              ₹{order.total}
                            </span>
                          </div>

                          <p className="text-[11px] text-neutral-500 pt-1">
                            Paid via: {order.paymentMethod} &bull; Status:{" "}
                            <span className="text-emerald-700 font-semibold">
                              {order.paymentStatus}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}


