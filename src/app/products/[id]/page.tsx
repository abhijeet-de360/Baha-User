import ProductDetailsPage from '@/components/productDetailsPage/ProductDetailsPage';
import React from 'react'

const page = async ({ params }: { params: { id: string } }) => {
    const { id } = await params;
  return (
    <ProductDetailsPage id={id} />
  )
}

export default page