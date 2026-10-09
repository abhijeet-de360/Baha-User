export interface ProductColor {
  name: string;
  hex: string;
  image: string;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  ageGroup: 'baby' | 'toddler' | 'kids' | 'junior' | 'all' | 'newborn';
  gender: 'boys' | 'girls' | 'unisex';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  colors: ProductColor[];
  sizes: string[];
  badges?: ('sale' | 'organic' | 'new' | 'bestseller')[];
  discountPercent?: number;
  description: string;
  fabric: string;
  inStock: boolean;
  featuredImage: string;
  secondaryImage?: string;
  galleryImages?: string[];
  tags: string[];
  // Enhanced Details for Product Page
  sku?: string;
  stockCount?: number;
  ageSuitability?: string;
  careInstructions?: string[];
  specifications?: ProductSpecification[];
  highlights?: string[];
}

export interface CategoryCard {
  id: string;
  slug: string;
  title: string;
  ageLabel: string;
  image: string;
  bgGradient: string;
  accentColor: string;
  itemCount: number;
  popularSearch: string;
}

export interface CartItem {
  id: string; // composite key: `${productId}-${selectedColor}-${selectedSize}`
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

export interface ParentReview {
  id: string;
  author: string;
  role: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
  productName: string;
  verifiedPurchase: boolean;
}

export interface OutfitLook {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  coverImage: string;
  bundlePrice: number;
  originalPrice: number;
  discountPercent: number;
  items: {
    productName: string;
    itemPrice: number;
    category: string;
  }[];
}

export interface InstagramStory {
  id: string;
  kidName: string;
  age: string;
  image: string;
  outfit: string;
  likes: number;
  handle: string;
}

export interface ProductReel {
  id: string;
  title: string;
  handle: string;
  videoUrl: string;
  poster: string;
  likes: string;
  views: string;
  productId: string;
  kidName?: string;
  age?: string;
}

export type ActiveFilterTab = 'all' | 'bestsellers' | 'organic' | 'party' | 'sale';