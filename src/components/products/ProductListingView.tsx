'use client';

import React, { useState, useMemo, useId } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, SlidersHorizontal, RotateCcw, Sparkles, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ui/ProductCard';
import mockData from '@/data/mockData.json';
import type { Product } from '@/types';
import { useShopState } from '@/hooks/useShopState';

const ALL_PRODUCTS = mockData.products as Product[];

export interface ProductListingViewProps {
  segments?: string[];
}

type FilterKey = 'age' | 'gender' | 'size' | 'color' | 'price' | 'discount';
type FilterState = Record<FilterKey, string[]>;

const initialFilters: FilterState = {
  age: [],
  gender: [],
  size: [],
  color: [],
  price: [],
  discount: [],
};

const ageOptions = [
  '0–6 Months',
  '6–12 Months',
  '1–2 Years',
  '2–4 Years',
  '4–6 Years',
  '6–8 Years',
];

const genderOptions = ['Boys', 'Girls', 'Unisex'];

const sizeOptions = [
  '0-3M',
  '3-6M',
  '6-12M',
  '12-18M',
  '2T',
  '3T',
  '4T',
  '5T',
  '6-7Y',
  '8-9Y',
];

const colorOptions = [
  'Yellow',
  'Blue',
  'Pink',
  'Green',
  'White',
  'Navy',
  'Coral',
  'Lilac',
  'Charcoal',
];

const priceOptions = [
  'Under ₹500',
  '₹500–₹1,000',
  '₹1,000–₹1,500',
  'Over ₹1,500',
];

const discountOptions = [
  'Sale Items',
  'Organic Cotton',
  'Bestsellers',
  'New Arrivals',
];

// Helper to format slug segments into title and breadcrumbs
function formatSegmentTitle(segments: string[] = []): { title: string; subtitle: string; breadcrumbs: { label: string; href: string }[] } {
  if (segments.length === 0) {
    return {
      title: 'All Products',
      subtitle: 'Explore our complete collection of organic & festive kidswear',
      breadcrumbs: [{ label: 'Products', href: '/products' }],
    };
  }

  const normalized = segments.map((s) => s.toLowerCase().trim());
  const breadcrumbs: { label: string; href: string }[] = [
    { label: 'Products', href: '/products' },
  ];

  let currentPath = '/products/category';
  normalized.forEach((seg) => {
    currentPath += `/${seg}`;
    const cleanLabel = seg
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    breadcrumbs.push({ label: cleanLabel, href: currentPath });
  });

  // Common titles
  const isAll = normalized.includes('all');
  const isSale = normalized.includes('sale');
  const isBoy = normalized.includes('boy') || normalized.includes('boys');
  const isGirl = normalized.includes('girl') || normalized.includes('girls');
  const isKurta = normalized.includes('kurta');
  const isEthnic = normalized.includes('ethnic') || normalized.includes('ethnic-wear');
  const isParty = normalized.includes('party') || normalized.includes('party-wear');
  const isBaby = normalized.includes('baby') || normalized.includes('newborn');

  let title = '';
  let subtitle = '';

  if (isAll) {
    title = 'New Arrivals & All Products';
    subtitle = 'Discover our latest organic fabrics, everyday essentials, and festive styles';
  } else if (isSale) {
    title = 'Sale & Special Offers';
    subtitle = 'Exclusive discounts on certified organic cotton and festival favorites';
  } else if (isBoy && isKurta) {
    title = "Boys' Kurta & Ethnic Sets";
    subtitle = "Traditional festive kurtas, dhoti sets, and celebration wear for boys";
  } else if (isGirl && isKurta) {
    title = "Girls' Kurta & Ethnic Wear";
    subtitle = "Elegant Anarkalis, ethnic kurtis, and traditional wear for girls";
  } else if (isBoy && isEthnic) {
    title = "Boys' Ethnic Wear";
    subtitle = "Traditional silk blend kurtas, dhotis, and festive attire for boys";
  } else if (isGirl && isEthnic) {
    title = "Girls' Ethnic Wear";
    subtitle = "Handcrafted Anarkalis, lehengas, and festive ethnic gowns for girls";
  } else if (isBoy && isParty) {
    title = "Boys' Party & Formal Wear";
    subtitle = "Smart blazers, suits, and handsome celebration outfits";
  } else if (isGirl && isParty) {
    title = "Girls' Party Wear & Frocks";
    subtitle = "Glitter tulle dresses, twirl frocks, and enchanting party wear";
  } else if (isBoy) {
    title = "Boys' Collection";
    subtitle = "Comfortable, playful organic tees, sets, and festive clothes for boys";
  } else if (isGirl) {
    title = "Girls' Collection";
    subtitle = "Pretty dresses, floral rompers, and delicate organic cotton styles for girls";
  } else if (isBaby) {
    title = "Baby & Newborn Collection";
    subtitle = "Ultra-gentle GOTS certified organic rompers, sleepwear, and bodysuits";
  } else {
    const formattedSegs = normalized
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' / ');
    title = `${formattedSegs} Collection`;
    subtitle = `Shop quality kidswear tailored for ${formattedSegs.toLowerCase()}`;
  }

  return { title, subtitle, breadcrumbs };
}

