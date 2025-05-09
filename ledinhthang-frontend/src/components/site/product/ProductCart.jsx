import React from 'react'
import ProductActions from './ProductActions';
import API_CONFIG from '@/config/api';
import Link from 'next/link';


export default function ProductCart({ product }) {

    return (
        <div className="card bg-base-100  shadow-sm shadow-md shadow-amber-50 card-sm">
            <Link href={`/site/products/${product.id}`}>
                <figure>
                    <img
                        src={API_CONFIG.IMAGE_URL + product?.attributes.image?.data[0].attributes.url}
                        alt="Shoes" />
                </figure>
            </Link>
            <div className="card-body">
                <Link href={`/site/products/${product.id}`}>
                    <h2 className="card-title">
                        {product?.attributes.productName}
                        <div className="badge badge-secondary">NEW</div>
                    </h2>
                </Link>
                <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                <div className="card-actions justify-end">
                    <div className="badge badge-outline shadow-amber-100">{product?.attributes.price}</div>
                    <ProductActions />
                </div>
            </div>
        </div>
    )
}
