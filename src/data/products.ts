export interface ProductReview {
  id: string | number;
  author: string;
  relation: string; // e.g. "Rhea's Mom", "Kabir's Dad"
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  childAge?: string;
  avatar?: string;
  photo?: string;
  helpfulCount: number;
}

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface ProductSize {
  label: string;
  age: string;
  inStock: boolean;
  lowStock?: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: string;
  gender: "Girls" | "Boys" | "Unisex";
  price: number;
  originalPrice: number;
  discount: string;
  rating: number;
  reviewsCount: number;
  badge?: string;
  description: string;
  fabric: string;
  features: string[];
  careInstructions: string[];
  images: string[];
  video?: string;
  colors: ProductColor[];
  sizes: ProductSize[];
  inStock: boolean;
  sku: string;
  reviews: ProductReview[];
  bundleItems?: {
    id: string;
    name: string;
    price: number;
    image: string;
  }[];
}

export const PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "nap-bottom-one-piece-cherry",
    name: "Nap-Bottom One-Piece Romper (Cherry Garden)",
    tagline: "Feather-soft organic romper crafted for all-day wiggles, giggles, and dreamy afternoon naps.",
    category: "Little Girl",
    gender: "Girls",
    price: 249,
    originalPrice: 499,
    discount: "50% OFF",
    rating: 4.9,
    reviewsCount: 142,
    badge: "Bestseller",
    description:
      "Crafted from 100% GOTS-certified combed organic cotton, this adorable one-piece combines playful cherry strap accents with our signature butter-soft feel. Engineered specifically for sensitive newborn and toddler skin, it features flat-lock seams to eliminate scratching, nickel-free bottom poppers for hassle-free 10-second diaper swaps, and an expandable envelope neckline for effortless overhead dressing.",
    fabric: "100% GOTS Certified Combed Organic Cotton (210 GSM)",
    features: [
      "Ultra-gentle flat-lock seams that never irritate tender skin",
      "Reinforced nickel-free snap buttons for easy diaper changes",
      "Expandable envelope shoulder fold for mess-free changes",
      "Pre-washed with gentle organic enzymes for zero shrinkage",
      "OEKO-TEX Standard 100 Class 1 certified non-toxic dyes",
    ],
    careInstructions: [
      "Machine wash cold or warm (up to 40°C) with gentle, baby-safe detergent",
      "Wash inside out with similar pastel colors",
      "Tumble dry low or line dry in the shade to preserve vibrant colors",
      "Iron on low heat if desired; avoid ironing directly on delicate accents",
    ],
    images: [
      "/assets/temp/pr1.webp",
      "/assets/temp/pr2.webp",
      "/assets/temp/pr3.webp",
      "/assets/temp/pr4.webp",
      "/assets/temp/pr5.webp",
    ],
    video: "/assets/temp/pr1.mp4",
    colors: [
      { name: "Cream Cherry", hex: "#FFF8F0" },
      { name: "Blush Pink", hex: "#FCE4EC" },
      { name: "Cloud Blue", hex: "#E3F2FD" },
    ],
    sizes: [
      { label: "0-3M", age: "0 - 3 Months", inStock: true },
      { label: "3-6M", age: "3 - 6 Months", inStock: true, lowStock: true },
      { label: "6-12M", age: "6 - 12 Months", inStock: true },
      { label: "12-18M", age: "12 - 18 Months", inStock: true },
      { label: "18-24M", age: "18 - 24 Months", inStock: false },
      { label: "2-3Y", age: "2 - 3 Years", inStock: true },
    ],
    inStock: true,
    sku: "BAHA-NBO-001",
    reviews: [
      {
        id: "r1",
        author: "Pooja Sharma",
        relation: "Rhea's Mom",
        rating: 5,
        date: "2 days ago",
        title: "Finally, something she doesn't want to take off!",
        comment:
          "The fabric is ridiculously soft! My 8-month-old daughter Rhea has extremely sensitive skin that breaks out in heat rash with regular cotton. We’ve washed this three times already and it hasn't shrunk or lost its plush feel. The diaper snaps are very sturdy.",
        verified: true,
        childAge: "8 Months",
        photo: "/assets/temp/review-photo1.webp",
        helpfulCount: 24,
      },
      {
        id: "r2",
        author: "Ananya Mehta",
        relation: "Aarav's Mom",
        rating: 5,
        date: "1 week ago",
        title: "Super soft even after multiple washes.",
        comment:
          "Love the pastel tone and the cute cherry details. What surprised me the most is that the collar doesn't get stretched out when pulling it down over her shoulders during messy blowouts. Essential for all new parents!",
        verified: true,
        childAge: "4 Months",
        photo: "/assets/temp/review-photo2.webp",
        helpfulCount: 18,
      },
      {
        id: "r3",
        author: "Karan Singhal",
        relation: "Kabir's Dad",
        rating: 5,
        date: "2 weeks ago",
        title: "Perfect for running around all day.",
        comment:
          "High quality stitching and breathable weave. Perfect for warm Indian summers. The delivery was fast and the packaging is very cute too.",
        verified: true,
        childAge: "14 Months",
        photo: "/assets/temp/review-photo3.webp",
        helpfulCount: 11,
      },
    ],
    bundleItems: [
      {
        id: "b1",
        name: "Teddy Bear Cotton Pajama Pants",
        price: 249,
        image: "/assets/temp/pr4.webp",
      },
      {
        id: "b2",
        name: "Cloud Soft Knitted Baby Hat & Mittens",
        price: 149,
        image: "/assets/temp/pr2.webp",
      },
    ],
  },
  {
    id: "2",
    slug: "pink-bunny-embroidered-dress",
    name: "Pink Bunny Bow Fluffy Dress & Bloomer Set",
    tagline: "A dreamy fairy-tale dress made with cloud-soft organic voile and playful 3D bunny ears.",
    category: "Little Girl",
    gender: "Girls",
    price: 249,
    originalPrice: 499,
    discount: "50% OFF",
    rating: 4.95,
    reviewsCount: 96,
    badge: "Trending",
    description:
      "Turn ordinary playdates into festive celebrations! This sweetest pink dress features handcrafted 3D bunny ear appliqués, a soft gingham check waist ribbon, and a breathable double-layered pure cotton skirt that spins gracefully without any itchiness.",
    fabric: "Double-layered 100% Fine Organic Cotton Voile",
    features: [
      "Cute 3D bunny face with velvet-soft touch points",
      "Includes matching diaper-cover bloomers with elasticated ruffles",
      "Smooth hidden back zip with protective cotton guard flap",
      "Zero scratchy glitter or synthetic tulle lining",
    ],
    careInstructions: [
      "Gentle cycle machine wash at 30°C",
      "Do not bleach",
      "Steam iron on medium heat",
    ],
    images: [
      "/assets/temp/pr2.webp",
      "/assets/temp/pr1.webp",
      "/assets/temp/pr3.webp",
      "/assets/temp/pr6.webp",
    ],
    video: "/assets/temp/reel2.mp4",
    colors: [
      { name: "Strawberry Milk", hex: "#FAD2E1" },
      { name: "Vanilla Cream", hex: "#FFF8E0" },
    ],
    sizes: [
      { label: "0-3M", age: "0 - 3 Months", inStock: true },
      { label: "3-6M", age: "3 - 6 Months", inStock: true },
      { label: "6-12M", age: "6 - 12 Months", inStock: true },
      { label: "12-18M", age: "12 - 18 Months", inStock: true },
      { label: "18-24M", age: "18 - 24 Months", inStock: true },
    ],
    inStock: true,
    sku: "BAHA-DRS-002",
    reviews: [
      {
        id: "r4",
        author: "Meera Sen",
        relation: "Shanaya's Mom",
        rating: 5,
        date: "3 days ago",
        title: "Absolute head-turner at the birthday party!",
        comment:
          "Shanaya wore this for her first birthday party and everybody kept asking where I bought it from. It looks luxurious and she was smiling comfortably the whole evening.",
        verified: true,
        childAge: "12 Months",
        helpfulCount: 15,
      },
    ],
  },
  {
    id: "3",
    slug: "royal-blue-sunflower-ruffle-frock",
    name: "Royal Blue & Sunshine Yellow Butterfly Ruffle Frock",
    tagline: "Bold, joyful colors inspired by sunny summer gardens and playful twirls.",
    category: "Little Girl",
    gender: "Girls",
    price: 249,
    originalPrice: 499,
    discount: "50% OFF",
    rating: 4.88,
    reviewsCount: 78,
    badge: "Limited Edition",
    description:
      "A radiant colorblock masterpiece that brings instant sunshine to any afternoon. Made with pure combed cotton jersey on top and a lightweight sunshine skirt with matching headband.",
    fabric: "100% Organic Breathable Cotton Jersey",
    features: [
      "Vibrant color-fast dyes that do not bleed in wash",
      "Includes matching ruffled stretch hairband",
      "Soft stretch ribbed bodice for easy pullover dressing",
    ],
    careInstructions: [
      "Machine wash cold inside out",
      "Dry flat in shade",
      "Do not dry clean",
    ],
    images: [
      "/assets/temp/pr3.webp",
      "/assets/temp/pr1.webp",
      "/assets/temp/pr4.webp",
    ],
    video: "/assets/temp/reel1.mp4",
    colors: [
      { name: "Royal Sunshine", hex: "#0D03AE" },
    ],
    sizes: [
      { label: "6-12M", age: "6 - 12 Months", inStock: true },
      { label: "12-18M", age: "12 - 18 Months", inStock: true },
      { label: "18-24M", age: "18 - 24 Months", inStock: true },
      { label: "2-3Y", age: "2 - 3 Years", inStock: true },
    ],
    inStock: true,
    sku: "BAHA-DRS-003",
    reviews: [],
  },
  {
    id: "4",
    slug: "sweet-dreams-printed-pajama-set",
    name: "Sweet Dreams Little Stars Printed Pajama Co-Ord Set",
    tagline: "Ultra-cozy two-piece sleepwear designed for snuggly bedtime cuddles.",
    category: "Unisex Wear",
    gender: "Unisex",
    price: 249,
    originalPrice: 499,
    discount: "50% OFF",
    rating: 4.92,
    reviewsCount: 110,
    badge: "Parent Favorite",
    description:
      "Bedtime made easy! This delightful two-piece pajama set features gentle ribbed cuffs that keep legs from riding up during nocturnal rolling and an ultra-soft covered elastic waistband.",
    fabric: "100% Soft Interlock Rib Organic Cotton",
    features: [
      "Stretchy non-roll elastic waistband that leaves zero red marks",
      "Ankle and wrist cuffs to lock in warm comfort",
      "Breathable thermal regulation for sweat-free sleeping",
    ],
    careInstructions: [
      "Warm wash with like colors",
      "Tumble dry gentle",
    ],
    images: [
      "/assets/temp/pr4.webp",
      "/assets/temp/pr5.webp",
      "/assets/temp/pr6.webp",
    ],
    video: "/assets/temp/pr1.mp4",
    colors: [
      { name: "Starry Ivory", hex: "#FAF8E8" },
      { name: "Pastel Sage", hex: "#D8E2DC" },
    ],
    sizes: [
      { label: "6-12M", age: "6 - 12 Months", inStock: true },
      { label: "12-18M", age: "12 - 18 Months", inStock: true },
      { label: "18-24M", age: "18 - 24 Months", inStock: true },
      { label: "2-3Y", age: "2 - 3 Years", inStock: true },
      { label: "3-4Y", age: "3 - 4 Years", inStock: true },
    ],
    inStock: true,
    sku: "BAHA-PJM-004",
    reviews: [],
  },
  {
    id: "5",
    slug: "bunny-applique-blush-loungewear",
    name: "Fluffy Bunny Pocket Blush Loungewear Set",
    tagline: "Cute checkered loungewear with a soft bunny face patch for cozy morning cartoons.",
    category: "Little Girl",
    gender: "Girls",
    price: 249,
    originalPrice: 499,
    discount: "50% OFF",
    rating: 4.89,
    reviewsCount: 84,
    badge: "Bestseller",
    description:
      "Crafted with double-brushed cotton fleece on the inside and a smooth pastel surface on the outside, this warm 2-piece set is an everyday staple for cool spring breezes and air-conditioned rooms.",
    fabric: "100% Brushed Organic Cotton Fleece",
    features: [
      "Plush 3D bunny patch on front pocket",
      "Matching checkered lounge pants with drawstring accent",
      "Relaxed cut that layers over onesies easily",
    ],
    careInstructions: ["Machine wash gentle", "Hang to dry"],
    images: [
      "/assets/temp/pr5.webp",
      "/assets/temp/pr6.webp",
      "/assets/temp/pr7.webp",
    ],
    colors: [
      { name: "Dusty Rose", hex: "#E8B4B8" },
    ],
    sizes: [
      { label: "12-18M", age: "12 - 18 Months", inStock: true },
      { label: "18-24M", age: "18 - 24 Months", inStock: true },
      { label: "2-3Y", age: "2 - 3 Years", inStock: true },
    ],
    inStock: true,
    sku: "BAHA-LNG-005",
    reviews: [],
  },
  {
    id: "6",
    slug: "polka-dots-cloud-soft-nightwear",
    name: "Polka Dots Cloud-Soft Buttoned Nightwear Set",
    tagline: "Classic collared nightwear with scarlet piping and gentle mother-of-pearl buttons.",
    category: "Unisex Wear",
    gender: "Unisex",
    price: 249,
    originalPrice: 499,
    discount: "50% OFF",
    rating: 4.93,
    reviewsCount: 65,
    badge: "Organic",
    description:
      "Bring vintage charm to your little one's bedtime routine. Featuring contrast scarlet piping, a notched lapel collar, and smooth button closures designed for fast morning changes.",
    fabric: "100% Muslin Cotton - Double Weave",
    features: [
      "Ultra-breathable 4-layer muslin cotton",
      "Gets noticeably softer with every wash cycle",
      "Lightweight and moisture-wicking",
    ],
    careInstructions: ["Gentle wash 30°C", "Do not iron muslin hot"],
    images: [
      "/assets/temp/pr6.webp",
      "/assets/temp/pr7.webp",
      "/assets/temp/pr8.webp",
    ],
    colors: [
      { name: "Crimson Dot Cream", hex: "#FFFBF0" },
    ],
    sizes: [
      { label: "6-12M", age: "6 - 12 Months", inStock: true },
      { label: "12-18M", age: "12 - 18 Months", inStock: true },
      { label: "18-24M", age: "18 - 24 Months", inStock: true },
      { label: "2-3Y", age: "2 - 3 Years", inStock: true },
    ],
    inStock: true,
    sku: "BAHA-MSL-006",
    reviews: [],
  },
  {
    id: "7",
    slug: "ribbon-bows-sweet-sleepwear-pink",
    name: "Vintage Ribbon Bows Ruffle Hem Sleepwear",
    tagline: "Romantic pastel ribbons and gentle lettuce ruffles for sweet dreams.",
    category: "Little Girl",
    gender: "Girls",
    price: 249,
    originalPrice: 499,
    discount: "50% OFF",
    rating: 4.85,
    reviewsCount: 52,
    badge: "New",
    description:
      "Designed with an all-over micro bow print, feminine ruffled hem cuffs, and delicate contrast piping. The softest addition to her sleepwear drawer.",
    fabric: "100% GOTS Certified Cotton Jersey",
    features: [
      "Lettuce ruffle edge details",
      "Stretchy waistband with soft inner casing",
    ],
    careInstructions: ["Machine wash cold", "Tumble dry low"],
    images: [
      "/assets/temp/pr7.webp",
      "/assets/temp/pr5.webp",
      "/assets/temp/pr1.webp",
    ],
    colors: [
      { name: "Candy Pink", hex: "#FAD2E1" },
    ],
    sizes: [
      { label: "1-2Y", age: "1 - 2 Years", inStock: true },
      { label: "2-3Y", age: "2 - 3 Years", inStock: true },
      { label: "3-4Y", age: "3 - 4 Years", inStock: true },
    ],
    inStock: true,
    sku: "BAHA-BOW-007",
    reviews: [],
  },
  {
    id: "8",
    slug: "spider-hero-action-graphic-tee",
    name: "Spider Hero Comic Graphic Cotton Tee",
    tagline: "Vibrant superhero graphic tee ready for action-packed playground escapades.",
    category: "Little Boy",
    gender: "Boys",
    price: 249,
    originalPrice: 499,
    discount: "50% OFF",
    rating: 4.96,
    reviewsCount: 134,
    badge: "Bestseller",
    description:
      "A hero favorite! Printed with eco-friendly water-based inks that feel totally weightless and never crack or peel after the wash. Paired with a contrast ribbed crew neck.",
    fabric: "100% Combed Slub Cotton",
    features: [
      "Breathable water-based screen print",
      "Reinforced double-stitched hem and sleeves",
      "Drop-shoulder athletic cut for free running",
    ],
    careInstructions: ["Machine wash inside out", "Do not iron directly on print"],
    images: [
      "/assets/temp/pr8.webp",
      "/assets/temp/pr9.webp",
      "/assets/temp/pr10.webp",
    ],
    colors: [
      { name: "Hero White & Red", hex: "#FFFFFF" },
    ],
    sizes: [
      { label: "18-24M", age: "18 - 24 Months", inStock: true },
      { label: "2-3Y", age: "2 - 3 Years", inStock: true },
      { label: "3-4Y", age: "3 - 4 Years", inStock: true },
      { label: "4-5Y", age: "4 - 5 Years", inStock: true },
    ],
    inStock: true,
    sku: "BAHA-BOY-008",
    reviews: [],
  },
  {
    id: "9",
    slug: "checkered-resort-shirt-and-shorts-set",
    name: "Navy Checkered Resort Collar Shirt & Shorts Set",
    tagline: "Dapper mini-gentleman style with breezy lightweight linen-cotton blend.",
    category: "Little Boy",
    gender: "Boys",
    price: 249,
    originalPrice: 499,
    discount: "50% OFF",
    rating: 4.91,
    reviewsCount: 89,
    badge: "Trending",
    description:
      "Keep him looking sharp and feeling cool. Features an open camp resort collar, cute chest pocket embroidery, and matching shorts with an elastic drawstring waist.",
    fabric: "70% Organic Cotton, 30% Fine Linen",
    features: [
      "Natural linen breathability with cotton softness",
      "Camp collar for relaxed holiday styling",
      "Deep side pockets to hold tiny treasures",
    ],
    careInstructions: ["Machine wash gentle", "Warm iron for crisp finish"],
    images: [
      "/assets/temp/pr9.webp",
      "/assets/temp/pr8.webp",
      "/assets/temp/pr10.webp",
    ],
    colors: [
      { name: "Navy Gingham", hex: "#1A365D" },
    ],
    sizes: [
      { label: "1-2Y", age: "1 - 2 Years", inStock: true },
      { label: "2-3Y", age: "2 - 3 Years", inStock: true },
      { label: "3-4Y", age: "3 - 4 Years", inStock: true },
    ],
    inStock: true,
    sku: "BAHA-BOY-009",
    reviews: [],
  },
  {
    id: "10",
    slug: "mini-spider-camp-collar-pajamas",
    name: "Mini Hero Camp Collar Pajama Set",
    tagline: "Fun superhero motifs meet silky-smooth cotton comfort.",
    category: "Little Boy",
    gender: "Boys",
    price: 249,
    originalPrice: 499,
    discount: "50% OFF",
    rating: 4.87,
    reviewsCount: 72,
    badge: "New",
    description:
      "Bedtime adventures await! Smooth satin-finish cotton with playful comic illustrations, contrast red piping, and button-front top.",
    fabric: "100% Mercerized Organic Cotton",
    features: [
      "Silky-soft hand feel that cools body temperature",
      "Button-up shirt with camp collar",
      "Comfort-fit shorts with soft elastic waist",
    ],
    careInstructions: ["Machine wash cool", "Hang dry"],
    images: [
      "/assets/temp/pr10.webp",
      "/assets/temp/pr8.webp",
      "/assets/temp/pr9.webp",
    ],
    colors: [
      { name: "Navy Comic", hex: "#0E1A40" },
    ],
    sizes: [
      { label: "2-3Y", age: "2 - 3 Years", inStock: true },
      { label: "3-4Y", age: "3 - 4 Years", inStock: true },
      { label: "4-5Y", age: "4 - 5 Years", inStock: true },
    ],
    inStock: true,
    sku: "BAHA-BOY-010",
    reviews: [],
  },
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id || p.slug === id);
}

export function getRelatedProducts(currentId: string, limit = 4): Product[] {
  const current = getProductById(currentId);
  return PRODUCTS.filter((p) => p.id !== currentId && (!current || p.category === current.category || p.gender === current.gender))
    .slice(0, limit);
}

