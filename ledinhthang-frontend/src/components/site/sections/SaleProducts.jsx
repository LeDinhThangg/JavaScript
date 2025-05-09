"use client"
import React, { useEffect, useState } from 'react'
import ProductBox from './../product/ProductBox';
import Loading from '@/components/ui/loading';
import { getProducts } from '@/services/productService';

export default function SaleProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            let params = {
                'populate': '*',
                'sort': "view : DESC",
                "pagination[start]": 0,
                "pagination[limit]": 4,


            }

            try {
                setLoading(true);
                let data = await getProducts(params);
                setProducts(data.data);
                setLoading(false);

            } catch (error) {
                setError("Lỗi!!!!!")

            }
        }
        fetchProducts();
    }, []);
    if (loading) return <Loading />;
    if (error) return <p className='text-red-400'>{error}   </p>
    return (
        <div>
            <h2 className='text-2xl bg-amber-300 text-center mx-4 shadow-xl'>Top View products</h2>
            <ProductBox products={products} />
        </div>
    )
}
