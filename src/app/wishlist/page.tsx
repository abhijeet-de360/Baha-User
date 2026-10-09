'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, Trash2, ArrowLeft, Sparkles, ChevronRight } from 'lucide-react';
import { ProductCard } from '@/components/ui/ProductCard';
import { ToastNotification } from '@/components/ui/ToastNotification';
import { Button } from '@/components/ui/button';
import mockData from '@/data/mockData.json';
import type { Product } from '@/types';
import { useShopState } from '@/hooks/useShopState';
import { useRouter } from 'next/navigation';

const MOCK_PRODUCTS = mockData.products as Product[];

export default function WishlistPage() {
    const router = useRouter();
    const {
        wishlistIds,
        toast,
        setToast,
        handleAddToCart,
        handleToggleWishlist,
    } = useShopState();

    // Get wishlisted products
    const wishlistedProducts = useMemo(() => {
        return MOCK_PRODUCTS.filter((p) => wishlistIds.includes(p.id));
    }, [wishlistIds]);

    // Handle Add All to Cart
    const handleAddAllToCart = () => {
        if (wishlistedProducts.length === 0) return;
        wishlistedProducts.forEach((product) => {
            const defaultColor = product.colors[0]?.name || '';
            const defaultSize = product.sizes[0] || 'Standard';
            handleAddToCart(product, defaultColor, defaultSize, 1);
        });
        setToast({
            id: Date.now().toString(),
            type: 'cart',
            title: 'Wishlist Added to Bag! 🛍️',
            message: `Added ${wishlistedProducts.length} saved item(s) to your shopping cart.`,
        });
    };

    // Handle Clear All Wishlist
    const handleClearWishlist = () => {
        if (wishlistedProducts.length === 0) return;
        wishlistedProducts.forEach((product) => {
            handleToggleWishlist(product, false);
        });
        setToast({
            id: Date.now().toString(),
            type: 'promo',
            title: 'Wishlist Cleared',
            message: 'All items have been removed from your saved wishlist.',
        });
    };

    return (
        <div className="min-h-screen bg-[#FFFDF8] text-text-main flex flex-col font-body selection:bg-brand-yellow">

            <main className="flex-1 py-8 sm:py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Breadcrumbs Navigation */}
                    <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-text-muted">
                        <Link href="/" className="hover:text-brand-purple transition-colors">
                            Home
                        </Link>
                        <ChevronRight className="w-3.5 h-3.5 text-text-muted/60" />
                        <span className="font-semibold text-brand-purple">Wishlist</span>
                    </nav>



                    {/* CONTENT BODY */}
                    {wishlistedProducts.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                            {wishlistedProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    isWishlisted={true}
                                    onToggleWishlist={(p) => handleToggleWishlist(p, false)}
                                    onAddToCart={handleAddToCart}
                                    onQuickView={(p) => router.push(`/product/${p.id}`)}
                                />
                            ))}
                        </div>
                    ) : (
                        /* EMPTY WISHLIST STATE */
                        <div className="bg-white rounded-3xl p-10 sm:p-16 border border-[#EFECE6] text-center max-w-2xl mx-auto shadow-xs my-8 space-y-6 animate-fade-in">
                            <div className="w-20 h-20 rounded-full bg-brand-coral/10 text-brand-coral mx-auto flex items-center justify-center shadow-inner">
                                <Heart className="w-10 h-10 fill-brand-coral/20 stroke-[1.5]" />
                            </div>

                            <div className="space-y-2">
                                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-text-main">
                                    Your Wishlist is Empty
                                </h2>
                                <p className="text-sm text-text-muted max-w-md mx-auto leading-relaxed">
                                    You haven’t saved any items yet. Tap the heart icon on any outfit to save your favorite styles for later!
                                </p>
                            </div>

                            <div className="pt-4 flex items-center justify-center gap-4">
                                <Link
                                    href="/products"
                                    className="inline-flex items-center gap-2 bg-brand-purple hover:bg-[#1F1F1F] text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-xs transition-colors cursor-pointer"
                                >
                                    <span>Explore Collections</span>
                                </Link>
                            </div>
                        </div>
                    )}

                </div>
            </main>

            {/* TOAST NOTIFICATION */}
            <ToastNotification
                toast={toast}
                onClose={() => setToast(null)}
            />

        </div>
    );
}
