'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Heart, Leaf, Star, ShoppingBag, Smile, RefreshCw, PackageCheck, Quote, CheckCircle, Camera, X, ChevronLeft, ChevronRight, PlayCircle, Mail, Send, Gift } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Swiper CSS
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Layout & UI Components
import { HeroBannerSlider } from '@/components/home/HeroBannerSlider';
import { ProductCard } from '@/components/ui/ProductCard';
import { QuickViewModal } from '@/components/ui/QuickViewModal';
import { Button } from '@/components/ui/button';
import { ReelCard } from '@/components/home/ReelCard';

// JSON Mock Data & Types
import mockData from '@/data/mockData.json';
import type { Product, CategoryCard, ParentReview, OutfitLook, InstagramStory, ProductReel } from '@/types';
import { useShopState } from '@/hooks/useShopState';

// Extract datasets from JSON
const MOCK_CATEGORIES = mockData.categories as CategoryCard[];
const MOCK_PRODUCTS = mockData.products as Product[];
const MOCK_REVIEWS = mockData.reviews as ParentReview[];
const MOCK_BUNDLE = mockData.bundle as OutfitLook;
const MOCK_INSTAGRAM_POSTS = mockData.instagramPosts as InstagramStory[];
const MOCK_REELS = (mockData.reels || []) as ProductReel[];

