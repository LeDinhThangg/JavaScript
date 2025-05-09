import React from 'react'
import NewProducts from './../../components/site/sections/NewProducts';
import SaleProducts from './../../components/site/sections/SaleProducts';
import Bestseller from './../../components/site/sections/Bestseller';
import NaturalProducts from './../../components/site/sections/NaturalProducts';
import CategoryBox from '@/components/site/sections/CategoryBox';
export default function page() {
    return (
        <div className='mx-7'>
            <CategoryBox />
            <NewProducts />
            <Bestseller />
            <SaleProducts />
            <NaturalProducts />
        </div>
    )
}