import React from 'react'

export default function FilterView({ setViewOption }) {
    return (
        <div>
            <select
                defaultValue=""
                onChange={(e) => { setViewOption(e.target.value) }}
                className='select select-accent'
            >
                <option value="" disabled>View</option>
                <option value="preview">All</option>
                <option value="live">Published</option>
            </select>
        </div>
    )
}
