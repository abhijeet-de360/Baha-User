'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronDown,
  CreditCard,
  Edit,
  Loader2,
  MapPin,
  Package,
  Percent,
  Plus,
  QrCode,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Tag,
  Trash2,
  Truck,
  Wallet,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useShopState } from '@/hooks/useShopState';
import { ToastNotification } from '@/components/ui/ToastNotification';
import { EmptyCartAnimation } from '@/components/ui/EmptyCartAnimation';
import { OrderSuccessAnimation } from '@/components/ui/OrderSuccessAnimation';
import mockData from '@/data/mockData.json';
import type { Product } from '@/types';

interface Address {
  id: string;
  label: string;
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  phone?: string;
  isDefault: boolean;
}

const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Ladakh',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Puducherry',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
];

type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'cod';

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cartItems,
    handleClearCart,
    appliedPromo,
    setAppliedPromo,
    handleApplyPromo,
    toast,
    setToast,
  } = useShopState();

  // Address state
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);

  const [addressForm, setAddressForm] = useState<Omit<Address, 'id'>>({
    label: 'Home',
    name: 'Priya Sharma',
    phone: '+91 98765 43210',
    line1: '',
    line2: '',
    city: '',
    state: 'Uttar Pradesh',
    pincode: '',
    isDefault: false,
  });

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [upiId, setUpiId] = useState('priyasharma@okaxis');
  const [isUpiVerified, setIsUpiVerified] = useState(false);
  const [isVerifyingUpi, setIsVerifyingUpi] = useState(false);
  const [upiError, setUpiError] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('Priya Sharma');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  // Checkout submission & order confirmation state
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderId: string;
    total: number;
    itemsCount: number;
    address: Address | null;
    paymentMethod: PaymentMethod;
    date: string;
  } | null>(null);

  // Load addresses from localStorage or mockData
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('baha_saved_addresses');
        if (stored) {
          const parsed = JSON.parse(stored) as Address[];
          if (parsed && parsed.length > 0) {
            setAddresses(parsed);
            const defaultAddr = parsed.find((a) => a.isDefault) || parsed[0];
            setSelectedAddressId(defaultAddr.id);
            return;
          }
        }
      } catch (err) {
        console.error('Failed to parse saved addresses', err);
      }

      // Fallback to mock profile addresses
      const initial = (mockData.userProfile.savedAddresses as Address[]).map((a) => ({
        ...a,
        phone: a.phone || '+91 98765 43210',
      }));
      setAddresses(initial);
      const defaultAddr = initial.find((a) => a.isDefault) || initial[0];
      if (defaultAddr) setSelectedAddressId(defaultAddr.id);
    }
  }, []);

  // Save to localStorage when addresses change
  const saveAddressesToStorage = (updated: Address[]) => {
    setAddresses(updated);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('baha_saved_addresses', JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to save addresses', err);
      }
    }
  };

  // Pricing calculations
  const FREE_SHIPPING_THRESHOLD = 999.0;

  const totalItemCount = useMemo(() => {
    return cartItems.reduce((acc, i) => acc + i.quantity, 0);
  }, [cartItems]);

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cartItems]);

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

  // Selected address object
  const selectedAddress = useMemo(() => {
    return addresses.find((a) => a.id === selectedAddressId) || null;
  }, [addresses, selectedAddressId]);

  // Handle open add address
  const handleOpenAddAddress = () => {
    setEditingAddressId(null);
    setAddressForm({
      label: 'Home',
      name: 'Priya Sharma',
      phone: '+91 98765 43210',
      line1: '',
      line2: '',
      city: '',
      state: 'Uttar Pradesh',
      pincode: '',
      isDefault: addresses.length === 0,
    });
    setIsAddressFormOpen(true);
  };

  // Handle open edit address
  const handleOpenEditAddress = (addr: Address) => {
    setEditingAddressId(addr.id);
    setAddressForm({
      label: addr.label,
      name: addr.name,
      phone: addr.phone || '+91 98765 43210',
      line1: addr.line1,
      line2: addr.line2 || '',
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode,
      isDefault: addr.isDefault,
    });
    setIsAddressFormOpen(true);
  };

  // Handle save address
  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressForm.line1 || !addressForm.city || !addressForm.pincode) {
      alert('Please fill out all required address fields.');
      return;
    }

    if (editingAddressId) {
      const updated = addresses.map((a) => {
        if (a.id === editingAddressId) {
          return { ...a, ...addressForm };
        }
        if (addressForm.isDefault) {
          return { ...a, isDefault: false };
        }
        return a;
      });
      saveAddressesToStorage(updated);
      setSelectedAddressId(editingAddressId);
    } else {
      const newId = `addr-${Date.now()}`;
      const newAddress: Address = {
        ...addressForm,
        id: newId,
      };
      let updated = [...addresses];
      if (newAddress.isDefault) {
        updated = updated.map((a) => ({ ...a, isDefault: false }));
      }
      updated.push(newAddress);
      saveAddressesToStorage(updated);
      setSelectedAddressId(newId);
    }

    setIsAddressFormOpen(false);
    setEditingAddressId(null);
  };

  // Handle UPI verification
  const handleVerifyUpi = () => {
    const trimmed = upiId.trim();
    if (!trimmed) {
      setUpiError('Please enter your UPI ID');
      return;
    }
    const upiRegex = /^[a-zA-Z0-9.\-_]{2,}@[a-zA-Z]{2,}$/;
    if (!trimmed.includes('@') || !upiRegex.test(trimmed)) {
      setUpiError('Please enter a valid UPI ID (e.g. username@okhdfcbank)');
      return;
    }

    setUpiError('');
    setIsVerifyingUpi(true);
    setTimeout(() => {
      setIsVerifyingUpi(false);
      setIsUpiVerified(true);
    }, 500);
  };

  // Handle order submission
  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty. Please add items before checking out.');
      return;
    }

    if (!selectedAddress) {
      setIsAddressFormOpen(true);
      alert('Please select or add a delivery address.');
      return;
    }

    if (paymentMethod === 'upi') {
      if (!upiId.trim()) {
        alert('Please enter your UPI ID.');
        return;
      }
      if (!isUpiVerified) {
        alert('Please verify your UPI ID before proceeding.');
        return;
      }
    }

    setIsPlacingOrder(true);

    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#6C63A8', '#FFD66B', '#A9D8B8', '#F28C82'],
    });

    const newOrderId = `BF-${Date.now().toString().slice(-8)}`;

    setTimeout(() => {
      const orderDateStr = new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });

      setConfirmedOrder({
        orderId: newOrderId,
        total,
        itemsCount: totalItemCount,
        address: selectedAddress,
        paymentMethod,
        date: orderDateStr,
      });

      // Save order to localStorage so it immediately appears in My Orders page
      if (typeof window !== 'undefined') {
        try {
          const stored = localStorage.getItem('baha_placed_orders');
          const existing = stored ? JSON.parse(stored) : [];
          const newPlacedOrder = {
            orderId: newOrderId,
            date: new Date().toISOString().split('T')[0],
            status: 'Processing',
            total,
            items: cartItems.map((item) => item.product.id),
            cartItemsSnapshot: cartItems.map((item) => ({
              id: item.product.id,
              name: item.product.name,
              price: item.product.price,
              featuredImage: item.product.featuredImage,
              selectedColor: item.selectedColor,
              selectedSize: item.selectedSize,
              quantity: item.quantity,
            })),
            address: selectedAddress,
            paymentMethod,
          };
          localStorage.setItem('baha_placed_orders', JSON.stringify([newPlacedOrder, ...existing]));
        } catch (err) {
          console.error('Failed to save order to localStorage:', err);
        }
      }

      handleClearCart();
      setIsPlacingOrder(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-text-main flex flex-col font-body selection:bg-brand-yellow relative overflow-hidden">
      {/* ── Soft Background Ambient Splashes ── */}
      <div className="absolute top-0 left-[-8%] w-80 sm:w-[34rem] h-80 sm:h-[34rem] bg-purple-200/35 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-28 right-[-8%] w-72 sm:w-[30rem] h-72 sm:h-[30rem] bg-amber-200/35 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-[45%] left-[5%] w-64 sm:w-80 h-64 sm:h-80 bg-rose-100/30 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-16 right-[-5%] w-80 sm:w-[30rem] h-80 sm:h-[30rem] bg-brand-yellow/20 rounded-full blur-3xl pointer-events-none -z-0" />

      {/* Toast Notification */}

      <main className="flex-1 py-6 sm:py-10 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
          {/* ── Order Confirmed Success Screen ── */}
          {confirmedOrder ? (
            <div className="max-w-2xl mx-auto py-8 sm:py-12 animate-fade-in text-center">
              <div className="flex justify-center mb-4">
                <OrderSuccessAnimation className="w-28 h-28 sm:w-36 sm:h-36 mx-auto" />
              </div>

              <span className="text-xs font-bold uppercase tracking-widest text-brand-purple bg-brand-purple-light/50 px-3 py-1 rounded-full">
                Order Placed Successfully!
              </span>

              <h1 className="font-heading font-black text-3xl sm:text-4xl text-text-main mt-3 mb-2">
                Thank You for Your Order!
              </h1>
              <p className="text-xs sm:text-sm text-text-muted max-w-md mx-auto leading-relaxed mb-8">
                Your order <strong className="text-text-main">#{confirmedOrder.orderId}</strong> has been received and is being prepared with tender love and care.
              </p>

              {/* Order Quick Summary Card */}
              <div className="rounded-3xl border border-[#EFECE6] bg-white/95 backdrop-blur-md p-6 sm:p-7 shadow-card text-left space-y-4 mb-8">
                <div className="flex items-center justify-between pb-3 border-b border-[#EFECE6]">
                  <div>
                    <span className="text-[11px] text-text-muted font-medium block">Order ID</span>
                    <span className="font-heading font-black text-sm sm:text-base text-text-main">
                      #{confirmedOrder.orderId}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-text-muted font-medium block">Total Paid</span>
                    <span className="font-heading font-black text-base sm:text-lg text-brand-purple">
                      ₹{confirmedOrder.total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="font-bold text-text-main block mb-1">Delivering To:</span>
                    <p className="text-text-muted leading-relaxed">
                      <strong>{confirmedOrder.address?.name}</strong> ({confirmedOrder.address?.label})<br />
                      {confirmedOrder.address?.line1}, {confirmedOrder.address?.city}, {confirmedOrder.address?.state} - {confirmedOrder.address?.pincode}<br />
                      Phone: {confirmedOrder.address?.phone}
                    </p>
                  </div>

                  <div>
                    <span className="font-bold text-text-main block mb-1">Payment & Delivery:</span>
                    <p className="text-text-muted leading-relaxed">
                      Method: <span className="font-semibold text-text-main uppercase">{confirmedOrder.paymentMethod}</span><br />
                      Status: <span className="text-emerald-700 font-bold">Confirmed ✓</span><br />
                      Estimated Delivery: <span className="font-bold text-text-main">Within 3-5 Business Days</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
                <Link
                  href="/orders"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#0F2438] hover:bg-brand-purple text-white font-heading font-semibold text-sm shadow-md transition-all cursor-pointer inline-flex items-center justify-center gap-2"
                >
                  <span>View in My Orders</span>
                </Link>

                <Link
                  href="/products"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full border border-[#D5CFC5] bg-white hover:bg-[#FAF8F5] text-text-main font-heading font-semibold text-sm transition-all cursor-pointer inline-flex items-center justify-center gap-2"
                >
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          ) : cartItems.length === 0 ? (
            /* ── Empty Cart State Fallback ── */
            <div className="py-12 sm:py-20 text-center animate-fade-in max-w-lg mx-auto">
              <EmptyCartAnimation className="w-56 h-56 sm:w-64 sm:h-64 mx-auto mb-2" />
              <h2 className="font-heading text-2xl sm:text-3xl font-black text-text-main mb-2">
                Your Bag is Empty
              </h2>
              <p className="text-xs sm:text-sm text-text-muted max-w-sm mx-auto mb-7 leading-relaxed">
                You do not have any items in your cart to checkout. Add some adorable styles!
              </p>
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#0F2438] hover:bg-brand-purple text-white font-heading font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <span>Explore Kids Outfits</span>
              </Link>
            </div>
          ) : (
            /* ── Active Checkout Two-Column Layout ── */
            <div>
              {/* Breadcrumb & Navigation */}
              <div className="mb-6">
                <Link
                  href="/cart"
                  className="inline-flex items-center gap-2 text-xs font-bold text-text-muted hover:text-brand-purple transition-colors mb-2 cursor-pointer group"
                >
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                  <span>Back to Shopping Bag</span>
                </Link>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h1 className="font-heading font-black text-2xl sm:text-3xl text-text-main tracking-tight">
                      Checkout
                    </h1>
                    <p className="text-xs sm:text-sm text-text-muted mt-0.5">
                      Confirm delivery address and select payment method to complete order.
                    </p>
                  </div>
                </div>
              </div>

              {/* Two Column Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* ── LEFT COLUMN: Address, Payment & Items (col-span-7 / 8) ── */}
                <div className="lg:col-span-7 xl:col-span-8 space-y-6">
                  {/* ── 1. DELIVERY ADDRESS SECTION ── */}
                  <div className="rounded-3xl border border-[#EFECE6] bg-white/95 backdrop-blur-md p-5 sm:p-7 shadow-xs">
                    <div className="flex items-center justify-between pb-4 border-b border-[#EFECE6]">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-brand-purple-light text-brand-purple flex items-center justify-center shrink-0">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div>
                          <h2 className="font-heading font-black text-base sm:text-lg text-text-main">
                            1. Delivery Address
                          </h2>
                          <p className="text-[11px] text-text-muted">
                            Select where you want your parcel delivered
                          </p>
                        </div>
                      </div>

                      {!isAddressFormOpen && (
                        <button
                          type="button"
                          onClick={handleOpenAddAddress}
                          className="inline-flex items-center gap-1 text-xs font-bold text-brand-purple hover:underline cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add New</span>
                        </button>
                      )}
                    </div>

                    {/* Saved Addresses Cards */}
                    {!isAddressFormOpen ? (
                      <div className="pt-4">
                        {addresses.length === 0 ? (
                          <div className="text-center py-8 px-4 rounded-2xl border-2 border-dashed border-[#E2DDD5] bg-[#FAF8F5]/60">
                            <p className="text-xs text-text-muted mb-3">
                              No address found. Add an address to proceed.
                            </p>
                            <button
                              type="button"
                              onClick={handleOpenAddAddress}
                              className="px-4 py-2 rounded-xl bg-brand-purple text-white text-xs font-bold hover:bg-brand-purple-dark transition-all shadow-xs cursor-pointer inline-flex items-center gap-1.5"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add Delivery Address</span>
                            </button>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            {addresses.map((addr) => {
                              const isSelected = selectedAddressId === addr.id;
                              return (
                                <div
                                  key={addr.id}
                                  onClick={() => setSelectedAddressId(addr.id)}
                                  className={`p-4 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                                    isSelected
                                      ? 'border-brand-purple bg-brand-purple-light/15 ring-2 ring-brand-purple/20 shadow-xs'
                                      : 'border-[#EFECE6] bg-white hover:border-brand-purple/30 hover:bg-[#FAF8F5]/50'
                                  }`}
                                >
                                  <div>
                                    <div className="flex items-center justify-between gap-2 mb-2">
                                      <div className="flex items-center gap-2">
                                        {/* Radio Circle */}
                                        <div
                                          className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                                            isSelected
                                              ? 'border-brand-purple bg-brand-purple text-white'
                                              : 'border-[#D5CFC5] bg-white'
                                          }`}
                                        >
                                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                        </div>
                                        <span className="font-heading font-black text-xs text-text-main">
                                          {addr.label}
                                        </span>
                                        {addr.isDefault && (
                                          <span className="text-[9px] font-bold bg-[#FAF8F5] border border-[#E8E4DA] text-text-muted px-1.5 py-0.2 rounded-md">
                                            Default
                                          </span>
                                        )}
                                      </div>

                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleOpenEditAddress(addr);
                                        }}
                                        className="text-[11px] font-bold text-text-muted hover:text-brand-purple p-1 rounded-md hover:bg-white transition-colors cursor-pointer"
                                        title="Edit address"
                                      >
                                        <Edit className="w-3 h-3" />
                                      </button>
                                    </div>

                                    <p className="font-bold text-xs text-text-main mb-0.5">{addr.name}</p>
                                    <p className="text-[11px] text-text-muted leading-relaxed line-clamp-2">
                                      {addr.line1}
                                      {addr.line2 ? `, ${addr.line2}` : ''}
                                    </p>
                                    <p className="text-[11px] text-text-muted leading-relaxed">
                                      {addr.city}, {addr.state} - {addr.pincode}
                                    </p>
                                    {addr.phone && (
                                      <p className="text-[11px] text-text-main font-medium mt-1">
                                        📱 {addr.phone}
                                      </p>
                                    )}
                                  </div>

                                  <div className="mt-3 pt-2.5 border-t border-[#F0ECE4] flex items-center justify-between text-[11px]">
                                    {isSelected ? (
                                      <span className="text-brand-purple font-bold flex items-center gap-1">
                                        <Check className="w-3 h-3 stroke-[3]" />
                                        Deliver Here
                                      </span>
                                    ) : (
                                      <span className="text-text-muted/70 group-hover:text-text-muted">
                                        Click to select
                                      </span>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ) : (
                      /* ── In-place Address Form ── */
                      <form onSubmit={handleSaveAddress} className="pt-4 space-y-4 animate-fade-in">
                        <div className="flex items-center justify-between">
                          <h3 className="font-heading font-black text-xs uppercase tracking-wider text-text-main">
                            {editingAddressId ? 'Edit Address' : 'Add New Address'}
                          </h3>
                          <button
                            type="button"
                            onClick={() => setIsAddressFormOpen(false)}
                            className="text-xs font-bold text-text-muted hover:text-rose-600 transition-colors cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>

                        {/* Address Type Tag Selector */}
                        <div>
                          <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider block mb-1.5">
                            Address Type
                          </label>
                          <div className="flex gap-2">
                            {(['Home', 'Work', 'Other'] as const).map((type) => (
                              <button
                                key={type}
                                type="button"
                                onClick={() => setAddressForm((prev) => ({ ...prev, label: type }))}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                                  addressForm.label === type
                                    ? 'bg-brand-purple text-white border-brand-purple shadow-xs'
                                    : 'bg-[#FAF8F5] border-[#E8E4DA] text-text-muted hover:text-text-main hover:bg-white'
                                }`}
                              >
                                {type}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Name & Phone */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <div>
                            <label className="text-xs font-semibold text-text-muted block mb-1">
                              Contact Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={addressForm.name}
                              onChange={(e) => setAddressForm((prev) => ({ ...prev, name: e.target.value }))}
                              className="w-full px-3.5 py-2 rounded-xl border border-[#E2DDD5] bg-[#FAF8F5] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple"
                              placeholder="e.g. Priya Sharma"
                            />
                          </div>

                          <div>
                            <label className="text-xs font-semibold text-text-muted block mb-1">
                              Mobile Number *
                            </label>
                            <input
                              type="tel"
                              required
                              value={addressForm.phone}
                              onChange={(e) => setAddressForm((prev) => ({ ...prev, phone: e.target.value }))}
                              className="w-full px-3.5 py-2 rounded-xl border border-[#E2DDD5] bg-[#FAF8F5] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple"
                              placeholder="+91 98765 43210"
                            />
                          </div>
                        </div>

                        {/* Address Lines */}
                        <div>
                          <label className="text-xs font-semibold text-text-muted block mb-1">
                            Flat, House No., Building, Apartment *
                          </label>
                          <input
                            type="text"
                            required
                            value={addressForm.line1}
                            onChange={(e) => setAddressForm((prev) => ({ ...prev, line1: e.target.value }))}
                            className="w-full px-3.5 py-2 rounded-xl border border-[#E2DDD5] bg-[#FAF8F5] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple"
                            placeholder="e.g. 42, Rose Garden Apartments"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-text-muted block mb-1">
                            Area, Street, Sector, Landmark (Optional)
                          </label>
                          <input
                            type="text"
                            value={addressForm.line2}
                            onChange={(e) => setAddressForm((prev) => ({ ...prev, line2: e.target.value }))}
                            className="w-full px-3.5 py-2 rounded-xl border border-[#E2DDD5] bg-[#FAF8F5] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple"
                            placeholder="e.g. Near City Center Mall, Sector 18"
                          />
                        </div>

                        {/* City, State & Pincode */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                          <div>
                            <label className="text-xs font-semibold text-text-muted block mb-1">
                              City *
                            </label>
                            <input
                              type="text"
                              required
                              value={addressForm.city}
                              onChange={(e) => setAddressForm((prev) => ({ ...prev, city: e.target.value }))}
                              className="w-full px-3.5 py-2 rounded-xl border border-[#E2DDD5] bg-[#FAF8F5] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple"
                              placeholder="e.g. Noida"
                            />
                          </div>

                          <div>
                            <label className="text-xs font-semibold text-text-muted block mb-1">
                              State *
                            </label>
                            <div className="relative">
                              <select
                                required
                                value={addressForm.state}
                                onChange={(e) => setAddressForm((prev) => ({ ...prev, state: e.target.value }))}
                                className="w-full px-3.5 py-2 rounded-xl border border-[#E2DDD5] bg-[#FAF8F5] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple appearance-none cursor-pointer"
                              >
                                {INDIAN_STATES.map((s) => (
                                  <option key={s} value={s}>
                                    {s}
                                  </option>
                                ))}
                              </select>
                              <ChevronDown className="w-3.5 h-3.5 text-text-muted absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                          </div>

                          <div>
                            <label className="text-xs font-semibold text-text-muted block mb-1">
                              Pincode *
                            </label>
                            <input
                              type="text"
                              required
                              maxLength={6}
                              value={addressForm.pincode}
                              onChange={(e) => setAddressForm((prev) => ({ ...prev, pincode: e.target.value }))}
                              className="w-full px-3.5 py-2 rounded-xl border border-[#E2DDD5] bg-[#FAF8F5] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple"
                              placeholder="e.g. 201301"
                            />
                          </div>
                        </div>

                        {/* Default Checkbox */}
                        <label className="flex items-center gap-2 cursor-pointer pt-1">
                          <input
                            type="checkbox"
                            checked={addressForm.isDefault}
                            onChange={(e) => setAddressForm((prev) => ({ ...prev, isDefault: e.target.checked }))}
                            className="rounded border-[#D5CFC5] text-brand-purple focus:ring-brand-purple/20 cursor-pointer w-4 h-4"
                          />
                          <span className="text-xs text-text-muted font-medium">
                            Set as default delivery address
                          </span>
                        </label>

                        {/* Buttons */}
                        <div className="flex gap-2.5 pt-2">
                          <button
                            type="submit"
                            className="px-6 py-2.5 rounded-full bg-brand-purple hover:bg-brand-purple-dark text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
                          >
                            Save & Deliver Here
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsAddressFormOpen(false)}
                            className="px-5 py-2.5 rounded-full border border-[#D5CFC5] bg-white text-text-main text-xs font-bold hover:bg-[#FAF8F5] transition-all cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    )}
                  </div>

                  {/* ── 2. PAYMENT METHODS SECTION ── */}
                  <div className="rounded-3xl border border-[#EFECE6] bg-white/95 backdrop-blur-md p-5 sm:p-7 shadow-xs">
                    <div className="flex items-center gap-2.5 pb-4 border-b border-[#EFECE6]">
                      <div className="w-8 h-8 rounded-xl bg-brand-purple-light text-brand-purple flex items-center justify-center shrink-0">
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <div>
                        <h2 className="font-heading font-black text-base sm:text-lg text-text-main">
                          2. Payment Method
                        </h2>
                        <p className="text-[11px] text-text-muted">
                          All transactions are encrypted and 100% secure
                        </p>
                      </div>
                    </div>

                    {/* Payment Options Grid */}
                    <div className="pt-4 space-y-3">
                      {/* Option A: UPI */}
                      <div
                        onClick={() => setPaymentMethod('upi')}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                          paymentMethod === 'upi'
                            ? 'border-brand-purple bg-brand-purple-light/15 ring-2 ring-brand-purple/20 shadow-xs'
                            : 'border-[#EFECE6] bg-white hover:border-brand-purple/30'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                paymentMethod === 'upi'
                                  ? 'border-brand-purple bg-brand-purple text-white'
                                  : 'border-[#D5CFC5] bg-white'
                              }`}
                            >
                              {paymentMethod === 'upi' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>

                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-heading font-black text-xs sm:text-sm text-text-main">
                                  UPI (Google Pay, PhonePe, Paytm, etc)
                                </span>
                              </div>
                              <p className="text-[11px] text-text-muted mt-0.5">
                                Pay securely directly from your mobile UPI app
                              </p>
                            </div>
                          </div>
                        </div>

                        {paymentMethod === 'upi' && (
                          <div className="mt-4 pt-3 border-t border-[#F0ECE4] space-y-3 animate-fade-in">
                            <div>
                              <label className="text-[11px] font-semibold text-text-muted block mb-1">
                                Enter your UPI ID / VPA
                              </label>
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  value={upiId}
                                  onChange={(e) => {
                                    setUpiId(e.target.value);
                                    if (isUpiVerified) setIsUpiVerified(false);
                                    if (upiError) setUpiError('');
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      e.preventDefault();
                                      handleVerifyUpi();
                                    }
                                  }}
                                  placeholder="e.g. username@okhdfcbank"
                                  className={`flex-1 px-3.5 py-2 rounded-xl border bg-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition-all ${
                                    upiError ? 'border-red-400 ring-1 ring-red-400/20' : 'border-[#E2DDD5]'
                                  }`}
                                />
                                {isUpiVerified ? (
                                  <span className="px-3 py-1.5 rounded-xl bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 shrink-0 animate-fade-in shadow-xs">
                                    Verified
                                  </span>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={handleVerifyUpi}
                                    disabled={isVerifyingUpi || !upiId.trim()}
                                    className="px-4 py-1.5 rounded-xl bg-[#0F2438] hover:bg-brand-purple disabled:bg-[#0F2438]/30 disabled:cursor-not-allowed text-white text-xs font-bold transition-all cursor-pointer shrink-0 shadow-xs flex items-center gap-1.5 active:scale-95"
                                  >
                                    {isVerifyingUpi ? (
                                      <>
                                        <Loader2 size={12} className="animate-spin" />
                                        Verifying...
                                      </>
                                    ) : (
                                      'Verify'
                                    )}
                                  </button>
                                )}
                              </div>
                              {upiError && (
                                <p className="text-[11px] text-red-500 font-medium mt-1 animate-fade-in">
                                  {upiError}
                                </p>
                              )}
                            </div>
                            <p className="text-[10px] text-text-muted">
                              {isUpiVerified ? (
                                <span className="text-emerald-600 font-medium flex items-center gap-1">
                                  <CheckCircle2 size={12} />
                                  UPI ID verified. A payment request will be sent to your UPI app upon placing order.
                                </span>
                              ) : (
                                'A payment request will be sent to your UPI app upon placing order.'
                              )}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Option B: Credit / Debit Card */}
                      <div
                        onClick={() => setPaymentMethod('card')}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                          paymentMethod === 'card'
                            ? 'border-brand-purple bg-brand-purple-light/15 ring-2 ring-brand-purple/20 shadow-xs'
                            : 'border-[#EFECE6] bg-white hover:border-brand-purple/30'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                paymentMethod === 'card'
                                  ? 'border-brand-purple bg-brand-purple text-white'
                                  : 'border-[#D5CFC5] bg-white'
                              }`}
                            >
                              {paymentMethod === 'card' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>

                            <div>
                              <span className="font-heading font-black text-xs sm:text-sm text-text-main">
                                Credit / Debit Card
                              </span>
                              <p className="text-[11px] text-text-muted mt-0.5">
                                Visa, MasterCard, RuPay, Maestro & Diners
                              </p>
                            </div>
                          </div>

                          <span className="text-[10px] text-text-muted font-bold">Safe & 3D Secure</span>
                        </div>

                        {paymentMethod === 'card' && (
                          <div className="mt-4 pt-3 border-t border-[#F0ECE4] space-y-3 animate-fade-in">
                            <div>
                              <label className="text-[11px] font-semibold text-text-muted block mb-1">
                                Card Number
                              </label>
                              <input
                                type="text"
                                maxLength={19}
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                placeholder="4532 •••• •••• 8892"
                                className="w-full px-3.5 py-2 rounded-xl border border-[#E2DDD5] bg-white text-xs font-mono font-medium focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="text-[11px] font-semibold text-text-muted block mb-1">
                                  Valid Thru (MM/YY)
                                </label>
                                <input
                                  type="text"
                                  maxLength={5}
                                  value={cardExpiry}
                                  onChange={(e) => setCardExpiry(e.target.value)}
                                  placeholder="08/28"
                                  className="w-full px-3.5 py-2 rounded-xl border border-[#E2DDD5] bg-white text-xs font-mono font-medium focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple"
                                />
                              </div>

                              <div>
                                <label className="text-[11px] font-semibold text-text-muted block mb-1">
                                  CVV / CVC
                                </label>
                                <input
                                  type="password"
                                  maxLength={4}
                                  value={cardCvv}
                                  onChange={(e) => setCardCvv(e.target.value)}
                                  placeholder="•••"
                                  className="w-full px-3.5 py-2 rounded-xl border border-[#E2DDD5] bg-white text-xs font-mono font-medium focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="text-[11px] font-semibold text-text-muted block mb-1">
                                Name on Card
                              </label>
                              <input
                                type="text"
                                value={cardName}
                                onChange={(e) => setCardName(e.target.value)}
                                placeholder="Priya Sharma"
                                className="w-full px-3.5 py-2 rounded-xl border border-[#E2DDD5] bg-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple"
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Option C: Net Banking */}
                      <div
                        onClick={() => setPaymentMethod('netbanking')}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                          paymentMethod === 'netbanking'
                            ? 'border-brand-purple bg-brand-purple-light/15 ring-2 ring-brand-purple/20 shadow-xs'
                            : 'border-[#EFECE6] bg-white hover:border-brand-purple/30'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                paymentMethod === 'netbanking'
                                  ? 'border-brand-purple bg-brand-purple text-white'
                                  : 'border-[#D5CFC5] bg-white'
                              }`}
                            >
                              {paymentMethod === 'netbanking' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>

                            <div>
                              <span className="font-heading font-black text-xs sm:text-sm text-text-main">
                                Net Banking
                              </span>
                              <p className="text-[11px] text-text-muted mt-0.5">
                                All major Indian private & public sector banks
                              </p>
                            </div>
                          </div>
                        </div>

                        {paymentMethod === 'netbanking' && (
                          <div className="mt-4 pt-3 border-t border-[#F0ECE4] space-y-2 animate-fade-in">
                            <label className="text-[11px] font-semibold text-text-muted block">
                              Select Your Bank
                            </label>
                            <div className="relative">
                              <select
                                value={selectedBank}
                                onChange={(e) => setSelectedBank(e.target.value)}
                                className="w-full px-3.5 py-2 rounded-xl border border-[#E2DDD5] bg-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple appearance-none cursor-pointer"
                              >
                                <option value="HDFC Bank">HDFC Bank</option>
                                <option value="State Bank of India">State Bank of India (SBI)</option>
                                <option value="ICICI Bank">ICICI Bank</option>
                                <option value="Axis Bank">Axis Bank</option>
                                <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                                <option value="Punjab National Bank">Punjab National Bank</option>
                              </select>
                              <ChevronDown className="w-3.5 h-3.5 text-text-muted absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Option D: Cash on Delivery */}
                      <div
                        onClick={() => setPaymentMethod('cod')}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                          paymentMethod === 'cod'
                            ? 'border-brand-purple bg-brand-purple-light/15 ring-2 ring-brand-purple/20 shadow-xs'
                            : 'border-[#EFECE6] bg-white hover:border-brand-purple/30'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                paymentMethod === 'cod'
                                  ? 'border-brand-purple bg-brand-purple text-white'
                                  : 'border-[#D5CFC5] bg-white'
                              }`}
                            >
                              {paymentMethod === 'cod' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>

                            <div>
                              <span className="font-heading font-black text-xs sm:text-sm text-text-main">
                                Cash on Delivery (COD)
                              </span>
                              <p className="text-[11px] text-text-muted mt-0.5">
                                Pay via Cash or UPI at your doorstep upon arrival
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ── 3. ORDER ITEMS PREVIEW ── */}
                  <div className="rounded-3xl border border-[#EFECE6] bg-white/95 backdrop-blur-md p-5 sm:p-7 shadow-xs">
                    <div className="flex items-center justify-between pb-4 border-b border-[#EFECE6]">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-brand-purple-light text-brand-purple flex items-center justify-center shrink-0">
                          <Package className="w-4 h-4" />
                        </div>
                        <div>
                          <h2 className="font-heading font-black text-base sm:text-lg text-text-main">
                            3. Review Items ({totalItemCount} {totalItemCount === 1 ? 'item' : 'items'})
                          </h2>
                          <p className="text-[11px] text-text-muted">
                            Estimated delivery within 3-5 business days
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="divide-y divide-[#F2EFE9] pt-1">
                      {cartItems.map((item) => {
                        const colorObj = item.product.colors?.find(
                          (c) => c.name?.toLowerCase() === item.selectedColor?.toLowerCase()
                        );
                        const colorHex = colorObj?.hex || (item.selectedColor?.startsWith('#') ? item.selectedColor : null);

                        return (
                          <div key={item.id} className="py-3.5 flex items-center justify-between gap-3.5">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#FAF8F5] border border-[#EFECE6] shrink-0">
                                <img
                                  src={item.product.featuredImage}
                                  alt={item.product.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              <div className="min-w-0">
                                <h4 className="font-heading font-bold text-xs sm:text-sm text-text-main line-clamp-1">
                                  {item.product.name}
                                </h4>
                                <div className="flex items-center gap-2 text-[11px] text-text-muted mt-0.5">
                                  <span>
                                    Size: <strong className="text-text-main">{item.selectedSize}</strong>
                                  </span>
                                  <span>•</span>
                                  <span className="inline-flex items-center gap-1">
                                    <span>Color:</span>
                                    {colorHex && (
                                      <span
                                        className="w-2.5 h-2.5 rounded-full border border-black/20 shrink-0"
                                        style={{ backgroundColor: colorHex }}
                                      />
                                    )}
                                    <strong className="text-text-main">{item.selectedColor}</strong>
                                  </span>
                                  <span>•</span>
                                  <span>Qty: <strong className="text-text-main">{item.quantity}</strong></span>
                                </div>
                              </div>
                            </div>

                            <div className="text-right shrink-0">
                              <span className="font-heading font-black text-xs sm:text-sm text-brand-purple">
                                ₹{(item.product.price * item.quantity).toFixed(2)}
                              </span>
                              {item.product.originalPrice && (
                                <span className="block text-[10px] text-text-muted line-through">
                                  ₹{(item.product.originalPrice * item.quantity).toFixed(2)}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* ── RIGHT COLUMN: Order Summary Card (col-span-5 / 4) ── */}
                <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24 space-y-4">
                  <div className="rounded-3xl border border-[#EFECE6] bg-white/95 backdrop-blur-md p-6 sm:p-7 shadow-card space-y-5">
                    <h2 className="font-heading font-black text-xl text-text-main pb-2 border-b border-[#EFECE6]">
                      Order Summary
                    </h2>

                    {/* Cost Breakdown */}
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
                            <span>
                              Coupon ({appliedPromo || `${discountPercent}%`})
                            </span>
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

                    {/* Delivery Address Snapshot */}
                    {selectedAddress && (
                      <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#E8E4DA] text-xs space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted block">
                          Shipping To ({selectedAddress.label})
                        </span>
                        <p className="font-bold text-text-main">{selectedAddress.name}</p>
                        <p className="text-[11px] text-text-muted line-clamp-1">
                          {selectedAddress.line1}, {selectedAddress.city} - {selectedAddress.pincode}
                        </p>
                      </div>
                    )}

                    {/* Total Line */}
                    <div className="pt-3 border-t border-[#EFECE6] flex items-start justify-between">
                      <div>
                        <span className="font-heading font-black text-base text-text-main block">
                          Total Amount
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

                    {/* Place Order & Pay Button */}
                    <button
                      type="button"
                      onClick={handlePlaceOrder}
                      disabled={isPlacingOrder || cartItems.length === 0}
                      className="w-full py-4 rounded-full bg-[#0F2438] hover:bg-brand-purple text-white font-heading font-black text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isPlacingOrder ? (
                        <span>Processing Order...</span>
                      ) : (
                        <>
                          <span>Place Order & Pay</span>
                          <span className="text-xs font-normal opacity-90">
                            (₹{total.toFixed(2)})
                          </span>
                        </>
                      )}
                    </button>

                    {/* Trust Guarantees */}
                    <div className="pt-2 grid grid-cols-2 gap-2 text-[11px] text-text-muted border-t border-[#F2EFE9]">
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>256-bit Secure</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-brand-purple" />
                        <span>100% Organic</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
