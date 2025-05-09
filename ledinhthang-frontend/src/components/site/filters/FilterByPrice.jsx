import React from 'react'

export default function FilterByPrice() {
  return (
    <div>
      <input type="range" min={0} max="100" defaultValue="40" className="input-sm range range-success" />
    </div>
  )
}
