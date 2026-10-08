import React, { useState, useEffect } from 'react';
import { X, Star, ShoppingBag, Heart, Sparkles, Check, Minus, Plus } from 'lucide-react';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, selectedColor: string, selectedSize: string, qty: number) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
}) => {
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImage, setActiveImage] = useState<string>('');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (product) {
      const defaultColor = product.colors[0]?.name || '';
      const defaultSize = product.sizes[0] || 'Standard';
      setSelectedColor(defaultColor);
      setSelectedSize(defaultSize);
      setQuantity(1);
      setActiveImage(product.colors[0]?.image || product.featuredImage);
    }
  }, [product]);

  if (!product) return null;

  const handleColorChange = (colorName: string) => {
    setSelectedColor(colorName);
    const found = product.colors.find((c) => c.name === colorName);
    if (found?.image) {
      setActiveImage(found.image);
    }
  };

  const handleAdd = () => {
    onAddToCart(product, selectedColor, selectedSize, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-text-main/50 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative bg-white rounded-4xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-[#EBE7DF] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <Button
          type="button"
          variant="ghost"
          size="iconSm"
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full bg-background hover:bg-brand-purple-light text-text-muted hover:text-brand-purple transition-colors z-10 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left: Product Images */}
          <div className="md:col-span-6 space-y-3">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-background border border-[#EFECE6]">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              {product.badges?.includes('sale') && product.discountPercent && (
                <span className="absolute top-3 left-3 bg-brand-coral text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  {product.discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <button
                type="button"
                onClick={() => setActiveImage(product.featuredImage)}
                className={`w-14 h-14 rounded-xl overflow-hidden border-2 flex-shrink-0 cursor-pointer transition-all ${
                  activeImage === product.featuredImage ? 'border-brand-purple shadow-xs scale-105' : 'border-[#EFECE6] hover:border-brand-purple/50'
                }`}
              >
                <img src={product.featuredImage} alt="Thumb 1" className="w-full h-full object-cover" />
              </button>

              {product.secondaryImage && (
                <button
                  type="button"
                  onClick={() => setActiveImage(product.secondaryImage!)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 flex-shrink-0 cursor-pointer transition-all ${
                    activeImage === product.secondaryImage ? 'border-brand-purple shadow-xs scale-105' : 'border-[#EFECE6] hover:border-brand-purple/50'
                  }`}
                >
                  <img src={product.secondaryImage} alt="Thumb 2" className="w-full h-full object-cover" />
                </button>
              )}

              {product.colors.map((c) => (
                <button
                  type="button"
                  key={c.name}
                  onClick={() => {
                    setSelectedColor(c.name);
                    setActiveImage(c.image);
                  }}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 flex-shrink-0 cursor-pointer transition-all ${
                    activeImage === c.image ? 'border-brand-purple shadow-xs scale-105' : 'border-[#EFECE6] hover:border-brand-purple/50'
                  }`}
                >
                  <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Details & Controls */}
          <div className="md:col-span-6 space-y-4">
            
            {/* Category & Ratings */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-purple">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-xs">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-bold text-text-main">{product.rating}</span>
                <span className="text-text-muted">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            {/* Title & Price */}
            <div>
              <h3 className="font-heading text-2xl font-extrabold text-text-main">
                {product.name}
              </h3>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-heading text-2xl font-extrabold text-brand-purple">
                  ₹{product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-text-muted line-through font-medium">
                    ₹{product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
              {product.description}
            </p>

            {/* Fabric Guarantee */}
            <div className="bg-brand-mint-light/70 p-3 rounded-2xl border border-emerald-200 flex items-center gap-2.5 text-xs text-emerald-900 font-medium">
              <Sparkles className="w-4 h-4 text-emerald-700 flex-shrink-0" />
              <span>{product.fabric}</span>
            </div>

            {/* Color Swatches */}
            <div>
              <label className="text-xs font-bold text-text-main block mb-2">
                Color: <span className="font-normal text-text-muted">{selectedColor}</span>
              </label>
              <div className="flex items-center gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => handleColorChange(c.name)}
                    style={{ backgroundColor: c.hex }}
                    className={`w-7 h-7 rounded-full border transition-all cursor-pointer ${
                      selectedColor === c.name
                        ? 'ring-2 ring-brand-purple ring-offset-2 scale-110 border-white shadow-xs'
                        : 'border-black/15 hover:scale-105'
                    }`}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-text-main">Select Size:</label>
                <span className="text-[11px] text-brand-purple font-semibold hover:underline cursor-pointer">
                  Size Guide
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((s) => (
                  <Button
                    key={s}
                    type="button"
                    variant={selectedSize === s ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSize(s)}
                    className={`h-9 px-1 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                      selectedSize === s
                        ? 'shadow-xs'
                        : 'hover:border-brand-purple'
                    }`}
                  >
                    {s}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="pt-2 flex items-center gap-3">
              {/* Quantity Stepper */}
              <div className="flex items-center border border-[#DDD8CE] rounded-2xl bg-background p-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="iconSm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="size-8 rounded-xl bg-white hover:bg-brand-purple-light font-bold text-text-main transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </Button>
                <span className="w-8 text-center text-xs font-bold">{quantity}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="iconSm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="size-8 rounded-xl bg-white hover:bg-brand-purple-light font-bold text-text-main transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </Button>
              </div>

              {/* Add to Cart Button */}
              <Button
                type="button"
                variant={added ? "default" : "yellow"}
                size="lg"
                onClick={handleAdd}
                className={`flex-1 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-card ${
                  added ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : ''
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag • ₹{(product.price * quantity).toFixed(2)}</span>
                  </>
                )}
              </Button>

              {/* Wishlist Button */}
              <Button
                type="button"
                variant={isWishlisted ? "destructive" : "outline"}
                size="lg"
                onClick={() => onToggleWishlist(product)}
                className={`size-12 px-0 rounded-2xl transition-colors cursor-pointer shrink-0 ${
                  isWishlisted ? 'bg-brand-coral hover:bg-brand-coral-dark text-white' : ''
                }`}
                title="Save to Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-white' : ''}`} />
              </Button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
