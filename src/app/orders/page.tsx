'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import mockData from '@/data/mockData.json';
import { useShopState } from '@/hooks/useShopState';
import type { Product } from '@/types';
import { ToastNotification } from '@/components/ui/ToastNotification';
import {
  Package,
  Truck,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Copy,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  X,
  ExternalLink,
  Search,
  Receipt,
  HelpCircle,
  MapPin,
  CreditCard,
  Calendar,
  RotateCcw,
  Printer,
  MessageCircle,
  Mail,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  featuredImage: string;
  selectedColor?: string;
  selectedSize?: string;
  quantity?: number;
}

interface OrderAddress {
  name?: string;
  label?: string;
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  pincode?: string;
  phone?: string;
}

interface OrderRecord {
  orderId: string;
  date: string;
  status: 'Delivered' | 'In Transit' | 'Processing' | 'Cancelled';
  total: number;
  items: string[];
  cartItemsSnapshot?: OrderItem[];
  address?: OrderAddress;
  paymentMethod?: string;
  carrier?: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

const STATUS_CONFIG: Record<
  string,
  {
    color: string;
    bg: string;
    border: string;
    dot: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }
> = {
  Delivered: {
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200/90',
    dot: 'bg-emerald-500',
    label: 'Delivered',
    icon: CheckCircle2,
  },
  'In Transit': {
    color: 'text-brand-purple',
    bg: 'bg-brand-purple-light/70',
    border: 'border-brand-purple/25',
    dot: 'bg-brand-purple animate-pulse',
    label: 'In Transit',
    icon: Truck,
  },
  Processing: {
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200/90',
    dot: 'bg-amber-500',
    label: 'Processing',
    icon: Clock,
  },
  Cancelled: {
    color: 'text-rose-700',
    bg: 'bg-rose-50',
    border: 'border-rose-200/90',
    dot: 'bg-rose-500',
    label: 'Cancelled',
    icon: X,
  },
};

export default function OrdersPage() {
  const router = useRouter();
  const { handleAddToCart, toast, setToast } = useShopState();

  const [orderFilter, setOrderFilter] = useState<'all' | 'In Transit' | 'Delivered' | 'Processing' | 'Cancelled'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedOrderId, setCopiedOrderId] = useState<string | null>(null);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Pagination UI dummy state
  const [currentPage, setCurrentPage] = useState(1);

  // Active Modals state
  const [trackingOrder, setTrackingOrder] = useState<OrderRecord | null>(null);
  const [invoiceOrder, setInvoiceOrder] = useState<OrderRecord | null>(null);
  const [supportOrder, setSupportOrder] = useState<OrderRecord | null>(null);

  // Local storage loaded orders
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Close status dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsStatusDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const allProducts = useMemo(() => mockData.products as Product[], []);

