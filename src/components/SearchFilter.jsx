import React from 'react'

export default function SearchFilter({
  query, setQuery,
  breeds, breedFilter, setBreedFilter,
  sizes, sizeFilter, setSizeFilter,
  ageFilter, setAgeFilter
}){
  return (
    <div className="searchfilter">
      <input
        type="search"
        placeholder="Sök på namn..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <select value={breedFilter} onChange={e => setBreedFilter(e.target.value)}>
        {breeds.map(b => <option key={b} value={b}>{b}</option>)}
      </select>
      <select value={ageFilter} onChange={e => setAgeFilter(e.target.value)}>
        <option value="all">Alla åldrar</option>
        <option value="0-2">0–2 år</option>
        <option value="3-7">3–7 år</option>
        <option value="8+">8+ år</option>
      </select>
    </div>
  )
}