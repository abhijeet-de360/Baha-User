import type { Product } from '../types';

export interface SizeChartEntry {
  size: string;
  age: string;
  heightCm: string;
  heightInches: string;
  chestCm: string;
  chestInches: string;
  waistCm: string;
  waistInches: string;
}

export const BABY_SIZE_CHART: SizeChartEntry[] = [
  { size: '0-3M', age: '0 - 3 Months', heightCm: '52 - 62 cm', heightInches: '20.5 - 24.5 in', chestCm: '40 - 43 cm', chestInches: '15.5 - 17.0 in', waistCm: '40 - 43 cm', waistInches: '15.5 - 17.0 in' },
  { size: '3-6M', age: '3 - 6 Months', heightCm: '62 - 68 cm', heightInches: '24.5 - 26.8 in', chestCm: '43 - 45 cm', chestInches: '17.0 - 17.7 in', waistCm: '43 - 45 cm', waistInches: '17.0 - 17.7 in' },
  { size: '6-12M', age: '6 - 12 Months', heightCm: '68 - 76 cm', heightInches: '26.8 - 30.0 in', chestCm: '45 - 48 cm', chestInches: '17.7 - 18.9 in', waistCm: '45 - 47 cm', waistInches: '17.7 - 18.5 in' },
  { size: '12-18M', age: '12 - 18 Months', heightCm: '76 - 83 cm', heightInches: '30.0 - 32.7 in', chestCm: '48 - 50 cm', chestInches: '18.9 - 19.7 in', waistCm: '47 - 49 cm', waistInches: '18.5 - 19.3 in' },
  { size: '18-24M', age: '18 - 24 Months', heightCm: '83 - 90 cm', heightInches: '32.7 - 35.4 in', chestCm: '50 - 52 cm', chestInches: '19.7 - 20.5 in', waistCm: '49 - 51 cm', waistInches: '19.3 - 20.1 in' },
];

export const KIDS_SIZE_CHART: SizeChartEntry[] = [
  { size: '2T', age: '2 Years', heightCm: '88 - 94 cm', heightInches: '34.6 - 37.0 in', chestCm: '51 - 53 cm', chestInches: '20.0 - 20.8 in', waistCm: '50 - 51 cm', waistInches: '19.7 - 20.0 in' },
  { size: '3T', age: '3 Years', heightCm: '94 - 100 cm', heightInches: '37.0 - 39.4 in', chestCm: '53 - 55 cm', chestInches: '20.8 - 21.6 in', waistCm: '51 - 52 cm', waistInches: '20.0 - 20.5 in' },
  { size: '4T', age: '4 Years', heightCm: '100 - 108 cm', heightInches: '39.4 - 42.5 in', chestCm: '55 - 58 cm', chestInches: '21.6 - 22.8 in', waistCm: '52 - 54 cm', waistInches: '20.5 - 21.2 in' },
  { size: '5T / 5-6Y', age: '5 - 6 Years', heightCm: '108 - 116 cm', heightInches: '42.5 - 45.7 in', chestCm: '58 - 62 cm', chestInches: '22.8 - 24.4 in', waistCm: '54 - 56 cm', waistInches: '21.2 - 22.0 in' },
  { size: '6-7Y', age: '6 - 7 Years', heightCm: '116 - 124 cm', heightInches: '45.7 - 48.8 in', chestCm: '62 - 65 cm', chestInches: '24.4 - 25.6 in', waistCm: '56 - 58 cm', waistInches: '22.0 - 22.8 in' },
  { size: '8-9Y', age: '8 - 9 Years', heightCm: '128 - 138 cm', heightInches: '50.4 - 54.3 in', chestCm: '65 - 70 cm', chestInches: '25.6 - 27.5 in', waistCm: '58 - 62 cm', waistInches: '22.8 - 24.4 in' },
];

export function getEnhancedProduct(product: Product): Product {
  const isBaby = product.ageGroup === 'baby' || product.sizes.some(s => s.includes('M'));
  
  // Gallery images collection
  const gallery = [
    product.featuredImage,
    ...(product.secondaryImage ? [product.secondaryImage] : []),
    ...product.colors.map(c => c.image).filter(img => img !== product.featuredImage && img !== product.secondaryImage),
  ];

  // Unique gallery
  const uniqueGallery = Array.from(new Set(gallery));

  // Compute SKU
  const sku = product.sku || `BAH-${product.category.substring(0, 3).toUpperCase()}-${product.id.replace('prod-', '').padStart(4, '0')}`;

  // Stock count
  const stockCount = product.stockCount !== undefined ? product.stockCount : 12;

  // Age suitability
  const ageSuitability = product.ageSuitability || (isBaby ? '0 - 24 Months (Newborn & Baby)' : '2 - 9 Years (Toddler & Kids)');

  // Care instructions
  const careInstructions = product.careInstructions || [
    'Machine wash gentle cold (30°C / 85°F)',
    'Use mild, baby-safe organic detergent',
    'Do not bleach or dry clean',
    'Tumble dry low or line dry in shade',
    'Warm iron on reverse if needed'
  ];

  // Specifications
  const specifications = product.specifications || [
    { label: 'Category', value: product.category },
    { label: 'Department / Gender', value: product.gender === 'boys' ? 'Boys' : product.gender === 'girls' ? 'Girls' : 'Unisex Kids' },
    { label: 'Material / Fabric', value: product.fabric },
    { label: 'Fit Type', value: 'Comfort Fit (Relaxed for easy movement)' },
    { label: 'Closure Type', value: isBaby ? 'Snaps at bottom & wooden shoulder buttons' : 'Soft elastic waistband & button front' },
    { label: 'Pattern', value: 'Solid / Subtle Embroidered Texture' },
    { label: 'Origin', value: 'Crafted in India with GOTS Certified Cotton' },
    { label: 'Season', value: 'All-Season / Spring-Summer Breathable' },
  ];

  // Key Highlights
  const highlights = product.highlights || [
    '100% GOTS certified organic fabric gentle on sensitive skin',
    'Flatlock zero-itch tagless seams for all-day comfort',
    'Pre-washed and shrink-resistant for active daily play',
    'Lead-free, nickel-free snap buttons for easy diaper changes & dressing',
  ];

  return {
    ...product,
    sku,
    stockCount,
    ageSuitability,
    careInstructions,
    specifications,
    highlights,
    galleryImages: uniqueGallery.length > 0 ? uniqueGallery : [product.featuredImage],
  };
}
