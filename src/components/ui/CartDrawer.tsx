'use client';

import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, ArrowRight, Sparkles, Tag, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { useShop } from "@/context/ShopContext";

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen: isOpen,
    setIsCartOpen,
    cartItems: items,
    handleUpdateQuantity: onUpdateQuantity,
    handleRemoveItem: onRemoveItem,
    handleClearCart: onClearCart,
    appliedPromo,
    handleApplyPromo: onApplyPromo,
  } = useShop();

  const onClose = () => setIsCartOpen(false);

  const [promoInput, setPromoInput] = useState(appliedPromo || '');
  const [promoMessage, setPromoMessage] = useState<{ text: string; success: boolean } | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const FREE_SHIPPING_THRESHOLD = 999.0;
  
  // Calculate Subtotal
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Promo discount calculation
  let discountPercent = 0;
  if (appliedPromo.toUpperCase() === 'LITTLEJOY10') discountPercent = 10;
  if (appliedPromo.toUpperCase() === 'WELCOME15') discountPercent = 15;
  
  const discountAmount = (subtotal * discountPercent) / 100;
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || items.length === 0;
  const shippingCost = isFreeShipping ? 0 : 99.0;
  const total = Math.max(0, subtotal - discountAmount + shippingCost);

  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const totalItemCount = items.reduce((acc, i) => acc + i.quantity, 0);

  const handleApplyPromoCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    
    const res = onApplyPromo(promoInput.trim());
    setPromoMessage({ text: res.message, success: res.success });
    if (res.success) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#6C63A8', '#FFD66B', '#A9D8B8', '#F28C82'],
    });
    setTimeout(() => {
      alert(`🎉 Demo Order Placed Successfully!\n\nTotal Paid: ₹${total.toFixed(2)}\nItems: ${items.length}\nThank you for choosing Baha Fashion!`);
      onClearCart();
      setIsCheckingOut(false);
      onClose();
    }, 1200);
  };

  return (
    <Drawer 
      direction="right" 
      open={isOpen} 
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DrawerContent className="fixed inset-y-0 right-0 z-50 flex h-full w-full sm:max-w-md flex-col justify-between bg-white shadow-2xl border-l border-[#EFECE6] rounded-none">
        
        {/* Drawer Header */}
        <DrawerHeader className="p-5 sm:p-6 border-b border-[#EFECE6] bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-brand-yellow flex items-center justify-center text-text-main font-bold shadow-xs">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <DrawerTitle className="font-heading text-lg sm:text-xl font-bold text-text-main">
                  Your Shopping Bag
                </DrawerTitle>
                <DrawerDescription className="text-xs text-text-muted">
                  {totalItemCount} item(s) selected
                </DrawerDescription>
              </div>
            </div>

            <DrawerClose asChild>
              <Button
                type="button"
                variant="ghost"
                size="iconSm"
                onClick={onClose}
                className="rounded-xl text-text-muted hover:text-text-main hover:bg-background transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </Button>
            </DrawerClose>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="mt-4 bg-background p-3 rounded-2xl border border-[#EBE7DF]">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              {amountToFreeShipping > 0 ? (
                <span className="text-text-main">
                  Add <strong className="text-brand-purple">₹{amountToFreeShipping.toFixed(2)}</strong> for FREE Shipping!
                </span>
              ) : (
                <span className="text-emerald-700 flex items-center gap-1 font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-brand-yellow fill-brand-yellow" /> You unlocked FREE Shipping!
                </span>
              )}
              <span className="text-text-muted">{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full h-2 bg-[#E9E4DA] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-yellow to-brand-mint transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </DrawerHeader>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5">
          {items.length > 0 ? (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3.5 p-3 bg-background rounded-2xl border border-[#EFECE6] relative group hover:border-brand-purple/20 transition-all"
              >
                <img
                  src={item.product.featuredImage}
                  alt={item.product.name}
                  className="w-20 h-24 object-cover rounded-xl bg-white shrink-0 border border-[#EAE5DC]"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-heading text-sm font-bold text-text-main line-clamp-1">
                        {item.product.name}
                      </h4>
                      <Button
                        type="button"
                        variant="ghost"
                        size="iconSm"
                        onClick={() => onRemoveItem(item.id)}
                        className="text-text-light hover:text-brand-coral p-1 cursor-pointer transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-text-muted mt-1">
                      <span className="bg-white px-2 py-0.5 rounded-md border border-[#EAE5DC] font-medium">
                        Size: <strong>{item.selectedSize}</strong>
                      </span>
                      <span className="bg-white px-2 py-0.5 rounded-md border border-[#EAE5DC] font-medium">
                        {item.selectedColor}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2.5">
                    {/* Quantity Stepper */}
                    <div className="flex items-center bg-white border border-[#DDD8CE] rounded-xl overflow-hidden">
                      <Button
                        type="button"
                        variant="ghost"
                        size="iconSm"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center text-xs font-bold hover:bg-brand-purple-light transition-colors cursor-pointer rounded-none p-0"
                      >
                        -
                      </Button>
                      <span className="w-7 text-center text-xs font-bold">{item.quantity}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="iconSm"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center text-xs font-bold hover:bg-brand-purple-light transition-colors cursor-pointer rounded-none p-0"
                      >
                        +
                      </Button>
                    </div>

                    <span className="font-heading text-base font-extrabold text-brand-purple">
                      ₹{(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-brand-yellow-light rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                🛍️
              </div>
              <h4 className="font-heading text-lg font-bold text-text-main mb-1">
                Your bag is empty
              </h4>
              <p className="text-xs text-text-muted mb-6 max-w-xs mx-auto">
                Add some organic rompers, party dresses, ethnic kurtas or sneakers to get started!
              </p>
              <Button
                type="button"
                onClick={onClose}
                className="bg-brand-purple hover:bg-brand-purple-dark text-white rounded-xl font-bold text-xs shadow-sm"
              >
                Start Shopping
              </Button>
            </div>
          )}
        </div>

        {/* Drawer Footer (Summary & Checkout) */}
        {items.length > 0 && (
          <div className="p-5 sm:p-6 border-t border-[#EFECE6] bg-white space-y-4">
            
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromoCode} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Coupon (e.g. LITTLEJOY10)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-background border border-[#DDD8CE] text-text-main uppercase font-bold focus:outline-none focus:ring-1 focus:ring-brand-purple"
                />
              </div>
              <Button
                type="submit"
                size="sm"
                className="bg-brand-purple hover:bg-brand-purple-dark text-white rounded-xl text-xs font-bold"
              >
                Apply
              </Button>
            </form>

            {promoMessage && (
              <p className={`text-[11px] font-semibold ${promoMessage.success ? 'text-emerald-700' : 'text-brand-coral'}`}>
                {promoMessage.text}
              </p>
            )}

            {/* Price Breakdown */}
            <div className="space-y-1.5 text-xs text-text-muted pt-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-text-main">₹{subtotal.toFixed(2)}</span>
              </div>
              
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Discount ({discountPercent}%)</span>
                  <span>-₹{discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{isFreeShipping ? <strong className="text-emerald-700">FREE</strong> : `₹${shippingCost.toFixed(2)}`}</span>
              </div>

              <div className="flex justify-between text-sm font-heading font-extrabold text-text-main pt-2.5 border-t border-[#EFECE6]">
                <span>Estimated Total</span>
                <span className="text-brand-purple text-lg font-extrabold">₹{total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <Button
              type="button"
              variant="yellow"
              size="lg"
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full rounded-2xl font-bold text-sm sm:text-base shadow-card hover:shadow-glow-yellow"
            >
              {isCheckingOut ? (
                <span>Processing Demo Order...</span>
              ) : (
                <>
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-text-light text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>30-Day Happiness Guarantee • Free Returns</span>
            </div>
          </div>
        )}

      </DrawerContent>
    </Drawer>
  );
};
