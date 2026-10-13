'use client';

import React, { useState, useMemo, useEffect } from 'react';
import mockData from '@/data/mockData.json';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useShopState } from '@/hooks/useShopState';
import type { Product } from '@/types';
import {
  User, Mail, Phone, MapPin, Star, Sparkles, Heart,
  Package, ChevronRight, CheckCircle2, Clock, Truck,
  Bell, Edit, LogOut, Crown, Gift, Plus, Trash2, Check,
  X, ExternalLink, ShoppingBag, ShieldCheck, Copy, ArrowRight, ArrowLeft,
  SlidersHorizontal, CheckCircle, Camera, Upload, ChevronDown
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

type Tab = 'orders' | 'addresses' | 'wishlist' | 'rewards' | 'settings';

interface Address {
  id: string;
  label: string;
  name: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
  phone?: string;
  isDefault: boolean;
}

const Profile = () => {
  const router = useRouter();
  const { wishlistIds, handleAddToCart, handleToggleWishlist } = useShopState();

  const [activeTab, setActiveTab] = useState<Tab>('settings');
  const [orderFilter, setOrderFilter] = useState<'all' | 'In Transit' | 'Delivered'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Address state
  const [addresses, setAddresses] = useState<Address[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('baha_saved_addresses');
        if (stored) {
          const parsed = JSON.parse(stored) as Address[];
          if (parsed && parsed.length > 0) {
            setAddresses(parsed);
            return;
          }
        }
      } catch (err) {
        console.error(err);
      }
      setAddresses(mockData.userProfile.savedAddresses as Address[]);
    }
  }, []);

  const saveAddressesToStorage = (updated: Address[]) => {
    setAddresses(updated);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('baha_saved_addresses', JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [addressForm, setAddressForm] = useState<Omit<Address, 'id'>>({
    label: 'Home',
    name: 'Priya Sharma',
    line1: '',
    line2: '',
    city: '',
    state: '',
    pincode: '',
    phone: '+91 98765 43210',
    isDefault: false,
  });

  // Tracking modal state
  const [trackingOrder, setTrackingOrder] = useState<typeof mockData.userProfile.recentOrders[0] | null>(null);

  // Personal Info Form State
  const [userInfo, setUserInfo] = useState({
    avatarUrl: mockData.userProfile.avatarUrl,
    firstName: mockData.userProfile.firstName,
    lastName: mockData.userProfile.lastName,
    email: mockData.userProfile.email,
    phone: mockData.userProfile.phone,
  });

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast('File size must be under 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setUserInfo((prev) => ({ ...prev, avatarUrl: reader.result as string }));
          showToast('Profile photo updated! 📸');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setUserInfo((prev) => ({
      ...prev,
      avatarUrl: mockData.userProfile.avatarUrl,
    }));
    showToast('Profile photo reset');
  };

  // Phone OTP verification state
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [otpValue, setOtpValue] = useState('');

  const handleOpenOtpModal = () => {
    if (!userInfo.phone || userInfo.phone.trim().length < 8) {
      showToast('Please enter a valid phone number first! 📱');
      return;
    }
    setOtpValue('');
    setIsOtpModalOpen(true);
    showToast(`Verification code sent to ${userInfo.phone}! (Demo code: 1234) 📩`);
  };

  const handleVerifyOtp = () => {
    if (otpValue === '1234' || otpValue.length === 4) {
      setIsPhoneVerified(true);
      setIsOtpModalOpen(false);
      setOtpValue('');
      showToast('Phone verified successfully! Field locked. 🔒');
    } else {
      showToast('Invalid OTP! Please enter demo code 1234 ⚠️');
    }
  };


  const allProducts = useMemo(() => mockData.products as Product[], []);

  // Sync wishlist products
  const wishlistedProducts = useMemo(() => {
    return allProducts.filter((p) => wishlistIds.includes(p.id));
  }, [allProducts, wishlistIds]);

  // Toast auto-hide
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 3000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const handleSignOut = () => {
    try {
      localStorage.setItem('isAuthenticated', 'false');
    } catch (err) {
      console.error(err);
    }
    router.push('/sign-in');
  };

  const handleOpenAddAddress = () => {
    setEditingAddress(null);
    setAddressForm({
      label: 'Home',
      name: `${userInfo.firstName} ${userInfo.lastName}`,
      line1: '',
      line2: '',
      city: '',
      state: '',
      pincode: '',
      phone: userInfo.phone,
      isDefault: addresses.length === 0,
    });
    setIsAddressFormOpen(true);
  };

  const handleOpenEditAddress = (addr: Address) => {
    setEditingAddress(addr);
    setAddressForm({
      label: addr.label,
      name: addr.name,
      line1: addr.line1,
      line2: addr.line2,
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode,
      phone: addr.phone || userInfo.phone,
      isDefault: addr.isDefault,
    });
    setIsAddressFormOpen(true);
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAddress) {
      const updated = addresses.map((a) => {
        if (a.id === editingAddress.id) {
          return { ...a, ...addressForm };
        }
        if (addressForm.isDefault) {
          return { ...a, isDefault: false };
        }
        return a;
      });
      saveAddressesToStorage(updated);
      showToast('Address updated successfully! 📍');
    } else {
      const newAddr: Address = {
        ...addressForm,
        id: `addr-${Date.now()}`,
      };
      let updated = [...addresses];
      if (newAddr.isDefault) {
        updated = updated.map((a) => ({ ...a, isDefault: false }));
      }
      updated.push(newAddr);
      saveAddressesToStorage(updated);
      showToast('New address added! ✨');
    }
    setIsAddressFormOpen(false);
  };

  const handleDeleteAddress = (id: string) => {
    const target = addresses.find((a) => a.id === id);
    const remaining = addresses.filter((a) => a.id !== id);
    if (target?.isDefault && remaining.length > 0) {
      remaining[0] = { ...remaining[0], isDefault: true };
    }
    saveAddressesToStorage(remaining);
    showToast('Address removed.');
  };

  const handleSetDefaultAddress = (id: string) => {
    const updated = addresses.map((a) => ({ ...a, isDefault: a.id === id }));
    saveAddressesToStorage(updated);
    showToast('Default delivery address updated! 🏡');
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    showToast(`Code "${code}" copied to clipboard! 🎟️`);
  };

  const filteredOrders = useMemo(() => {
    if (orderFilter === 'all') return mockData.userProfile.recentOrders;
    return mockData.userProfile.recentOrders.filter((o) => o.status === orderFilter);
  }, [orderFilter]);

  type NavTabItem = {
    key: string;
    label: string;
    mobileLabel?: string;
    icon: React.ReactNode;
    href?: string;
  };

  const navTabs: NavTabItem[] = [
    { key: 'settings', label: 'Profile Setting', mobileLabel: 'Profile', icon: <User className="w-4 h-4" /> },
    { key: 'addresses', label: 'Addresses', mobileLabel: 'Addresses', icon: <MapPin className="w-4 h-4" /> },
    { key: 'rewards', label: 'VIP Rewards', mobileLabel: 'Rewards', icon: <Crown className="w-4 h-4" /> },
    { key: 'orders', label: 'My Orders', mobileLabel: 'Orders', icon: <Package className="w-4 h-4" />, href: '/orders' },
    { key: 'wishlist', label: 'Wishlist', mobileLabel: 'Wishlist', icon: <Heart className="w-4 h-4" />, href: '/wishlist' },
  ];

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-text-main pb-20 pt-6 sm:pt-8 font-body selection:bg-brand-yellow relative overflow-hidden">
      {/* ── Soft Background Ambient Splashes (matching home & cart pages) ── */}
      <div className="absolute top-0 left-[-8%] w-80 sm:w-[34rem] h-80 sm:h-[34rem] bg-purple-200/35 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-28 right-[-8%] w-72 sm:w-[30rem] h-72 sm:h-[30rem] bg-amber-200/35 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-[45%] left-[5%] w-64 sm:w-80 h-64 sm:h-80 bg-rose-100/30 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-16 right-[-5%] w-80 sm:w-[30rem] h-80 sm:h-[30rem] bg-brand-yellow/20 rounded-full blur-3xl pointer-events-none -z-0" />
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#292936] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-fade-in border border-white/10 text-sm font-semibold">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="container max-w-6xl mx-auto px-4 sm:px-6 relative z-10">

        {/* ── Page Header / Title ── */}
        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h1 className="font-heading text-2xl sm:text-3xl font-black text-text-main leading-tight truncate">
              My Account
            </h1>
            <p className="text-xs text-text-muted mt-0.5 truncate sm:whitespace-normal">
              Welcome back, {userInfo.firstName}! Manage your orders and profile.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            className="shrink-0 whitespace-nowrap inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl border border-rose-200 text-xs font-bold text-rose-600 bg-rose-50/70 hover:bg-rose-100 transition-all cursor-pointer shadow-2xs"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>


        {/* ── Mobile Navigation Tabs (Horizontal Scrollable Pills) ── */}
        <div className="lg:hidden mb-5">
          <div className="flex items-center gap-2 overflow-x-auto py-1 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar snap-x scroll-smooth">
            {navTabs.map((tab) => {
              const isActive = activeTab === tab.key;
              const isNavButton = Boolean(tab.href);
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => {
                    if (tab.href) {
                      router.push(tab.href);
                    } else {
                      setActiveTab(tab.key as Tab);
                    }
                  }}
                  className={`shrink-0 snap-start inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer active:scale-95 ${
                    isActive
                      ? 'bg-brand-purple text-white shadow-soft font-extrabold'
                      : 'bg-white text-text-main border border-[#EAE6DE] shadow-2xs hover:bg-[#FAF8F5]'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-text-muted'}>
                    {tab.icon}
                  </span>
                  <span>{tab.mobileLabel || tab.label}</span>
                  {isNavButton && (
                    <ChevronRight className={`w-3 h-3 ${isActive ? 'text-white/80' : 'text-text-muted/60'}`} />
                  )}
                </button>
              );
            })}
            {/* End spacer for smooth right edge padding */}
            <div className="shrink-0 w-2 h-4 pointer-events-none" />
          </div>
        </div>

        {/* ── Main Layout: Sidebar & Content Area ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left Navigation Sidebar (Desktop only) */}
          <div className="hidden lg:block lg:col-span-4 bg-white rounded-3xl border border-[#EFECE6] p-4 shadow-xs sticky top-24">
            <div className="space-y-1">
              {navTabs.map((tab, idx) => {
                const isActive = activeTab === tab.key;
                const isNavButton = Boolean(tab.href);
                return (
                  <React.Fragment key={tab.key}>
                    {idx === 3 && (
                      <div className="my-2 border-t border-[#EFECE6]" />
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        if (tab.href) {
                          router.push(tab.href);
                        } else {
                          setActiveTab(tab.key as Tab);
                        }
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-bold transition-all cursor-pointer group ${
                        isActive
                          ? 'bg-brand-purple text-white shadow-xs'
                          : 'text-text-main hover:bg-[#FAF8F5] text-left'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={isActive ? 'text-white' : 'text-text-muted group-hover:text-brand-purple transition-colors'}>
                          {tab.icon}
                        </span>
                        <span>{tab.label}</span>
                      </div>

                      {isNavButton && (
                        <ChevronRight className="w-3.5 h-3.5 text-text-muted/60 group-hover:text-text-main group-hover:translate-x-0.5 transition-all" />
                      )}
                    </button>
                  </React.Fragment>
                );
              })}
            </div>

            {/* Support / Quick Help Card inside sidebar */}
            <div className="mt-6 pt-5 border-t border-[#EFECE6] px-2 text-xs text-text-muted">
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EBE7DF]">
                <p className="font-bold text-text-main mb-1">Need help with an order?</p>
                <p className="text-text-muted text-[11px] mb-3 leading-relaxed">
                  Our customer care team is available 24/7 for order tracking and returns.
                </p>
                <a
                  href="mailto:support@bahafashion.com"
                  className="font-bold text-brand-purple hover:underline inline-flex items-center gap-1 text-[11px]"
                >
                  Contact Support <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-8 bg-white rounded-2xl sm:rounded-3xl border border-[#EFECE6] p-4 sm:p-6 lg:p-8 shadow-xs min-h-[500px]">
            
            {/* ── 1. ORDERS TAB ── */}
            {activeTab === 'orders' && (
              <div className="space-y-6 animate-fade-in">
                {/* Header & Filter Pills */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EFECE6]">
                  <div>
                    <h2 className="font-heading text-xl sm:text-2xl font-black text-text-main">
                      My Orders
                    </h2>
                    <p className="text-xs text-text-muted font-medium mt-0.5">
                      Track deliveries, view past purchases and reorder your favorites.
                    </p>
                  </div>

                  {/* Filter chips */}
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
                        {filter === 'all' ? 'All' : filter}
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
                  <div className="space-y-4">
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
                                  className="text-text-muted hover:text-text-main p-1 rounded-md"
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
                                className="px-3.5 py-1.5 rounded-xl bg-brand-purple-light text-brand-purple hover:bg-brand-purple hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
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
            )}

            {/* ── 2. ADDRESSES TAB ── */}
            {activeTab === 'addresses' && (
              <div className="space-y-6 animate-fade-in">
                {!isAddressFormOpen ? (
                  <>
                    <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#EFECE6]">
                      <div className="min-w-0 flex-1">
                        <h2 className="font-heading text-xl sm:text-2xl font-black text-text-main leading-tight truncate">
                          Saved Addresses
                        </h2>
                        <p className="text-xs text-text-muted font-medium mt-0.5 truncate sm:whitespace-normal">
                          Manage your shipping destinations for faster checkout.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleOpenAddAddress}
                        className="shrink-0 whitespace-nowrap inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-brand-purple text-white text-xs font-bold hover:bg-brand-purple-dark transition-all shadow-xs cursor-pointer active:scale-95"
                      >
                        <Plus className="w-3.5 h-3.5 shrink-0" />
                        <span>Add <span className="hidden sm:inline">New </span>Address</span>
                      </button>
                    </div>

                    {addresses.length === 0 ? (
                      <div className="text-center py-12 px-4 rounded-2xl border-2 border-dashed border-[#E2DDD5] bg-[#FAF8F5]/60 animate-fade-in">
                        <div className="w-12 h-12 rounded-2xl bg-brand-purple/10 text-brand-purple flex items-center justify-center mx-auto mb-3">
                          <MapPin className="w-6 h-6" />
                        </div>
                        <h3 className="font-heading font-black text-base text-text-main">No addresses saved</h3>
                        <p className="text-xs text-text-muted mt-1 mb-4 max-w-sm mx-auto">
                          You haven&apos;t added any delivery addresses yet. Add one for faster checkout.
                        </p>
                        <button
                          type="button"
                          onClick={handleOpenAddAddress}
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-purple text-white text-xs font-bold hover:bg-brand-purple-dark transition-all cursor-pointer shadow-xs"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add New Address</span>
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {addresses.map((addr) => (
                          <div
                            key={addr.id}
                            className={`rounded-2xl border p-5 flex flex-col justify-between transition-all relative ${
                              addr.isDefault
                                ? 'border-brand-purple bg-brand-purple-light/20 shadow-xs'
                                : 'border-[#EFECE6] hover:border-brand-purple/30'
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between gap-2 mb-3">
                                <div className="flex items-center gap-2">
                                  <span className="font-heading font-black text-sm text-text-main">
                                    {addr.label}
                                  </span>
                                  {addr.isDefault ? (
                                    <span className="text-[10px] font-extrabold bg-brand-purple text-white px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                                      <Check className="w-2.5 h-2.5" />
                                      Default
                                    </span>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() => handleSetDefaultAddress(addr.id)}
                                      className="text-[10px] font-bold text-text-muted hover:text-brand-purple bg-[#FAF8F5] hover:bg-brand-purple-light/40 border border-[#E2DDD5] px-2 py-0.5 rounded-full inline-flex items-center gap-1 transition-all cursor-pointer"
                                      title="Set as default delivery address"
                                    >
                                      <CheckCircle2 className="w-2.5 h-2.5" />
                                      Set Default
                                    </button>
                                  )}
                                </div>
                                
                                <div className="flex items-center gap-1">
                                  <button
                                    type="button"
                                    onClick={() => handleOpenEditAddress(addr)}
                                    className="text-xs font-bold text-text-muted hover:text-brand-purple p-1.5 rounded-lg hover:bg-brand-purple-light/40 transition-colors cursor-pointer"
                                    title="Edit"
                                  >
                                    <Edit className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteAddress(addr.id)}
                                    className="text-xs font-bold text-text-muted hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                                    title="Delete"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>

                              <p className="font-bold text-xs text-text-main mb-1">{addr.name}</p>
                              <p className="text-xs text-text-muted leading-relaxed">{addr.line1}</p>
                              {addr.line2 && <p className="text-xs text-text-muted leading-relaxed">{addr.line2}</p>}
                              <p className="text-xs text-text-muted leading-relaxed">
                                {addr.city}, {addr.state} - {addr.pincode}
                              </p>
                              {addr.phone && (
                                <p className="text-xs text-text-muted mt-2 font-medium">
                                  Phone: {addr.phone}
                                </p>
                              )}
                            </div>

                            <div className="mt-4 pt-3 border-t border-[#EFECE6] flex items-center justify-between">
                              {addr.isDefault ? (
                                <span className="text-xs font-bold text-brand-purple flex items-center gap-1.5">
                                  <CheckCircle2 className="w-4 h-4 text-brand-purple" />
                                  Selected as Default Delivery
                                </span>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => handleSetDefaultAddress(addr.id)}
                                  className="inline-flex items-center gap-1.5 text-xs font-bold text-text-muted hover:text-brand-purple transition-colors cursor-pointer group"
                                >
                                  <CheckCircle2 className="w-4 h-4 text-[#C4BEB5] group-hover:text-brand-purple transition-colors" />
                                  <span>Set as Default</span>
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="space-y-6 animate-fade-in">
                    <div className="flex items-center justify-between pb-4 border-b border-[#EFECE6]">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setIsAddressFormOpen(false)}
                          className="p-1.5 rounded-xl border border-[#E2DDD5] text-text-muted hover:text-text-main hover:bg-[#FAF8F5] transition-all cursor-pointer"
                          title="Back to saved addresses"
                        >
                          <ArrowLeft className="w-4 h-4" />
                        </button>
                        <div>
                          <h2 className="font-heading text-xl sm:text-2xl font-black text-text-main">
                            {editingAddress ? 'Edit Address' : 'Add New Address'}
                          </h2>
                          <p className="text-xs text-text-muted font-medium mt-0.5">
                            {editingAddress ? 'Update this delivery location details.' : 'Add a new delivery location for your orders.'}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsAddressFormOpen(false)}
                        className="text-xs font-bold text-text-muted hover:text-text-main px-3.5 py-1.5 rounded-xl border border-[#E2DDD5] hover:bg-[#FAF8F5] transition-all cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>

                    <form onSubmit={handleSaveAddress} className="space-y-4 max-w-2xl">
                      <div>
                        <label className="block text-xs font-bold text-text-main mb-1.5">Address Label</label>
                        <div className="flex gap-2">
                          {['Home', 'Office', 'Other'].map((lbl) => (
                            <button
                              key={lbl}
                              type="button"
                              onClick={() => setAddressForm((f) => ({ ...f, label: lbl }))}
                              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                                addressForm.label === lbl
                                  ? 'bg-brand-purple text-white border-brand-purple shadow-2xs'
                                  : 'bg-[#FAF8F5] text-text-muted border-[#E2DDD5] hover:border-brand-purple/30'
                              }`}
                            >
                              {lbl}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-text-main mb-1.5">Full Name</label>
                          <input
                            type="text"
                            required
                            value={addressForm.name}
                            onChange={(e) => setAddressForm((f) => ({ ...f, name: e.target.value }))}
                            className="w-full px-4 py-2.5 rounded-xl border border-[#E2DDD5] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-text-main mb-1.5">Phone Number</label>
                          <input
                            type="tel"
                            required
                            placeholder="+91 98765 43210"
                            value={addressForm.phone || ''}
                            onChange={(e) => setAddressForm((f) => ({ ...f, phone: e.target.value }))}
                            className="w-full px-4 py-2.5 rounded-xl border border-[#E2DDD5] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-text-main mb-1.5">Address Line 1</label>
                        <input
                          type="text"
                          required
                          placeholder="House / Flat / Building / Street"
                          value={addressForm.line1}
                          onChange={(e) => setAddressForm((f) => ({ ...f, line1: e.target.value }))}
                          className="w-full px-4 py-2.5 rounded-xl border border-[#E2DDD5] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-text-main mb-1.5">Address Line 2 (Optional)</label>
                        <input
                          type="text"
                          placeholder="Apartment, suite, landmark, etc."
                          value={addressForm.line2}
                          onChange={(e) => setAddressForm((f) => ({ ...f, line2: e.target.value }))}
                          className="w-full px-4 py-2.5 rounded-xl border border-[#E2DDD5] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple bg-white"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-text-main mb-1.5">City</label>
                          <input
                            type="text"
                            required
                            value={addressForm.city}
                            onChange={(e) => setAddressForm((f) => ({ ...f, city: e.target.value }))}
                            className="w-full px-4 py-2.5 rounded-xl border border-[#E2DDD5] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-text-main mb-1.5">Pincode</label>
                          <input
                            type="text"
                            required
                            value={addressForm.pincode}
                            onChange={(e) => setAddressForm((f) => ({ ...f, pincode: e.target.value }))}
                            className="w-full px-4 py-2.5 rounded-xl border border-[#E2DDD5] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-text-main mb-1.5">State</label>
                        <div className="relative">
                          <select
                            required
                            value={addressForm.state}
                            onChange={(e) => setAddressForm((f) => ({ ...f, state: e.target.value }))}
                            className="w-full px-4 py-2.5 rounded-xl border border-[#E2DDD5] text-sm font-medium bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple appearance-none cursor-pointer pr-10"
                          >
                            <option value="" disabled>Select State</option>
                            {INDIAN_STATES.map((st) => (
                              <option key={st} value={st}>
                                {st}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="w-4 h-4 text-text-muted absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <label className="flex items-center gap-2.5 cursor-pointer pt-1">
                        <input
                          type="checkbox"
                          checked={addressForm.isDefault}
                          onChange={(e) => setAddressForm((f) => ({ ...f, isDefault: e.target.checked }))}
                          className="w-4 h-4 accent-brand-purple cursor-pointer rounded"
                        />
                        <span className="text-xs font-semibold text-text-main">Set as default delivery address</span>
                      </label>

                      <div className="pt-3 flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setIsAddressFormOpen(false)}
                          className="px-5 py-2.5 rounded-xl border border-[#E2DDD5] text-xs font-bold text-text-muted hover:bg-[#FAF8F5] transition-all cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2.5 rounded-xl bg-brand-purple hover:bg-brand-purple-dark text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                        >
                          {editingAddress ? 'Update Address' : 'Save Address'}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}

            {/* ── 3. WISHLIST TAB ── */}
            {activeTab === 'wishlist' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between pb-4 border-b border-[#EFECE6]">
                  <div>
                    <h2 className="font-heading text-xl sm:text-2xl font-black text-text-main">
                      Saved Wishlist ({wishlistIds.length})
                    </h2>
                    <p className="text-xs text-text-muted font-medium mt-0.5">
                      Your curated kids outfits and accessories saved for later.
                    </p>
                  </div>

                  <Link
                    href="/wishlist"
                    className="text-xs font-bold text-brand-purple hover:underline flex items-center gap-1"
                  >
                    <span>View Wishlist Page</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {wishlistedProducts.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-14 h-14 rounded-2xl bg-rose-50 flex items-center justify-center mx-auto mb-3 text-rose-400">
                      <Heart className="w-7 h-7" />
                    </div>
                    <h3 className="font-bold text-text-main text-base">Your wishlist is empty</h3>
                    <p className="text-xs text-text-muted mt-1 max-w-xs mx-auto mb-5">
                      Explore our collections and tap the heart icon on items you love.
                    </p>
                    <Link
                      href="/products"
                      className="px-5 py-2.5 rounded-xl bg-brand-purple text-white text-xs font-bold inline-flex items-center gap-2"
                    >
                      Browse Outfits
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {wishlistedProducts.map((prod) => (
                      <div
                        key={prod.id}
                        className="group rounded-2xl border border-[#EFECE6] p-3 hover:border-brand-purple/30 hover:shadow-soft transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="relative aspect-square rounded-xl overflow-hidden bg-[#FAF8F3] mb-3">
                            <img
                              src={prod.featuredImage}
                              alt={prod.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <button
                              type="button"
                              onClick={() => handleToggleWishlist(prod)}
                              className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 text-brand-coral shadow-xs hover:scale-110 transition-transform cursor-pointer"
                              title="Remove from wishlist"
                            >
                              <Heart className="w-3.5 h-3.5 fill-current" />
                            </button>
                          </div>

                          <Link
                            href={`/product/${prod.id}`}
                            className="font-bold text-xs sm:text-sm text-text-main hover:text-brand-purple transition-colors line-clamp-1"
                          >
                            {prod.name}
                          </Link>
                          <p className="font-heading font-black text-xs sm:text-sm text-brand-purple mt-1">
                            ${prod.price.toFixed(2)}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            handleAddToCart(prod, prod.colors?.[0]?.name || 'Standard', prod.sizes?.[0] || '3-4Y', 1);
                            router.push('/cart');
                          }}
                          className="mt-3 w-full py-2 rounded-xl bg-brand-purple-light hover:bg-brand-purple hover:text-white text-brand-purple text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Move to Bag</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── 4. REWARDS TAB ── */}
            {activeTab === 'rewards' && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="font-heading text-xl sm:text-2xl font-black text-text-main">
                    VIP Club & Points
                  </h2>
                  <p className="text-xs text-text-muted font-medium mt-0.5">
                    Earn points on every order and unlock exclusive vouchers and benefits.
                  </p>
                </div>

                {/* VIP Points Balance Hero Card */}
                <div
                  className="rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #6C63A8 0%, #4D457E 100%)',
                    boxShadow: '0 12px 36px -8px rgba(108,99,168,0.4)',
                  }}
                >
                  <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-brand-yellow text-xs font-bold backdrop-blur-md mb-2">
                        <Crown className="w-3.5 h-3.5" /> VIP Gold Tier
                      </span>
                      <h3 className="font-heading text-3xl sm:text-4xl font-black text-white mt-1">
                        {mockData.userProfile.vipPoints.toLocaleString()} <span className="text-sm font-bold text-white/80">Points</span>
                      </h3>
                      <p className="text-white/80 text-xs mt-1">
                        Equivalent to $24.50 in checkout savings
                      </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 max-w-xs">
                      <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                        <span>Tier Progress</span>
                        <span>2,450 / 3,000 pts</span>
                      </div>
                      <div className="w-full bg-black/20 rounded-full h-2 overflow-hidden mb-1.5">
                        <div className="bg-brand-yellow h-full rounded-full" style={{ width: '81%' }} />
                      </div>
                      <p className="text-[11px] text-white/75">
                        Earn 550 more points to reach VIP Platinum status!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Redeemable Vouchers */}
                <div>
                  <h3 className="font-heading font-black text-base text-text-main mb-3">
                    Available Rewards to Redeem
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {[
                      {
                        title: '$10 OFF Next Order',
                        points: '1,000 pts',
                        code: 'VIP10BAHA',
                        desc: 'Valid on orders over $50',
                      },
                      {
                        title: 'Free Express Shipping',
                        points: '500 pts',
                        code: 'FREESHIPVIP',
                        desc: 'Free next-day priority delivery',
                      },
                      {
                        title: '$25 OFF Birthday Treat',
                        points: '2,500 pts',
                        code: 'VIP25BAHA',
                        desc: 'Exclusive member savings voucher',
                      },
                      {
                        title: '15% Extra Off Sale Styles',
                        points: '800 pts',
                        code: 'EXTRASALE15',
                        desc: 'Stackable on existing promotions',
                      },
                    ].map((voucher) => (
                      <div
                        key={voucher.code}
                        className="p-4 rounded-2xl border border-[#EFECE6] bg-[#FAF8F5] flex items-center justify-between gap-3 hover:border-brand-purple/40 transition-all"
                      >
                        <div>
                          <p className="font-bold text-sm text-text-main">{voucher.title}</p>
                          <p className="text-[11px] text-text-muted mt-0.5">{voucher.desc}</p>
                          <span className="text-[11px] font-extrabold text-brand-purple inline-block mt-1">
                            {voucher.points}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleCopyCode(voucher.code)}
                          className="px-3 py-1.5 rounded-xl bg-white border border-[#DDD8CE] text-xs font-bold text-text-main hover:bg-brand-purple hover:text-white hover:border-brand-purple transition-all shrink-0 cursor-pointer"
                        >
                          Redeem
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── 5. SETTINGS TAB ── */}
            {activeTab === 'settings' && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="font-heading text-xl sm:text-2xl font-black text-text-main">
                    Account Settings
                  </h2>
                  <p className="text-xs text-text-muted font-medium mt-0.5">
                    Update your personal profile information.
                  </p>
                </div>

                {/* Personal Information Form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    showToast('Profile information saved! ✅');
                  }}
                  className="space-y-4"
                >
                  <h3 className="font-heading font-extrabold text-sm text-text-main uppercase tracking-wider text-text-muted">
                    Personal Information
                  </h3>

                  {/* Circular Avatar Upload Field */}
                  <div className="py-2">
                    <div className="relative inline-block">
                      <input
                        id="profile-avatar-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        className="hidden"
                      />
                      <label
                        htmlFor="profile-avatar-upload"
                        className="relative block w-24 h-24 sm:w-28 sm:h-28 rounded-full cursor-pointer group"
                      >
                        <img
                          src={userInfo.avatarUrl}
                          alt="Profile photo"
                          className="w-full h-full rounded-full object-cover shadow-xs border-2 border-white ring-1 ring-[#E2DDD5] group-hover:opacity-95 transition-all"
                        />
                        <div
                          className="absolute bottom-0 right-0 w-8 h-8 sm:w-9 sm:h-9 bg-[#0F2438] hover:bg-brand-purple text-white rounded-full flex items-center justify-center border-2 border-white shadow-md transition-colors"
                          title="Change profile picture"
                        >
                          <Edit className="w-4 h-4" />
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-text-main mb-1.5">First Name</label>
                      <input
                        type="text"
                        value={userInfo.firstName}
                        onChange={(e) => setUserInfo((prev) => ({ ...prev, firstName: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E2DDD5] text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-text-main mb-1.5">Last Name</label>
                      <input
                        type="text"
                        value={userInfo.lastName}
                        onChange={(e) => setUserInfo((prev) => ({ ...prev, lastName: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E2DDD5] text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-text-main mb-1.5">Email Address</label>
                      <input
                        type="email"
                        value={userInfo.email}
                        onChange={(e) => setUserInfo((prev) => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E2DDD5] text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-text-main mb-1.5">Phone Number</label>

                      <div className="flex items-center gap-2">
                        <input
                          type="tel"
                          disabled={isPhoneVerified}
                          readOnly={isPhoneVerified}
                          value={userInfo.phone}
                          onChange={(e) => setUserInfo((prev) => ({ ...prev, phone: e.target.value }))}
                          placeholder="+91 98765 43210"
                          className={`w-full px-4 py-2.5 rounded-xl text-sm transition-all ${
                            isPhoneVerified
                              ? 'bg-[#FAF8F5] border border-[#E2DDD5] text-text-muted cursor-not-allowed select-none font-semibold'
                              : 'bg-white border border-[#E2DDD5] text-text-main focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple'
                          }`}
                        />

                        {!isPhoneVerified && (
                          <button
                            type="button"
                            onClick={handleOpenOtpModal}
                            className="px-4 py-2.5 rounded-xl bg-brand-purple hover:bg-brand-purple-dark text-white text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0 flex items-center gap-1.5"
                          >
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Verify</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>


                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-brand-purple hover:bg-brand-purple-dark text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                    >
                      Save Profile Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>

        </div>

        {/* ── Mobile-Only Quick Help Banner ── */}
        <div className="lg:hidden mt-6 p-4 rounded-2xl bg-white border border-[#EFECE6] shadow-2xs">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-bold text-text-main text-xs">Need help with an order?</p>
              <p className="text-text-muted text-[11px] mt-0.5 leading-relaxed">
                Our customer care team is available 24/7 for order tracking and returns.
              </p>
            </div>
            <a
              href="mailto:support@bahafashion.com"
              className="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-brand-purple-light text-brand-purple text-xs font-bold hover:bg-brand-purple hover:text-white transition-colors"
            >
              Support <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>

      {/* ── PHONE OTP VERIFICATION MODAL ── */}
      {isOtpModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-[#EFECE6] animate-scale-up">
            <div className="flex items-center justify-between pb-3.5 border-b border-[#EFECE6]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-brand-purple-light flex items-center justify-center text-brand-purple">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-heading font-black text-base text-text-main">Verify Phone Number</h3>
                  <p className="text-[11px] text-text-muted">SMS Verification Code</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsOtpModalOpen(false);
                  setOtpValue('');
                }}
                className="p-1 rounded-lg text-text-muted hover:text-text-main hover:bg-[#FAF8F5] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-5 space-y-4">
              <p className="text-xs text-text-muted leading-relaxed">
                Please enter the 4-digit verification code sent to <strong className="text-text-main font-bold">{userInfo.phone || 'your phone number'}</strong>:
              </p>

              <div>
                <div className="flex items-center justify-center my-2">
                  <input
                    type="text"
                    maxLength={4}
                    placeholder="• • • •"
                    value={otpValue}
                    onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ''))}
                    className="w-44 px-4 py-3 text-center text-2xl font-mono font-black tracking-[0.35em] bg-[#FAF8F5] border border-[#E2DDD5] rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-purple/30 focus:border-brand-purple focus:bg-white transition-all shadow-inner"
                    autoFocus
                  />
                </div>
                <div className="text-center mt-2">
                  <span className="text-[11px] font-semibold text-brand-purple bg-brand-purple-light px-2.5 py-1 rounded-lg inline-block">
                    Demo OTP: 1234
                  </span>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="w-full py-3 rounded-xl bg-brand-purple hover:bg-brand-purple-dark text-white text-xs font-bold transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verify OTP</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsOtpModalOpen(false);
                    setOtpValue('');
                  }}
                  className="w-full py-2 text-xs font-bold text-text-muted hover:text-text-main transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Order Tracking Modal ── */}
      {trackingOrder && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#EFECE6] animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-[#EFECE6] mb-5">
              <div>
                <h3 className="font-heading font-black text-lg text-text-main">
                  Track Package
                </h3>
                <p className="text-xs text-text-muted">Order {trackingOrder.orderId}</p>
              </div>
              <button
                type="button"
                onClick={() => setTrackingOrder(null)}
                className="text-text-muted hover:text-text-main p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Carrier details badge */}
              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#EFECE6] flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-text-main">BlueDart Priority Express</p>
                  <p className="text-text-muted">AWB: BD-984284019IN</p>
                </div>
                <span className="font-extrabold text-brand-purple">
                  {trackingOrder.status === 'In Transit' ? 'Est. Tomorrow' : 'Delivered'}
                </span>
              </div>

              {/* Timeline Steps */}
              <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#EFECE6]">
                {[
                  { title: 'Order Confirmed', time: '10 Sep, 10:30 AM', done: true },
                  { title: 'Packed at Mumbai Facility', time: '10 Sep, 04:15 PM', done: true },
                  {
                    title: 'In Transit - Out for Delivery',
                    time: '11 Sep, 08:30 AM',
                    done: true,
                    current: trackingOrder.status === 'In Transit',
                  },
                  {
                    title: 'Delivered',
                    time: trackingOrder.status === 'Delivered' ? '12 Sep, 02:45 PM' : 'Pending',
                    done: trackingOrder.status === 'Delivered',
                  },
                ].map((step, idx) => (
                  <div key={idx} className="relative">
                    <span
                      className={`absolute -left-6 top-0.5 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center ${
                        step.done
                          ? step.current
                            ? 'bg-brand-purple ring-4 ring-brand-purple/20 animate-pulse'
                            : 'bg-emerald-500'
                          : 'bg-[#DDD8CE]'
                      }`}
                    />
                    <p className={`text-xs font-bold ${step.done ? 'text-text-main' : 'text-text-light'}`}>
                      {step.title}
                    </p>
                    <p className="text-[11px] text-text-muted">{step.time}</p>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setTrackingOrder(null)}
                className="w-full py-2.5 rounded-xl bg-[#FAF8F5] border border-[#DDD8CE] text-xs font-bold text-text-main hover:bg-[#F2EFE9]"
              >
                Close Tracking
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Profile;
