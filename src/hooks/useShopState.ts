import { useState, useEffect } from 'react';
import type { Product, CartItem } from '../types';
import mockData from '../data/mockData.json';

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

export function useShopState() {
  // Cart Items with LocalStorage fallback
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('baha_cart_items');
      return saved ? JSON.parse(saved) : INITIAL_CART;
    } catch {
      return INITIAL_CART;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState<string>('LITTLEJOY10');

  // Wishlist with LocalStorage fallback
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('baha_wishlist_ids');
      return saved ? JSON.parse(saved) : ['prod-3'];
    } catch {
      return ['prod-3'];
    }
  });

  // Toast Notifications
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Sync with LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('baha_cart_items', JSON.stringify(cartItems));
    } catch {
      // Ignore storage errors
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('baha_wishlist_ids', JSON.stringify(wishlistIds));
    } catch {
      // Ignore storage errors
    }
  }, [wishlistIds]);

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

  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        setToast({
          id: Date.now().toString(),
          type: 'wishlist',
          title: 'Removed from Saved',
          message: `${product.name} removed from wishlist.`,
        });
        return prev.filter((id) => id !== product.id);
      } else {
        setToast({
          id: Date.now().toString(),
          type: 'wishlist',
          title: 'Saved to Wishlist! ♥',
          message: `${product.name} saved for later.`,
          image: product.featuredImage,
        });
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
