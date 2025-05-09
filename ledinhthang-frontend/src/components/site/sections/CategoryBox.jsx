"use client"
import React, { useEffect, useState } from 'react'
import { getCategories } from '@/services/categoryService';
import CategoryItem from '../product/CategoryItem';

import CategoryLargeItem from './CategoryLargeItem';
import Loading from '@/components/ui/loading';




export default function CategoryBox() {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            let params = {
                'populate': '*',
                'fields[0]': 'categoryName',
                'fields[1]': 'description',
            }

            try {
                setLoading(true);
                let data = await getCategories(params);
                setCategories(data.data);
                setLoading(false);

            } catch (error) {
                setError("Lỗi!!!!!")

            }
        }
        fetchCategories();
    }, []);
    if (loading) return <Loading />;
    if (error) return <p className='text-red-400'>{error}   </p>


    return (
        <ul className="flex items-center gap-16 p-3.5 m-2.5 bg-base-100 rounded-box shadow-md">



            {
                categories.length > 0 ? (
                    categories.map((cat) => (
                        <li className='list-row' key={cat.id}>
                            <CategoryLargeItem category={cat} />
                        </li>
                    ))
                ) :
                    <p>No category found</p>

            }



        </ul>
    )
}
