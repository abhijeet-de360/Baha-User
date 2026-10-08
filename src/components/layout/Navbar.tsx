'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Search, ShoppingBag, Heart, User, Menu, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useShopState } from '@/hooks/useShopState';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const Navbar: React.FC = () => {
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('');

  const { totalCartCount: cartCount, wishlistIds, setIsCartOpen } = useShopState();

  const wishlistCount = useMemo(() => wishlistIds.length, [wishlistIds]);

  const navLinks = [
    { label: 'New Arrivals', value: 'all' },
    { label: 'Boys', value: 'boys' },
    { label: 'Girls', value: 'girls' },
    { label: 'Baby', value: 'baby' },
    { label: 'Ethnic Wear', value: 'ethnic' },
    { label: 'Party Wear', value: 'party' },
    { label: 'Casual Wear', value: 'casual' },
    { label: 'Sale', value: 'sale', isSale: true },
  ];

  const popularTags = ['Linen Romper', 'Twirl Dress', 'Dino Tee', 'Ethnic Kurta', 'Party Frock'];

  useEffect(() => {
    const syncUrlState = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const query = searchParams.get('search') || '';

      setSearchQuery(query);
      setSearchInput(query);
      setActiveCategory(searchParams.get('category') || '');
    };

    syncUrlState();
    window.addEventListener('popstate', syncUrlState);

    return () => window.removeEventListener('popstate', syncUrlState);
  }, []);

  const onSearchChange = (q: string) => {
    setSearchInput(q);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput === searchQuery) return; // No change, do nothing

      const searchParams = new URLSearchParams(window.location.search);

      if (searchInput) {
        searchParams.set('search', searchInput);
      } else {
        searchParams.delete('search');
      }

      router.push(`/products?${searchParams.toString()}`);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput, searchQuery, router]);

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#EFECE6] transition-all shadow-xs">
      <div className="container">
        <div className="flex items-center justify-between py-3.5 gap-4">

          {/* Left Side: Hamburger Menu (mobile) & Brand Logo */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="rounded-xl text-text-main hover:bg-brand-purple-light transition-colors -ml-1.5"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>

            {/* Brand Logo */}
            <Link
              href="/"
              // onClick={() => {
              //   onSelectCategory('all');
              //   document.getElementById('featured-collection')?.scrollIntoView({ behavior: 'smooth' });
              // }} 
              className="group text-left cursor-pointer focus:outline-none transition-transform active:scale-98"
            >
              <div className="flex items-center gap-2">
                <span className="font-heading text-2xl sm:text-3xl font-black text-brand-purple tracking-tight block leading-none">
                  Baha <span className="text-brand-yellow">Fashion</span>
                </span>
              </div>
            </Link>
          </div>

          {/* Middle Desktop Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
            {navLinks.map((link) => {
              const isActive = activeCategory === link.value;
              return (
                <Link
                  key={link.label}
                  href={`/products/category/${encodeURIComponent(link.value)}`}
                  onClick={() => setActiveCategory(link.value)}
                  // onClick={() => {
                  //   onSelectCategory(link.value);
                  //   document.getElementById('featured-collection')?.scrollIntoView({ behavior: 'smooth' });
                  // }}
                  className={`text-sm font-semibold transition-all relative py-1.5 cursor-pointer ${isActive
                    ? 'text-brand-purple font-bold'
                    : link.isSale
                      ? 'text-brand-coral hover:text-brand-coral/80 font-bold'
                      : 'text-text-main hover:text-brand-purple'
                    }`}
                >
                  <span>{link.label}</span>
                  {link.isSale && (
                    <span className="ml-1.5 text-[10px] bg-brand-coral/10 text-brand-coral px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                      Sale
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-purple rounded-full animate-fade-in" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* 1. Search Icon (Visible on mobile & desktop) */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="rounded-full text-text-main hover:text-brand-purple hover:bg-brand-purple-light"
              title="Search"
              aria-label="Search"
            >
              <Search className="w-5 h-5 stroke-[1.8]" />
            </Button>

            {/* 2. Wishlist Heart Icon (Hidden on mobile) */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => {
                const el = document.getElementById('featured-collection');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hidden sm:inline-flex relative rounded-full text-text-main hover:text-brand-coral hover:bg-red-50"
              title="Saved Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 stroke-[1.8]" />
              {wishlistCount > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-brand-coral text-white text-[10px] font-extrabold size-4 rounded-full flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </Button>

            {/* 3. User / Account Icon (Hidden on mobile) */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setUserModalOpen(!userModalOpen)}
              className="hidden sm:inline-flex rounded-full text-text-main hover:text-brand-purple hover:bg-brand-purple-light"
              title="Account / Parents Club"
              aria-label="Account"
            >
              <User className="w-5 h-5 stroke-[1.8]" />
            </Button>

            {/* 4. Cart Bag Icon with Badge (Hidden on mobile) */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setIsCartOpen(true)}
              className="hidden sm:inline-flex relative rounded-full text-text-main hover:text-brand-purple hover:bg-brand-purple-light"
              title="Shopping Bag"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
              {cartCount > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-brand-purple text-white text-[10px] font-extrabold size-4 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </Button>
          </div>

        </div>

        {/* Expandable Search Bar Dropdown */}
        {isSearchOpen && (
          <div className="py-3 border-t border-[#EFECE6] bg-white/95 rounded-b-2xl px-2 sm:px-4 animate-fade-in shadow-xs">
            <div className="max-w-2xl mx-auto flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search boys shirts, girls dresses, newborn sets, ethnic wear..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full pl-10 pr-9 py-2.5 bg-background rounded-2xl border border-[#DDD8CE] text-sm text-text-main placeholder-text-light focus:outline-none focus:ring-2 focus:ring-brand-purple"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchInput('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(false)}
                className="text-xs font-bold text-text-muted hover:text-text-main"
              >
                Close
              </Button>
            </div>

            {/* Popular tags */}
            <div className="max-w-2xl mx-auto flex items-center gap-2 mt-2.5 overflow-x-auto text-xs text-text-muted pb-1">
              <span className="font-semibold flex items-center gap-1 shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-brand-yellow fill-brand-yellow" /> Popular:
              </span>
              {popularTags.map((tag) => (
                <Button
                  key={tag}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => onSearchChange(tag)}
                  className="h-7 px-3 rounded-full text-xs font-medium border-[#E2DDD5] hover:bg-brand-purple hover:text-white hover:border-brand-purple transition-colors shrink-0"
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* User Account Dropdown Modal / Popover */}
        {userModalOpen && (
          <div className="absolute right-4 sm:right-8 top-20 mt-1 w-72 bg-white rounded-3xl shadow-soft border border-[#EFECE6] p-4 z-50 animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-[#EFECE6]">
              <div>
                <p className="font-heading font-bold text-sm text-text-main">Parent Account</p>
                <p className="text-[11px] text-text-muted">Welcome to Baha Fashion</p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="iconSm"
                onClick={() => setUserModalOpen(false)}
                className="rounded-lg text-text-muted hover:text-text-main"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="py-3 space-y-2 text-xs">
              <button
                type="button"
                onClick={() => {
                  alert('Demo VIP Club: You are currently signed in as a VIP Member!');
                  setUserModalOpen(false);
                }}
                className="w-full text-left p-2 rounded-xl hover:bg-brand-purple-light hover:text-brand-purple font-semibold transition-colors cursor-pointer flex items-center justify-between"
              >
                <span>⭐ VIP Rewards & Points</span>
                <span className="text-brand-purple font-bold">250 pts</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  alert('Demo Order Tracking: All demo orders are delivered within 2-3 business days.');
                  setUserModalOpen(false);
                }}
                className="w-full text-left p-2 rounded-xl hover:bg-brand-purple-light hover:text-brand-purple font-medium transition-colors cursor-pointer"
              >
                📦 Track My Order
              </button>
              <button
                type="button"
                onClick={() => {
                  setUserModalOpen(false);
                  document.getElementById('featured-collection')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full text-left p-2 rounded-xl hover:bg-brand-purple-light hover:text-brand-purple font-medium transition-colors cursor-pointer"
              >
                ♥ Wishlist ({wishlistCount})
              </button>
            </div>
            <Button
              type="button"
              variant="yellow"
              size="default"
              onClick={() => {
                setUserModalOpen(false);
                router.push('/sign-in');
              }}
              className="w-full rounded-xl text-xs font-bold"
            >
              Sign In / Join VIP Club
            </Button>
          </div>
        )}

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#EFECE6] bg-white px-4 py-4 space-y-3 shadow-lg animate-fade-in">
          {/* Mobile Search */}
          <div className="relative w-full rounded-2xl bg-background border border-[#EBE7DF] px-3 py-2 flex items-center">
            <Search className="w-4 h-4 text-text-muted mr-2" />
            <input
              type="text"
              placeholder="Search kids apparel..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-transparent text-sm text-text-main placeholder-text-light focus:outline-none"
            />
          </div>

          <div className="space-y-1.5 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={`/product?category=${encodeURIComponent(link.value)}`}
                onClick={() => {
                  setActiveCategory(link.value);
                  setMobileMenuOpen(false);
                }}
                // variant={selectedCategory === link.value ? "default" : "ghost"}
                // onClick={() => {
                //   onSelectCategory(link.value);
                //   setMobileMenuOpen(false);
                //   document.getElementById('featured-collection')?.scrollIntoView({ behavior: 'smooth' });
                // }}
                className={`w-full justify-between h-10 px-3 rounded-xl text-sm font-semibold ${activeCategory === link.value
                  ? 'font-bold'
                  : 'text-text-main hover:bg-brand-purple-light hover:text-brand-purple'
                  }`}
              >
                <span>{link.label}</span>
                {link.isSale && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${activeCategory === link.value ? 'bg-white text-brand-coral' : 'bg-brand-coral text-white'
                    }`}>
                    Sale
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Quick Mobile Action Links for Cart & Wishlist */}
          <div className="pt-3 border-t border-[#EFECE6] grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsCartOpen(true);
              }}
              className="rounded-xl font-bold justify-center gap-2 h-10 border-[#DDD8CE]"
            >
              <ShoppingBag className="w-4 h-4 text-brand-purple" />
              <span>Bag ({cartCount})</span>
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setMobileMenuOpen(false);
                const el = document.getElementById('featured-collection');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="rounded-xl font-bold justify-center gap-2 h-10 border-[#DDD8CE]"
            >
              <Heart className="w-4 h-4 text-brand-coral" />
              <span>Saved ({wishlistCount})</span>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
