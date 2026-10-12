'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Tag,
  ArrowRight,
  Truck,
  ShoppingCart,
  Percent,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useShopState } from '@/hooks/useShopState';
import { ProductCard } from '@/components/ui/ProductCard';
import { ToastNotification } from '@/components/ui/ToastNotification';
import { EmptyCartAnimation } from '@/components/ui/EmptyCartAnimation';
import mockData from '@/data/mockData.json';
import type { Product } from '@/types';

const MOCK_PRODUCTS = mockData.products as Product[];

const AVAILABLE_PROMOS = [
  {
    code: 'WELCOME15',
    discount: '15% OFF',
    title: 'New Customer',
    description: 'Flat 15% discount on entire cart',
  },
  {
    code: 'LITTLEJOY10',
    discount: '10% OFF',
    title: 'Little Joy',
    description: 'Flat 10% instant discount on order',
  },
];

export default function CartPage() {
  const router = useRouter();
  const {
    cartItems,
    handleUpdateQuantity,
    handleRemoveItem,
    handleClearCart,
    handleAddToCart,
    appliedPromo,
    setAppliedPromo,
    handleApplyPromo,
    toast,
    setToast,
    wishlistIds,
    handleToggleWishlist,
  } = useShopState();

  const [promoInput, setPromoInput] = useState(appliedPromo || '');
  const [promoStatus, setPromoStatus] = useState<{ text: string; success: boolean } | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Coupon section cursor scroll & drag support
  const couponScrollRef = useRef<HTMLDivElement>(null);
  const [isDraggingCoupons, setIsDraggingCoupons] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragScrollLeft, setDragScrollLeft] = useState(0);

  // Wheel listener to convert mouse cursor vertical wheel to horizontal scroll
  useEffect(() => {
    const el = couponScrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaY * 1.2;
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const handleCouponMouseDown = (e: React.MouseEvent) => {
    if (!couponScrollRef.current) return;
    setIsDraggingCoupons(true);
    setDragStartX(e.pageX - couponScrollRef.current.offsetLeft);
    setDragScrollLeft(couponScrollRef.current.scrollLeft);
  };

  const handleCouponMouseUpOrLeave = () => {
    setIsDraggingCoupons(false);
  };

  const handleCouponMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingCoupons || !couponScrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - couponScrollRef.current.offsetLeft;
    const walk = (x - dragStartX) * 1.4;
    couponScrollRef.current.scrollLeft = dragScrollLeft - walk;
  };

  const FREE_SHIPPING_THRESHOLD = 999.0;

  const totalItemCount = useMemo(() => {
    return cartItems.reduce((acc, i) => acc + i.quantity, 0);
  }, [cartItems]);

  // Calculate pricing based on cart items
  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cartItems]);

  // Original price savings (from products on sale)
  const productSavings = useMemo(() => {
    return cartItems.reduce(
      (sum, item) =>
        sum +
        (item.product.originalPrice && item.product.originalPrice > item.product.price
          ? (item.product.originalPrice - item.product.price) * item.quantity
          : 0),
      0
    );
  }, [cartItems]);

  let discountPercent = 0;
  if (appliedPromo.toUpperCase() === 'LITTLEJOY10') discountPercent = 10;
  if (appliedPromo.toUpperCase() === 'WELCOME15') discountPercent = 15;
  if (appliedPromo.toUpperCase() === 'FESTIVE20') discountPercent = 20;

  const discountAmount = (subtotal * discountPercent) / 100;
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || cartItems.length === 0;
  const shippingCost = cartItems.length === 0 ? 0 : isFreeShipping ? 0 : 99.0;
  const total = Math.max(0, subtotal - discountAmount + shippingCost);
  const totalSaved = productSavings + discountAmount;

  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  // Recommended products: products not currently in the cart
  const recommendedProducts = useMemo(() => {
    const inCartProductIds = new Set(cartItems.map((i) => i.product.id));
    return MOCK_PRODUCTS.filter((p) => !inCartProductIds.has(p.id)).slice(0, 4);
  }, [cartItems]);

  const handleApplyPromoCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;

    const res = handleApplyPromo(promoInput.trim());
    setPromoStatus({ text: res.message, success: res.success });
    if (res.success) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your shopping bag is empty.');
      return;
    }
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-text-main flex flex-col font-body selection:bg-brand-yellow relative overflow-hidden">
      {/* ── Soft Background Ambient Splashes (matching home page) ── */}
      <div className="absolute top-0 left-[-8%] w-80 sm:w-[34rem] h-80 sm:h-[34rem] bg-purple-200/35 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-28 right-[-8%] w-72 sm:w-[30rem] h-72 sm:h-[30rem] bg-amber-200/35 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-[45%] left-[5%] w-64 sm:w-80 h-64 sm:h-80 bg-rose-100/30 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-16 right-[-5%] w-80 sm:w-[30rem] h-80 sm:h-[30rem] bg-brand-yellow/20 rounded-full blur-3xl pointer-events-none -z-0" />

      {/* Toast Notification */}
      {toast && <ToastNotification toast={toast} onClose={() => setToast(null)} />}

      <main className="flex-1 py-6 sm:py-10 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {cartItems.length === 0 ? (
            /* ── Empty Cart State with Lottie Animation ── */
            <div className="py-8 sm:py-14 text-center animate-fade-in max-w-lg mx-auto">
              <EmptyCartAnimation className="w-56 h-56 sm:w-64 sm:h-64 mx-auto mb-2" />
              <h2 className="font-heading text-2xl sm:text-3xl font-black text-text-main mb-2">
                Your Shopping Bag is Empty
              </h2>
              <p className="text-xs sm:text-sm text-text-muted max-w-sm mx-auto mb-7 leading-relaxed">
                Looks like you haven&apos;t added any adorable kids outfits to your cart yet. Discover our fresh arrivals!
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-brand-purple hover:bg-brand-purple-dark text-white font-medium text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <span>Start Shopping</span>
              </Link>
            </div>
          ) : (
            /* ── Two Column Cart Layout ── */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* ── LEFT COLUMN: Cart Items List (col-span-8) ── */}
              <div className="lg:col-span-7 xl:col-span-8 space-y-4">
                {/* Cart Items Header Row */}
                <div className="flex items-center justify-between px-1 py-1">
                  <h2 className="font-heading font-black text-lg sm:text-xl text-text-main">
                    Items in Bag{' '}
                    <span className="text-xs font-medium text-text-muted">
                      ({totalItemCount} {totalItemCount === 1 ? 'item' : 'items'})
                    </span>
                  </h2>

                  <button
                    type="button"
                    onClick={() => {
                      handleClearCart();
                      setToast({
                        id: Date.now().toString(),
                        type: 'cart',
                        title: 'Bag Cleared',
                        message: 'All items have been removed from your shopping bag.',
                      });
                    }}
                    className="text-xs font-bold text-text-muted hover:text-brand-coral transition-colors cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>

                {/* Items List */}
                <div className="space-y-3.5">
                  {cartItems.map((item) => {
                    const colorObj = item.product.colors?.find(
                      (c) => c.name?.toLowerCase() === item.selectedColor?.toLowerCase()
                    );
                    const colorHex = colorObj?.hex || (item.selectedColor?.startsWith('#') ? item.selectedColor : null);

                    return (
                      <div
                        key={item.id}
                        className="rounded-3xl border border-[#EFECE6] bg-white/95 backdrop-blur-xs overflow-hidden transition-all flex items-stretch shadow-xs hover:border-brand-purple/30 hover:shadow-soft"
                      >
                        <Link
                          href={`/product/${item.product.id}`}
                          className="shrink-0 relative w-24 sm:w-28 md:w-32 self-stretch bg-[#FAF8F5] block overflow-hidden border-r border-[#EFECE6] group"
                        >
                          <img
                            src={item.product.featuredImage}
                            alt={item.product.name}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </Link>

                        {/* Details */}
                        <div className="flex-1 min-w-0 p-2 flex flex-col justify-between">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <Link
                                href={`/product/${item.product.id}`}
                                className="font-heading font-semibold text-sm sm:text-base text-text-main hover:text-brand-purple transition-colors line-clamp-1"
                              >
                                {item.product.name}
                              </Link>
                              <div className="flex items-baseline gap-2 mt-0.5">
                                <span className="font-heading font-black text-sm sm:text-base text-brand-purple">
                                  ₹{item.product.price.toFixed(2)}
                                </span>
                                {item.product.originalPrice && (
                                  <span className="text-xs text-text-muted line-through">
                                    ₹{item.product.originalPrice.toFixed(2)}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Trash Delete Button (Reference design icon) */}
                            <button
                              type="button"
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-text-muted hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer shrink-0"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-3 mt-3 pt-2.5 border-t border-[#F2EFE9]">
                            {/* Selected Variant Tags */}
                            <div className="flex items-center text-xs text-text-muted gap-2">
                              <span className=" rounded-lg font-medium text-[11px]">
                                Size: <span className="text-text-main">{item.selectedSize}</span>
                              </span>
                              <span className="rounded-lg font-medium text-[11px] inline-flex items-center gap-1">
                                <span>Color:</span>
                                {colorHex && (
                                  <span
                                    className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0 shadow-2xs inline-block"
                                    style={{ backgroundColor: colorHex }}
                                    title={`${item.selectedColor} (${colorHex})`}
                                  />
                                )}
                              </span>
                            </div>

                          {/* Quantity Stepper */}
                          <div className="flex items-center rounded-xl border border-[#E2DDD5] bg-[#FAF8F5] p-0.5">
                            <button
                              type="button"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 rounded-lg flex items-center justify-center text-text-muted hover:text-text-main hover:bg-white transition-colors cursor-pointer"
                              title="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-xs font-bold text-text-main">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 rounded-lg flex items-center justify-center text-text-muted hover:text-text-main hover:bg-white transition-colors cursor-pointer"
                              title="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                </div>
              </div>

              {/* ── RIGHT COLUMN: Summary Card (col-span-4) ── */}
              <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-28">
                <div className="rounded-3xl border border-[#EFECE6] bg-white/95 backdrop-blur-md p-6 sm:p-7 shadow-card space-y-5">
                  <h2 className="font-heading font-black text-xl text-text-main pb-2 border-b border-[#EFECE6]">
                    Summary
                  </h2>

                  {/* Subtotal line */}
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <div className="flex justify-between items-center text-text-muted">
                      <span>
                        Subtotal ({totalItemCount} {totalItemCount === 1 ? 'item' : 'items'})
                      </span>
                      <span className="font-bold text-text-main">₹{subtotal.toFixed(2)}</span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between items-center text-emerald-700 font-medium">
                        <span className="flex items-center gap-1">
                          <Tag className="w-3.5 h-3.5" />
                          <span>Promo Discount ({discountPercent}%)</span>
                        </span>
                        <span className="font-bold">-₹{discountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between items-center text-text-muted">
                      <span>Estimated Shipping</span>
                      <span className="font-bold text-text-main">
                        {isFreeShipping ? (
                          <span className="text-emerald-700 font-extrabold">FREE</span>
                        ) : (
                          `₹${shippingCost.toFixed(2)}`
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Promo Code Input Box (matches reference design) */}
                  <div className="pt-2 border-t border-[#EFECE6] space-y-2">
                    <div>
                      <h4 className="text-xs font-bold text-text-main">
                        Do you have a promotional code?
                      </h4>
                      <p className="text-[11px] text-text-muted mt-0.5">
                        To use a gift card, that&apos;s the next step.
                      </p>
                    </div>

                    <form onSubmit={handleApplyPromoCode} className="relative flex items-center mt-2">
                      <input
                        type="text"
                        placeholder="Enter code"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        className="w-full pl-4 pr-24 py-2.5 rounded-full border border-[#E2DDD5] bg-[#FAF8F5] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple uppercase"
                      />
                      <button
                        type="submit"
                        className="absolute right-1 px-4 py-1.5 rounded-full bg-[#0F2438] hover:bg-brand-purple text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </form>

                    {promoStatus && (
                      <p
                        className={`text-[11px] font-semibold mt-1 ${
                          promoStatus.success ? 'text-emerald-700' : 'text-rose-600'
                        }`}
                      >
                        {promoStatus.text}
                      </p>
                    )}

                    {/* Available Promos as Rectangular Coupon Cards with Horizontal Scroll */}
                    <div className="pt-2.5 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
                            <Tag className="w-3.5 h-3.5 text-brand-purple" />
                            <span>Available Coupons</span>
                          </span>

                          {/* Cursor navigation chevron buttons */}
                          <div className="flex items-center gap-1 ml-1">
                            <button
                              type="button"
                              onClick={() => {
                                couponScrollRef.current?.scrollBy({ left: -240, behavior: 'smooth' });
                              }}
                              className="w-5 h-5 rounded-full border border-[#E5DFD5] bg-white flex items-center justify-center text-text-muted hover:text-brand-purple hover:border-brand-purple/50 transition-colors cursor-pointer shadow-2xs"
                              title="Scroll left"
                            >
                              <ChevronLeft className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                couponScrollRef.current?.scrollBy({ left: 240, behavior: 'smooth' });
                              }}
                              className="w-5 h-5 rounded-full border border-[#E5DFD5] bg-white flex items-center justify-center text-text-muted hover:text-brand-purple hover:border-brand-purple/50 transition-colors cursor-pointer shadow-2xs"
                              title="Scroll right"
                            >
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {appliedPromo && (
                          <button
                            type="button"
                            onClick={() => {
                              setAppliedPromo('');
                              setPromoInput('');
                              setPromoStatus(null);
                            }}
                            className="text-[10px] font-bold text-brand-coral hover:underline cursor-pointer"
                          >
                            Remove Applied
                          </button>
                        )}
                      </div>

                      {/* Horizontal Scroll Track of Rectangular Coupon Cards with cursor drag and wheel */}
                      <div
                        ref={couponScrollRef}
                        onMouseDown={handleCouponMouseDown}
                        onMouseUp={handleCouponMouseUpOrLeave}
                        onMouseLeave={handleCouponMouseUpOrLeave}
                        onMouseMove={handleCouponMouseMove}
                        className={`flex gap-2.5 overflow-x-auto pb-2 pt-1 -mx-1 px-1 scrollbar-none snap-x snap-mandatory select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${
                          isDraggingCoupons ? 'cursor-grabbing' : 'cursor-grab'
                        }`}
                      >
                        {AVAILABLE_PROMOS.map((promo) => {
                          const isApplied = appliedPromo.toUpperCase() === promo.code;
                          return (
                            <div
                              key={promo.code}
                              className={`w-[230px] sm:w-[250px] p-3 sm:p-3.5 rounded-md transition-all flex flex-col justify-between shrink-0 snap-start relative overflow-hidden group select-none shadow-md ${
                                isApplied
                                  ? 'bg-gradient-to-b from-emerald-50/90 to-white border-emerald-500/50 shadow-xs'
                                  : 'bg-[#FAF8F5] border-[#E8E4DA] hover:border-brand-purple/40 shadow-md'
                              }`}
                            >
                              {/* Ticket Cutout Notches */}
                              <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border border-[#E8E4DA] pointer-events-none" />
                              <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border border-[#E8E4DA] pointer-events-none" />

                              <div>
                                {/* Top Row: Code + Discount Tag */}
                                <div className="flex items-center justify-between gap-2">
                                  <div className="flex items-center gap-1.5">
                                    <div
                                      className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
                                        isApplied
                                          ? 'bg-emerald-600 text-white'
                                          : 'bg-brand-purple-light text-brand-purple'
                                      }`}
                                    >
                                      <Percent className="w-2.5 h-2.5" />
                                    </div>
                                    <span className="font-heading font-black text-xs text-text-main tracking-wider uppercase border border-dashed border-[#DED8CE] bg-white/90 rounded-md py-0.5 px-2">
                                      {promo.code}
                                    </span>
                                  </div>
                                  <span
                                    className={`text-[10px] font-black px-1.5 py-0.5 rounded-md shrink-0 ${
                                      isApplied
                                        ? 'bg-emerald-100 text-emerald-800'
                                        : 'bg-brand-yellow-light text-text-main'
                                    }`}
                                  >
                                    {promo.discount}
                                  </span>
                                </div>

                                {/* Middle: Description */}
                                <p className="text-[11px] text-text-muted mt-2 leading-snug">
                                  {promo.description}
                                </p>
                              </div>

                              {/* Bottom Row: Info + Action Button */}
                              <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-dashed border-[#E8E4DA]">
                                <span className="text-[10px] text-text-muted font-medium">
                                  Instant savings
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (isApplied) {
                                      setAppliedPromo('');
                                      setPromoInput('');
                                      setPromoStatus(null);
                                    } else {
                                      setPromoInput(promo.code);
                                      const res = handleApplyPromo(promo.code);
                                      setPromoStatus({ text: res.message, success: res.success });
                                      if (res.success) {
                                        confetti({
                                          particleCount: 50,
                                          spread: 60,
                                          origin: { y: 0.6 },
                                        });
                                      }
                                    }
                                  }}
                                  className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                                    isApplied
                                      ? 'bg-emerald-600 hover:bg-rose-600 text-white shadow-2xs'
                                      : 'bg-[#0F2438] hover:bg-brand-purple text-white shadow-2xs'
                                  }`}
                                >
                                  {isApplied ? 'Applied ✓' : 'Apply'}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Total Line */}
                  <div className="pt-3 border-t border-[#EFECE6] flex items-start justify-between">
                    <div>
                      <span className="font-heading font-black text-base text-text-main block">
                        Estimated Total
                      </span>
                      <span className="text-[10px] text-text-muted">Includes applicable taxes</span>
                    </div>
                    <div className="text-right">
                      <span className="font-heading font-black text-2xl text-brand-purple block leading-tight">
                        ₹{total.toFixed(2)}
                      </span>
                      {totalSaved > 0 && (
                        <span className="text-xs font-bold text-emerald-600 block mt-1">
                          You saved ₹{totalSaved.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    type="button"
                    onClick={handleCheckout}
                    disabled={isCheckingOut || cartItems.length === 0}
                    className="w-full py-4 rounded-full bg-[#0F2438] hover:bg-brand-purple text-white font-heading font-black text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isCheckingOut ? (
                      <span>Processing Demo Order...</span>
                    ) : (
                      <>
                        <span>Checkout</span>
                        {cartItems.length > 0 && (
                          <span className="text-xs font-normal opacity-90">
                            ({totalItemCount} {totalItemCount === 1 ? 'item' : 'items'})
                          </span>
                        )}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── You might also like (only shown when cart has items) ── */}
          {cartItems.length > 0 && recommendedProducts.length > 0 && (
            <section className="mt-16 sm:mt-24 pt-10 border-t border-[#EFECE6]">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-black text-text-main">
                    You might also like
                  </h2>
                  <p className="text-xs text-text-muted mt-0.5">
                    Curated outfits and accessories designed for your little ones.
                  </p>
                </div>
                <Link
                  href="/products"
                  className="text-xs font-bold text-brand-purple hover:underline inline-flex items-center gap-1"
                >
                  <span>Explore All</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {recommendedProducts.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    isWishlisted={wishlistIds.includes(prod.id)}
                    onToggleWishlist={(p) => handleToggleWishlist(p, true)}
                    onAddToCart={(p, color, size, qty) => handleAddToCart(p, color, size, qty)}
                    onQuickView={(p) => router.push(`/product/${p.id}`)}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
