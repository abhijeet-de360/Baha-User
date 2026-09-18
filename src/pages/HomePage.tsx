import React, { useState, useMemo } from 'react';
import { Sparkles, ArrowRight, Heart, Leaf, Star, ShoppingBag, Smile, RefreshCw, PackageCheck, Quote, CheckCircle, Camera, X } from 'lucide-react';

// Layout & UI Components
import { TopAnnouncement } from '../components/layout/TopAnnouncement';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { HeroBannerSlider } from '../components/home/HeroBannerSlider';
import { ProductCard } from '../components/ui/ProductCard';
import { CartDrawer } from '../components/ui/CartDrawer';
import { QuickViewModal } from '../components/ui/QuickViewModal';
import { Button } from '@/components/ui/button';

// JSON Mock Data & Types
import mockData from '../data/mockData.json';
import type { 
  Product, 
  CategoryCard, 
  ParentReview, 
  OutfitLook, 
  InstagramStory 
} from '../types';
import { useShopState } from '../hooks/useShopState';

// Extract datasets from JSON
const MOCK_CATEGORIES = mockData.categories as CategoryCard[];
const MOCK_PRODUCTS = mockData.products as Product[];
const MOCK_REVIEWS = mockData.reviews as ParentReview[];
const MOCK_BUNDLE = mockData.bundle as OutfitLook;
const MOCK_INSTAGRAM_POSTS = mockData.instagramPosts as InstagramStory[];

