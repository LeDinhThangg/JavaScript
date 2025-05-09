"use client"
import React, { useEffect, useState } from 'react'
import { getCategories } from '@/services/categoryService';
import Loading from './../../ui/loading';



export default function CategorySelect({ handleInputChange, id }) {

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
        <select value={id} onChange={handleInputChange} name='category' >
            {
                categories.length > 0 ? (
                    categories.map((cat) => (
                        <option key={cat.id} defaultValue={cat.id}>{cat.attributes.categoryName}

                        </option>
                    ))
                ) :
                    <p>No category found</p>

            }
        </select>



    )
}
