"use client"
import React, { useEffect, useState } from 'react'
import { getBrands } from '@/services/brandService';
import Loading from './../../ui/loading';



export default function BrandSelect({ handleInputChange, id }) {

    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchBrands = async () => {
            let params = {
                'populate': '*',
                'fields[0]': 'brandName',

            }

            try {
                setLoading(true);
                let data = await getBrands(params);
                setBrands(data.data);
                setLoading(false);

            } catch (error) {
                setError("Lỗi!!!!!")

            }
        }
        fetchBrands();
    }, []);
    if (loading) return <Loading />;
    if (error) return <p className='text-red-400'>{error}   </p>


    return (
        <select name='brand' value={id} onChange={handleInputChange} >
            {
                brands.length > 0 ? (
                    brands.map((brand) => (
                        <option key={brand.id} defaultValue={brand.id}>{brand.attributes.brandName}

                        </option>
                    ))
                ) :
                    <p>No Brand found</p>

            }
        </select>



    )
}
