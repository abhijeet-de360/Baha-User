'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Star, ShoppingBag, Heart, Share2, Ruler, Check, Minus, Plus, Eye, ChevronLeft, ChevronRight, HelpCircle, X, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

// UI Components
import { ProductCard } from '@/components/ui/ProductCard';
import { ToastNotification } from '@/components/ui/ToastNotification';

// Mock Data & Helpers
import mockData from '@/data/mockData.json';
import type { Product } from '@/types';
import { getEnhancedProduct, BABY_SIZE_CHART, KIDS_SIZE_CHART } from '@/lib/productHelpers';
import { useShopState } from '@/hooks/useShopState';

const MOCK_PRODUCTS = mockData.products as Product[];

interface PageProps {
    params: Promise<{ slug: string }> | { slug: string };
}

export default function ProductPage({ params }: PageProps) {
    const router = useRouter();
    const routeParams = useParams();

    // Unwrap params safely (handling both Promise and resolved params object)
    const unwrappedParams = React.use(params as Promise<{ slug: string }>);
    const slug = unwrappedParams?.slug || (routeParams?.slug as string);

    // Find product by id or fallback to first product
    const rawProduct = useMemo(() => {
        return MOCK_PRODUCTS.find((p) => p.id === slug) || MOCK_PRODUCTS[0];
    }, [slug]);

    const product = useMemo(() => {
        return getEnhancedProduct(rawProduct);
    }, [rawProduct]);

    // Shared Global Shop State (Cart, Wishlist, Toast, Promo)
    const {
        wishlistIds,
        toast,
        setToast,
        handleAddToCart,
        handleToggleWishlist,
    } = useShopState();

    // Gallery images
    const galleryImages = useMemo(() => {
        return product.galleryImages && product.galleryImages.length > 0
            ? product.galleryImages
            : [product.featuredImage];
    }, [product]);

    // Local Page State
    const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
    const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || '');
    const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'Standard');
    const [quantity, setQuantity] = useState<number>(1);
    const [infoTab, setInfoTab] = useState<'description' | 'additional' | 'reviews' | 'fabric'>('description');
    const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
    const [sizeUnit, setSizeUnit] = useState<'cm' | 'in'>('cm');

    // Reset selections when product changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setSelectedColor(product.colors[0]?.name || '');
        setSelectedSize(product.sizes[0] || 'Standard');
        setQuantity(1);
        setActiveImageIndex(0);
    }, [product]);

    // Handle color swatch click (switches image if matched)
    const handleColorChange = (colorName: string) => {
        setSelectedColor(colorName);
        const foundIdx = product.colors.findIndex((c) => c.name === colorName);
        if (foundIdx !== -1 && galleryImages[foundIdx]) {
            setActiveImageIndex(foundIdx);
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
            }).catch(() => { });
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
        <div className="min-h-screen bg-[#FFFDF8] text-text-main flex flex-col font-body selection:bg-brand-yellow">

            {/* MAIN CONTENT CONTAINER */}
            <main className="flex-1 py-8 sm:py-12">
                <div className="container max-w-7xl mx-auto px-4 sm:px-6">

                    {/* TOP PRODUCT SECTION: GALLERY LEFT (5 cols, max-w-[450px]), DETAILS RIGHT (7 cols) */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start mb-16 sm:mb-24">

                        {/* LEFT: MAIN IMAGE & THUMBNAILS ROW */}
                        <div className="lg:col-span-5 w-full max-w-[440px] sm:max-w-[460px] mx-auto lg:mx-0 space-y-4">
                            {/* Main Featured Image Box */}
                            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#FAF8F3] border border-[#EFECE6] shadow-xs group">
                                <Image
                                    src={galleryImages[activeImageIndex] || product.featuredImage}
                                    alt={product.name}
                                    fill
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 460px"
                                    className="object-cover object-center transition-transform duration-500 ease-out"
                                />

                                {/* Discount Badge Overlay (Top Left) */}
                                {product.discountPercent && (
                                    <div className="absolute top-4 left-4 bg-[#00BBA7] text-white text-xs font-bold px-3 py-1 rounded-sm shadow-xs uppercase tracking-wider">
                                        -{product.discountPercent}%
                                    </div>
                                )}
                            </div>

                            {/* Row of 4 Thumbnails Below Main Image */}
                            <div className="grid grid-cols-4 gap-3 sm:gap-4">
                                {galleryImages.slice(0, 4).map((img, idx) => {
                                    const isSelected = activeImageIndex === idx;
                                    return (
                                        <button
                                            key={idx}
                                            type="button"
                                            onClick={() => setActiveImageIndex(idx)}
                                            className={`relative aspect-[3/3] w-full rounded-xl overflow-hidden border transition-all duration-200 cursor-pointer bg-[#FAF8F3] ${isSelected
                                                ? 'border-brand-purple ring-2 ring-brand-purple/20'
                                                : 'border-[#EFECE6] opacity-80 hover:opacity-100 hover:border-brand-purple/50'
                                                }`}
                                        >
                                            <Image
                                                src={img}
                                                alt={`${product.name} preview ${idx + 1}`}
                                                fill
                                                sizes="120px"
                                                className="object-cover object-top"
                                            />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* RIGHT: PRODUCT INFO, SELECTION & ACTIONS */}
                        <div className="lg:col-span-7 space-y-6">

                            {/* Breadcrumbs & Header Actions (Wishlist & Share) */}
                            <div className="flex items-center justify-between gap-4">
                                <nav className="flex items-center gap-2 text-xs text-text-muted font-medium">
                                    <Link href="/" className="hover:text-brand-purple transition-colors">Home</Link>
                                    <span>›</span>
                                    <Link href="/products" className="hover:text-brand-purple transition-colors">Product</Link>
                                    <span>›</span>
                                    <span className="capitalize text-text-main font-semibold">{product.category}</span>
                                </nav>

                                {/* Top Right Actions: Wishlist & Share (Icons Only) */}
                                <div className="flex items-center gap-1 text-text-muted">
                                    <button
                                        type="button"
                                        onClick={() => handleToggleWishlist(product, false)}
                                        className={`w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors cursor-pointer ${isWishlisted ? 'text-brand-coral' : 'hover:text-brand-purple'}`}
                                        title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                                        aria-label="Wishlist"
                                    >
                                        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-brand-coral text-brand-coral' : ''}`} />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleShare}
                                        className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/5 hover:text-brand-purple transition-colors cursor-pointer"
                                        title="Share product"
                                        aria-label="Share"
                                    >
                                        <Share2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Title */}
                            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-text-main tracking-tight">
                                {product.name}
                            </h1>

                            {/* Subtitle / Short Description */}
                            <p className="text-text-muted text-xs sm:text-sm leading-relaxed">
                                {product.description}
                            </p>

                            {/* Rating Stars & Review Count */}
                            <div className="flex items-center gap-2 text-xs">
                                <div className="flex items-center gap-0.5 text-amber-500">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
                                        />
                                    ))}
                                </div>
                                <span className="text-text-muted font-medium">{product.reviewsCount} Reviews</span>
                            </div>

                            {/* Price */}
                            <div className="flex items-baseline gap-3">
                                <span className="font-heading text-2xl sm:text-3xl font-bold text-text-main">
                                    ₹{product.price.toFixed(2)}
                                </span>
                                {product.originalPrice && (
                                    <span className="text-sm sm:text-base text-text-muted line-through font-normal">
                                        ₹{product.originalPrice.toFixed(2)}
                                    </span>
                                )}
                            </div>

                            {/* Live Visitors Activity Indicator */}
                            <div className="flex items-center gap-2 text-xs text-text-muted">
                                <Eye className="w-4 h-4 text-brand-purple" />
                                <span><strong>32 people</strong> are looking at this product right now</span>
                            </div>

                            <hr className="border-[#EFECE6]" />

                            {/* COLOR SELECTOR */}
                            <div className="space-y-2">
                                <div className="text-xs font-medium text-text-muted">
                                    Color: <strong className="text-text-main">{selectedColor}</strong>
                                </div>

                                <div className="flex items-center gap-3">
                                    {product.colors.map((c) => {
                                        const isSelected = selectedColor === c.name;
                                        return (
                                            <button
                                                key={c.name}
                                                type="button"
                                                onClick={() => handleColorChange(c.name)}
                                                className={`w-7 h-7 rounded-full transition-all cursor-pointer border relative flex items-center justify-center ${isSelected
                                                    ? 'ring-2 ring-brand-purple ring-offset-2 border-black/20'
                                                    : 'border-black/10 hover:scale-110'
                                                    }`}
                                                style={{ backgroundColor: c.hex }}
                                                title={c.name}
                                            />
                                        );
                                    })}
                                </div>
                            </div>

                            {/* SIZE SELECTOR */}
                            <div className="space-y-2">
                                <div className="text-xs font-medium text-text-muted">
                                    Size: <strong className="text-text-main">{selectedSize}</strong>
                                </div>

                                <div className="flex flex-wrap items-center gap-2">
                                    {product.sizes.map((s) => {
                                        const isSelected = selectedSize === s;
                                        return (
                                            <button
                                                key={s}
                                                type="button"
                                                onClick={() => setSelectedSize(s)}
                                                className={`min-w-10 h-10 px-3 rounded-md text-xs font-semibold transition-all cursor-pointer border ${isSelected
                                                    ? 'border-text-main bg-text-main text-white'
                                                    : 'border-[#EFECE6] bg-white text-text-main hover:border-text-main'
                                                    }`}
                                            >
                                                {s}
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* SIZE GUIDE & IN STOCK BAR */}
                                <div className="flex items-center gap-4 text-xs pt-1">
                                    <button
                                        type="button"
                                        onClick={() => setIsSizeChartOpen(true)}
                                        className="inline-flex items-center gap-1.5 font-bold text-text-main hover:text-brand-purple transition-colors cursor-pointer uppercase tracking-wider text-[11px]"
                                    >
                                        <Ruler className="w-3.5 h-3.5 text-brand-purple" />
                                        <span>SIZE GUIDE</span>
                                    </button>

                                    <span className="text-gray-300">•</span>

                                    <span className="inline-flex items-center gap-1 font-bold text-emerald-600 uppercase tracking-wider text-[11px]">
                                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                                        <span>{product.stockCount || 673} IN STOCK</span>
                                    </span>
                                </div>
                            </div>

                            {/* QUANTITY & ADD TO CART BAR (SIDE BY SIDE) */}
                            <div className="flex items-center gap-3 pt-2">
                                {/* Quantity Stepper */}
                                <div className="w-32 shrink-0 h-12 flex items-center justify-between bg-[#F5F5F5] rounded-md px-3 text-xs border border-[#EFECE6]">
                                    <button
                                        type="button"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="text-text-muted hover:text-text-main p-1 cursor-pointer disabled:opacity-30"
                                        disabled={quantity <= 1}
                                    >
                                        <Minus className="w-3.5 h-3.5" />
                                    </button>

                                    <span className="font-bold text-sm text-text-main">{quantity}</span>

                                    <button
                                        type="button"
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="text-text-muted hover:text-text-main p-1 cursor-pointer"
                                    >
                                        <Plus className="w-3.5 h-3.5" />
                                    </button>
                                </div>

                                {/* Add to Cart Button */}
                                <button
                                    type="button"
                                    onClick={() => handleAddToCart(product, selectedColor, selectedSize, quantity)}
                                    className="flex-1 h-12 bg-brand-purple hover:bg-[#1F1F1F] text-white font-bold text-xs uppercase tracking-wider rounded-md shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                                >
                                    <ShoppingBag className="w-4 h-4" />
                                    <span>Add to Cart</span>
                                </button>
                            </div>

                            {/* METADATA DETAILS */}
                            <div className="space-y-1 text-xs text-text-muted pt-3 border-t border-[#EFECE6]">
                                <div><strong className="text-text-main">SKU:</strong> {product.sku}</div>
                                <div><strong className="text-text-main">CATEGORY:</strong> <span className="capitalize">{product.category}</span></div>
                                <div><strong className="text-text-main">TAGS:</strong> {product.highlights?.join(', ') || 'Loose, Modern, Sale'}</div>
                            </div>

                        </div>

                    </div>

                    {/* INFORMATION TABS & CONTENT SECTION */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 py-12 border-t border-[#EFECE6] mb-16">

                        {/* Left Column: Vertical Tabs Menu */}
                        <div className="lg:col-span-3 space-y-3 text-sm font-semibold">
                            {[
                                { id: 'description', label: 'Description' },
                                { id: 'additional', label: 'Additional Info' },
                                { id: 'reviews', label: `Reviews (${product.reviewsCount})` },
                                { id: 'fabric', label: 'Fabric & Care' },
                            ].map((tab) => {
                                const isActive = infoTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => setInfoTab(tab.id as typeof infoTab)}
                                        className={`block w-full text-left transition-colors cursor-pointer py-1 ${isActive
                                            ? 'text-text-main font-bold underline decoration-2 underline-offset-4 decoration-text-main'
                                            : 'text-text-muted hover:text-text-main'
                                            }`}
                                    >
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Right Column: Tab Content Body */}
                        <div className="lg:col-span-9 text-xs sm:text-sm text-text-muted leading-relaxed space-y-6">

                            {infoTab === 'description' && (
                                <div className="space-y-4">
                                    <p>
                                        {product.description}
                                    </p>
                                    <div>
                                        <strong className="font-bold text-text-main block mb-2">Information</strong>
                                        <ul className="space-y-2 list-disc list-inside">
                                            <li>Fabric: {product.fabric}</li>
                                            <li>Fit type: Regular Comfort Fit</li>
                                            <li>Feature: Certified GOTS Organic Cotton</li>
                                            <li>Front and back reinforced stitching</li>
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {infoTab === 'additional' && (
                                <div className="space-y-4">
                                    <strong className="font-bold text-text-main block mb-2">Specifications</strong>
                                    <ul className="space-y-2">
                                        {product.specifications?.map((s, i) => (
                                            <li key={i} className="flex justify-between max-w-md py-1 border-b border-[#F5F2ED]">
                                                <span className="font-medium text-text-muted">{s.label}:</span>
                                                <span className="font-bold text-text-main">{s.value}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {infoTab === 'reviews' && (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <div className="flex text-amber-400">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 fill-amber-400" />
                                            ))}
                                        </div>
                                        <span className="font-bold text-text-main">{product.rating} out of 5 stars</span>
                                    </div>
                                    <p>Based on {product.reviewsCount} verified customer purchases.</p>
                                </div>
                            )}

                            {infoTab === 'fabric' && (
                                <div className="space-y-4">
                                    <strong className="font-bold text-text-main block mb-2">Fabric & Care Guide</strong>
                                    <ul className="space-y-2 list-disc list-inside">
                                        {product.careInstructions?.map((c, i) => (
                                            <li key={i}>{c}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                        </div>

                    </div>

                    {/* "YOU MIGHT ALSO LIKE" SECTION */}
                    <div className="pt-8 border-t border-[#EFECE6]">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="font-heading text-xl sm:text-2xl font-bold text-text-main">
                                You might also like
                            </h2>

                            {/* Arrow Navigation */}
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    className="w-8 h-8 rounded-full border border-[#EFECE6] bg-white text-text-main hover:bg-text-main hover:text-white transition-colors flex items-center justify-center cursor-pointer"
                                    aria-label="Previous styles"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <button
                                    type="button"
                                    className="w-8 h-8 rounded-full border border-[#EFECE6] bg-white text-text-main hover:bg-text-main hover:text-white transition-colors flex items-center justify-center cursor-pointer"
                                    aria-label="Next styles"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* 4 Column Product Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                            {relatedProducts.map((rel) => (
                                <ProductCard
                                    key={rel.id}
                                    product={rel}
                                    isWishlisted={wishlistIds.includes(rel.id)}
                                    onToggleWishlist={handleToggleWishlist}
                                    onAddToCart={handleAddToCart}
                                    onQuickView={(p) => router.push(`/product/${p.id}`)}
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </main>

            {/* SIZE CHART MODAL DIALOG */}
            {isSizeChartOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-text-main/50 backdrop-blur-sm animate-fade-in"
                    onClick={() => setIsSizeChartOpen(false)}
                >
                    <div
                        className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#EBE7DF] overflow-hidden"
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

                            <button
                                type="button"
                                onClick={() => setIsSizeChartOpen(false)}
                                className="w-8 h-8 rounded-full bg-background hover:bg-gray-200 text-text-muted hover:text-text-main flex items-center justify-center transition-colors cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Unit Toggle */}
                        <div className="flex items-center justify-between mb-4 bg-background p-1.5 rounded-2xl border border-[#EFECE6]">
                            <span className="text-xs font-bold text-text-main pl-2">Display Units:</span>
                            <div className="flex items-center gap-1">
                                <button
                                    type="button"
                                    onClick={() => setSizeUnit('cm')}
                                    className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${sizeUnit === 'cm' ? 'bg-brand-purple text-white shadow-xs' : 'text-text-muted hover:text-text-main'}`}
                                >
                                    Centimeters (cm)
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setSizeUnit('in')}
                                    className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${sizeUnit === 'in' ? 'bg-brand-purple text-white shadow-xs' : 'text-text-muted hover:text-text-main'}`}
                                >
                                    Inches (in)
                                </button>
                            </div>
                        </div>

                        {/* Size Table */}
                        <div className="overflow-x-auto rounded-2xl border border-[#EFECE6]">
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
                                            className={`hover:bg-brand-purple-light/20 transition-colors ${selectedSize === row.size ? 'bg-brand-yellow-light font-semibold' : ''
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

                    </div>
                </div>
            )}

            {/* TOAST NOTIFICATION */}
            <ToastNotification
                toast={toast}
                onClose={() => setToast(null)}
            />

        </div>
    );
}