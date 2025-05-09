"use client"
import React, { useState, useEffect } from 'react'
import ProductDetail from './../../../../components/site/product/ProductDetail';
import ProductInfo from './../../../../components/site/product/ProductInfo';
import ProductImages from './../../../../components/site/product/ProductImages';
import RelatedProducts from '@/components/site/product/RelatedProducts';
import { useParams } from 'next/navigation';
import Loading from '@/components/ui/loading';
import { getProductById } from '@/services/productService';

export default function page() {
    let { id } = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            let params = {
                'populate': '*',

            }

            try {
                setLoading(true);
                let data = await getProductById(id, params);
                setProduct(data.data.attributes);
                console.log(data.data.attributes);
                setLoading(false);

            } catch (error) {
                setError("Lỗi!!!!!")

            }
        }
        fetchProduct();
    }, []);
    if (loading) return <Loading />;
    if (error) return <p className='text-red-400'>{error}   </p>

    return (
        <div className='shadow-amber-900 shadow-xl m-7'>

            Trang chi tiet san pham
            <div className="flex flex-col md:flex-row gap-2 p-6">

                {/* Cột trái (40%) */}
                <div className="w-full md:w-2/5">
                    <ProductImages images={product.image.data} />
                </div>
                {/* Cột phải (60%) */}
                <div className="w-full md:w-3/5">
                    <ProductInfo product={product} />
                </div>
            </div>
            <RelatedProducts />
        </div>
    )
}