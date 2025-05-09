import React from 'react'
import FilterByBrand from './FilterByBrand';
import FilterByName from './FilterByName';
import FilterByPrice from './FilterByPrice';
import FilterView from '@/components/admin/filters/FilterView';

export default function FilterBox({ setViewOption, setSearchKey }) {
    return (
        <div className='flex flex-col md:flex-row mx-4 gap-4'>
            <FilterByBrand />
            <FilterByName setSearchKey={setSearchKey} />
            <FilterByPrice />
            <FilterView setViewOption={setViewOption} />
        </div>
    )
}