export const Home: React.FC = () => {
  // Shared Shop State (Cart, Drawer, Wishlist, Toast, Promo)
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    appliedPromo,
    setAppliedPromo,
    wishlistIds,
    toast,
    setToast,
    totalCartCount,
    handleAddToCart,
    handleUpdateQuantity,
    handleRemoveItem,
    handleClearCart,
    handleToggleWishlist,
    handleApplyPromo,
  } = useShopState();

  // Local State: Quick View & Filters
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Local State: Product card states
  const [cardSelectedColors, setCardSelectedColors] = useState<Record<string, string>>({});
  const [addedItemAnimationId, setAddedItemAnimationId] = useState<string | null>(null);
  const [bundleAdded, setBundleAdded] = useState(false);

  // Local State: Newsletter
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setNewsletterSubscribed(true);
    setToast({
      id: `toast-${Date.now()}`,
      type: 'promo',
      title: 'Welcome to Baha Family! 🎉',
      message: 'Thank you for subscribing to Baha Fashion Club updates.',
    });
    setNewsletterEmail('');
  };

  const onAddToCart = (product: Product, color: string, size: string, qty: number = 1) => {
    handleAddToCart(product, color, size, qty);
    setAddedItemAnimationId(product.id);
    setTimeout(() => setAddedItemAnimationId(null), 1500);
  };

  const handleAddBundleToCart = () => {
    handleAddToCart(MOCK_PRODUCTS[0], 'Honey Dijon', '6-12M', 1);
    handleAddToCart(MOCK_PRODUCTS[6], 'Sunny Yellow', 'EU 22 (US 6)', 1);
    setBundleAdded(true);
    setTimeout(() => setBundleAdded(false), 2000);

    setToast({
      id: Date.now().toString(),
      type: 'cart',
      title: 'Bundle Added with 15% OFF! 🎁',
      message: `Complete ${MOCK_BUNDLE.title} added to your shopping bag.`,
      image: MOCK_BUNDLE.coverImage,
    });
  };

  // Filtered Products Logic
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS
      .filter((p) => {
        if (selectedCategory !== 'all' && selectedCategory !== 'sale') {
          if (p.category !== selectedCategory) return false;
        } else if (selectedCategory === 'sale') {
          if (!p.badges?.includes('sale')) return false;
        }

        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          const matchTag = p.tags.some((t) => t.toLowerCase().includes(q));
          if (!matchName && !matchCat && !matchTag) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [selectedCategory, searchQuery, sortBy]);

  // Trending Products (Best sellers & popular picks)
  const trendingProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((p) =>
      p.badges?.includes('bestseller') || ['prod-2', 'prod-3', 'prod-6', 'prod-8', 'prod-9', 'prod-10', 'prod-12', 'prod-16'].includes(p.id)
    ).slice(0, 8);
  }, []);

  // Featured Products (Curated selection & essentials)
  const featuredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((p) =>
      p.badges?.includes('organic') || p.badges?.includes('sale') || ['prod-1', 'prod-4', 'prod-5', 'prod-7', 'prod-11', 'prod-13', 'prod-14', 'prod-15'].includes(p.id)
    ).slice(0, 8);
  }, []);

  // Scroll Helpers
  const scrollToFeatured = () => {
    document.getElementById('featured-collection')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-text-main flex flex-col selection:bg-brand-yellow">
      {/* MAIN HOMEPAGE CONTENT */}
      <main className="flex-1">

        {/*============================ FULL-WIDTH SWIPER HERO BANNER SLIDER ========================        */}
        <HeroBannerSlider
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            scrollToFeatured();
          }}
          onPromoClick={(code) => {
            setAppliedPromo(code);
            setIsCartOpen(true);
          }}
        />

        {/*============================ CATEGORY & DEPARTMENT SECTION ========================        */}
        <section className="py-5 sm:py-12 border-[#F3EFE8] relative overflow-hidden">
          {/* Ambient Background Splashes */}
          <div className="absolute top-0 left-[-5%] w-72 h-72 sm:w-96 sm:h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none -z-0" />
          <div className="absolute bottom-0 right-[-5%] w-80 h-80 sm:w-[28rem] sm:h-[28rem] bg-amber-200/40 rounded-full blur-3xl pointer-events-none -z-0" />
          <div className="container relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-3 gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-purple/10 text-brand-purple text-xs font-bold uppercase tracking-wider mb-1.5">
                  <span>Explore by Department</span>
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-main tracking-tight">
                  Shop by Age & Category
                </h2>
              </div>
            </div>

            <div className="flex sm:grid sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6 overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
              {MOCK_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.title;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat.title);
                      scrollToFeatured();
                    }}
                    className="group text-center transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer flex flex-col items-center focus:outline-none shrink-0 w-24 sm:w-auto"
                  >
                    <div className={`relative aspect-square w-24 sm:w-full rounded-full overflow-hidden mb-2 sm:mb-3 bg-gradient-to-br ${cat.bgGradient} transition-all duration-300 ${isSelected
                      ? 'ring-3 ring-brand-purple ring-offset-2 shadow-md scale-105'
                      : 'border border-[#EFECE6] group-hover:shadow-soft group-hover:border-brand-purple/40'
                      }`}>
                      <img
                        src={cat.image}
                        alt={cat.title}
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>

                    <h3 className={`font-heading text-xs sm:text-sm lg:text-base font-bold transition-colors whitespace-nowrap sm:whitespace-normal ${isSelected ? 'text-brand-purple font-extrabold' : 'text-text-main group-hover:text-brand-purple'
                      }`}>
                      {cat.title}
                    </h3>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/*============================ NEW ARRIVALS PRODUCTS SECTION ========================        */}
        <section id="featured-collection" className="py-0 bg-background relative overflow-hidden">
          {/* Ambient Background Splashes */}
          <div className="absolute top-1/4 right-[-8%] w-80 h-80 sm:w-96 sm:h-96 bg-sky-200/35 rounded-full blur-3xl pointer-events-none -z-0" />
          <div className="absolute bottom-0 left-[-8%] w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none -z-0" />
          <div className="container relative z-10">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4 border-[#EAE5DC]">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-purple/10 text-brand-purple text-xs font-bold uppercase tracking-wider mb-2">
                  <span>Handpicked Wardrobe Essentials</span>
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-main tracking-tight">
                  New Arrivals
                </h2>
              </div>

              <Button
                type="button"
                variant="outline"
                size="default"
                onClick={() => {
                  setSelectedCategory('all');
                  scrollToFeatured();
                }}
                className="group rounded-full px-5 py-2 h-10 border-[#DDD8CE] bg-white hover:bg-brand-purple hover:text-white hover:border-brand-purple text-text-main font-bold text-xs sm:text-sm shadow-xs transition-all duration-300 self-start sm:self-auto cursor-pointer"
              >
                <span>View All</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {filteredProducts.slice(0, 8).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isWishlisted={wishlistIds.includes(product.id)}
                    isAdded={addedItemAnimationId === product.id}
                    onToggleWishlist={handleToggleWishlist}
                    onQuickView={setQuickViewProduct}
                    onAddToCart={onAddToCart}
                    selectedColor={cardSelectedColors[product.id]}
                    onSelectColor={(colorName) => setCardSelectedColors(prev => ({ ...prev, [product.id]: colorName }))}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-3xl border border-[#EFECE6] p-8 max-w-lg mx-auto shadow-xs">
                <div className="w-16 h-16 bg-brand-yellow-light rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  🧸
                </div>
                <h3 className="font-heading text-xl font-bold text-text-main mb-2">
                  No little styles found
                </h3>
                <p className="text-sm text-text-muted mb-6">
                  We couldn't find any items matching your active filters. Try searching for something else or reset your filters!
                </p>
                <Button
                  type="button"
                  variant="default"
                  size="default"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="rounded-xl font-bold text-sm"
                >
                  Reset Filters
                </Button>
              </div>
            )}

          </div>
        </section>

        {/*============================ TRENDING PRODUCTS SECTION ========================        */}
        <section id="trending-products" className="py-14 bg-white border-t border-[#F3EFE8] relative overflow-hidden">
          {/* Ambient Background Splashes */}
          <div className="absolute top-0 left-[15%] w-96 h-96 bg-rose-200/30 rounded-full blur-3xl pointer-events-none -z-0" />
          <div className="absolute bottom-0 right-[10%] w-96 h-96 bg-purple-200/30 rounded-full blur-3xl pointer-events-none -z-0" />
          <div className="container relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-[#EAE5DC]">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-coral/10 text-brand-coral text-xs font-bold uppercase tracking-wider mb-2">
                  <span>Most Loved by Parents</span>
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-main tracking-tight">
                  Trending Products
                </h2>
              </div>

              <Button
                type="button"
                variant="outline"
                size="default"
                onClick={() => {
                  setSelectedCategory('all');
                  scrollToFeatured();
                }}
                className="group rounded-full px-5 py-2 h-10 border-[#DDD8CE] bg-white hover:bg-brand-purple hover:text-white hover:border-brand-purple text-text-main font-bold text-xs sm:text-sm shadow-xs transition-all duration-300 self-start sm:self-auto cursor-pointer"
              >
                <span>View All</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {trendingProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={wishlistIds.includes(product.id)}
                  isAdded={addedItemAnimationId === product.id}
                  onToggleWishlist={handleToggleWishlist}
                  onQuickView={setQuickViewProduct}
                  onAddToCart={onAddToCart}
                  selectedColor={cardSelectedColors[product.id]}
                  onSelectColor={(colorName) => setCardSelectedColors(prev => ({ ...prev, [product.id]: colorName }))}
                />
              ))}
            </div>
          </div>
        </section>

        {/*============================ FEATURED PRODUCTS SECTION ========================        */}
        <section id="featured-products" className="py-14 bg-background border-t border-[#F3EFE8] relative overflow-hidden">
          {/* Ambient Background Splashes */}
          <div className="absolute top-1/3 left-[-5%] w-96 h-96 bg-amber-200/35 rounded-full blur-3xl pointer-events-none -z-0" />
          <div className="absolute bottom-0 right-[-5%] w-96 h-96 bg-sky-200/30 rounded-full blur-3xl pointer-events-none -z-0" />
          <div className="container relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-[#EAE5DC]">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-yellow/30 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
                  <span>Curated Collection</span>
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-main tracking-tight">
                  Featured Products
                </h2>
              </div>

              <Button
                type="button"
                variant="outline"
                size="default"
                onClick={() => {
                  setSelectedCategory('all');
                  scrollToFeatured();
                }}
                className="group rounded-full px-5 py-2 h-10 border-[#DDD8CE] bg-white hover:bg-brand-purple hover:text-white hover:border-brand-purple text-text-main font-bold text-xs sm:text-sm shadow-xs transition-all duration-300 self-start sm:self-auto cursor-pointer"
              >
                <span>View All</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={wishlistIds.includes(product.id)}
                  isAdded={addedItemAnimationId === product.id}
                  onToggleWishlist={handleToggleWishlist}
                  onQuickView={setQuickViewProduct}
                  onAddToCart={onAddToCart}
                  selectedColor={cardSelectedColors[product.id]}
                  onSelectColor={(colorName) => setCardSelectedColors(prev => ({ ...prev, [product.id]: colorName }))}
                />
              ))}
            </div>
          </div>
        </section>

        {/*============================ FULL-WIDTH SPECIAL OFFER BANNER ========================        */}
        <section className="container">
          <div
            onClick={scrollToFeatured}
            className="w-full relative cursor-pointer group select-none overflow-hidden"
          >
            <img
              src="/images/offer.png"
              alt="Special Offer Banner - Baha Fashion"
              className="w-full object-center transform transition-transform duration-700 ease-out rounded-2xl"
              loading="lazy"
            />
          </div>
        </section>

        {/* ---------------------------------------------------- */}
        {/* D. MIX & MATCH LOOKBOOK BUNDLE SECTION               */}
        {/* ---------------------------------------------------- */}
        {/* <section id="outfit-builder" className="py-16  border-[#F3EFE8]">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 bg-brand-yellow px-3.5 py-1 rounded-full text-xs font-bold text-text-main uppercase tracking-wider mb-2 shadow-xs">
                <span>Mix & Match Stylist Pick</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-text-main mb-3">
                Shop the Complete Adventure Look
              </h2>
              <p className="text-text-muted text-sm sm:text-base">
                Take the guesswork out of morning outfits. Grab our styled set with an instant 15% bundle discount!
              </p>
            </div>

            <div className="bg-white rounded-4xl p-6 sm:p-10 border border-[#EBE7DF] shadow-soft">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                <div className="lg:col-span-6 relative">
                  <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden bg-[#FAF8F3]">
                    <img
                      src={MOCK_BUNDLE.coverImage}
                      alt={MOCK_BUNDLE.title}
                      className="w-full h-full object-cover object-center"
                    />

                    <div className="absolute top-4 left-4 bg-brand-coral text-white font-extrabold text-xs sm:text-sm px-4 py-1.5 rounded-full shadow-md">
                      🔥 {MOCK_BUNDLE.badge}
                    </div>

                    <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xs text-xs font-semibold text-text-main flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>3 Coordinating Pieces</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 space-y-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-purple">
                      Curated Set #01
                    </span>
                    <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-text-main mt-1">
                      {MOCK_BUNDLE.title}
                    </h3>
                    <p className="text-text-muted text-sm mt-1.5 leading-relaxed">
                      {MOCK_BUNDLE.subtitle}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {MOCK_BUNDLE.items.map((item, idx) => (
                      <div
                        key={item.productName}
                        className="flex items-center justify-between p-3.5 rounded-2xl bg-background border border-[#EFECE6] text-xs sm:text-sm"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-brand-purple-light text-brand-purple font-bold flex items-center justify-center text-xs">
                            {idx + 1}
                          </span>
                          <div>
                            <p className="font-semibold text-text-main line-clamp-1">{item.productName}</p>
                            <span className="text-[11px] text-text-muted">{item.category}</span>
                          </div>
                        </div>
                        <span className="font-bold text-text-main">₹{item.itemPrice.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-brand-purple-light/60 p-4 rounded-2xl flex items-center justify-between">
                    <div>
                      <span className="text-xs text-brand-purple-dark font-medium block">Bundle Price (3 items):</span>
                      <div className="flex items-baseline gap-2">
                        <span className="font-heading text-2xl font-extrabold text-brand-purple">
                          ₹{MOCK_BUNDLE.bundlePrice.toFixed(2)}
                        </span>
                        <span className="text-xs text-text-muted line-through">
                          ₹{MOCK_BUNDLE.originalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <span className="bg-brand-mint-light text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-300 shadow-xs">
                      You Save ₹{(MOCK_BUNDLE.originalPrice - MOCK_BUNDLE.bundlePrice).toFixed(2)}
                    </span>
                  </div>

                  <Button
                    type="button"
                    variant={bundleAdded ? "default" : "yellow"}
                    size="xl"
                    onClick={handleAddBundleToCart}
                    className={`w-full rounded-2xl font-bold font-body text-sm sm:text-base flex items-center justify-center gap-2 transition-all cursor-pointer shadow-card ${bundleAdded ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : ''
                      }`}
                  >
                    {bundleAdded ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        <span>Bundle Added to Your Bag!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-5 h-5" />
                        <span>Add Complete Set & Save 15%</span>
                      </>
                    )}
                  </Button>
                </div>

              </div>
            </div>
          </div>
        </section> */}

        {/*============================ VALUE PROPOSITIONS SECTION ========================        */}
        <section className="py-16 bg-background border-t border-[#F3EFE8] relative overflow-hidden">
          {/* Ambient Background Splashes */}
          <div className="absolute top-0 left-1/4 w-[30rem] h-[30rem] bg-gradient-to-r from-emerald-200/30 via-sky-200/30 to-purple-200/30 rounded-full blur-3xl pointer-events-none -z-0" />
          <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-gradient-to-l from-amber-200/35 via-rose-200/25 to-transparent rounded-full blur-3xl pointer-events-none -z-0" />
          <div className="container relative z-10">
            <div className="text-center max-w-xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 text-brand-purple font-semibold text-xs tracking-wider uppercase mb-1">
                <span>Why Parents Choose Us</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-text-main">
                Made for Real Kids & Real Messes
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Leaf,
                  title: '100% Certified Organic',
                  subtitle: 'Pure GOTS organic French linen & combed cotton without harsh chemicals or heavy metals.',
                  bg: 'bg-brand-mint-light',
                  border: 'border-emerald-200/60',
                  iconColor: 'text-emerald-700',
                  tag: 'Gentle on Skin',
                },
                {
                  icon: Smile,
                  title: 'Zero-Itch Tagless Seams',
                  subtitle: 'Flatlock stitched with zero scratchy tags so sensory-sensitive kids can play happily all day.',
                  bg: 'bg-brand-blue-light',
                  border: 'border-sky-200/60',
                  iconColor: 'text-sky-700',
                  tag: 'Sensory Friendly',
                },
                {
                  icon: RefreshCw,
                  title: '30-Day Play Guarantee',
                  subtitle: 'Loved by kids or return it for free, even if it took a tumble at the playground sandbox.',
                  bg: 'bg-brand-purple-light',
                  border: 'border-brand-purple/20',
                  iconColor: 'text-brand-purple',
                  tag: 'Hassle-Free Returns',
                },
                {
                  icon: PackageCheck,
                  title: '100% Compostable Boxes',
                  subtitle: 'Shipped in plastic-free, plant-based mailers with surprise seed-paper tags to plant at home.',
                  bg: 'bg-brand-yellow-light',
                  border: 'border-amber-200/60',
                  iconColor: 'text-amber-700',
                  tag: 'Eco Packaging',
                },
              ].map((perk) => {
                const Icon = perk.icon;
                return (
                  <div
                    key={perk.title}
                    className={`p-6 rounded-3xl ${perk.bg} border ${perk.border} shadow-card hover:shadow-soft transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-2xl bg-white flex items-center justify-center ${perk.iconColor} shadow-xs`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-white/80 text-text-main shadow-xs">
                          {perk.tag}
                        </span>
                      </div>
                      <h3 className="font-heading text-lg font-bold text-text-main mb-2">
                        {perk.title}
                      </h3>
                      <p className="font-body text-xs sm:text-sm text-text-muted leading-relaxed">
                        {perk.subtitle}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-black/5 text-[11px] font-bold text-text-main flex items-center gap-1">
                      <span>Baha Quality Guarantee</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/*============================ PARENT REVIEWS & TESTIMONIALS SECTION ========================        */}
        <section className="py-16 bg-white border-y border-[#EFECE6] relative overflow-hidden">
          {/* Ambient Background Splashes */}
          <div className="absolute -top-12 -right-10 w-96 h-96 bg-purple-200/35 rounded-full blur-3xl pointer-events-none -z-0" />
          <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none -z-0" />
          <div className="container relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-2 text-brand-purple font-semibold text-xs tracking-wider uppercase mb-1">
                  <span>Real Parent Stories</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-text-main">
                  Loved by Little Ones, <br className="hidden sm:inline" />
                  Approved by Parents
                </h2>
              </div>

              {/* Slider Navigation Buttons */}
              <div className="flex items-center gap-2.5 self-start sm:self-auto">
                <button
                  type="button"
                  className="reviews-prev-btn w-10 h-10 rounded-full border border-[#DDD8CE] bg-white text-text-main hover:bg-brand-purple hover:text-white hover:border-brand-purple transition-all duration-300 flex items-center justify-center shadow-xs cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  className="reviews-next-btn w-10 h-10 rounded-full border border-[#DDD8CE] bg-white text-text-main hover:bg-brand-purple hover:text-white hover:border-brand-purple transition-all duration-300 flex items-center justify-center shadow-xs cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={24}
              slidesPerView={1}
              speed={1500}
              loop={true}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={false}
              navigation={{
                prevEl: '.reviews-prev-btn',
                nextEl: '.reviews-next-btn',
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1.5,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
              }}
              className="py-2!"
            >
              {MOCK_REVIEWS.map((rev) => (
                <SwiperSlide key={rev.id} className="h-auto">
                  <div className="bg-background p-6 rounded-3xl border border-[#EFECE6] shadow-card flex flex-col justify-between h-full relative hover:border-brand-purple/40 transition-colors">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1 text-amber-400">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <Quote className="w-5 h-5 text-brand-purple/20" />
                      </div>

                      <p className="text-text-main text-sm leading-relaxed mb-4 italic">
                        "{rev.comment}"
                      </p>
                    </div>

                    <div className="flex items-center gap-3 pt-3 border-t border-[#EAE5DC]">
                      <img
                        src={rev.avatar}
                        alt={rev.author}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-xs"
                      />
                      <div>
                        <div className="flex items-center gap-1">
                          <h4 className="font-bold text-text-main text-xs">{rev.author}</h4>
                          {rev.verifiedPurchase && (
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
                          )}
                        </div>
                        <p className="text-[11px] text-text-muted">Verified Customer • {rev.date}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        {/*============================ PRODUCT REELS & VIDEO SHOPPING SECTION ========================        */}
        <section className="py-16 bg-background border-t border-[#EFECE6] relative overflow-hidden">
          {/* Ambient Background Splashes */}
          <div className="absolute top-10 left-10 w-[28rem] h-[28rem] bg-purple-500/10 rounded-full blur-3xl pointer-events-none -z-0" />
          <div className="absolute bottom-10 right-10 w-[28rem] h-[28rem] bg-amber-400/15 rounded-full blur-3xl pointer-events-none -z-0" />
          <div className="container relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 text-brand-purple font-semibold text-xs tracking-wider uppercase mb-1">
                  <span>#BahaKids in Motion</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-text-main">
                  Watch, Play & Shop the Look
                </h2>
                <p className="text-text-muted text-sm mt-1 max-w-xl">
                  Real kids wearing our softest organic collections. Tap any reel to play video and buy the product instantly!
                </p>
              </div>

              {/* Right Side: View All & Reel Slider Navigation Buttons */}
              <div className="flex items-center gap-3 self-start sm:self-auto">
                <Link
                  href="/products"
                  className="group inline-flex items-center gap-1.5 px-4 py-2 sm:py-2.5 rounded-full border border-[#DDD8CE] bg-white text-text-main text-xs font-bold hover:bg-brand-purple hover:text-white hover:border-brand-purple transition-all duration-300 shadow-xs"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="reels-prev-btn w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#DDD8CE] bg-white text-text-main hover:bg-brand-purple hover:text-white hover:border-brand-purple transition-all duration-300 flex items-center justify-center shadow-xs cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    aria-label="Previous reel"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    type="button"
                    className="reels-next-btn w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#DDD8CE] bg-white text-text-main hover:bg-brand-purple hover:text-white hover:border-brand-purple transition-all duration-300 flex items-center justify-center shadow-xs cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    aria-label="Next reel"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            </div>

            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={20}
              slidesPerView={1}
              speed={1200}
              loop={true}
              navigation={{
                prevEl: '.reels-prev-btn',
                nextEl: '.reels-next-btn',
              }}
              breakpoints={{
                480: {
                  slidesPerView: 1.5,
                  spaceBetween: 16,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 24,
                },
              }}
              className="py-2!"
            >
              {MOCK_REELS.map((reel) => {
                const linkedProduct = MOCK_PRODUCTS.find((p) => p.id === reel.productId);
                return (
                  <SwiperSlide key={reel.id}>
                    <ReelCard
                      reel={reel}
                      product={linkedProduct}
                      onQuickView={(prod) => setQuickViewProduct(prod)}
                      onAddToCart={(prod, color, size) => handleAddToCart(prod, color, size)}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </section>

        {/*============================ VIP NEWSLETTER DUAL-COLUMN CARD SECTION  ========================        */}
        <section className=" bg-background py-16">
          <div className="container">
            <div className="relative overflow-hidden rounded-3xl sm:rounded-4xl bg-gradient-to-br from-[#FFFBF5] via-white to-[#F5F2FF] border border-[#EBE6DC] shadow-card p-6 sm:p-12">
              {/* Subtle Decorative Ambient Background Blobs */}
              <div className="absolute -top-16 -right-16 w-80 h-80 bg-brand-yellow/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-brand-purple/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left Column: Heading & Value Proposition */}
                <div className="lg:col-span-7 space-y-4 text-left">
                  <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-main tracking-tight leading-tight">
                    Join the <span className="text-brand-purple underline decoration-brand-yellow decoration-4 underline-offset-4">Baha Fashion</span> Club!
                  </h2>

                  <p className="text-text-muted text-sm sm:text-base leading-relaxed max-w-xl">
                    Subscribe to receive new collection updates, secret flash sale alerts & exclusive style stories delivered straight to your inbox.
                  </p>
                </div>

                {/* Right Column: Form Container Box */}
                <div className="lg:col-span-5">
                  <div className="">
                    <form onSubmit={handleNewsletterSubmit} className="space-y-4 ">
                      <div className="flex gap-2 items-end">
                        <div className="space-y-1.5 text-left flex-1">
                          <label className="text-xs font-bold text-text-main uppercase tracking-wider block ml-1">
                            Email Address
                          </label>
                          <div className="relative flex items-center">
                            <Mail className="w-4 h-4 text-text-muted absolute left-3.5 pointer-events-none" />
                            <input
                              type="email"
                              required
                              placeholder="e.g. parent@gmail.com"
                              value={newsletterEmail}
                              onChange={(e) => setNewsletterEmail(e.target.value)}
                              className="w-full bg-background border border-[#EAE5DC] focus:border-brand-purple text-text-main text-sm font-medium pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-purple/20 transition-all"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          className=" bg-brand-purple hover:bg-brand-purple/90 text-white font-extrabold text-sm py-3.5 px-6 rounded-2xl shadow-md flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-98 transition-all cursor-pointer"
                        >
                          <span>Join Now</span>
                          <Send className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-[11px] text-text-muted text-left leading-tight ml-1">
                        By joining, you agree to receive Baha Fashion updates & offers. Unsubscribe at any time.
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ========================================== */}
      {/* 4. INTERACTIVE OVERLAYS & MODALS          */}
      {/* ========================================== */}

      {/* QUICK VIEW MODAL COMPONENT */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      {/* TOAST ALERT NOTIFICATION */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-bounce-subtle">
          <div className="bg-white rounded-2xl p-4 shadow-soft border border-brand-purple/20 flex items-start gap-3">
            {toast.image ? (
              <img
                src={toast.image}
                alt={toast.title}
                className="w-12 h-12 rounded-xl object-cover shrink-0 bg-background border border-[#EFECE6]"
              />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-brand-yellow flex items-center justify-center shrink-0 text-text-main shadow-xs">
                {toast.type === 'cart' && <ShoppingBag className="w-5 h-5" />}
                {toast.type === 'wishlist' && <Heart className="w-5 h-5 text-brand-coral fill-brand-coral" />}
                {toast.type === 'promo' && <Sparkles className="w-5 h-5" />}
              </div>
            )}

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h5 className="font-heading text-sm font-bold text-text-main flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{toast.title}</span>
                </h5>
                <Button
                  type="button"
                  variant="ghost"
                  size="iconSm"
                  onClick={() => setToast(null)}
                  className="size-6 rounded-md text-text-muted hover:text-text-main"
                >
                  <X className="w-3.5 h-3.5" />
                </Button>
              </div>
              <p className="text-xs text-text-muted mt-0.5 line-clamp-2">{toast.message}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Home;
