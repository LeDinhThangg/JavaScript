import React from 'react'
import ProductCart from './ProductCart'

export default function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {
        (products.length > 0) ? products.map((p) => <ProductCart product={p} key={p.id} />) : <p>No product found</p>
      }

    </div>
  )
}
