import { useState, useEffect } from 'react';
import type { Product, CartItem } from '@/types';
import mockData from '@/data/mockData.json';

export interface ToastMessage {
  id: string;
  type: 'cart' | 'wishlist' | 'promo';
  title: string;
  message: string;
  image?: string;
}

const MOCK_PRODUCTS = mockData.products as Product[];

const INITIAL_CART: CartItem[] = [
  {
    id: 'prod-1-Honey Dijon-3-6M',
    product: MOCK_PRODUCTS[0],
    selectedColor: 'Honey Dijon',
    selectedSize: '3-6M',
    quantity: 1,
  }
];

const INITIAL_WISHLIST: string[] = ['prod-3'];

export function useShopState() {
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState<string>('LITTLEJOY10');
  const [wishlistIds, setWishlistIds] = useState<string[]>(INITIAL_WISHLIST);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Load state from LocalStorage after hydration
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('baha_cart_items');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
      const savedWishlist = localStorage.getItem('baha_wishlist_ids');
      if (savedWishlist) {
        setWishlistIds(JSON.parse(savedWishlist));
      }
    } catch {
      // Ignore storage read errors
    }
    setIsMounted(true);
  }, []);

  // Sync with LocalStorage after mount
  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem('baha_cart_items', JSON.stringify(cartItems));
    } catch {
      // Ignore storage errors
    }
  }, [cartItems, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem('baha_wishlist_ids', JSON.stringify(wishlistIds));
    } catch {
      // Ignore storage errors
    }
  }, [wishlistIds, isMounted]);

  // Auto-dismiss toast
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  // Add to cart
  const handleAddToCart = (product: Product, selectedColor: string, selectedSize: string, qty: number = 1) => {
    const compositeId = `${product.id}-${selectedColor}-${selectedSize}`;
    
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === compositeId);
      if (existing) {
        return prev.map((item) =>
          item.id === compositeId ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [
        ...prev,
        {
          id: compositeId,
          product,
          selectedColor,
          selectedSize,
          quantity: qty,
        },
      ];
    });

    setToast({
      id: Date.now().toString(),
      type: 'cart',
      title: 'Added to Bag! 🎉',
      message: `${qty}x ${product.name} (${selectedSize} / ${selectedColor})`,
      image: product.featuredImage,
    });
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
      );
    }
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleToggleWishlist = (product: Product, showToast: boolean = true) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        if (showToast) {
          setToast({
            id: Date.now().toString(),
            type: 'wishlist',
            title: 'Removed from Saved',
            message: `${product.name} removed from wishlist.`,
          });
        }
        return prev.filter((id) => id !== product.id);
      } else {
        if (showToast) {
          setToast({
            id: Date.now().toString(),
            type: 'wishlist',
            title: 'Saved to Wishlist! ♥',
            message: `${product.name} saved for later.`,
            image: product.featuredImage,
          });
        }
        return [...prev, product.id];
      }
    });
  };

  const handleApplyPromo = (code: string) => {
    if (code.toUpperCase() === 'LITTLEJOY10') {
      setAppliedPromo('LITTLEJOY10');
      return { success: true, message: '🎉 Code LITTLEJOY10 applied (10% OFF)!', discountPercent: 10 };
    }
    if (code.toUpperCase() === 'WELCOME15') {
      setAppliedPromo('WELCOME15');
      return { success: true, message: '🎉 Code WELCOME15 applied (15% OFF)!', discountPercent: 15 };
    }
    return { success: false, message: '❌ Invalid coupon code. Try LITTLEJOY10 or WELCOME15', discountPercent: 0 };
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return {
    cartItems,
    setCartItems,
    isCartOpen,
    setIsCartOpen,
    appliedPromo,
    setAppliedPromo,
    wishlistIds,
    setWishlistIds,
    toast,
    setToast,
    totalCartCount,
    handleAddToCart,
    handleUpdateQuantity,
    handleRemoveItem,
    handleClearCart,
    handleToggleWishlist,
    handleApplyPromo,
  };
}