// Check if a product matches a URL segment
function matchesSegment(product: Product, segment: string): boolean {
  const seg = segment.toLowerCase().trim();

  // 'all' matches every product
  if (seg === 'all') return true;

  // 'sale' matches products with discount or sale badge
  if (seg === 'sale') {
    return (product.badges || []).includes('sale') || !!product.discountPercent;
  }

  // Gender matching
  if (seg === 'boy' || seg === 'boys') {
    return product.gender === 'boys' || product.gender === 'unisex' || product.category.toLowerCase().includes('boy');
  }
  if (seg === 'girl' || seg === 'girls') {
    return product.gender === 'girls' || product.gender === 'unisex' || product.category.toLowerCase().includes('girl');
  }

  // Age group matching
  if (seg === 'baby') {
    return product.ageGroup === 'baby' || product.category.toLowerCase().includes('baby');
  }
  if (seg === 'newborn') {
    return product.ageGroup === 'newborn' || product.sizes.some((s) => s.toLowerCase().includes('0-3m') || s.toLowerCase().includes('newborn'));
  }

  // Category matching
  if (seg === 'ethnic-wear' || seg === 'ethnic') {
    return product.category.toLowerCase().includes('ethnic') || (product.tags || []).some((t) => t.toLowerCase().includes('ethnic'));
  }
  if (seg === 'party-wear' || seg === 'party') {
    return product.category.toLowerCase().includes('party') || (product.tags || []).some((t) => t.toLowerCase().includes('party'));
  }
  if (seg === 'casual-wear' || seg === 'casual') {
    return product.category.toLowerCase().includes('casual') || (product.tags || []).some((t) => t.toLowerCase().includes('casual'));
  }
  if (seg === 'accessories') {
    return product.category.toLowerCase().includes('accessories') || (product.tags || []).some((t) => t.toLowerCase().includes('accessories'));
  }

  // Specific product type matching (e.g. kurta, dhoti, dress, frock, tutu, rompers, tee)
  const inName = product.name.toLowerCase().includes(seg);
  const inTags = (product.tags || []).some((t) => t.toLowerCase().includes(seg));
  const inCategory = product.category.toLowerCase().includes(seg);
  const inDesc = product.description.toLowerCase().includes(seg);

  return inName || inTags || inCategory || inDesc;
}

