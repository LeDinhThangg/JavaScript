"use client"
import FilterBox from '@/components/site/filters/FilterBox'
import CategoryList from '@/components/site/product/CategoryList'
import ProductGrid from '@/components/site/product/ProductGrid'
import Loading from '@/components/ui/loading'
import { getProducts } from '@/services/productService'
import { useParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'
export default function page() {
    let { id } = useParams();
    const [currentCategory, setCurrentCategory] = useState(id);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            let params = {
                'populate': '*',
                'filters[category][id][$eq]': currentCategory,

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
            Trang san pham theo danh muc
            <div className="flex flex-col md:flex-row gap-2 p-6">


                <div className="w-full md:w-1/4">
                    <CategoryList />
                </div>

                <div className="w-full md:w-3/4">
                    <FilterBox />
                    <ProductGrid products={products} />
                </div>
            </div>
        </div>
    )
}