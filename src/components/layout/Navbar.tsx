'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Search, ShoppingBag, Heart, User, Menu, X, Sparkles, ChevronRight } from 'lucide-react';
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

  const { totalCartCount: cartCount, wishlistIds } = useShopState();

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

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setIsSearchOpen(false);
        setUserModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
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
                  onClick={() => setMobileMenuOpen(true)}
                  className="rounded-xl text-text-main hover:bg-brand-purple-light transition-colors -ml-1.5 cursor-pointer"
                  aria-label="Open navigation menu"
                >
                  <Menu className="w-6 h-6" />
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
              onClick={() => router.push('/wishlist')}
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
              onClick={() => {
                try {
                  const isAuth = localStorage.getItem('isAuthenticated') === 'true';
                  if (isAuth) {
                    router.push('/profile');
                  } else {
                    router.push('/sign-in');
                  }
                } catch {
                  router.push('/sign-in');
                }
              }}
              className="hidden sm:inline-flex rounded-full text-text-main hover:text-brand-purple hover:bg-brand-purple-light cursor-pointer"
              title="Account / Sign In"
              aria-label="Account"
            >
              <User className="w-5 h-5 stroke-[1.8]" />
            </Button>

            {/* 4. Cart Bag Icon with Badge (Direct link to /cart) */}
            <Link
              href="/cart"
              className="relative inline-flex items-center justify-center p-2 rounded-full text-text-main hover:text-brand-purple hover:bg-brand-purple-light transition-colors cursor-pointer"
              title="Shopping Bag"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-brand-purple text-white text-[10px] font-extrabold size-4 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </Link>
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
                  router.push('/wishlist');
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
    </header>

    {/* Mobile Left Drawer Backdrop */}
    <div
      className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-300 lg:hidden ${
        mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      onClick={() => setMobileMenuOpen(false)}
      aria-hidden={!mobileMenuOpen}
    />

    {/* Mobile Left Slide Drawer */}
    <aside
      className={`fixed top-0 bottom-0 left-0 z-50 w-[84%] max-w-xs sm:max-w-sm bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out lg:hidden ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      aria-label="Mobile Navigation"
      aria-hidden={!mobileMenuOpen}
    >
      {/* Drawer Header with Brand Logo & Close Button */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-[#EFECE6] bg-[#FAF8F5]/80 shrink-0">
        <Link
          href="/"
          onClick={() => setMobileMenuOpen(false)}
          className="group text-left cursor-pointer"
        >
          <div className="flex items-center gap-1.5">
            <span className="font-heading text-xl sm:text-2xl font-black text-brand-purple tracking-tight block leading-none">
              Baha <span className="text-brand-yellow">Fashion</span>
            </span>
          </div>
        </Link>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(false)}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-text-muted hover:text-text-main hover:bg-[#EFECE6] transition-colors cursor-pointer"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Scrollable Navigation List */}
      <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-1">
        <p className="text-[11px] font-bold text-text-light uppercase tracking-wider px-2 mb-2">
          Collections
        </p>
        <div className="space-y-1">
          {navLinks.map((link) => {
            const isActive = activeCategory === link.value;
            return (
              <Link
                key={link.label}
                href={`/products/category/${encodeURIComponent(link.value)}`}
                onClick={() => {
                  setActiveCategory(link.value);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-brand-purple-light text-brand-purple font-bold'
                    : link.isSale
                    ? 'text-brand-coral hover:bg-red-50 font-bold'
                    : 'text-text-main hover:bg-[#F7F5F0]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{link.label}</span>
                  {link.isSale && (
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold bg-brand-coral text-white">
                      Sale
                    </span>
                  )}
                </div>
                <ChevronRight className={`w-4 h-4 ${isActive ? 'text-brand-purple' : 'text-text-light'}`} />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Drawer Bottom Actions */}
      <div className="p-3.5 border-t border-[#EFECE6] bg-[#FAF8F5]/80 space-y-2 shrink-0">
        <div className="grid grid-cols-2 gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setMobileMenuOpen(false);
              router.push('/cart');
            }}
            className="rounded-xl font-bold justify-center gap-1.5 h-9 border-[#DDD8CE] bg-white text-xs cursor-pointer shadow-xs"
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
              router.push('/wishlist');
            }}
            className="rounded-xl font-bold justify-center gap-1.5 h-9 border-[#DDD8CE] bg-white text-xs cursor-pointer shadow-xs"
          >
            <Heart className="w-4 h-4 text-brand-coral" />
            <span>Saved ({wishlistCount})</span>
          </Button>
        </div>

        <Button
          type="button"
          onClick={() => {
            setMobileMenuOpen(false);
            try {
              const isAuth = localStorage.getItem('isAuthenticated') === 'true';
              if (isAuth) {
                router.push('/profile');
              } else {
                router.push('/sign-in');
              }
            } catch {
              router.push('/sign-in');
            }
          }}
          className="w-full rounded-xl font-bold justify-center gap-2 h-10 bg-brand-purple hover:bg-brand-purple/90 text-white text-xs cursor-pointer shadow-xs"
        >
          <User className="w-4 h-4 text-white" />
          <span>My Account</span>
        </Button>
      </div>
    </aside>
  </>
  );
};
