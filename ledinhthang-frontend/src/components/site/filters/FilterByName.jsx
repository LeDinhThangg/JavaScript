import React from 'react'

export default function FilterByName({ setSearchKey }) {
    return (
        <div className="flex justify-between items-center mb-4">
            <input type="text" placeholder="Search" id="search" className="input input-success input-sm" />
            <button className='btn btn-success btn-sm' onClick={() => { setSearchKey(document.getElementById("search").value) }}>Search</button>
        </div>
    )
}