export const HomePage: React.FC = () => {
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
      
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <TopAnnouncement 
        onPromoClick={(code) => {
          setAppliedPromo(code);
          setIsCartOpen(true);
        }} 
      />

      {/* 2. NAVBAR */}
      <Navbar
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          scrollToFeatured();
        }}
      />

      {/* MAIN HOMEPAGE CONTENT */}
      <main className="flex-1">

        {/* ---------------------------------------------------- */}
        {/* A. FULL-WIDTH SWIPER HERO BANNER SLIDER              */}
        {/* ---------------------------------------------------- */}
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

        {/* ---------------------------------------------------- */}
        {/* B. CATEGORY & DEPARTMENT SECTION                     */}
        {/* ---------------------------------------------------- */}
        <section className="py-5 sm:py-12 border-[#F3EFE8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                    <div className={`relative aspect-square w-24 sm:w-full rounded-full overflow-hidden mb-2 sm:mb-3 bg-gradient-to-br ${cat.bgGradient} transition-all duration-300 ${
                      isSelected 
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

                    <h3 className={`font-heading text-xs sm:text-sm lg:text-base font-bold transition-colors whitespace-nowrap sm:whitespace-normal ${
                      isSelected ? 'text-brand-purple font-extrabold' : 'text-text-main group-hover:text-brand-purple'
                    }`}>
                      {cat.title}
                    </h3>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- */}
        {/* C1. NEW ARRIVALS PRODUCTS SECTION                    */}
        {/* ---------------------------------------------------- */}
        <section id="featured-collection" className="py-0 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
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

        {/* ---------------------------------------------------- */}
        {/* C2. TRENDING PRODUCTS SECTION                        */}
        {/* ---------------------------------------------------- */}
        <section id="trending-products" className="py-14 bg-white border-t border-[#F3EFE8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* ---------------------------------------------------- */}
        {/* C3. FEATURED PRODUCTS SECTION                        */}
        {/* ---------------------------------------------------- */}
        <section id="featured-products" className="py-14 bg-background border-t border-[#F3EFE8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* ---------------------------------------------------- */}
        {/* C4. FULL-WIDTH SPECIAL OFFER BANNER                  */}
        {/* ---------------------------------------------------- */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        <section id="outfit-builder" className="py-16  border-[#F3EFE8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 bg-brand-yellow px-3.5 py-1 rounded-full text-xs font-bold text-text-main uppercase tracking-wider mb-2 shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
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
                    className={`w-full rounded-2xl font-bold font-body text-sm sm:text-base flex items-center justify-center gap-2 transition-all cursor-pointer shadow-card ${
                      bundleAdded ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : ''
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
        </section>

        {/* ---------------------------------------------------- */}
        {/* E. VALUE PROPOSITIONS SECTION                        */}
        {/* ---------------------------------------------------- */}
        <section className="py-16 bg-background border-t border-[#F3EFE8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 text-brand-purple font-semibold text-xs tracking-wider uppercase mb-1">
                <Sparkles className="w-3.5 h-3.5 text-brand-yellow fill-brand-yellow" />
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
                      <span>Parent Tested</span>
                      <span>✨</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- */}
        {/* F. PARENT REVIEWS & TESTIMONIALS SECTION            */}
        {/* ---------------------------------------------------- */}
        <section className="py-16 bg-white border-y border-[#EFECE6]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <div className="flex items-center gap-2 text-brand-purple font-semibold text-xs tracking-wider uppercase mb-1">
                <Sparkles className="w-3.5 h-3.5 text-brand-yellow fill-brand-yellow" />
                <span>Real Parent Stories</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-text-main">
                Loved by Little Ones, <br />
                Approved by Parents
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {MOCK_REVIEWS.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-background p-6 rounded-3xl border border-[#EFECE6] shadow-card flex flex-col justify-between relative hover:border-brand-purple/40 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400" />
                        ))}
                      </div>
                      <Quote className="w-5 h-5 text-brand-purple/20" />
                    </div>

                    <p className="text-text-main text-sm leading-relaxed mb-4 italic">
                      "{rev.comment}"
                    </p>

                    <div className="text-[11px] font-semibold text-brand-purple bg-brand-purple-light/50 px-2.5 py-1 rounded-lg inline-block mb-4">
                      Purchased: {rev.productName}
                    </div>
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
                      <p className="text-[11px] text-text-muted">{rev.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- */}
        {/* G. INSTAGRAM COMMUNITY FEED SECTION                 */}
        {/* ---------------------------------------------------- */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-10">
              <div className="inline-flex items-center gap-2 text-brand-purple font-semibold text-xs tracking-wider uppercase mb-1">
                <Camera className="w-3.5 h-3.5 text-brand-coral" />
                <span>#BahaKids on Instagram</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-text-main mb-2">
                Spotted in the Wild!
              </h2>
              <p className="text-text-muted text-sm">
                Tag <strong>@BahaFashion</strong> on Instagram for a chance to win a ₹5,000 play wardrobe every month!
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {MOCK_INSTAGRAM_POSTS.map((story) => (
                <div
                  key={story.id}
                  className="group relative aspect-square rounded-3xl overflow-hidden bg-white shadow-card border border-[#EFECE6] cursor-pointer"
                  onClick={scrollToFeatured}
                >
                  <img
                    src={story.image}
                    alt={story.kidName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-brand-purple/75 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 p-4 flex flex-col justify-between text-white">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span>{story.handle}</span>
                      <div className="flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5 fill-brand-coral text-brand-coral" />
                        <span>{story.likes}</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-brand-yellow block">
                        {story.kidName} ({story.age})
                      </span>
                      <p className="text-xs font-bold line-clamp-1">{story.outfit}</p>
                      
                      <div className="mt-2 inline-flex items-center gap-1.5 bg-white text-text-main text-[10px] font-bold px-3 py-1 rounded-full shadow-xs">
                        <ShoppingBag className="w-3 h-3" />
                        <span>Shop Look</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* 3. FOOTER */}
      <Footer
        onCategoryClick={(cat) => {
          setSelectedCategory(cat);
          scrollToFeatured();
        }}
      />

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

      {/* SHADCN UI CART DRAWER */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        appliedPromo={appliedPromo}
        onApplyPromo={handleApplyPromo}
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
