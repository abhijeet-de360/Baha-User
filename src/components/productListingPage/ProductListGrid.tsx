"use client";

import React from 'react';
import mockData from '@/data/mockData.json';
import type { Product } from '@/types';
import { useShop } from '@/context/ShopContext';
import { ProductCard } from '@/components/ui/ProductCard';

const products = mockData.products as Product[];

const ProductListGrid = () => {
    const { wishlistIds, handleToggleWishlist, handleAddToCart } = useShop();

    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    isWishlisted={wishlistIds.includes(product.id)}
                    onToggleWishlist={handleToggleWishlist}
                    onAddToCart={handleAddToCart}
                />
            ))}
        </div>
    );
};

export default ProductListGrid;