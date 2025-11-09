import React, { useEffect, useState, useMemo } from 'react'
import { fetchDogs } from '../api'
import DogCard from '../components/DogCard'
import SearchFilter from '../components/SearchFilter'

export default function Catalog(){
  const [dogs, setDogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [query, setQuery] = useState('')
  const [breedFilter, setBreedFilter] = useState('all')
  const [sizeFilter, setSizeFilter] = useState('all')
  const [ageFilter, setAgeFilter] = useState('all')

  useEffect(() => {
    setLoading(true)
    fetchDogs()
      .then(list => setDogs(list))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const breeds = useMemo(()=>['all', ...new Set(dogs.map(d=>d.breed).filter(Boolean))], [dogs])
  const sizes = useMemo(()=>['all', ...new Set(dogs.map(d=>d.size).filter(Boolean))], [dogs])

  const filtered = useMemo(() => {
    return dogs.filter(d => {
      if (query && !d.name.toLowerCase().includes(query.toLowerCase())) return false
      if (breedFilter !== 'all' && d.breed !== breedFilter) return false
      if (sizeFilter !== 'all' && d.size !== sizeFilter) return false
      if (ageFilter !== 'all') {
        if (ageFilter === '0-2' && !(d.age <= 2)) return false
        if (ageFilter === '3-7' && !(d.age >= 3 && d.age <= 7)) return false
        if (ageFilter === '8+' && !(d.age >= 8)) return false
      }
      return true
    })
  }, [dogs, query, breedFilter, sizeFilter, ageFilter])

  if (loading) return <div className="center">Laddar hundar…</div>
  if (error) return <div className="center error">Fel: {error}</div>

  return (
    <section>
      <h2>Hundkatalog</h2>
      <SearchFilter
        query={query} setQuery={setQuery}
        breeds={breeds} breedFilter={breedFilter} setBreedFilter={setBreedFilter}
        sizes={sizes} sizeFilter={sizeFilter} setSizeFilter={setSizeFilter}
        ageFilter={ageFilter} setAgeFilter={setAgeFilter}
      />

      <div className="grid">
        {filtered.map(d => <DogCard key={d.id} dog={d} />)}
      </div>
      {filtered.length === 0 && <p>Inga hundar matchar sökningen.</p>}
    </section>
  )
}