import React from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export interface ProductCardProps {
  product: Product;
  isWishlisted?: boolean;
  isAdded?: boolean;
  onToggleWishlist?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
  onAddToCart?: (product: Product, selectedColor: string, selectedSize: string, qty: number) => void;
  selectedColor?: string;
  onSelectColor?: (colorName: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, isWishlisted = false, isAdded = false, onToggleWishlist, onAddToCart, selectedColor: controlledColor, }) => {
  const activeColorName = controlledColor !== undefined ? controlledColor : (product.colors[0]?.name || '');
  const activeColorObj = product.colors.find((c) => c.name === activeColorName) || product.colors[0];

  return (
    <div className="group bg-card rounded-xl border border-[#EFECE6] hover:border-brand-purple/30 hover:shadow-soft transition-all duration-300 flex flex-col justify-between relative">
      {/* Image / Video Frame with Link to Product Details */}
      <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#FAF8F3] mb-3.5">
        <Link href={`/product/${product.id}`} className="block w-full h-full relative">
          {product.videoUrl ? (
            <video
              src={product.videoUrl}
              poster={activeColorObj?.image || product.featuredImage}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <img
              src={activeColorObj?.image || product.featuredImage}
              alt={product.name}
              className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          )}
        </Link>

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.badges?.includes('sale') && product.discountPercent && (
            <span className="bg-brand-coral text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
              {product.discountPercent}% OFF
            </span>
          )}
          {product.badges?.includes('new') && (
            <span className="bg-brand-yellow text-text-main text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
              New
            </span>
          )}
        </div>

        {/* Floating Actions */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
          {onToggleWishlist && (
            <Button
              type="button"
              variant="ghost"
              size="iconSm"
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist(product);
              }}
              className={`rounded-full transition-all cursor-pointer ${isWishlisted
                  ? 'bg-brand-coral text-white shadow-md hover:bg-brand-coral hover:text-white'
                  : 'bg-white/90 backdrop-blur-sm text-text-muted hover:text-brand-coral hover:bg-white shadow-sm'
                }`}
              title="Save to Wishlist"
              aria-label="Wishlist"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
            </Button>
          )}
        </div>
      </div>

      {/* Info & Add to Cart */}
      <div className="space-y-2 px-3 pb-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-brand-purple font-semibold text-[11px] uppercase tracking-wider">
            {product.category}
          </span>
          <div className="flex items-center gap-1 text-text-muted font-medium">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-text-main font-bold">{product.rating}</span>
            <span className="text-[11px]">({product.reviewsCount})</span>
          </div>
        </div>

        <Link
          href={`/product/${product.id}`}
          className="font-body text-xs sm:text-sm text-text-main hover:text-brand-purple line-clamp-1 cursor-pointer transition-colors block"
        >
          {product.name}
        </Link>

        {/* Price Row */}
        <div className="flex items-center justify-between pt-2 border-t border-[#F4EFEA]">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-body text-md sm:text-lg font-bold text-brand-purple">
                ₹{product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-text-muted line-through font-medium">
                  ₹{product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <Button
            type="button"
            variant={isAdded ? "default" : "yellow"}
            size="sm"
            onClick={() => onAddToCart?.(product, activeColorName, product.sizes[0] || 'Standard', 1)}
            className="cursor-pointer shadow-xs rounded-full w-10 h-10"
            title="Add to shopping bag"
          >
            <ShoppingCart className='w-4 h-4 '/>
          </Button>
        </div>
      </div>
    </div>
  );
};
