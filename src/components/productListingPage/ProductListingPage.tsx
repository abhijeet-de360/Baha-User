import React from 'react';
import ProductFilterSection from '@/components/productListingPage/ProductFilterSection';
import ProductListGrid from '@/components/productListingPage/ProductListGrid';

const ProductListingPage = () => {
  return (
    <main className="container py-8 sm:py-10">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-wider text-brand-purple">Shop the collection</p>
        <h1 className="font-heading text-3xl font-extrabold text-text-main">All Products</h1>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <ProductFilterSection />
        <ProductListGrid />
      </div>
    </main>
  );
};

export default ProductListingPage;