
import React, { useEffect, useState } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import { fetchDogs } from '../api'

export default function DogDetail() {
  const { id } = useParams()
  const { state } = useLocation()
  const [dog, setDog] = useState(state?.dog || null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Om vi redan har hunden via state, hämta inte igen
    if (state?.dog) {
      setDog(state.dog)
      return
    }

    // Om användaren går direkt via länk — försök hämta datan
    setLoading(true)
    fetchDogs()
      .then(list => {
        console.log("DEBUG: hämtade hundar", list)
        console.log("DEBUG: söker id", id)
        const found = list.find(d => String(d.id) === String(id))
        console.log("DEBUG: hittad hund", found)
        setDog(found || null)
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [id, state])

  if (loading) return <div className="center">Laddar…</div>
  if (error) return <div className="center error">Fel: {error}</div>
  if (!dog) return <div className="center">Hittade ingen hund. <Link to="/catalog">Tillbaka</Link></div>

  return (
    <article className="dog-detail">
      <img
        src={dog.image || '/placeholder-dog.png'}
        alt={dog.name}
        className="dog-large"
      />
      <div>
        <h2>{dog.name}</h2>
        <p><strong>Ras:</strong> {dog.breed}</p>
        <p><strong>Ålder:</strong> {dog.age != null ? `${dog.age} år` : 'Okänd'}</p>
        <p><strong>Chipnummer:</strong> {dog.chipNumber || 'Saknas'}</p>
        <p><strong>Ägare:</strong> {dog.ownerName || 'Okänd'}</p>
        <p><strong>Noteringar:</strong> {dog.notes || 'Ingen extra info'}</p>
        <Link to="/catalog" className="btn-link">← Tillbaka till katalog</Link>
      </div>
    </article>
  )
}