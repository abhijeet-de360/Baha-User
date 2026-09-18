import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Heart, 
  Star, 
  ShoppingBag, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Ruler, 
  Check, 
  Minus, 
  Plus, 
  Share2, 
  MapPin, 
  Leaf,
  Info,
  Layers,
  X
} from 'lucide-react';

// Layout & UI Components
import { TopAnnouncement } from '../components/layout/TopAnnouncement';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { ProductCard } from '../components/ui/ProductCard';
import { CartDrawer } from '../components/ui/CartDrawer';
import { ToastNotification } from '../components/ui/ToastNotification';
import { Button } from '@/components/ui/button';

// Mock Data & Helpers
import mockData from '../data/mockData.json';
import type { Product } from '../types';
import { getEnhancedProduct, BABY_SIZE_CHART, KIDS_SIZE_CHART } from '../lib/productHelpers';
import { useShopState } from '../hooks/useShopState';

const MOCK_PRODUCTS = mockData.products as Product[];

export const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find product by id or fallback to first product
  const rawProduct = useMemo(() => {
    return MOCK_PRODUCTS.find((p) => p.id === id) || MOCK_PRODUCTS[0];
  }, [id]);

  const product = useMemo(() => {
    return getEnhancedProduct(rawProduct);
  }, [rawProduct]);

  // Shared Global Shop State (Cart, Wishlist, Toast, Promo)
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    wishlistIds,
    toast,
    setToast,
    totalCartCount,
    appliedPromo,
    handleAddToCart,
    handleUpdateQuantity,
    handleRemoveItem,
    handleClearCart,
    handleToggleWishlist,
    handleApplyPromo,
  } = useShopState();

  // Local Page State
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'Standard');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImage, setActiveImage] = useState<string>(product.colors[0]?.image || product.featuredImage);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'care' | 'fabric'>('details');
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [sizeUnit, setSizeUnit] = useState<'cm' | 'in'>('cm');

  // Pincode Delivery Checker State
  const [pincode, setPincode] = useState<string>('110001');
  const [pincodeChecked, setPincodeChecked] = useState<boolean>(true);
  const [pincodeMessage, setPincodeMessage] = useState<string>('Standard Delivery by ' + getEstimatedDeliveryDate());

  // Reset selections when product ID changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedColor(product.colors[0]?.name || '');
    setSelectedSize(product.sizes[0] || 'Standard');
    setQuantity(1);
    setActiveImage(product.colors[0]?.image || product.featuredImage);
  }, [product]);

  // Handle color change (also switch image)
  const handleColorChange = (colorName: string) => {
    setSelectedColor(colorName);
    const found = product.colors.find((c) => c.name === colorName);
    if (found?.image) {
      setActiveImage(found.image);
    }
  };

  // Delivery date helper
  function getEstimatedDeliveryDate() {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
  }

  // Pincode validation check
  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.trim().length === 6 && /^\d+$/.test(pincode)) {
      setPincodeChecked(true);
      setPincodeMessage(`Delivery available to ${pincode} by ${getEstimatedDeliveryDate()} (Express Shipping available)`);
    } else {
      setPincodeChecked(false);
      setPincodeMessage('Please enter a valid 6-digit Indian PIN code');
    }
  };

  // Related products
  const relatedProducts = useMemo(() => {
    return MOCK_PRODUCTS
      .filter((p) => p.id !== product.id && (p.category === product.category || p.gender === product.gender))
      .slice(0, 4);
  }, [product]);

  const isWishlisted = wishlistIds.includes(product.id);
  const isBabyProduct = product.ageGroup === 'baby' || product.sizes.some(s => s.includes('M'));
  const sizeChartData = isBabyProduct ? BABY_SIZE_CHART : KIDS_SIZE_CHART;

  // Share action
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} on Baha Fashion!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setToast({
        id: Date.now().toString(),
        type: 'promo',
        title: 'Link Copied! 📋',
        message: 'Product link copied to clipboard.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-background text-text-main flex flex-col selection:bg-brand-yellow">
      
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <TopAnnouncement 
        onPromoClick={(code) => {
          handleApplyPromo(code);
          setIsCartOpen(true);
        }} 
      />

      {/* 2. NAVBAR */}
      <Navbar
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery=""
        onSearchChange={(q) => {
          navigate(`/?search=${encodeURIComponent(q)}`);
        }}
        selectedCategory="all"
        onSelectCategory={() => {
          navigate('/');
        }}
      />

      {/* 4. MAIN PRODUCT DETAILS CONTAINER */}
      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
            <div className="lg:col-span-6 flex flex-col-reverse md:flex-row gap-4 sticky top-24">
              
              {/* Thumbnails Strip */}
              <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[560px] pb-2 md:pb-0 shrink-0">
                {product.galleryImages?.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer bg-[#FAF8F3] shrink-0 ${
                      activeImage === img
                        ? 'border-brand-purple shadow-sm scale-[1.02]'
                        : 'border-[#EBE7DF] hover:border-brand-purple/40 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} preview ${idx + 1}`}
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>

              {/* Main Hero Image */}
              <div className="relative flex-1 aspect-[3/4] rounded-3xl overflow-hidden bg-[#FAF8F3] border border-[#EFECE6] shadow-card group">
                <img
                  src={activeImage}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Floating Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                  {product.badges?.includes('sale') && product.discountPercent && (
                    <span className="bg-brand-coral text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      {product.discountPercent}% OFF
                    </span>
                  )}
                  {product.badges?.includes('organic') && (
                    <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                      <Leaf className="w-3 h-3" />
                      Organic
                    </span>
                  )}
                  {product.badges?.includes('bestseller') && (
                    <span className="bg-brand-yellow text-text-main text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      ⭐ Bestseller
                    </span>
                  )}
                </div>

                {/* Share & Wishlist Floating Buttons */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                  <Button
                    type="button"
                    variant="outline"
                    size="iconSm"
                    onClick={handleShare}
                    className="rounded-full bg-white/90 backdrop-blur-sm hover:bg-white text-text-muted hover:text-brand-purple shadow-xs"
                    title="Share product"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>

                  <Button
                    type="button"
                    variant={isWishlisted ? "destructive" : "outline"}
                    size="iconSm"
                    onClick={() => handleToggleWishlist(product)}
                    className={`rounded-full shadow-xs transition-all ${
                      isWishlisted ? 'bg-brand-coral hover:bg-brand-coral-dark text-white' : 'bg-white/90 backdrop-blur-sm text-text-muted hover:text-brand-coral hover:bg-white'
                    }`}
                    title="Save to Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
                  </Button>
                </div>

                {/* Fabric Guarantee Floating Pill */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/60 shadow-xs flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                    <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="line-clamp-1">{product.fabric}</span>
                  </div>
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider hidden sm:inline">Certified Safe</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-6 space-y-6">
              {/* Category, Age Group & Rating */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-purple bg-brand-purple-light px-2.5 py-1 rounded-lg">
                      {product.category}
                    </span>
                    <span className="text-xs font-semibold text-text-muted bg-background px-2.5 py-1 rounded-lg border border-[#EBE7DF]">
                      {product.ageSuitability}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-text-main">{product.rating}</span>
                    <span className="text-text-muted">({product.reviewsCount} reviews)</span>
                  </div>
                </div>

                {/* Product Title */}
                <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-main leading-tight">
                  {product.name}
                </h1>

                {/* SKU Code */}
                <div className="text-[11px] font-mono font-medium text-text-muted flex items-center gap-2">
                  <span>SKU: <strong className="text-text-main">{product.sku}</strong></span>
                  <span className="text-gray-300">•</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {product.stockCount && product.stockCount > 0 ? `In Stock (${product.stockCount} units available)` : 'In Stock'}
                  </span>
                </div>
              </div>

              {/* Price & Discount Section */}
              <div className="p-4 rounded-2xl bg-white border border-[#EFECE6] shadow-xs space-y-1.5">
                <div className="flex items-baseline gap-3">
                  <span className="font-heading text-3xl sm:text-4xl font-extrabold text-brand-purple">
                    ₹{product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-base sm:text-lg text-text-muted line-through font-semibold">
                      ₹{product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  {product.discountPercent && (
                    <span className="bg-brand-coral/15 text-brand-coral font-extrabold text-xs px-2.5 py-1 rounded-full border border-brand-coral/20">
                      Save ₹{(product.originalPrice! - product.price).toFixed(2)} ({product.discountPercent}% OFF)
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-text-muted">Inclusive of all taxes • Free shipping on orders over ₹499</p>
              </div>

              {/* Color Options */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold text-text-main">
                    Color: <span className="font-normal text-brand-purple">{selectedColor}</span>
                  </label>
                  <span className="text-text-muted">{product.colors.length} options</span>
                </div>
                
                <div className="flex items-center gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => handleColorChange(c.name)}
                      className={`group flex items-center gap-2 p-1.5 rounded-2xl border transition-all cursor-pointer ${
                        selectedColor === c.name
                          ? 'border-brand-purple bg-brand-purple-light/50 ring-2 ring-brand-purple/30 shadow-xs'
                          : 'border-[#EBE7DF] bg-white hover:border-brand-purple/40'
                      }`}
                    >
                      <span
                        style={{ backgroundColor: c.hex }}
                        className="w-6 h-6 rounded-full border border-black/10 shadow-xs shrink-0"
                      />
                      <span className="text-xs font-semibold text-text-main pr-1.5 hidden sm:inline">{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Options & Size Chart */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold text-text-main">
                    Select Size: <span className="font-normal text-brand-purple">{selectedSize}</span>
                  </label>
                  
                  {/* Size Chart Trigger */}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsSizeChartOpen(true)}
                    className="h-7 text-xs font-bold text-brand-purple hover:bg-brand-purple-light gap-1.5 px-2.5 rounded-xl cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Size Guide & Chart</span>
                  </Button>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                  {product.sizes.map((s) => {
                    const isSelected = selectedSize === s;
                    return (
                      <Button
                        key={s}
                        type="button"
                        variant={isSelected ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedSize(s)}
                        className={`h-11 rounded-xl text-xs font-bold transition-all ${
                          isSelected 
                            ? 'shadow-xs scale-[1.02]' 
                            : 'border-[#E2DDD5] bg-white text-text-main hover:border-brand-purple hover:text-brand-purple'
                        }`}
                      >
                        {s}
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity & CTA Buttons */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-[#DDD8CE] rounded-2xl bg-white p-1 shadow-xs">
                    <Button
                      type="button"
                      variant="ghost"
                      size="iconSm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="size-9 rounded-xl text-text-main hover:bg-brand-purple-light transition-colors"
                      disabled={quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </Button>
                    <span className="w-10 text-center font-bold text-sm text-text-main">{quantity}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="iconSm"
                      onClick={() => setQuantity(quantity + 1)}
                      className="size-9 rounded-xl text-text-main hover:bg-brand-purple-light transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </Button>
                  </div>

                  {/* Add to Cart Button */}
                  <Button
                    type="button"
                    variant="yellow"
                    size="xl"
                    onClick={() => {
                      handleAddToCart(product, selectedColor, selectedSize, quantity);
                      setIsCartOpen(true);
                    }}
                    className="flex-1 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-card cursor-pointer"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>Add to Bag • ₹{(product.price * quantity).toFixed(2)}</span>
                  </Button>
                </div>

                {/* Direct Buy Now Button */}
                <Button
                  type="button"
                  variant="default"
                  size="lg"
                  onClick={() => {
                    handleAddToCart(product, selectedColor, selectedSize, quantity);
                    setIsCartOpen(true);
                  }}
                  className="w-full rounded-2xl font-bold text-sm shadow-soft cursor-pointer"
                >
                  Buy Now with 1-Click
                </Button>
              </div>

              {/* Delivery Availability & Pincode Checker */}
              <div className="p-4 rounded-2xl bg-white border border-[#EFECE6] shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-text-main">
                  <MapPin className="w-4 h-4 text-brand-purple" />
                  <span>Check Delivery & Availability</span>
                </div>

                <form onSubmit={handleCheckPincode} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit Pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="flex-1 px-3.5 py-2 rounded-xl bg-background border border-[#DDD8CE] text-xs sm:text-sm text-text-main placeholder-text-light focus:outline-none focus:ring-2 focus:ring-brand-purple"
                  />
                  <Button
                    type="submit"
                    variant="outline"
                    size="sm"
                    className="h-auto px-4 rounded-xl text-xs font-bold border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white"
                  >
                    Check
                  </Button>
                </form>

                {pincodeMessage && (
                  <p className={`text-xs font-medium flex items-center gap-1.5 ${pincodeChecked ? 'text-emerald-700' : 'text-brand-coral'}`}>
                    {pincodeChecked ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Info className="w-3.5 h-3.5" />}
                    <span>{pincodeMessage}</span>
                  </p>
                )}

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#F0ECE4] text-[11px] text-text-muted">
                  <div className="flex flex-col items-center text-center p-2 rounded-xl bg-background">
                    <Truck className="w-4 h-4 text-brand-purple mb-1" />
                    <span className="font-bold text-text-main">Fast Dispatch</span>
                    <span>Within 24 hrs</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-2 rounded-xl bg-background">
                    <RotateCcw className="w-4 h-4 text-brand-purple mb-1" />
                    <span className="font-bold text-text-main">7-Day Returns</span>
                    <span>Hassle-Free</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-2 rounded-xl bg-background">
                    <ShieldCheck className="w-4 h-4 text-brand-purple mb-1" />
                    <span className="font-bold text-text-main">100% Organic</span>
                    <span>GOTS Certified</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* ==================================================== */}
          {/* PRODUCT SPECIFICATIONS & INFORMATION TABS            */}
          {/* ==================================================== */}
          <div className="mt-16 bg-white rounded-4xl border border-[#EFECE6] p-6 sm:p-10 shadow-soft">
            
            {/* Tab Navigation */}
            <div className="flex items-center gap-2 sm:gap-4 border-b border-[#F0ECE4] pb-4 overflow-x-auto">
              {[
                { id: 'details', label: 'Description & Highlights' },
                { id: 'specs', label: 'Product Specifications' },
                { id: 'fabric', label: 'Fabric & Organic Quality' },
                { id: 'care', label: 'Care & Wash Guide' },
              ].map((tab) => (
                <Button
                  key={tab.id}
                  type="button"
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'shadow-xs'
                      : 'text-text-muted hover:text-brand-purple hover:bg-brand-purple-light'
                  }`}
                >
                  {tab.label}
                </Button>
              ))}
            </div>

            {/* Tab Contents */}
            <div className="pt-6">
              
              {/* 1. Description & Highlights */}
              {activeTab === 'details' && (
                <div className="space-y-6 max-w-3xl">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-text-main mb-2">About the Design</h3>
                    <p className="text-text-muted text-sm sm:text-base leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-heading text-base font-bold text-text-main mb-3">Key Highlights:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {product.highlights?.map((h, i) => (
                        <div key={i} className="flex items-start gap-2.5 p-3 rounded-2xl bg-background border border-[#EFECE6] text-xs sm:text-sm">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="text-text-main font-medium">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 2. Specifications Table */}
              {activeTab === 'specs' && (
                <div className="max-w-3xl">
                  <h3 className="font-heading text-xl font-bold text-text-main mb-4">Detailed Specifications</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.specifications?.map((spec, i) => (
                      <div key={i} className="flex justify-between p-3.5 rounded-2xl bg-background border border-[#EFECE6] text-xs sm:text-sm">
                        <span className="text-text-muted font-medium">{spec.label}</span>
                        <span className="text-text-main font-bold text-right">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Fabric Information */}
              {activeTab === 'fabric' && (
                <div className="space-y-6 max-w-3xl">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-text-main mb-2">Pure & Gentle Materials</h3>
                    <p className="text-text-muted text-sm sm:text-base leading-relaxed">
                      Every fiber is sourced ethically and tested against over 100 harmful substances. Made from <strong>{product.fabric}</strong>, our garments let young skin breathe naturally throughout playtime and sleep.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-brand-mint-light/60 border border-emerald-200">
                      <Leaf className="w-5 h-5 text-emerald-700 mb-2" />
                      <h5 className="font-bold text-sm text-emerald-900 mb-1">GOTS Certified</h5>
                      <p className="text-xs text-emerald-800">100% certified organic cotton without toxic pesticides or heavy metals.</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-brand-blue-light/60 border border-sky-200">
                      <Sparkles className="w-5 h-5 text-sky-700 mb-2" />
                      <h5 className="font-bold text-sm text-sky-900 mb-1">Zero-Scratch Tags</h5>
                      <p className="text-xs text-sky-800">Smooth flatlock stitching that protects sensory-sensitive little skin.</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-brand-yellow-light/60 border border-amber-200">
                      <Layers className="w-5 h-5 text-amber-700 mb-2" />
                      <h5 className="font-bold text-sm text-amber-900 mb-1">Durable Weave</h5>
                      <p className="text-xs text-amber-800">Pre-shrunk fibers engineered to withstand hundreds of washing cycles.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. Care & Wash Instructions */}
              {activeTab === 'care' && (
                <div className="space-y-6 max-w-3xl">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-text-main mb-2">How to Care for This Garment</h3>
                    <p className="text-text-muted text-sm leading-relaxed">
                      Follow these simple care recommendations to keep colors bright and fibers soft for generations:
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.careInstructions?.map((c, i) => (
                      <div key={i} className="flex items-center gap-3 p-3.5 rounded-2xl bg-background border border-[#EFECE6] text-xs sm:text-sm">
                        <span className="w-6 h-6 rounded-full bg-brand-purple-light text-brand-purple font-bold flex items-center justify-center text-xs shrink-0">
                          {i + 1}
                        </span>
                        <span className="text-text-main font-semibold">{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* ==================================================== */}
          {/* 5. RELATED PRODUCTS SECTION                          */}
          {/* ==================================================== */}
          <section className="mt-16 pt-12 border-t border-[#F0ECE4]">
            <div className="flex items-end justify-between mb-8 pb-3 border-b border-[#EAE5DC]">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-purple/10 text-brand-purple text-xs font-bold uppercase tracking-wider mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-purple fill-brand-purple/20" />
                  <span>Curated Pairings</span>
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-text-main tracking-tight">
                  You May Also Love
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard
                  key={rel.id}
                  product={rel}
                  isWishlisted={wishlistIds.includes(rel.id)}
                  onToggleWishlist={handleToggleWishlist}
                  onAddToCart={handleAddToCart}
                  onQuickView={(p) => navigate(`/product/${p.id}`)}
                />
              ))}
            </div>
          </section>

        </div>
      </main>

      {/* 6. FOOTER */}
      <Footer
        onCategoryClick={() => {
          navigate('/');
        }}
      />

      {/* ==================================================== */}
      {/* SIZE CHART MODAL DIALOG                              */}
      {/* ==================================================== */}
      {isSizeChartOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-text-main/50 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsSizeChartOpen(false)}
        >
          <div 
            className="relative bg-white rounded-4xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#EBE7DF] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#EFECE6] mb-6">
              <div>
                <h3 className="font-heading text-2xl font-extrabold text-text-main flex items-center gap-2">
                  <Ruler className="w-5 h-5 text-brand-purple" />
                  <span>Size Guide & Measurements</span>
                </h3>
                <p className="text-xs text-text-muted mt-0.5">
                  {isBabyProduct ? 'Baby & Toddler Collection (0–24M)' : 'Kids & Youth Collection (2–9Y)'}
                </p>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="iconSm"
                onClick={() => setIsSizeChartOpen(false)}
                className="rounded-full text-text-muted hover:text-text-main"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Unit Toggle */}
            <div className="flex items-center justify-between mb-4 bg-background p-1.5 rounded-2xl border border-[#EFECE6]">
              <span className="text-xs font-bold text-text-main pl-2">Display Units:</span>
              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  variant={sizeUnit === 'cm' ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSizeUnit('cm')}
                  className="h-7 px-3 text-xs font-bold rounded-xl"
                >
                  Centimeters (cm)
                </Button>
                <Button
                  type="button"
                  variant={sizeUnit === 'in' ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSizeUnit('in')}
                  className="h-7 px-3 text-xs font-bold rounded-xl"
                >
                  Inches (in)
                </Button>
              </div>
            </div>

            {/* Size Table */}
            <div className="overflow-x-auto rounded-2xl border border-[#EFECE6] mb-6">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-brand-purple-light/50 border-b border-[#EFECE6] text-text-main font-bold">
                    <th className="p-3">Size</th>
                    <th className="p-3">Approx. Age</th>
                    <th className="p-3">Height</th>
                    <th className="p-3">Chest</th>
                    <th className="p-3">Waist</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFECE6]">
                  {sizeChartData.map((row) => (
                    <tr 
                      key={row.size}
                      className={`hover:bg-brand-purple-light/20 transition-colors ${
                        selectedSize === row.size ? 'bg-brand-yellow-light font-semibold' : ''
                      }`}
                    >
                      <td className="p-3 font-bold text-brand-purple">{row.size}</td>
                      <td className="p-3 text-text-main">{row.age}</td>
                      <td className="p-3 text-text-muted">{sizeUnit === 'cm' ? row.heightCm : row.heightInches}</td>
                      <td className="p-3 text-text-muted">{sizeUnit === 'cm' ? row.chestCm : row.chestInches}</td>
                      <td className="p-3 text-text-muted">{sizeUnit === 'cm' ? row.waistCm : row.waistInches}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Measurement Tip */}
            <div className="bg-brand-mint-light/60 p-4 rounded-2xl border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold block mb-0.5">Parent Tip on Sizing:</strong>
                <span>If your child is in-between sizes or grows quickly, we recommend choosing one size up for longer wear and roomier comfort!</span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 7. CART DRAWER (Shadcn UI Drawer) */}
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

      {/* 8. TOAST NOTIFICATION */}
      <ToastNotification
        toast={toast}
        onClose={() => setToast(null)}
      />

    </div>
  );
};