  // Show temporary toast message
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // 1-Click Copy Order ID
  const handleCopyCode = (code: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(code);
    }
    setCopiedOrderId(code);
    showToast(`Order ID "${code}" copied to clipboard! 📋`);
    setTimeout(() => {
      setCopiedOrderId((prev) => (prev === code ? null : prev));
    }, 2500);
  };

  // Load orders from mockData and any newly placed orders in localStorage
  useEffect(() => {
    setIsMounted(true);
    const initialMock: OrderRecord[] = (mockData.userProfile.recentOrders as any[]).map((o) => ({
      orderId: o.orderId,
      date: o.date,
      status: o.status,
      total: o.total,
      items: o.items,
      paymentMethod: 'upi',
      carrier: o.status === 'In Transit' ? 'Blue Dart Express' : 'Delhivery Air',
      trackingNumber: o.status === 'In Transit' ? 'BD-88492019' : 'DL-77291048',
      estimatedDelivery:
        o.status === 'In Transit'
          ? 'Thursday, 16 Oct'
          : new Date(o.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      address: {
        name: 'Priya Sharma',
        label: 'Home',
        line1: '42, Rose Garden Apartments',
        city: 'Noida',
        state: 'Uttar Pradesh',
        pincode: '201301',
        phone: '+91 98765 43210',
      },
    }));

    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('baha_placed_orders');
        if (stored) {
          const parsed = JSON.parse(stored) as OrderRecord[];
          if (Array.isArray(parsed) && parsed.length > 0) {
            // Deduplicate orders
            const seenIds = new Set<string>();
            const combined: OrderRecord[] = [];
            for (const item of [...parsed, ...initialMock]) {
              if (!seenIds.has(item.orderId)) {
                seenIds.add(item.orderId);
                combined.push(item);
              }
            }
            setOrders(combined);
            return;
          }
        }
      } catch (err) {
        console.error('Failed to load local orders:', err);
      }
    }

    setOrders(initialMock);
  }, []);

  // Helper to resolve items in order
  const getOrderItems = (order: OrderRecord): OrderItem[] => {
    if (order.cartItemsSnapshot && order.cartItemsSnapshot.length > 0) {
      return order.cartItemsSnapshot;
    }
    return order.items
      .map((id) => allProducts.find((p) => p.id === id))
      .filter((p): p is Product => Boolean(p))
      .map((prod) => ({
        id: prod.id,
        name: prod.name,
        price: prod.price,
        featuredImage: prod.featuredImage,
        selectedColor: prod.colors?.[0]?.name || 'Standard',
        selectedSize: prod.sizes?.[0] || '3-4Y',
        quantity: 1,
      }));
  };

  // Reorder / Buy Again
  const handleBuyAgain = (item: OrderItem) => {
    const fullProd = allProducts.find((p) => p.id === item.id) || {
      id: item.id,
      name: item.name,
      price: item.price,
      featuredImage: item.featuredImage,
      category: 'Organic Wear',
      ageGroup: 'kids',
      gender: 'unisex',
      rating: 4.9,
      reviewsCount: 120,
      colors: [{ name: item.selectedColor || 'Default', hex: '#6C63A8', image: item.featuredImage }],
      sizes: [item.selectedSize || '3-4Y'],
      description: item.name,
      fabric: '100% Organic Cotton',
      inStock: true,
      tags: ['reorder'],
    };

    handleAddToCart(
      fullProd as Product,
      item.selectedColor || 'Standard',
      item.selectedSize || '3-4Y',
      item.quantity || 1
    );

    showToast(`Added "${item.name}" to your bag! 🛍️`);
  };

  // Reorder entire order
  const handleBuyOrderAgain = (order: OrderRecord) => {
    const orderItems = getOrderItems(order);
    orderItems.forEach((item) => {
      const fullProd = allProducts.find((p) => p.id === item.id) || {
        id: item.id,
        name: item.name,
        price: item.price,
        featuredImage: item.featuredImage,
        category: 'Organic Wear',
        ageGroup: 'kids',
        gender: 'unisex',
        rating: 4.9,
        reviewsCount: 120,
        colors: [{ name: item.selectedColor || 'Default', hex: '#6C63A8', image: item.featuredImage }],
        sizes: [item.selectedSize || '3-4Y'],
        description: item.name,
        fabric: '100% Organic Cotton',
        inStock: true,
        tags: ['reorder'],
      };

      handleAddToCart(
        fullProd as Product,
        item.selectedColor || 'Standard',
        item.selectedSize || '3-4Y',
        item.quantity || 1
      );
    });

    if (orderItems.length === 1) {
      showToast(`Added "${orderItems[0].name}" to your bag! 🛍️`);
    } else {
      showToast(`Added ${orderItems.length} items from Order #${order.orderId} to your bag! 🛍️`);
    }
  };

  // Filtered and Searched orders
  const filteredOrders = useMemo(() => {
    let result = orders;

    // Status filter
    if (orderFilter !== 'all') {
      result = result.filter((o) => o.status === orderFilter);
    }

    // Search query
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      result = result.filter((o) => {
        const matchesId = o.orderId.toLowerCase().includes(q);
        const orderItems = getOrderItems(o);
        const matchesProduct = orderItems.some(
          (item) =>
            item.name.toLowerCase().includes(q) ||
            item.selectedSize?.toLowerCase().includes(q) ||
            item.selectedColor?.toLowerCase().includes(q)
        );
        return matchesId || matchesProduct;
      });
    }

    return result;
  }, [orders, orderFilter, searchQuery, allProducts]);

  // Counts by status
  const counts = useMemo(() => {
    return {
      all: orders.length,
      inTransit: orders.filter((o) => o.status === 'In Transit').length,
      delivered: orders.filter((o) => o.status === 'Delivered').length,
      processing: orders.filter((o) => o.status === 'Processing').length,
      cancelled: orders.filter((o) => o.status === 'Cancelled').length,
    };
  }, [orders]);

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-text-main pb-24 pt-4 sm:pt-8 font-body selection:bg-brand-yellow relative overflow-hidden">
      {/* ── Ambient Background Glows ── */}
      <div className="absolute top-0 left-[-8%] w-80 sm:w-[36rem] h-80 sm:h-[36rem] bg-purple-200/35 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-28 right-[-8%] w-72 sm:w-[32rem] h-72 sm:h-[32rem] bg-amber-200/35 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-[48%] left-[5%] w-64 sm:w-80 h-64 sm:h-80 bg-rose-100/30 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-20 right-[-5%] w-80 sm:w-[30rem] h-80 sm:h-[30rem] bg-brand-yellow/20 rounded-full blur-3xl pointer-events-none -z-0" />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F2438] text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 animate-fade-in border border-white/10 text-xs sm:text-sm font-semibold max-w-sm">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="flex-1">{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-white/60 hover:text-white p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Global Shop State Toast */}
      {toast && <ToastNotification toast={toast} onClose={() => setToast(null)} />}

      <div className="container relative z-10">
        {/* ── Page Title & Badges ── */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-heading font-black text-2xl sm:text-3xl text-text-main">
                My Orders
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-text-muted font-medium mt-1">
              Track live deliveries, manage past shipments, and reorder your favorites.
            </p>
          </div>
        </div>

        {/* ── Search on Left & Order Status Dropdown on Right ── */}
        <div className="mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Live Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by Order ID or item name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 rounded-2xl border border-[#E2DDD5] bg-white text-xs font-medium text-text-main placeholder:text-text-muted/70 focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main p-0.5 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Right side Dropdown of Order Status */}
          <div className="relative shrink-0" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsStatusDropdownOpen((prev) => !prev)}
              className="h-10 px-4 rounded-2xl border border-[#E2DDD5] bg-white hover:border-brand-purple/40 text-xs font-bold text-text-main flex items-center justify-between gap-3 transition-all cursor-pointer shadow-2xs hover:shadow-xs w-full sm:w-auto min-w-[190px]"
            >
              <div className="flex items-center gap-2">
                <span className="text-text-muted font-normal">Status:</span>
                <span className="font-extrabold flex items-center gap-1.5 text-text-main">
                  {orderFilter === 'In Transit' && <span className="w-2 h-2 rounded-full bg-brand-purple animate-pulse" />}
                  {orderFilter === 'Delivered' && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
                  {orderFilter === 'Processing' && <span className="w-2 h-2 rounded-full bg-amber-500" />}
                  {orderFilter === 'Cancelled' && <span className="w-2 h-2 rounded-full bg-rose-500" />}
                  <span>{orderFilter === 'all' ? 'All Orders' : orderFilter}</span>
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-text-muted transition-transform duration-200 ${
                  isStatusDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isStatusDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl border border-[#EFECE6] shadow-xl p-1.5 z-30 animate-scale-up space-y-1">
                {[
                  { value: 'all', label: 'All Orders', count: counts.all, },
                  { value: 'In Transit', label: 'In Transit', count: counts.inTransit, },
                  { value: 'Delivered', label: 'Delivered', count: counts.delivered, },
                  ...(counts.processing > 0
                    ? [{ value: 'Processing', label: 'Processing', count: counts.processing, }]
                    : []),
                  ...(counts.cancelled > 0
                    ? [{ value: 'Cancelled', label: 'Cancelled', count: counts.cancelled, }]
                    : []),
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      setOrderFilter(opt.value as any);
                      setIsStatusDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                      orderFilter === opt.value
                        ? 'bg-brand-purple-light text-brand-purple font-extrabold'
                        : 'text-text-muted hover:text-text-main hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{opt.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Active Search/Filter Pill Indicator ── */}
        {(searchQuery || orderFilter !== 'all') && (
          <div className="mb-6 flex items-center justify-between text-xs text-text-muted px-1">
            <p>
              Showing <strong>{filteredOrders.length}</strong> matching {filteredOrders.length === 1 ? 'order' : 'orders'}
              {searchQuery && (
                <>
                  {' '}
                  for &ldquo;<span className="text-text-main font-semibold">{searchQuery}</span>&rdquo;
                </>
              )}
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setOrderFilter('all');
              }}
              className="text-brand-purple hover:underline font-bold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* ── Orders Listing ── */}
        {filteredOrders.length === 0 ? (
          /* Empty / Not Found State */
          <div className=" p-10 sm:p-14 text-center ">
            <div className="w-14 h-14 rounded-2xl bg-[#FAF8F5] text-text-muted flex items-center justify-center mx-auto mb-3 border border-[#EFECE6]">
              <Package className="w-7 h-7 stroke-[1.5]" />
            </div>
            <h3 className="font-heading font-black text-lg sm:text-xl text-text-main">
              {searchQuery ? 'No matching orders found' : 'No orders in this category'}
            </h3>
            <p className="text-xs text-text-muted mt-1 max-w-sm mx-auto">
              {searchQuery
                ? `We couldn't find any orders matching "${searchQuery}". Please check your order ID or keyword.`
                : 'You currently have no orders under this status. Explore our latest organic collections to start shopping.'}
            </p>

            <div className="mt-5 flex items-center justify-center gap-3">
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 rounded-full bg-[#0F2438] hover:bg-brand-purple text-white text-xs font-bold transition-all cursor-pointer"
                >
                  Clear Search
                </button>
              ) : (
                <Link
                  href="/products"
                  className="px-5 py-2 rounded-full bg-[#0F2438] hover:bg-brand-purple text-white text-xs font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Discover Products</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        ) : (
          /* Modern Structured Order Cards */
          <div className="space-y-5 sm:space-y-6">
            {filteredOrders.map((order) => {
              const cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG['Processing'];
              const orderItems = getOrderItems(order);

              return (
                <div
                  key={order.orderId}
                  className="bg-white rounded-3xl border border-[#E8E3D9] shadow-xs hover:shadow-soft hover:border-brand-purple/35 transition-all duration-300 p-4 sm:p-5 group"
                >
                  {/* ── Top Header: Order ID (Key Heading) & Status ── */}
                  <div className="flex items-center justify-between gap-3 pb-3.5 mb-4 border-b border-[#F2EFE9] flex-wrap">
                    <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                      <Link
                        href={`/orders/${order.orderId}`}
                        className="font-heading font-semibold text-xs sm:text-sm text-text-main hover:text-brand-purple transition-colors cursor-pointer"
                      >
                        Order Id - {order.orderId}
                      </Link>

                      {/* Placed Date */}
                      <span className="flex items-center gap-1 text-xs text-text-muted font-medium">
                        <Calendar className="w-3.5 h-3.5 text-text-muted" />
                        <span>
                          Placed on {new Date(order.date).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      </span>
                    </div>

                    {/* Order Status Badge & ETA */}
                    <div className="flex flex-col items-end">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${cfg.bg} ${cfg.border} ${cfg.color} shadow-2xs`}
                      >
                        <span>{cfg.label}</span>
                      </span>
                      {order.status === 'In Transit' && (
                        <span className="text-[10px] font-semibold text-brand-purple mt-1 flex items-center gap-1">
                          <Truck className="w-3 h-3" />
                          <span>Arriving {order.estimatedDelivery || 'in 2 days'}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* ── Main Card Body: Products & Value / Actions ── */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
                    {/* Left: Product Images & Title */}
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      {/* Product Images (Clickable) */}
                      <div className="flex items-center gap-2 shrink-0 flex-wrap sm:flex-nowrap">
                        {orderItems.map((item, idx) => (
                          <Link
                            key={idx}
                            href={`/product/${item.id}`}
                            className="group/img block rounded-xl overflow-hidden focus:outline-none"
                            title={item.name}
                          >
                            <img
                              src={item.featuredImage}
                              alt={item.name}
                              className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl object-cover border border-[#EFECE6] bg-[#FAF8F5] shadow-2xs group-hover/img:border-brand-purple/40 transition-all cursor-pointer"
                            />
                          </Link>
                        ))}
                      </div>

                      {/* Product Title (Clickable), Multi-item count & Payment Tag */}
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/product/${orderItems[0]?.id}`}
                          className="font-bold text-sm sm:text-base text-text-main hover:text-brand-purple transition-colors line-clamp-1 block cursor-pointer"
                        >
                          {orderItems[0]?.name}
                        </Link>

                        {orderItems.length > 1 && (
                          <p className="text-xs sm:text-sm font-semibold text-brand-purple mt-0.5">
                            +{orderItems.length - 1} more {orderItems.length - 1 === 1 ? 'product' : 'products'}
                          </p>
                        )}

                        <div className="mt-2 flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md bg-[#FAF8F5] border border-[#EAE6DF] text-[10px] font-bold text-text-muted">
                            {orderItems.length} {orderItems.length === 1 ? 'Item' : 'Items'}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#FAF8F5] border border-[#EAE6DF] text-[10px] font-bold text-text-muted uppercase">
                            <CreditCard className="w-3 h-3" />
                            <span>{order.paymentMethod === 'cod' ? 'COD' : order.paymentMethod || 'UPI'}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Order Value & View Details Button */}
                    <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 sm:border-l border-[#F2EFE9] sm:pl-6">
                      {/* Order Value */}
                      <div className="text-left sm:text-right">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-text-muted block">
                          Order Value
                        </span>
                        <span className="font-heading font-black text-base sm:text-lg text-text-main">
                          ₹{order.total.toFixed(2)}
                        </span>
                      </div>

                      {/* View Details Button */}
                      <Link
                        href={`/orders/${order.orderId}`}
                        className="px-4 py-2 rounded-xl border border-[#DDD8CE] hover:border-brand-purple hover:text-brand-purple hover:bg-brand-purple-light/40 text-xs font-semibold text-text-main transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs whitespace-nowrap"
                      >
                        <span>View Details</span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── Modern Pagination UI ── */}
        {filteredOrders.length > 0 && (
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between">
            {/* Left: Summary text */}
            <p className="text-xs text-text-muted font-medium text-center sm:text-left">
              Showing <span className="font-bold text-text-main">1</span> to{' '}
              <span className="font-bold text-text-main">{filteredOrders.length}</span> of{' '}
              <span className="font-bold text-text-main">24</span> orders
            </p>

            {/* Right: Modern Pagination Buttons */}
            <nav aria-label="Orders pagination" className="flex items-center gap-1.5 sm:gap-2">
              {/* Prev Button */}
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className={`inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all select-none ${
                  currentPage === 1
                    ? 'border-[#EFECE6] text-text-muted/40 bg-[#FAF8F5] cursor-not-allowed'
                    : 'border-[#DDD8CE] text-text-main bg-white hover:border-brand-purple hover:text-brand-purple hover:bg-brand-purple-light/20 cursor-pointer shadow-2xs'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous</span>
              </button>

              {/* Numbered Page Buttons */}
              <div className="flex items-center gap-1">
                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${
                      currentPage === page
                        ? 'bg-brand-purple text-white shadow-xs shadow-brand-purple/25 font-black'
                        : 'border border-[#EFECE6] bg-white text-text-main hover:border-brand-purple hover:text-brand-purple hover:bg-brand-purple-light/20'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <span className="px-1 text-text-muted text-xs select-none font-bold">...</span>

                <button
                  type="button"
                  onClick={() => setCurrentPage(8)}
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${
                    currentPage === 8
                      ? 'bg-brand-purple text-white shadow-xs shadow-brand-purple/25 font-black'
                      : 'border border-[#EFECE6] bg-white text-text-main hover:border-brand-purple hover:text-brand-purple hover:bg-brand-purple-light/20'
                  }`}
                >
                  8
                </button>
              </div>

              {/* Next Button */}
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(p + 1, 8))}
                disabled={currentPage === 8}
                className={`inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all select-none ${
                  currentPage === 8
                    ? 'border-[#EFECE6] text-text-muted/40 bg-[#FAF8F5] cursor-not-allowed'
                    : 'border-[#DDD8CE] text-text-main bg-white hover:border-brand-purple hover:text-brand-purple hover:bg-brand-purple-light/20 cursor-pointer shadow-2xs'
                }`}
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </nav>
          </div>
        )}

        {/* ── Minimal Support Footer Note ── */}
        <div className="mt-8 text-center text-xs text-text-muted">
          Need help with an order? Contact our concierge on{' '}
          <a
            href="https://wa.me/919876543210?text=Hi%20Baha%2C%20I%20have%20an%20order%20inquiry"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-brand-purple hover:underline"
          >
            WhatsApp
          </a>{' '}
          or{' '}
          <a
            href="mailto:support@bahafashion.com"
            className="font-bold text-brand-purple hover:underline"
          >
            Email
          </a>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          MODAL 1: TRACK PACKAGE TIMELINE
         ───────────────────────────────────────────────────────────── */}
      {trackingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl border border-[#EFECE6] shadow-2xl max-w-lg w-full p-6 sm:p-7 animate-scale-up max-h-[92vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#EFECE6]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-purple bg-brand-purple-light/80 px-2.5 py-0.5 rounded-full">
                  Live Shipment Tracker
                </span>
                <h3 className="font-heading font-black text-lg sm:text-xl text-text-main mt-1">
                  Tracking Order #{trackingOrder.orderId}
                </h3>
                <p className="text-xs text-text-muted mt-0.5 flex items-center gap-1 font-mono">
                  <span>Carrier: {trackingOrder.carrier || 'Blue Dart Express'}</span>
                  <span>•</span>
                  <span>AWB: {trackingOrder.trackingNumber || 'BD-88492019'}</span>
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

            {/* ETA Highlight Card */}
            <div className="mt-4 p-4 rounded-2xl bg-brand-purple-light/40 border border-brand-purple/20 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-text-muted block">Estimated Delivery</span>
                <span className="font-heading font-black text-base text-brand-purple">
                  {trackingOrder.status === 'Delivered'
                    ? 'Delivered Successfully'
                    : trackingOrder.estimatedDelivery || 'Thursday, Oct 16 by 8:00 PM'}
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white text-brand-purple flex items-center justify-center shadow-xs">
                <Truck className="w-5 h-5" />
              </div>
            </div>

            {/* Detailed Stepper Timeline */}
            <div className="py-6 space-y-6">
              {[
                {
                  title: 'Order Confirmed & Payment Verified',
                  subtitle: 'Payment received via UPI. Order registered in warehouse system.',
                  time: 'Oct 8, 10:30 AM',
                  done: true,
                },
                {
                  title: 'Quality Checked & Packed in Gurgaon Hub',
                  subtitle: 'GOTS organic garments inspected and wrapped with recycled eco-packaging.',
                  time: 'Oct 8, 04:15 PM',
                  done: true,
                },
                {
                  title: 'In Transit with Blue Dart Air',
                  subtitle: 'Dispatched from Northern Sorting Terminal. Handed over to courier driver.',
                  time: 'Oct 9, 08:45 AM',
                  done: trackingOrder.status === 'In Transit' || trackingOrder.status === 'Delivered',
                  current: trackingOrder.status === 'In Transit',
                },
                {
                  title: 'Out for Delivery to Your Doorstep',
                  subtitle: 'Courier executive assigned. OTP delivery authentication required.',
                  time: trackingOrder.status === 'Delivered' ? 'Oct 10, 09:30 AM' : 'Pending dispatch',
                  done: trackingOrder.status === 'Delivered',
                  current: false,
                },
                {
                  title: 'Delivered Successfully',
                  subtitle: 'Delivered to resident at door. Thank you for choosing Baha!',
                  time: trackingOrder.status === 'Delivered' ? 'Oct 10, 02:45 PM' : 'Pending',
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

                  <div className="flex-1">
                    <h4
                      className={`font-bold text-xs sm:text-sm ${
                        step.current
                          ? 'text-brand-purple font-extrabold'
                          : step.done
                          ? 'text-text-main'
                          : 'text-text-muted'
                      }`}
                    >
                      {step.title}
                    </h4>
                    <p className="text-[11px] text-text-muted mt-0.5">{step.subtitle}</p>
                    <span className="text-[10px] font-semibold text-text-muted/80 mt-1 block font-mono">
                      {step.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Destination Address snapshot */}
            {trackingOrder.address && (
              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#EAE6DE] text-xs flex items-center gap-3 mb-4">
                <MapPin className="w-4 h-4 text-brand-purple shrink-0" />
                <div className="truncate">
                  <span className="font-bold text-text-main block">
                    Delivering to: {trackingOrder.address.name} ({trackingOrder.address.label || 'Home'})
                  </span>
                  <span className="text-text-muted truncate block">
                    {trackingOrder.address.line1}, {trackingOrder.address.city} - {trackingOrder.address.pincode}
                  </span>
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="pt-4 border-t border-[#EFECE6] flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setTrackingOrder(null)}
                className="px-5 py-2.5 rounded-full bg-[#0F2438] hover:bg-brand-purple text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODAL 2: ORDER DETAILS & RECEIPT INVOICE
         ───────────────────────────────────────────────────────────── */}
      {invoiceOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl border border-[#EFECE6] shadow-2xl max-w-lg w-full p-6 sm:p-8 animate-scale-up max-h-[92vh] overflow-y-auto">
            {/* Invoice Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#EFECE6]">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-purple bg-brand-purple-light px-2.5 py-0.5 rounded-full border border-brand-purple/20">
                    Order Details
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                      (STATUS_CONFIG[invoiceOrder.status] || STATUS_CONFIG['Processing']).bg
                    } ${
                      (STATUS_CONFIG[invoiceOrder.status] || STATUS_CONFIG['Processing']).border
                    } ${
                      (STATUS_CONFIG[invoiceOrder.status] || STATUS_CONFIG['Processing']).color
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        (STATUS_CONFIG[invoiceOrder.status] || STATUS_CONFIG['Processing']).dot
                      }`}
                    />
                    <span>{invoiceOrder.status}</span>
                  </span>
                </div>
                <h3 className="font-heading font-black text-xl text-text-main mt-1.5">
                  Order #{invoiceOrder.orderId}
                </h3>
                <p className="text-xs text-text-muted mt-0.5">
                  Placed on {new Date(invoiceOrder.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setInvoiceOrder(null)}
                className="p-1.5 rounded-xl text-text-muted hover:text-text-main hover:bg-[#FAF8F5] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Delivery & Payment Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-4 text-xs">
              <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#EAE6DE]">
                <span className="text-[10px] font-bold uppercase text-text-muted block mb-1">
                  Shipping Details
                </span>
                <p className="font-bold text-text-main">{invoiceOrder.address?.name || 'Priya Sharma'}</p>
                <p className="text-text-muted text-[11px] mt-0.5">
                  {invoiceOrder.address?.line1 || '42, Rose Garden Apartments'},<br />
                  {invoiceOrder.address?.city || 'Noida'}, {invoiceOrder.address?.state || 'UP'} - {invoiceOrder.address?.pincode || '201301'}
                </p>
                <p className="text-[11px] text-text-muted mt-1 font-mono">
                  Ph: {invoiceOrder.address?.phone || '+91 98765 43210'}
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#EAE6DE]">
                <span className="text-[10px] font-bold uppercase text-text-muted block mb-1">
                  Payment Method
                </span>
                <p className="font-bold text-text-main uppercase">
                  {invoiceOrder.paymentMethod === 'cod' ? 'Cash on Delivery' : invoiceOrder.paymentMethod || 'UPI Payment'}
                </p>
                <p className="text-emerald-700 font-bold text-[11px] mt-0.5">Payment Status: Confirmed ✓</p>
                <p className="text-[11px] text-text-muted mt-1">Transaction Ref: TXN-{invoiceOrder.orderId.slice(-6)}</p>
              </div>
            </div>

            {/* Itemized List */}
            <div className="py-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted block mb-2">
                Order Items ({getOrderItems(invoiceOrder).length})
              </span>
              <div className="divide-y divide-[#F2EFE9] border-y border-[#F2EFE9]">
                {getOrderItems(invoiceOrder).map((item, i) => (
                  <div key={`${item.id}-${i}`} className="py-3 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.featuredImage}
                        alt={item.name}
                        className="w-12 h-12 rounded-xl object-cover border border-[#EFECE6] bg-[#FAF8F5] shrink-0"
                      />
                      <div>
                        <p className="font-bold text-text-main line-clamp-1">{item.name}</p>
                        <p className="text-[11px] text-text-muted mt-0.5">
                          Size: {item.selectedSize || '3-4Y'} • Qty: {item.quantity || 1}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-text-main shrink-0">
                      ₹{((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="py-4 space-y-2 text-xs border-b border-[#EFECE6]">
              <div className="flex justify-between text-text-muted">
                <span>Items Subtotal</span>
                <span>₹{(invoiceOrder.total).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>Standard Delivery</span>
                <span className="font-bold">FREE</span>
              </div>
              <div className="flex justify-between text-text-muted">
                <span>Estimated Taxes (Included)</span>
                <span>₹{(invoiceOrder.total * 0.05).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-heading font-black text-text-main pt-2 border-t border-[#EFECE6]">
                <span>Total Amount Paid</span>
                <span className="text-brand-purple">₹{invoiceOrder.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== 'undefined') window.print();
                }}
                className="px-4 py-2 rounded-xl border border-[#DDD8CE] text-xs font-bold text-text-main hover:border-brand-purple hover:text-brand-purple transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Invoice</span>
              </button>

              <button
                type="button"
                onClick={() => setInvoiceOrder(null)}
                className="px-5 py-2.5 rounded-full bg-[#0F2438] hover:bg-brand-purple text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODAL 3: NEED HELP & CUSTOMER CARE
         ───────────────────────────────────────────────────────────── */}
      {supportOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl border border-[#EFECE6] shadow-2xl max-w-md w-full p-6 sm:p-7 animate-scale-up">
            <div className="flex items-center justify-between pb-4 border-b border-[#EFECE6]">
              <div>
                <h3 className="font-heading font-black text-lg text-text-main">
                  Help with Order #{supportOrder.orderId}
                </h3>
                <p className="text-xs text-text-muted mt-0.5">
                  How can our concierge team assist you today?
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSupportOrder(null)}
                className="p-1.5 rounded-xl text-text-muted hover:text-text-main hover:bg-[#FAF8F5] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3">
              <a
                href={`https://wa.me/919876543210?text=Hi%20Baha%2C%20I%20need%20assistance%20with%20my%20Order%20${supportOrder.orderId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl border border-emerald-200 bg-emerald-50/60 hover:bg-emerald-50 text-emerald-950 flex items-center justify-between transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm">WhatsApp Priority Concierge</h4>
                    <p className="text-[11px] text-emerald-700">Instant responses within 5 minutes</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href={`mailto:support@bahafashion.com?subject=Inquiry%20regarding%20Order%20${supportOrder.orderId}&body=Hi%20Baha%20Team%2C%0A%0AMy%20Order%20ID%20is%20${supportOrder.orderId}.%0A%0A`}
                className="p-3.5 rounded-2xl border border-[#EFECE6] bg-[#FAF8F5] hover:bg-white text-text-main flex items-center justify-between transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0F2438] text-white flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm">Email Support Team</h4>
                    <p className="text-[11px] text-text-muted">support@bahafashion.com</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-text-muted group-hover:translate-x-0.5 transition-transform" />
              </a>

              <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/80 text-xs text-amber-950 space-y-1">
                <span className="font-bold flex items-center gap-1.5 text-amber-900">
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>14-Day Free Exchange & Return Policy</span>
                </span>
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  Items can be easily exchanged for a different size or returned for a 100% full refund with complimentary
                  doorstep pickup.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#EFECE6] flex justify-end">
              <button
                type="button"
                onClick={() => setSupportOrder(null)}
                className="px-5 py-2.5 rounded-full bg-[#0F2438] hover:bg-brand-purple text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
