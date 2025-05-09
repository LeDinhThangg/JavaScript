import React from 'react'
import ProductActions from './ProductActions'

export default function ProductInfo({ product }) {
    return (
        <div className="card card-dash bg-base-100 ">
            <div className="card-body">
                <h1 className="card-title text-4xl text-cyan-600">{product.productName}</h1>
                <div>
                    {product.summary}
                </div>
                <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                <p className='text-2xl text-cyan-600'>Giá: {product.price} </p>
                <ProductActions />
            </div>
        </div>
    )
}
