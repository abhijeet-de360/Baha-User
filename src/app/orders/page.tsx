"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  Download,
  Search,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  MapPin,
  CreditCard,
  Calendar,
  RotateCcw,
  Sparkles,
  ChevronRight,
  ShoppingBag,
  HelpCircle,
  PhoneCall,
  CheckCircle,
} from "lucide-react";
import { LiveTrackingModal } from "@/components/orders/LiveTrackingModal";
import { ExchangeReturnModal } from "@/components/orders/ExchangeReturnModal";
import { ShipmentMilestoneTimeline } from "@/components/orders/ShipmentMilestoneTimeline";
import { getShipmentTracking, LiveShipmentData } from "@/data/shipmentTracking";
import { DEMO_ORDERS, OrderItem, OrderRecord } from "@/data/orders";

export default function MyOrdersPage() {
  const [filter, setFilter] = useState<"all" | "In Transit" | "Delivered">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState<string>("o1");
  const [mobileViewMode, setMobileViewMode] = useState<"list" | "details">("details");
  const [trackingModalOrder, setTrackingModalOrder] = useState<LiveShipmentData | null>(null);
  const [exchangeReturnModalOpen, setExchangeReturnModalOpen] = useState(false);
  const [copiedAWB, setCopiedAWB] = useState(false);

  // Filter orders based on status filter and search query
  const filteredOrders = useMemo(() => {
    return DEMO_ORDERS.filter((order) => {
      const matchesFilter = filter === "all" ? true : order.status === filter;
      const matchesSearch =
        searchQuery.trim() === ""
          ? true
          : order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.items.some((i) =>
              i.name.toLowerCase().includes(searchQuery.toLowerCase())
            ) ||
            order.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchQuery]);

  // Selected Order Object
  const selectedOrder = useMemo(() => {
    return (
      filteredOrders.find((o) => o.id === selectedOrderId) ||
      filteredOrders[0] ||
      DEMO_ORDERS[0]
    );
  }, [filteredOrders, selectedOrderId]);

  const handleSelectOrder = (orderId: string) => {
    setSelectedOrderId(orderId);
    setMobileViewMode("details");
  };

  const handleCopyAWB = (awb: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(awb);
      setCopiedAWB(true);
      setTimeout(() => setCopiedAWB(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffcf6] pt-28 sm:pt-32 pb-36 sm:pb-28 lg:pb-20 font-secondary text-neutral-800">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
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
          <span className="font-semibold text-neutral-900">My Orders &amp; Returns</span>
        </div>

        {/* Heading & Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-5 border-b border-[#E7DEC8]">
          <div>
            <h1 className="font-primary text-3xl sm:text-4xl text-neutral-900 leading-tight">
              My Orders &amp; Delivery History
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1 font-jost">
              Select any order on the left tab to inspect full shipment milestones, invoices &amp; exchange options on the right.
            </p>
          </div>

          {/* Search Box & Quick Filter Pills */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 font-jost">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                suppressHydrationWarning
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by order # or product..."
                className="w-full sm:w-64 pl-9 pr-4 py-2 rounded-full bg-[#FAF8E8] border border-[#E7DEC8] text-xs text-neutral-800 placeholder:text-neutral-400 outline-none focus:border-[#0D03AE] shadow-2xs font-secondary"
              />
            </div>

            {/* Status Filter Tabs */}
            <div className="flex items-center gap-1 bg-[#FAF8E8] p-1 rounded-full border border-[#E7DEC8] shadow-2xs">
              {[
                { id: "all", label: `All (${DEMO_ORDERS.length})` },
                {
                  id: "In Transit",
                  label: `In Transit (${DEMO_ORDERS.filter((o) => o.status === "In Transit").length})`,
                },
                {
                  id: "Delivered",
                  label: `Delivered (${DEMO_ORDERS.filter((o) => o.status === "Delivered").length})`,
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilter(tab.id as typeof filter)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    filter === tab.id
                      ? "bg-[#0D03AE] text-white shadow-xs"
                      : "text-neutral-600 hover:text-neutral-900 hover:bg-[#FAF8E8]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile View Toggle Switch (< lg screens) */}
        <div className="lg:hidden flex items-center justify-between gap-3 mb-4 p-2 rounded-2xl bg-[#FFFBF0] border border-[#E7DEC8] shadow-2xs">
          <button
            type="button"
            onClick={() => setMobileViewMode("list")}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              mobileViewMode === "list"
                ? "bg-[#0D03AE] text-white shadow-xs"
                : "text-neutral-600 hover:bg-[#FAF8E8]"
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Orders List ({filteredOrders.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileViewMode("details")}
            disabled={!selectedOrder}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              mobileViewMode === "details"
                ? "bg-[#0D03AE] text-white shadow-xs"
                : "text-neutral-600 hover:bg-[#FAF8E8]"
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Order #{selectedOrder?.orderNumber}</span>
          </button>
        </div>

        {/* Master-Detail 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* ========================================================= */}
          {/* LEFT COLUMN: Orders Tabs List (Master Pane) */}
          {/* ========================================================= */}
          <div
            className={`lg:col-span-5 xl:col-span-4 space-y-3 font-jost lg:sticky lg:top-32 ${
              mobileViewMode === "details" ? "hidden lg:block" : "block"
            }`}
          >
            <div className="flex items-center justify-between px-1 mb-1">
              <span className="text-xs uppercase tracking-wider font-extrabold text-neutral-500">
                All Orders ({filteredOrders.length})
              </span>
              <span className="text-[11px] text-neutral-400 font-medium">
                Click tab to view details
              </span>
            </div>

            {filteredOrders.length === 0 ? (
              <div className="p-8 text-center bg-[#FFFBF0] rounded-3xl border border-[#E7DEC8]">
                <Package className="w-10 h-10 text-neutral-400 mx-auto mb-2" />
                <h3 className="font-bold text-sm text-neutral-800">No matching orders</h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Try clearing your search or status filter.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFilter("all");
                    setSearchQuery("");
                  }}
                  className="mt-3 px-4 py-1.5 rounded-full bg-[#FAF8E8] border border-[#E7DEC8] text-xs font-bold text-[#0D03AE]"
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              <div
                data-lenis-prevent="true"
                className="space-y-3 lg:max-h-[calc(100vh-180px)] lg:overflow-y-auto no-scrollbar pr-1.5"
              >
                {filteredOrders.map((order) => {
                  const isSelected = selectedOrder?.id === order.id;

                  return (
                    <div
                      key={order.id}
                      onClick={() => handleSelectOrder(order.id)}
                      className={`relative p-4 sm:p-5 rounded-3xl border transition-all duration-200 cursor-pointer text-left select-none group ${
                        isSelected
                          ? "bg-[#FAF8E8] border-[#0D03AE] shadow-[0_8px_24px_rgba(13,3,174,0.12)] ring-2 ring-[#0D03AE]/15"
                          : "bg-[#FFFBF0]/70 border-[#E7DEC8] hover:border-[#DC5513]/40 hover:bg-[#FAF8E8] shadow-2xs"
                      }`}
                    >
                      {/* Left Active Brand Indicator Stripe */}
                      {isSelected && (
                        <div className="absolute left-0 top-3 bottom-3 w-1.5 bg-[#0D03AE] rounded-r-full" />
                      )}

                      {/* Header Row: Order Number & Status Pill */}
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-[#0D03AE]" />
                          <span className="font-bold text-sm sm:text-base text-neutral-900">
                            #{order.orderNumber}
                          </span>
                        </div>

                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border flex items-center gap-1 ${order.statusColor}`}
                        >
                          {order.status === "In Transit" && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#DC5513] animate-ping" />
                          )}
                          {order.status}
                        </span>
                      </div>

                      {/* Date & Expected snippet */}
                      <div className="flex items-center gap-2 text-xs text-neutral-500 mb-3 font-secondary">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                          {order.date}
                        </span>
                        <span>&bull;</span>
                        <span className="truncate">
                          {order.status === "In Transit"
                            ? order.expectedDelivery
                            : order.deliveredDate}
                        </span>
                      </div>

                      {/* Thumbnails row + Total summary */}
                      <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#E7DEC8]/60">
                        {/* Overlapping Thumbnails */}
                        <div className="flex items-center -space-x-2 overflow-hidden shrink-0">
                          {order.items.slice(0, 3).map((item, idx) => (
                            <div
                              key={item.id + idx}
                              className="relative w-9 h-9 rounded-xl overflow-hidden border-2 border-[#FAF8E8] bg-[#FAF8E8] shrink-0 shadow-2xs"
                            >
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                sizes="36px"
                                className="object-cover"
                              />
                            </div>
                          ))}
                          {order.items.length > 3 && (
                            <div className="w-9 h-9 rounded-xl border-2 border-[#FAF8E8] bg-[#0D03AE] text-white flex items-center justify-center font-bold text-[10px] shrink-0 shadow-2xs">
                              +{order.items.length - 3}
                            </div>
                          )}
                        </div>

                        {/* Total Price & Item count */}
                        <div className="text-right">
                          <span className="text-[11px] text-neutral-400 block font-secondary">
                            {order.items.length} item{order.items.length > 1 ? "s" : ""}
                          </span>
                          <span className="font-extrabold text-sm sm:text-base text-[#0D03AE]">
                            ₹{order.total}
                          </span>
                        </div>
                      </div>

                      {/* Mobile Indicator arrow */}
                      <div className="lg:hidden mt-2 pt-2 border-t border-[#E7DEC8]/40 flex items-center justify-between text-xs text-[#0D03AE] font-bold">
                        <span>Tap to view full details</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Selected Order Details (Detail Stage) */}
          {/* ========================================================= */}
          <div
            className={`lg:col-span-7 xl:col-span-8 space-y-6 ${
              mobileViewMode === "list" ? "hidden lg:block" : "block"
            }`}
          >
            {selectedOrder ? (
              <div className="space-y-6 font-secondary">
                {/* Mobile Back Button (< lg screens) */}
                <div className="lg:hidden">
                  <button
                    type="button"
                    onClick={() => setMobileViewMode("list")}
                    className="flex items-center gap-1.5 text-xs font-bold text-[#0D03AE] hover:text-[#DC5513] transition-colors font-jost"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>&larr; Back to all orders list</span>
                  </button>
                </div>

                {/* 1. Order Hero Action Card */}
                <div className="p-5 sm:p-6 rounded-3xl bg-[#FFFBF0] border border-[#E7DEC8] shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7DEC8]">
                    <div>
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h2 className="font-primary text-2xl sm:text-3xl text-neutral-900">
                          Order #{selectedOrder.orderNumber}
                        </h2>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${selectedOrder.statusColor}`}
                        >
                          {selectedOrder.status === "In Transit" && (
                            <span className="w-2 h-2 rounded-full bg-[#DC5513] animate-ping" />
                          )}
                          {selectedOrder.status}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-500 mt-1 font-jost">
                        Placed on {selectedOrder.date} at {selectedOrder.time} &bull; Total:{" "}
                        <strong className="text-neutral-900 font-bold">
                          ₹{selectedOrder.total}
                        </strong>{" "}
                        ({selectedOrder.items.length} items)
                      </p>
                    </div>

                    {/* Action Buttons: Track Order & Download Invoice */}
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <button
                        type="button"
                        onClick={() =>
                          setTrackingModalOrder(
                            getShipmentTracking(selectedOrder.orderNumber)
                          )
                        }
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#0D03AE] hover:bg-[#DC5513] text-white text-xs font-bold transition-colors cursor-pointer shadow-xs font-jost"
                      >
                        <Truck className="w-4 h-4 text-white" />
                        <span>Track Order</span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          alert(
                            `Downloading official GST tax invoice for #${selectedOrder.orderNumber}...`
                          )
                        }
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FAF8E8] border border-[#E7DEC8] hover:border-[#0D03AE] text-neutral-800 hover:text-[#0D03AE] text-xs font-bold transition-all cursor-pointer shadow-2xs font-jost"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Invoice</span>
                      </button>

                      {selectedOrder.status === "Delivered" && (
                        <button
                          type="button"
                          onClick={() => setExchangeReturnModalOpen(true)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FAF8E8] border border-[#DC5513] text-[#DC5513] hover:bg-[#DC5513] hover:text-white text-xs font-bold transition-colors cursor-pointer font-jost"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Exchange / Return</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Courier & Live Tracking Summary Strip */}
                  <div className="mt-4 pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-500">Courier Partner:</span>
                      <strong className="text-neutral-900 font-bold font-jost">
                        {selectedOrder.courier}
                      </strong>
                      <span className="text-neutral-400">&bull;</span>
                      <span className="text-neutral-500">AWB:</span>
                      <button
                        type="button"
                        onClick={() => handleCopyAWB(selectedOrder.trackingNumber)}
                        className="inline-flex items-center gap-1 font-mono font-semibold text-neutral-800 hover:text-[#0D03AE] bg-[#FAF8E8] px-2 py-0.5 rounded-md border border-[#E7DEC8] transition-colors cursor-pointer"
                        title="Copy Tracking Number"
                      >
                        <span>{selectedOrder.trackingNumber}</span>
                        {copiedAWB ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3 text-neutral-400" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-neutral-700">
                      <Clock className="w-3.5 h-3.5 text-[#DC5513]" />
                      <span>
                        {selectedOrder.status === "In Transit" ? (
                          <>
                            Estimated Delivery:{" "}
                            <strong className="text-neutral-900">
                              {selectedOrder.expectedDelivery}
                            </strong>
                          </>
                        ) : (
                          <>
                            Status:{" "}
                            <strong className="text-neutral-900">
                              {selectedOrder.deliveredDate}
                            </strong>
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. Milestone Stepper Preview Stage */}
                <div className="p-5 sm:p-6 rounded-3xl bg-[#FAF8E8] border border-[#E7DEC8] shadow-xs">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-[#0D03AE] text-white flex items-center justify-center font-bold text-xs">
                        <Truck className="w-3.5 h-3.5 text-white" />
                      </div>
                      <h3 className="font-jost text-xs uppercase font-extrabold text-neutral-800 tracking-wider">
                        Delivery Milestones
                      </h3>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setTrackingModalOrder(
                          getShipmentTracking(selectedOrder.orderNumber)
                        )
                      }
                      className="text-xs font-bold text-[#0D03AE] hover:text-[#DC5513] flex items-center gap-1 transition-colors cursor-pointer font-jost"
                    >
                      <span>Open Full GPS Journey</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* 4-Step Milestone Stepper */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {selectedOrder.trackingTimeline.map((step, idx) => (
                      <div
                        key={step.status + idx}
                        onClick={() =>
                          setTrackingModalOrder(
                            getShipmentTracking(selectedOrder.orderNumber)
                          )
                        }
                        className="p-3.5 rounded-2xl bg-[#FFFBF0] hover:bg-[#FAF8E8] border border-[#E7DEC8] hover:border-[#0D03AE]/40 transition-all cursor-pointer group shadow-2xs font-jost"
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 transition-transform group-hover:scale-110 ${
                              step.completed
                                ? "bg-emerald-600 text-white"
                                : step.current
                                ? "bg-[#DC5513] text-white ring-3 ring-[#DC5513]/25 animate-pulse"
                                : "bg-[#E7DEC8] text-neutral-500"
                            }`}
                          >
                            {step.completed ? "✓" : idx + 1}
                          </div>
                          <span
                            className={`text-xs font-bold truncate ${
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
                        <span className="text-[11px] text-neutral-500 pl-7 block truncate font-secondary">
                          {step.time}
                        </span>
                        <span className="text-[10px] text-neutral-400 pl-7 block truncate font-secondary">
                          {step.location}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Items in this Order */}
                <div className="p-5 sm:p-6 rounded-3xl bg-[#FFFBF0] border border-[#E7DEC8] shadow-xs">
                  <h3 className="font-jost text-xs uppercase font-extrabold text-neutral-800 tracking-wider mb-4 flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-[#0D03AE]" />
                    <span>Items in this Order ({selectedOrder.items.length})</span>
                  </h3>

                  <div className="divide-y divide-[#E7DEC8]/80">
                    {selectedOrder.items.map((item) => (
                      <div
                        key={item.id}
                        className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 first:pt-0 last:pb-0"
                      >
                        {/* Left: Thumbnail & Details */}
                        <div className="flex items-center gap-4">
                          <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-[#FAF8E8] shrink-0 border border-[#E7DEC8] shadow-2xs">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="80px"
                              className="object-cover"
                            />
                          </div>

                          <div>
                            <h4 className="font-bold text-sm sm:text-base text-neutral-900 font-jost hover:text-[#0D03AE] transition-colors">
                              <Link href="/products/1">{item.name}</Link>
                            </h4>
                            <div className="flex items-center gap-3 text-xs text-neutral-500 mt-1 flex-wrap">
                              <span>
                                Size: <strong className="text-neutral-800">{item.size}</strong>
                              </span>
                              <span>&bull;</span>
                              <span>
                                Color: <strong className="text-neutral-800">{item.color}</strong>
                              </span>
                              <span>&bull;</span>
                              <span>
                                Qty: <strong className="text-neutral-800">{item.quantity}</strong>
                              </span>
                              {item.sku && (
                                <>
                                  <span>&bull;</span>
                                  <span className="font-mono text-[11px] text-neutral-400">
                                    {item.sku}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Right: Price & Buy Again Action */}
                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0">
                          <div className="text-left sm:text-right font-jost">
                            <span className="font-black text-base sm:text-lg text-neutral-900">
                              ₹{item.price * item.quantity}
                            </span>
                            {item.originalPrice && (
                              <span className="text-xs text-neutral-400 line-through ml-2 sm:block sm:ml-0">
                                ₹{item.originalPrice * item.quantity}
                              </span>
                            )}
                          </div>

                          <Link
                            href="/products/1"
                            className="px-3 py-1.5 rounded-full bg-[#FAF8E8] hover:bg-[#0D03AE] border border-[#E7DEC8] hover:border-[#0D03AE] text-neutral-800 hover:text-white text-xs font-bold transition-all shadow-2xs font-jost"
                          >
                            Buy Again
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Shipping Address & Payment Details Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Delivery Address */}
                  <div className="p-5 rounded-3xl bg-[#FFFBF0] border border-[#E7DEC8] shadow-xs">
                    <div className="flex items-center gap-2 mb-2 text-[#0D03AE]">
                      <MapPin className="w-4 h-4" />
                      <h4 className="font-jost text-xs uppercase font-extrabold tracking-wider text-neutral-800">
                        Delivery Address
                      </h4>
                    </div>
                    <div className="text-xs space-y-1 text-neutral-600">
                      <strong className="text-neutral-900 block font-bold text-sm">
                        {selectedOrder.deliveryAddress.name}{" "}
                        <span className="text-[11px] font-normal text-neutral-500">
                          ({selectedOrder.deliveryAddress.type || "Home"})
                        </span>
                      </strong>
                      <p>{selectedOrder.deliveryAddress.street}</p>
                      <p>
                        {selectedOrder.deliveryAddress.city},{" "}
                        {selectedOrder.deliveryAddress.state} &bull;{" "}
                        {selectedOrder.deliveryAddress.pincode}
                      </p>
                      <p className="pt-1 text-neutral-700">
                        Phone: {selectedOrder.deliveryAddress.phone}
                      </p>
                    </div>
                  </div>

                  {/* Payment Summary */}
                  <div className="p-5 rounded-3xl bg-[#FFFBF0] border border-[#E7DEC8] shadow-xs">
                    <div className="flex items-center gap-2 mb-2 text-[#0D03AE]">
                      <CreditCard className="w-4 h-4" />
                      <h4 className="font-jost text-xs uppercase font-extrabold tracking-wider text-neutral-800">
                        Payment Information
                      </h4>
                    </div>
                    <div className="text-xs space-y-1.5 text-neutral-600">
                      <div className="flex items-center justify-between">
                        <span>Method:</span>
                        <strong className="text-neutral-900">
                          {selectedOrder.paymentMethod}
                        </strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Status:</span>
                        <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 text-[11px]">
                          {selectedOrder.paymentStatus} &bull; Verified
                        </span>
                      </div>
                      {selectedOrder.transactionId && (
                        <div className="flex items-center justify-between pt-1 text-[11px] text-neutral-400 font-mono">
                          <span>Ref:</span>
                          <span>{selectedOrder.transactionId}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 5. Bill Summary Breakdown */}
                <div className="p-5 sm:p-6 rounded-3xl bg-[#FFFBF0] border border-[#E7DEC8] shadow-xs">
                  <h4 className="font-jost text-xs uppercase font-extrabold tracking-wider text-neutral-800 mb-3">
                    Order Price Breakdown
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between text-neutral-600">
                      <span>Items Subtotal</span>
                      <span className="font-semibold text-neutral-900">
                        ₹{selectedOrder.subtotal}
                      </span>
                    </div>

                    {selectedOrder.discount > 0 && (
                      <div className="flex items-center justify-between text-emerald-700 font-semibold">
                        <span>Promo &amp; Coins Discount</span>
                        <span>-₹{selectedOrder.discount}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-neutral-600">
                      <span>Shipping / Delivery</span>
                      <span className="text-emerald-700 font-bold">FREE</span>
                    </div>

                    <div className="pt-3 border-t border-[#E7DEC8] flex items-center justify-between text-sm sm:text-base font-extrabold text-neutral-900 font-jost">
                      <span>Total Amount Paid</span>
                      <span className="text-[#0D03AE] text-lg sm:text-xl font-black">
                        ₹{selectedOrder.total}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Need Help Card */}
                <div className="p-4 rounded-2xl bg-[#FFFBF0] border border-[#E7DEC8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-neutral-700">
                    <HelpCircle className="w-4 h-4 text-[#0D03AE]" />
                    <span>Have an issue with this shipment or need return assistance?</span>
                  </div>
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center gap-1.5 font-bold text-[#0D03AE] hover:text-[#DC5513] transition-colors self-start sm:self-auto font-jost"
                  >
                    <span>Contact Support Team &rarr;</span>
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Web Live Milestone Tracking Modal */}
      <LiveTrackingModal
        isOpen={!!trackingModalOrder}
        onClose={() => setTrackingModalOrder(null)}
        shipment={trackingModalOrder}
      />

      {/* Exchange or Return Modal */}
      <ExchangeReturnModal
        isOpen={exchangeReturnModalOpen}
        onClose={() => setExchangeReturnModalOpen(false)}
        order={selectedOrder}
      />
    </div>
  );
}
