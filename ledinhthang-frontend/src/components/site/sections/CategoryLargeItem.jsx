import React from 'react'
import API_CONFIG from '@/config/api'
import Link from 'next/link'

export default function CategoryLargeItem({ category }) {

    return (
        <div className=''>
            <Link href={`/site/products/category/${category.id}`}>
                <img className="size-20 rounded-box" src={API_CONFIG.IMAGE_URL + category.attributes.image.data.attributes.url} />
                <div className="text-xs uppercase font-semibold opacity-80">{category.attributes.categoryName}</div>
            </Link>
        </div>
    )
}
