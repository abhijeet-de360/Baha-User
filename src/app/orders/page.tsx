'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import mockData from '@/data/mockData.json';
import { useShopState } from '@/hooks/useShopState';
import type { Product } from '@/types';
import {
  Package, Truck, ArrowLeft, CheckCircle2, Clock,
  Copy, CheckCircle, ChevronRight, ShoppingBag, X, ExternalLink
} from 'lucide-react';

const STATUS_CONFIG: Record<string, { color: string; bg: string; dot: string; label: string }> = {
  'Delivered': {
    color: 'text-emerald-700',
    bg: 'bg-emerald-50 border-emerald-200',
    dot: 'bg-emerald-500',
    label: 'Delivered',
  },
  'In Transit': {
    color: 'text-brand-purple',
    bg: 'bg-brand-purple-light border-brand-purple/20',
    dot: 'bg-brand-purple animate-pulse',
    label: 'In Transit',
  },
  'Processing': {
    color: 'text-amber-700',
    bg: 'bg-amber-50 border-amber-200',
    dot: 'bg-amber-500',
    label: 'Processing',
  },
};

export default function OrdersPage() {
  const router = useRouter();
  const { handleAddToCart } = useShopState();

  const [orderFilter, setOrderFilter] = useState<'all' | 'In Transit' | 'Delivered'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [trackingOrder, setTrackingOrder] = useState<typeof mockData.userProfile.recentOrders[0] | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    showToast(`Order ID "${code}" copied to clipboard! 📋`);
  };

  const allProducts = useMemo(() => mockData.products as Product[], []);

  const filteredOrders = useMemo(() => {
    if (orderFilter === 'all') return mockData.userProfile.recentOrders;
    return mockData.userProfile.recentOrders.filter((o) => o.status === orderFilter);
  }, [orderFilter]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-20 pt-6 sm:pt-8 font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#292936] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-fade-in border border-white/10 text-sm font-semibold">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="container max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb & Navigation */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 text-xs font-bold text-text-muted hover:text-brand-purple transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Profile</span>
          </Link>

          <span className="text-xs font-bold text-text-muted">
            Total {mockData.userProfile.recentOrders.length} orders
          </span>
        </div>

        {/* Page Header */}
        <div className="bg-white rounded-3xl border border-[#EFECE6] p-6 sm:p-8 shadow-xs mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EFECE6]">
            <div>
              <h1 className="font-heading text-2xl sm:text-3xl font-black text-text-main flex items-center gap-3">
                <Package className="w-7 h-7 text-brand-purple" />
                <span>My Orders</span>
              </h1>
              <p className="text-xs text-text-muted font-medium mt-1">
                Track your active shipments, view order history, and reorder past favorites.
              </p>
            </div>

            {/* Filter Chips */}
            <div className="flex items-center gap-1.5 p-1 bg-[#FAF8F5] rounded-xl border border-[#EAE6DE] self-start sm:self-auto">
              {(['all', 'In Transit', 'Delivered'] as const).map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setOrderFilter(filter)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    orderFilter === filter
                      ? 'bg-white text-text-main shadow-2xs font-extrabold'
                      : 'text-text-muted hover:text-text-main'
                  }`}
                >
                  {filter === 'all' ? 'All Orders' : filter}
                </button>
              ))}
            </div>
          </div>

          {/* Orders List */}
          {filteredOrders.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-14 h-14 rounded-2xl bg-[#FAF8F5] flex items-center justify-center mx-auto mb-3 text-text-light">
                <Package className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-text-main text-base">No orders found</h3>
              <p className="text-xs text-text-muted mt-1 max-w-xs mx-auto">
                You do not have any orders matching the selected filter.
              </p>
            </div>
          ) : (
            <div className="space-y-4 pt-6">
              {filteredOrders.map((order) => {
                const cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG['Processing'];
                const orderProducts = allProducts.filter((p) => order.items.includes(p.id));

                return (
                  <div
                    key={order.orderId}
                    className="rounded-2xl border border-[#EFECE6] p-5 hover:border-brand-purple/30 transition-all hover:shadow-soft"
                  >
                    {/* Top Row: Order ID, Date & Status */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-[#F2EFE9]">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-heading font-extrabold text-sm text-text-main">
                            {order.orderId}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopyCode(order.orderId)}
                            className="text-text-muted hover:text-text-main p-1 rounded-md cursor-pointer"
                            title="Copy Order ID"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="text-xs text-text-muted mt-0.5">
                          Placed on {new Date(order.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 self-start sm:self-auto">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${cfg.bg} ${cfg.color}`}
                        >
                          <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                          {cfg.label}
                        </span>
                        <span className="font-heading font-black text-sm text-text-main">
                          ${order.total.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Items Preview List */}
                    <div className="py-4 space-y-3">
                      {orderProducts.map((prod) => (
                        <div key={prod.id} className="flex items-center gap-3.5">
                          <img
                            src={prod.featuredImage}
                            alt={prod.name}
                            className="w-14 h-14 rounded-xl object-cover border border-[#EFECE6] bg-[#FAF8F5] shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <Link
                              href={`/product/${prod.id}`}
                              className="font-bold text-sm text-text-main hover:text-brand-purple transition-colors truncate block"
                            >
                              {prod.name}
                            </Link>
                            <p className="text-xs text-text-muted mt-0.5">
                              Qty: 1 • Size: 3-4Y • Color: Standard
                            </p>
                          </div>
                          <span className="font-bold text-sm text-text-main">
                            ${prod.price.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Action Buttons Footer */}
                    <div className="pt-3 border-t border-[#F2EFE9] flex flex-wrap items-center justify-between gap-3">
                      <span className="text-xs text-text-light font-medium">
                        Standard Express Delivery
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setTrackingOrder(order)}
                          className="px-3.5 py-1.5 rounded-xl border border-[#DDD8CE] text-xs font-bold text-text-main hover:border-brand-purple hover:text-brand-purple transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <Truck className="w-3.5 h-3.5" />
                          <span>Track Order</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (orderProducts[0]) {
                              handleAddToCart(orderProducts[0], 'Default', '3-4Y', 1);
                              router.push('/cart');
                            }
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-brand-purple text-white text-xs font-bold hover:bg-brand-purple/90 transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Buy Again</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Support Section */}
        <div className="bg-white rounded-3xl border border-[#EFECE6] p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-heading font-black text-base text-text-main">Need assistance with your package?</h3>
            <p className="text-xs text-text-muted mt-0.5">Our dedicated support team is available 24/7 for returns and status checks.</p>
          </div>
          <a
            href="mailto:support@bahafashion.com"
            className="px-4 py-2 rounded-xl border border-[#DDD8CE] text-xs font-bold text-text-main hover:border-brand-purple hover:text-brand-purple transition-all shrink-0"
          >
            Contact Customer Care
          </a>
        </div>

      </div>

      {/* ── TRACKING MODAL ── */}
      {trackingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl border border-[#EFECE6] shadow-2xl max-w-lg w-full p-6 sm:p-8 animate-scale-up">
            <div className="flex items-center justify-between pb-4 border-b border-[#EFECE6]">
              <div>
                <h3 className="font-heading font-black text-lg text-text-main">
                  Track Delivery
                </h3>
                <p className="text-xs text-text-muted font-mono mt-0.5">
                  ID: {trackingOrder.orderId}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setTrackingOrder(null)}
                className="p-1.5 rounded-xl text-text-muted hover:text-text-main hover:bg-[#FAF8F5] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Stepper Timeline */}
            <div className="py-6 space-y-6">
              {[
                { title: 'Order Confirmed', time: 'Oct 8, 10:30 AM', done: true },
                { title: 'Processing & Packaged', time: 'Oct 8, 04:15 PM', done: true },
                {
                  title: 'In Transit with Bluedart',
                  time: 'Oct 9, 08:45 AM',
                  done: trackingOrder.status === 'In Transit' || trackingOrder.status === 'Delivered',
                  current: trackingOrder.status === 'In Transit',
                },
                {
                  title: 'Out for Delivery',
                  time: 'Expected Tomorrow',
                  done: trackingOrder.status === 'Delivered',
                  current: false,
                },
                {
                  title: 'Delivered',
                  time: trackingOrder.status === 'Delivered' ? 'Delivered' : 'Pending',
                  done: trackingOrder.status === 'Delivered',
                },
              ].map((step, idx, arr) => (
                <div key={step.title} className="flex items-start gap-4 relative">
                  {idx < arr.length - 1 && (
                    <div
                      className={`absolute left-3.5 top-6 bottom-[-24px] w-0.5 ${
                        step.done ? 'bg-emerald-500' : 'bg-[#EFECE6]'
                      }`}
                    />
                  )}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 ${
                      step.current
                        ? 'bg-brand-purple text-white ring-4 ring-brand-purple/20 animate-pulse'
                        : step.done
                        ? 'bg-emerald-500 text-white'
                        : 'bg-[#F2EFE9] text-text-light'
                    }`}
                  >
                    {step.done ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <Clock className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <div>
                    <h4
                      className={`font-bold text-sm ${
                        step.current
                          ? 'text-brand-purple font-extrabold'
                          : step.done
                          ? 'text-text-main'
                          : 'text-text-muted'
                      }`}
                    >
                      {step.title}
                    </h4>
                    <p className="text-xs text-text-muted mt-0.5">{step.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#EFECE6] flex justify-end">
              <button
                type="button"
                onClick={() => setTrackingOrder(null)}
                className="px-5 py-2.5 rounded-xl bg-brand-purple text-white text-xs font-bold hover:bg-brand-purple/90 transition-all cursor-pointer"
              >
                Close Tracking
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
