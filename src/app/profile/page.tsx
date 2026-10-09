'use client';

import React, { useState } from 'react';
import mockData from '@/data/mockData.json';
import Link from 'next/link';
import {
  User, Mail, Phone, MapPin, Star, Sparkles, Heart,
  Package, ChevronRight, CheckCircle2, Clock, Truck,
  Bell, BellOff, Edit3, LogOut, Crown, Gift
} from 'lucide-react';

const STATUS_CONFIG: Record<string, { color: string; bg: string; icon: React.ReactNode }> = {
  'Delivered': {
    color: 'text-brand-mint',
    bg: 'bg-brand-mint-light',
    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
  },
  'In Transit': {
    color: 'text-brand-purple',
    bg: 'bg-brand-purple-light',
    icon: <Truck className="w-3.5 h-3.5" />,
  },
  'Processing': {
    color: 'text-brand-yellow-dark',
    bg: 'bg-brand-yellow-light',
    icon: <Clock className="w-3.5 h-3.5" />,
  },
};

type Tab = 'orders' | 'addresses' | 'wishlist' | 'preferences';

const Profile = () => {
  const profile = mockData.userProfile;
  const products = mockData.products;
  const [activeTab, setActiveTab] = useState<Tab>('orders');

  const wishlistedProducts = products.filter(p => profile.wishlistIds.includes(p.id));
  const memberSince = new Date(profile.memberSince).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'orders', label: 'Orders', icon: <Package className="w-4 h-4" /> },
    { key: 'addresses', label: 'Addresses', icon: <MapPin className="w-4 h-4" /> },
    { key: 'wishlist', label: 'Wishlist', icon: <Heart className="w-4 h-4" /> },
    { key: 'preferences', label: 'Preferences', icon: <Bell className="w-4 h-4" /> },
  ];

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">

      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-24 -left-24 w-[400px] h-[400px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #F0EEF8 0%, transparent 70%)' }} />
        <div className="absolute -bottom-32 -right-32 w-[450px] h-[450px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #FFF8E7 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 container py-10 max-w-5xl mx-auto">

        {/* ── Profile Hero Card ── */}
        <div className="bg-white rounded-3xl border border-[#EFECE6] p-6 sm:p-8 mb-6"
          style={{ boxShadow: '0 8px 30px -4px rgba(108,99,168,0.10)' }}>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">

            {/* Avatar */}
            <div className="relative shrink-0">
              <img
                src={profile.avatarUrl}
                alt={profile.firstName}
                className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-soft"
              />
              <span className="absolute -bottom-2 -right-2 bg-brand-yellow text-brand-yellow-dark text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                <Crown className="w-3 h-3" /> VIP
              </span>
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <h1 className="font-heading text-2xl font-extrabold text-text-main">
                  {profile.firstName} {profile.lastName}
                </h1>
                <span className="text-xs font-bold bg-brand-purple-light text-brand-purple px-2.5 py-1 rounded-full">
                  {profile.membershipTier}
                </span>
              </div>
              <p className="text-sm text-text-muted mb-3">Member since {memberSince}</p>

              <div className="flex flex-col sm:flex-row gap-2 text-sm text-text-muted">
                <span className="flex items-center justify-center sm:justify-start gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-brand-purple" />{profile.email}
                </span>
                <span className="hidden sm:block text-[#DDD8CE]">·</span>
                <span className="flex items-center justify-center sm:justify-start gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-brand-purple" />{profile.phone}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 shrink-0">
              <button className="flex items-center gap-1.5 text-xs font-bold text-brand-purple bg-brand-purple-light px-4 py-2 rounded-xl hover:bg-brand-purple hover:text-white transition-all">
                <Edit3 className="w-3.5 h-3.5" /> Edit Profile
              </button>
              <button className="flex items-center gap-1.5 text-xs font-bold text-text-muted bg-background px-3 py-2 rounded-xl border border-[#E2DDD5] hover:border-brand-coral hover:text-brand-coral transition-all">
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Stats strip */}
          <div className="mt-6 grid grid-cols-3 gap-3 pt-5 border-t border-[#EFECE6]">
            <div className="text-center">
              <p className="font-heading text-2xl font-extrabold text-brand-purple">{profile.vipPoints.toLocaleString()}</p>
              <p className="text-xs text-text-muted mt-0.5 flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3 text-brand-yellow fill-brand-yellow" /> VIP Points
              </p>
            </div>
            <div className="text-center border-x border-[#EFECE6]">
              <p className="font-heading text-2xl font-extrabold text-brand-purple">{profile.recentOrders.length}</p>
              <p className="text-xs text-text-muted mt-0.5 flex items-center justify-center gap-1">
                <Package className="w-3 h-3 text-brand-purple" /> Orders
              </p>
            </div>
            <div className="text-center">
              <p className="font-heading text-2xl font-extrabold text-brand-purple">{profile.wishlistIds.length}</p>
              <p className="text-xs text-text-muted mt-0.5 flex items-center justify-center gap-1">
                <Heart className="w-3 h-3 text-brand-coral fill-brand-coral" /> Wishlisted
              </p>
            </div>
          </div>
        </div>

        {/* ── VIP Points Banner ── */}
        <div className="rounded-2xl mb-6 p-5 flex items-center justify-between gap-4"
          style={{ background: 'linear-gradient(135deg, #6C63A8 0%, #554E87 100%)', boxShadow: '0 8px 24px -4px rgba(108,99,168,0.4)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
              <Gift className="w-5 h-5 text-brand-yellow" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">You have {profile.vipPoints.toLocaleString()} points!</p>
              <p className="text-white/70 text-xs">Redeem for discounts on your next order.</p>
            </div>
          </div>
          <button className="shrink-0 text-xs font-bold bg-brand-yellow text-brand-yellow-dark px-4 py-2 rounded-xl hover:bg-brand-yellow-dark hover:text-white transition-all">
            Redeem Now
          </button>
        </div>

        {/* ── Tabs ── */}
        <div className="bg-white rounded-3xl border border-[#EFECE6] overflow-hidden"
          style={{ boxShadow: '0 4px 20px -2px rgba(41,41,54,0.05)' }}>

          {/* Tab Bar */}
          <div className="flex border-b border-[#EFECE6] overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-bold whitespace-nowrap border-b-2 transition-all ${
                  activeTab === tab.key
                    ? 'border-brand-purple text-brand-purple'
                    : 'border-transparent text-text-muted hover:text-text-main'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6 sm:p-8">

            {/* ORDERS TAB */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <h2 className="font-heading text-lg font-extrabold text-text-main mb-4">Recent Orders</h2>
                {profile.recentOrders.map(order => {
                  const cfg = STATUS_CONFIG[order.status] ?? STATUS_CONFIG['Processing'];
                  const orderProducts = products.filter(p => order.items.includes(p.id));
                  return (
                    <div key={order.orderId} className="rounded-2xl border border-[#EFECE6] p-4 hover:border-brand-purple/30 hover:shadow-soft transition-all">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <p className="font-bold text-sm text-text-main">{order.orderId}</p>
                          <p className="text-xs text-text-muted mt-0.5">{new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full ${cfg.color} ${cfg.bg}`}>
                            {cfg.icon} {order.status}
                          </span>
                          <span className="font-heading font-extrabold text-sm text-text-main">${order.total.toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {orderProducts.slice(0, 3).map(p => (
                          <img key={p.id} src={p.featuredImage} alt={p.name}
                            className="w-12 h-12 rounded-xl object-cover border border-[#EFECE6]" />
                        ))}
                        {order.items.length > 3 && (
                          <span className="w-12 h-12 rounded-xl bg-background border border-[#EFECE6] flex items-center justify-center text-xs font-bold text-text-muted">
                            +{order.items.length - 3}
                          </span>
                        )}
                        <ChevronRight className="w-4 h-4 text-text-light ml-auto" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ADDRESSES TAB */}
            {activeTab === 'addresses' && (
              <div className="space-y-4">
                <h2 className="font-heading text-lg font-extrabold text-text-main mb-4">Saved Addresses</h2>
                {profile.savedAddresses.map(addr => (
                  <div key={addr.id} className={`rounded-2xl border p-5 transition-all ${addr.isDefault ? 'border-brand-purple bg-brand-purple-light/40' : 'border-[#EFECE6] hover:border-brand-purple/30'}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${addr.isDefault ? 'bg-brand-purple text-white' : 'bg-background text-text-muted border border-[#E2DDD5]'}`}>
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-sm text-text-main">{addr.label}</span>
                            {addr.isDefault && (
                              <span className="text-[10px] font-bold bg-brand-purple text-white px-2 py-0.5 rounded-full">Default</span>
                            )}
                          </div>
                          <p className="text-sm text-text-muted">{addr.line1}</p>
                          <p className="text-sm text-text-muted">{addr.line2}, {addr.city}</p>
                          <p className="text-sm text-text-muted">{addr.state} — {addr.pincode}</p>
                        </div>
                      </div>
                      <button className="text-xs font-bold text-brand-purple hover:underline shrink-0">Edit</button>
                    </div>
                  </div>
                ))}
                <button className="w-full py-3 rounded-2xl border-2 border-dashed border-[#DDD8CE] text-sm font-bold text-text-muted hover:border-brand-purple hover:text-brand-purple transition-all flex items-center justify-center gap-2">
                  + Add New Address
                </button>
              </div>
            )}

            {/* WISHLIST TAB */}
            {activeTab === 'wishlist' && (
              <div>
                <h2 className="font-heading text-lg font-extrabold text-text-main mb-4">My Wishlist</h2>
                {wishlistedProducts.length === 0 ? (
                  <div className="text-center py-12 text-text-muted">
                    <Heart className="w-10 h-10 mx-auto mb-3 text-[#DDD8CE]" />
                    <p className="font-semibold">No items wishlisted yet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {wishlistedProducts.map(p => (
                      <Link key={p.id} href={`/product/${p.id}`}
                        className="group rounded-2xl border border-[#EFECE6] overflow-hidden hover:border-brand-purple/30 hover:shadow-soft transition-all">
                        <div className="aspect-[4/3] overflow-hidden bg-[#FAF8F3]">
                          <img src={p.featuredImage} alt={p.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div className="p-3">
                          <p className="font-semibold text-sm text-text-main line-clamp-1">{p.name}</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-sm font-bold text-brand-purple">${p.price.toFixed(2)}</span>
                            <Heart className="w-4 h-4 text-brand-coral fill-brand-coral" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* PREFERENCES TAB */}
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <h2 className="font-heading text-lg font-extrabold text-text-main">My Preferences</h2>

                <div className="rounded-2xl border border-[#EFECE6] p-5 space-y-5">
                  {/* Age groups */}
                  <div>
                    <p className="text-xs font-bold text-text-main uppercase tracking-wider mb-3">Preferred Age Groups</p>
                    <div className="flex flex-wrap gap-2">
                      {['Baby', 'Toddler', 'Boys', 'Girls', 'Kids'].map(ag => (
                        <span key={ag} className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                          profile.preferences.ageGroups.includes(ag)
                            ? 'bg-brand-purple text-white border-brand-purple'
                            : 'bg-background text-text-muted border-[#DDD8CE] hover:border-brand-purple/50'
                        }`}>{ag}</span>
                      ))}
                    </div>
                  </div>

                  {/* Categories */}
                  <div>
                    <p className="text-xs font-bold text-text-main uppercase tracking-wider mb-3">Favourite Categories</p>
                    <div className="flex flex-wrap gap-2">
                      {['Organic', 'Party Wear', 'Ethnic Wear', 'Casual Wear', 'Sleepwear', 'Footwear'].map(cat => (
                        <span key={cat} className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                          profile.preferences.categories.includes(cat)
                            ? 'bg-brand-yellow text-brand-yellow-dark border-brand-yellow'
                            : 'bg-background text-text-muted border-[#DDD8CE] hover:border-brand-yellow/50'
                        }`}>{cat}</span>
                      ))}
                    </div>
                  </div>

                  {/* Notification toggles */}
                  <div>
                    <p className="text-xs font-bold text-text-main uppercase tracking-wider mb-3">Notifications</p>
                    <div className="space-y-3">
                      {[
                        { label: 'Email Newsletter', subtext: 'Deals, new arrivals & style tips', value: profile.preferences.newsletter, icon: <Mail className="w-4 h-4" /> },
                        { label: 'SMS Alerts', subtext: 'Order updates & flash sales', value: profile.preferences.smsAlerts, icon: <Bell className="w-4 h-4" /> },
                      ].map(pref => (
                        <div key={pref.label} className="flex items-center justify-between py-3 border-b border-[#F5F0EA] last:border-0">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${pref.value ? 'bg-brand-purple-light text-brand-purple' : 'bg-background text-text-light border border-[#E2DDD5]'}`}>
                              {pref.value ? pref.icon : <BellOff className="w-4 h-4" />}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-text-main">{pref.label}</p>
                              <p className="text-xs text-text-muted">{pref.subtext}</p>
                            </div>
                          </div>
                          <div className={`w-11 h-6 rounded-full relative transition-all cursor-pointer ${pref.value ? 'bg-brand-purple' : 'bg-[#DDD8CE]'}`}>
                            <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${pref.value ? 'left-5.5 translate-x-0.5' : 'left-0.5'}`} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button className="flex-1 py-3 rounded-2xl font-bold text-sm text-white transition-all"
                    style={{ background: 'linear-gradient(135deg, #6C63A8 0%, #554E87 100%)', boxShadow: '0 8px 24px -4px rgba(108,99,168,0.35)' }}>
                    Save Preferences
                  </button>
                  <button className="px-5 py-3 rounded-2xl font-bold text-sm text-text-muted border border-[#E2DDD5] hover:border-brand-purple hover:text-brand-purple transition-all">
                    Reset
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
