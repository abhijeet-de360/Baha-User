import ProductListingView from "@/components/products/ProductListingView";
import mockData from "@/data/mockData.json";

// Required for Next.js static export (output: 'export')
export function generateStaticParams() {
  const primarySegments = [
    "all",
    "sale",
    "boy",
    "boys",
    "girl",
    "girls",
    "baby",
    "newborn",
    "ethnic",
    "ethnic-wear",
    "party",
    "party-wear",
    "casual",
    "casual-wear",
    "accessories",
    "sets",
    ...mockData.categories.map((c) => c.slug),
  ];

  const commonTags = [
    "kurta",
    "dhoti",
    "anarkali",
    "gown",
    "dress",
    "frock",
    "tutu",
    "blazer",
    "dungarees",
    "jacket",
    "sneakers",
    "cardigan",
    "tee",
    "romper",
    "sleepwear",
  ];

  const paramsSet = new Set<string>();
  const params: { slug: string[] }[] = [];

  const addParam = (slug: string[]) => {
    const key = slug.join("/");
    if (!paramsSet.has(key)) {
      paramsSet.add(key);
      params.push({ slug });
    }
  };

  // 1-segment routes: /products/category/:segment
  primarySegments.forEach((s) => addParam([s]));
  commonTags.forEach((t) => addParam([t]));

  // 2-segment routes: /products/category/:gender/:subFilter
  const genders = ["boy", "boys", "girl", "girls", "baby", "newborn"];
  const subFilters = [
    ...commonTags,
    "ethnic",
    "ethnic-wear",
    "party",
    "party-wear",
    "casual",
    "casual-wear",
    "sale",
    "sets",
    "accessories",
  ];

  genders.forEach((g) => {
    subFilters.forEach((sub) => {
      addParam([g, sub]);
    });
  });

  return params;
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  return <ProductListingView segments={slug} />;
}
