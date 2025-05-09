import React from 'react'
import ProductGrid from './../../../components/site/product/ProductGrid';
import FilterBox from '@/components/site/filters/FilterBox';
export default function page() {
    return (
        <div>
            <FilterBox />
            <ProductGrid />
        </div>
    )
}