export const ProductListingView: React.FC<ProductListingViewProps> = ({ segments = [] }) => {
  console.log("sluggg ===> ", segments)
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const { wishlistIds, handleToggleWishlist, handleAddToCart } = useShopState();

  const { title, subtitle, breadcrumbs } = useMemo(() => formatSegmentTitle(segments), [segments]);

  // 1. Filter products by route segments first
  const segmentFilteredProducts = useMemo(() => {
    if (!segments || segments.length === 0) return ALL_PRODUCTS;
    return ALL_PRODUCTS.filter((product) => {
      return segments.every((seg) => matchesSegment(product, seg));
    });
  }, [segments]);

  // 2. Filter products by user-selected facet options
  const filteredProducts = useMemo(() => {
    return segmentFilteredProducts.filter((product) => {
      // Gender filter
      if (filters.gender.length > 0) {
        const matchesGender = filters.gender.some((g) => {
          if (g === 'Boys') return product.gender === 'boys' || product.gender === 'unisex';
          if (g === 'Girls') return product.gender === 'girls' || product.gender === 'unisex';
          if (g === 'Unisex') return product.gender === 'unisex';
          return true;
        });
        if (!matchesGender) return false;
      }

      // Age filter
      if (filters.age.length > 0) {
        const matchesAge = filters.age.some((a) => {
          if (a === '0–6 Months') return product.sizes.some((s) => s.includes('0-3M') || s.includes('3-6M'));
          if (a === '6–12 Months') return product.sizes.some((s) => s.includes('6-12M'));
          if (a === '1–2 Years') return product.sizes.some((s) => s.includes('12-18M') || s.includes('18-24M') || s.includes('1-2Y'));
          if (a === '2–4 Years') return product.sizes.some((s) => s.includes('2T') || s.includes('3T') || s.includes('4T') || s.includes('2-3Y') || s.includes('3-4Y'));
          if (a === '4–6 Years') return product.sizes.some((s) => s.includes('4-5Y') || s.includes('5-6Y') || s.includes('5T') || s.includes('6-7Y'));
          if (a === '6–8 Years') return product.sizes.some((s) => s.includes('6-8Y') || s.includes('7-8Y') || s.includes('8-9Y'));
          return true;
        });
        if (!matchesAge) return false;
      }

      // Size filter
      if (filters.size.length > 0) {
        const matchesSize = filters.size.some((s) => product.sizes.includes(s));
        if (!matchesSize) return false;
      }

      // Color filter
      if (filters.color.length > 0) {
        const matchesColor = filters.color.some((selectedCol) =>
          product.colors.some((c) => c.name.toLowerCase().includes(selectedCol.toLowerCase()))
        );
        if (!matchesColor) return false;
      }

      // Price filter
      if (filters.price.length > 0) {
        const matchesPrice = filters.price.some((p) => {
          if (p === 'Under ₹500') return product.price < 500;
          if (p === '₹500–₹1,000') return product.price >= 500 && product.price <= 1000;
          if (p === '₹1,000–₹1,500') return product.price >= 1000 && product.price <= 1500;
          if (p === 'Over ₹1,500') return product.price > 1500;
          return true;
        });
        if (!matchesPrice) return false;
      }

      // Discount / Badges filter
      if (filters.discount.length > 0) {
        const matchesBadge = filters.discount.some((b) => {
          if (b === 'Sale Items') return product.badges?.includes('sale') || !!product.discountPercent;
          if (b === 'Organic Cotton') return product.badges?.includes('organic') || product.fabric?.toLowerCase().includes('organic');
          if (b === 'Bestsellers') return product.badges?.includes('bestseller');
          if (b === 'New Arrivals') return product.badges?.includes('new');
          return true;
        });
        if (!matchesBadge) return false;
      }

      return true;
    });
  }, [segmentFilteredProducts, filters]);

  // 3. Sort products
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === 'price-asc') return list.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') return list.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') return list.sort((a, b) => b.rating - a.rating);
    return list; // featured default
  }, [filteredProducts, sortBy]);

  const toggleFilter = (filterKey: FilterKey, option: string) => {
    setFilters((current) => {
      const selected = current[filterKey];
      const nextSelected = selected.includes(option)
        ? selected.filter((item) => item !== option)
        : [...selected, option];
      return { ...current, [filterKey]: nextSelected };
    });
  };

  const resetFilters = () => setFilters(initialFilters);

  const activeFilterCount = Object.values(filters).reduce((acc, arr) => acc + arr.length, 0);

  return (
    <main className="min-h-screen bg-background py-6 sm:py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-xs text-text-muted flex-wrap">
          <Link href="/" className="hover:text-brand-purple transition-colors">
            Home
          </Link>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={crumb.href}>
              <ChevronRight className="w-3.5 h-3.5 text-text-muted/60" />
              {idx === breadcrumbs.length - 1 ? (
                <span className="font-semibold text-brand-purple">{crumb.label}</span>
              ) : (
                <Link href={crumb.href} className="hover:text-brand-purple transition-colors">
                  {crumb.label}
                </Link>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Header Banner */}
        <div className="mb-8 bg-white rounded-3xl p-6 sm:p-8 border border-[#EFECE6] shadow-xs flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-purple/10 text-brand-purple text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-brand-purple fill-brand-purple/20" />
              <span>Curated Collection</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-text-main tracking-tight">
              {title}
            </h1>
            <p className="text-sm text-text-muted">
              {subtitle}
            </p>
          </div>

          {/* Quick Subcategory Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href="/products"
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
                segments.length === 0
                  ? 'bg-brand-purple text-white border-brand-purple shadow-xs'
                  : 'bg-white text-text-muted border-[#EBE7DF] hover:border-brand-purple hover:text-brand-purple'
              }`}
            >
              All
            </Link>
            <Link
              href="/products/category/boy"
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
                segments.includes('boy') || segments.includes('boys')
                  ? 'bg-brand-purple text-white border-brand-purple shadow-xs'
                  : 'bg-white text-text-muted border-[#EBE7DF] hover:border-brand-purple hover:text-brand-purple'
              }`}
            >
              Boys
            </Link>
            <Link
              href="/products/category/girl"
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
                segments.includes('girl') || segments.includes('girls')
                  ? 'bg-brand-purple text-white border-brand-purple shadow-xs'
                  : 'bg-white text-text-muted border-[#EBE7DF] hover:border-brand-purple hover:text-brand-purple'
              }`}
            >
              Girls
            </Link>
            <Link
              href="/products/category/boy/kurta"
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
                (segments.includes('boy') || segments.includes('boys')) && segments.includes('kurta')
                  ? 'bg-brand-purple text-white border-brand-purple shadow-xs'
                  : 'bg-white text-text-muted border-[#EBE7DF] hover:border-brand-purple hover:text-brand-purple'
              }`}
            >
              Boys Kurta
            </Link>
            <Link
              href="/products/category/girl/kurta"
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
                (segments.includes('girl') || segments.includes('girls')) && segments.includes('kurta')
                  ? 'bg-brand-purple text-white border-brand-purple shadow-xs'
                  : 'bg-white text-text-muted border-[#EBE7DF] hover:border-brand-purple hover:text-brand-purple'
              }`}
            >
              Girls Kurta
            </Link>
            <Link
              href="/products/category/ethnic-wear"
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
                segments.includes('ethnic-wear') || segments.includes('ethnic')
                  ? 'bg-brand-purple text-white border-brand-purple shadow-xs'
                  : 'bg-white text-text-muted border-[#EBE7DF] hover:border-brand-purple hover:text-brand-purple'
              }`}
            >
              Ethnic Wear
            </Link>
            <Link
              href="/products/category/party-wear"
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
                segments.includes('party-wear') || segments.includes('party')
                  ? 'bg-brand-purple text-white border-brand-purple shadow-xs'
                  : 'bg-white text-text-muted border-[#EBE7DF] hover:border-brand-purple hover:text-brand-purple'
              }`}
            >
              Party Wear
            </Link>
          </div>
        </div>

        {/* Toolbar: Count & Mobile Filter Trigger & Sorting */}
        <div className="mb-6 flex items-center justify-between gap-4 flex-wrap pb-4 border-b border-[#EFECE6]">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-text-main">
              Showing <strong className="text-brand-purple">{sortedProducts.length}</strong> of {segmentFilteredProducts.length} products
            </span>

            {/* Mobile Filter Button */}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden h-8 rounded-xl text-xs font-bold gap-1.5 border-brand-purple text-brand-purple"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}</span>
            </Button>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="text-xs font-medium text-text-muted hidden sm:inline">
              Sort by:
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="bg-white border border-[#DDD8CE] text-xs font-semibold text-text-main py-1.5 px-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-purple cursor-pointer shadow-xs"
            >
              <option value="featured">Featured Picks</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Customer Rated</option>
            </select>
          </div>
        </div>

        {/* Active Filter Pills Bar */}
        {activeFilterCount > 0 && (
          <div className="mb-6 flex items-center gap-2 flex-wrap">
            <span className="text-xs text-text-muted font-medium">Active Filters:</span>
            {Object.entries(filters).flatMap(([key, values]) =>
              values.map((val) => (
                <button
                  key={`${key}-${val}`}
                  type="button"
                  onClick={() => toggleFilter(key as FilterKey, val)}
                  className="inline-flex items-center gap-1.5 bg-brand-purple-light text-brand-purple font-semibold text-xs px-2.5 py-1 rounded-full hover:bg-brand-purple/20 transition-colors"
                >
                  <span>{val}</span>
                  <X className="w-3 h-3" />
                </button>
              ))
            )}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="h-6 px-2 text-xs text-brand-coral hover:text-brand-coral font-bold"
            >
              Clear All
            </Button>
          </div>
        )}

        {/* Main Layout: Sidebar Filters + Products Grid */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
          
          {/* Sidebar Filter Component */}
          <aside
            className={`rounded-3xl border border-[#EFECE6] bg-white p-5 shadow-xs lg:sticky lg:top-24 ${
              mobileFilterOpen ? 'block fixed inset-4 z-50 overflow-y-auto bg-white shadow-2xl' : 'hidden lg:block'
            }`}
          >
            <div className="flex items-center justify-between border-b border-[#EFECE6] pb-4 mb-2">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-brand-purple" />
                <h2 className="font-heading text-base font-extrabold text-text-main">
                  Filter Products
                </h2>
              </div>
              
              <div className="flex items-center gap-2">
                {activeFilterCount > 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}
                    className="h-7 px-2 text-xs text-text-muted hover:text-brand-coral"
                  >
                    Clear all
                  </Button>
                )}
                {mobileFilterOpen && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="iconSm"
                    onClick={() => setMobileFilterOpen(false)}
                    className="lg:hidden rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>

            <FilterGroup
              title="Gender"
              filterKey="gender"
              options={genderOptions}
              selected={filters.gender}
              onToggle={toggleFilter}
            />

            <FilterGroup
              title="Age Group"
              filterKey="age"
              options={ageOptions}
              selected={filters.age}
              onToggle={toggleFilter}
            />

            <FilterGroup
              title="Available Sizes"
              filterKey="size"
              options={sizeOptions}
              selected={filters.size}
              onToggle={toggleFilter}
            />

            <FilterGroup
              title="Color Shades"
              filterKey="color"
              options={colorOptions}
              selected={filters.color}
              onToggle={toggleFilter}
            />

            <FilterGroup
              title="Price Range"
              filterKey="price"
              options={priceOptions}
              selected={filters.price}
              onToggle={toggleFilter}
            />

            <FilterGroup
              title="Special Offers"
              filterKey="discount"
              options={discountOptions}
              selected={filters.discount}
              onToggle={toggleFilter}
            />

            {mobileFilterOpen && (
              <Button
                type="button"
                variant="default"
                size="lg"
                onClick={() => setMobileFilterOpen(false)}
                className="w-full mt-6 rounded-2xl font-bold text-sm"
              >
                Apply Filters ({sortedProducts.length} Results)
              </Button>
            )}
          </aside>

          {/* Products Grid */}
          <div className="space-y-6">
            {sortedProducts.length === 0 ? (
              <div className="rounded-3xl border border-[#EFECE6] bg-white p-12 text-center shadow-xs">
                <div className="w-16 h-16 rounded-2xl bg-brand-purple-light text-brand-purple flex items-center justify-center mx-auto mb-4">
                  <RotateCcw className="w-8 h-8" />
                </div>
                <h3 className="font-heading text-xl font-bold text-text-main mb-2">
                  No matching products found
                </h3>
                <p className="text-text-muted text-sm max-w-md mx-auto mb-6">
                  We couldn't find any items matching your selected criteria in this category. Try clearing some filters or browse our full collection.
                </p>
                <div className="flex items-center justify-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetFilters}
                    className="rounded-xl text-xs font-bold"
                  >
                    Reset Filters
                  </Button>
                  <Button
                    type="button"
                    variant="default"
                    asChild
                    className="rounded-xl text-xs font-bold"
                  >
                    <Link href="/products">
                      Browse All Products
                    </Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                {sortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isWishlisted={wishlistIds.includes(product.id)}
                    onToggleWishlist={handleToggleWishlist}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </main>
  );
};

interface FilterGroupProps {
  title: string;
  options: string[];
  filterKey: FilterKey;
  selected: string[];
  onToggle: (filterKey: FilterKey, option: string) => void;
}

function FilterGroup({
  title,
  options,
  filterKey,
  selected,
  onToggle,
}: FilterGroupProps) {
  const [isOpen, setIsOpen] = useState(true);
  const baseId = useId();

  return (
    <section className="border-b border-[#EFECE6] py-3.5 last:border-b-0">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="flex w-full items-center justify-between text-left cursor-pointer group"
        aria-expanded={isOpen}
      >
        <span className="text-xs font-extrabold text-text-main group-hover:text-brand-purple transition-colors uppercase tracking-wider">
          {title}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-text-muted transition-transform duration-200 ${isOpen ? '' : '-rotate-90'}`}
        />
      </button>

      {isOpen && (
        <div className="mt-3 space-y-2">
          {options.map((option) => {
            const inputId = `${baseId}-${filterKey}-${option.replace(/\s+/g, '-')}`;

            return (
              <label
                key={option}
                htmlFor={inputId}
                className="flex cursor-pointer items-center gap-2.5 text-xs text-text-main hover:text-brand-purple transition-colors"
              >
                <input
                  id={inputId}
                  type="checkbox"
                  checked={selected.includes(option)}
                  onChange={() => onToggle(filterKey, option)}
                  className="h-4 w-4 rounded border-[#D9D2C8] accent-brand-purple cursor-pointer"
                />
                <span className={selected.includes(option) ? 'font-bold text-brand-purple' : 'font-medium'}>
                  {option}
                </span>
              </label>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default ProductListingView;
