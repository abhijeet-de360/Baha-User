import ProductDetailsPage from '@/components/productDetailsPage/ProductDetailsPage';
import React from 'react';
import mockData from '@/data/mockData.json';

export function generateStaticParams() {
  const { products } = mockData;
  return products.map((product) => ({
    id: product.id
  }));
}

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  return (
    <ProductDetailsPage id={id} />
  )
}

export default page