
import React from 'react'
import { Link } from 'react-router-dom'

export default function DogCard({ dog }) {
  return (
    <article className="dog-card">
      <img
        src={dog.image || '/placeholder-dog.png'}
        alt={dog.name}
        className="dog-thumb"
      />
      <div className="dog-info">
        <h3>{dog.name}</h3>
        <p className="meta">
          {dog.breed} · {dog.age != null ? `${dog.age} år` : 'Ålder okänd'}
        </p>
        <p className="meta small">
          Ägare: {dog.ownerName || 'Okänd'}
        </p>

        {/* Skicka med hela hundobjektet via state */}
        <Link
          to={`/dogs/${encodeURIComponent(dog.id)}`}
          state={{ dog }}
          className="btn-link"
        >
          Visa
        </Link>
      </div>
    </article>
  )
}