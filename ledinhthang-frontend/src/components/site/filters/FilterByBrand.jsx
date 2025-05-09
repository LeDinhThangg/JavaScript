import React from 'react'

export default function FilterByBrand() {
    return (
        <select defaultValue="Pick a Runtime" className="input-sm select select-success">
            <option disabled={true}>Brand </option>

            <option>Adidas</option>
            <option>Puma</option>

        </select>
    )
}
