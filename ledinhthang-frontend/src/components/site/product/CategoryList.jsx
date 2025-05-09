"use client"
import React, { useEffect, useState } from 'react'
import { getCategories } from '@/services/categoryService';
import CategoryItem from './CategoryItem';

import Loading from './../../ui/loading';



export default function CategoryList() {

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
        <ul className="list bg-base-100 rounded-box shadow-md">

            <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">All categories</li>

            {
                categories.length > 0 ? (
                    categories.map((cat) => (
                        <li className='list-row' key={cat.id}>
                            <CategoryItem category={cat} />
                        </li>
                    ))
                ) :
                    <p>No category found</p>

            }



        </ul>
    )
}
