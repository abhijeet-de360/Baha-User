import ProductDetailsPage from '@/components/productDetailsPage/ProductDetailsPage';
import mockData from '@/data/mockData.json';

export function generateStaticParams() {
  const { products } = mockData;
  return products.map((product) => ({
    slug: product.id
  }));
}

const page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  return (
    <ProductDetailsPage slug={slug} />
  )
}

export default page