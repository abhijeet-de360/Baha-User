"use client";

import React, { useState } from "react";
import {
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Copy,
  Check,
  PhoneCall,
  Package,
  Building2,
  ShieldCheck,
  ExternalLink,
  Navigation,
  Sparkles,
} from "lucide-react";
import { LiveShipmentData, TrackingMilestone } from "@/data/shipmentTracking";

interface ShipmentMilestoneTimelineProps {
  shipment: LiveShipmentData;
  compact?: boolean;
}

export function ShipmentMilestoneTimeline({
  shipment,
  compact = false,
}: ShipmentMilestoneTimelineProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyAWB = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(shipment.trackingNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getMilestoneIcon = (milestone: TrackingMilestone) => {
    if (milestone.status === "completed") {
      return <Check className="w-3.5 h-3.5 text-white stroke-[2.5]" />;
    }
    if (milestone.status === "current") {
      return <Truck className="w-3.5 h-3.5 text-white animate-bounce-subtle" />;
    }
    return <div className="w-2 h-2 rounded-full bg-neutral-400" />;
  };

  return (
    <div className="w-full space-y-6 font-secondary text-neutral-800">
      {/* Top Milestone Overview Card */}
      <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-[#FFFBF0] border border-[#E7DEC8] shadow-2xs">
        {/* Header: Courier & Copy Tracking */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E7DEC8]/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#0D03AE] text-white flex items-center justify-center font-bold text-xs shadow-2xs">
              <Truck className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider font-bold text-neutral-500 block">
                Courier Partner
              </span>
              <span className="text-xs sm:text-sm font-bold text-neutral-900 font-jost">
                {shipment.courier}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-600 font-medium hidden sm:inline">
              AWB:
            </span>
            <button
              type="button"
              onClick={handleCopyAWB}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF8E8] border border-[#E7DEC8] hover:border-[#0D03AE] text-xs font-mono font-semibold text-neutral-800 hover:text-[#0D03AE] transition-all cursor-pointer shadow-2xs"
              title="Copy Tracking Number"
            >
              <span>{shipment.trackingNumber}</span>
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-neutral-400 hover:text-[#0D03AE]" />
              )}
            </button>
          </div>
        </div>

        {/* Live Delivery Status & ETA */}
        <div className="mt-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                  shipment.status === "Delivered"
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                    : "bg-[#FFF2D6] text-[#793A20] border border-[#FED174]"
                }`}
              >
                {shipment.status === "In Transit" && (
                  <span className="w-2 h-2 rounded-full bg-[#DC5513] animate-ping" />
                )}
                {shipment.statusText}
              </span>
              {shipment.otp && (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-[11px] font-bold">
                  Delivery OTP: <strong className="font-mono text-xs">{shipment.otp}</strong>
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-neutral-600">
              Expected Delivery:{" "}
              <strong className="text-neutral-900 font-bold">
                {shipment.expectedDelivery}
              </strong>
            </p>
          </div>

          {/* Quick External Link */}
          {shipment.courierTrackingUrl && (
            <a
              href={shipment.courierTrackingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0D03AE] hover:text-[#DC5513] transition-colors self-start sm:self-auto"
            >
              <span>Live Courier Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        {/* Multi-Milestone Horizontal Stepper Bar */}
        <div className="mt-5 pt-4 border-t border-[#E7DEC8]/70">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] uppercase tracking-wider font-bold text-neutral-500">
              Milestone Progress
            </span>
            <span className="text-xs font-bold text-[#0D03AE]">
              {shipment.progressPercent}% Completed
            </span>
          </div>

          {/* Progress Track */}
          <div className="w-full h-2 rounded-full bg-[#E7DEC8]/60 overflow-hidden mb-3">
            <div
              className="h-full rounded-full bg-linear-to-r from-[#0D03AE] to-[#DC5513] transition-all duration-700 ease-out"
              style={{ width: `${shipment.progressPercent}%` }}
            />
          </div>

          {/* Key 4 Milestones */}
          <div className="grid grid-cols-4 text-center gap-1">
            {[
              { label: "Booked", stage: 1 },
              { label: "Dispatched", stage: 2 },
              { label: "Out for Delivery", stage: 4 },
              { label: "Delivered", stage: 5 },
            ].map((step) => {
              const isPast = shipment.currentStage > step.stage;
              const isCurrent = shipment.currentStage === step.stage;
              return (
                <div key={step.label} className="flex flex-col items-center">
                  <span
                    className={`text-[10px] sm:text-xs font-bold transition-colors ${
                      isPast
                        ? "text-neutral-900"
                        : isCurrent
                        ? "text-[#DC5513]"
                        : "text-neutral-400"
                    }`}
                  >
                    {step.label}
                  </span>
                  <div
                    className={`w-2 h-2 rounded-full mt-1 ${
                      isPast
                        ? "bg-[#0D03AE]"
                        : isCurrent
                        ? "bg-[#DC5513] ring-2 ring-[#DC5513]/30"
                        : "bg-[#E7DEC8]"
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Driver Contact Box if Out for Delivery */}
        {shipment.driver && shipment.status === "In Transit" && (
          <div className="mt-4 p-3 rounded-xl bg-[#FFFBF0] border border-[#E7DEC8] flex items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#FAF8E8] border border-[#E7DEC8] flex items-center justify-center font-bold text-sm text-[#0D03AE] shrink-0">
                {shipment.driver.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-neutral-900">
                    {shipment.driver.name}
                  </span>
                  <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded-sm font-semibold">
                    ★ {shipment.driver.rating}
                  </span>
                </div>
                <span className="text-[11px] text-neutral-500 block truncate">
                  Vehicle: {shipment.driver.vehicleNumber}
                </span>
              </div>
            </div>

            <a
              href={`tel:${shipment.driver.phone}`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0D03AE] hover:bg-[#DC5513] text-white text-xs font-bold transition-colors shadow-2xs cursor-pointer shrink-0"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call Rider</span>
            </a>
          </div>
        )}
      </div>

      {/* Shipment Timeline Section Heading */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xs uppercase tracking-widest font-extrabold text-neutral-500 font-jost flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#DC5513]" />
            SHIPMENT TIMELINE
          </h4>
          <span className="text-[11px] text-neutral-400 font-medium">
            Real-time GPS Milestones
          </span>
        </div>

        {/* Vertical Milestone Trail (Matching User Reference Image Design) */}
        <div className="relative pl-6 sm:pl-8 space-y-6">
          {/* Continuous Vertical Track Line */}
          <div className="absolute left-[11px] sm:left-[15px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-[#0D03AE] via-emerald-400 to-[#E7DEC8]" />

          {shipment.milestones.map((milestone, idx) => {
            const isCompleted = milestone.status === "completed";
            const isCurrent = milestone.status === "current";
            const isUpcoming = milestone.status === "upcoming";

            return (
              <div key={milestone.id} className="relative group">
                {/* Milestone Node on the Spine */}
                <div
                  className={`absolute -left-6 sm:-left-8 top-1 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all ${
                    isCurrent
                      ? "bg-[#DC5513] ring-4 ring-[#DC5513]/25 shadow-md scale-110"
                      : isCompleted
                      ? "bg-emerald-600 ring-2 ring-emerald-100 shadow-xs"
                      : "bg-[#FAF8E8] border-2 border-[#E7DEC8]"
                  }`}
                >
                  {getMilestoneIcon(milestone)}
                </div>

                {/* Milestone Card */}
                <div
                  className={`p-3.5 sm:p-4 rounded-2xl transition-all ${
                    isCurrent
                      ? "bg-[#FFFBF0] border-2 border-[#DC5513]/40 shadow-sm ring-2 ring-[#DC5513]/10"
                      : isCompleted
                      ? "bg-[#FFFDF7] border border-[#E7DEC8]/80 hover:border-[#0D03AE]/40"
                      : "bg-[#FAF8E8]/50 border border-dashed border-[#E7DEC8] opacity-75"
                  }`}
                >
                  {/* Top row: Status title + Live badge + Time */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <h5
                        className={`font-jost text-sm sm:text-base font-bold ${
                          isCurrent
                            ? "text-[#DC5513]"
                            : isCompleted
                            ? "text-neutral-900"
                            : "text-neutral-500"
                        }`}
                      >
                        {milestone.title}
                      </h5>

                      {milestone.badge && (
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase ${
                            isCurrent
                              ? "bg-[#DC5513] text-white animate-pulse"
                              : isCompleted
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-neutral-100 text-neutral-500"
                          }`}
                        >
                          {milestone.badge}
                        </span>
                      )}
                    </div>

                    {/* Timestamp */}
                    <div className="flex items-center gap-1 text-[11px] sm:text-xs text-neutral-500 font-medium">
                      <Clock className="w-3 h-3 text-neutral-400" />
                      <span>{milestone.timestamp}</span>
                    </div>
                  </div>

                  {/* Location & Details Subtitle */}
                  <div className="space-y-1">
                    <div className="flex items-start gap-1.5 text-xs text-neutral-700 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#0D03AE] shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-neutral-900">{milestone.location}</strong>{" "}
                        &mdash; {milestone.description}
                      </span>
                    </div>

                    {/* Extra context if available */}
                    {milestone.details?.transitRoute && (
                      <span className="inline-block text-[11px] text-neutral-500 pl-5">
                        Corridor route: {milestone.details.transitRoute}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Delivery Address & Security Snapshot */}
      <div className="p-4 rounded-2xl bg-[#FAF8E8] border border-[#E7DEC8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-[#FAF8E8] border border-[#E7DEC8] flex items-center justify-center shrink-0 mt-0.5 text-[#0D03AE]">
            <MapPin className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="font-bold text-neutral-900 block font-jost">
              Delivery to {shipment.destination.recipientName} ({shipment.destination.addressType})
            </span>
            <p className="text-neutral-600 mt-0.5">
              {shipment.destination.address}, {shipment.destination.city} &bull; {shipment.destination.pincode}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full self-start sm:self-auto font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Contactless Verified</span>
        </div>
      </div>
    </div>
  );
}

