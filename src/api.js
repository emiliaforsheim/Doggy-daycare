const BIN_URL = 'https://gist.githubusercontent.com/davidsvson/81c5fac87b01e24b0e4d7e8d4493471b/raw/1c9d6e7b8fe976f427e326b30fbf95971f9fe170/dogs.json';

export async function fetchDogs() {
  // rensa cachad data för debug (ta bort senare)
  sessionStorage.removeItem('dogs')

  try {
    console.log('DEBUG: Hämtar från', BIN_URL)
    const res = await fetch(BIN_URL, { mode: 'cors' })
    console.log('DEBUG: response.ok =', res.ok, 'status =', res.status, res.statusText)

    // Försök logga headers (kan begränsas av CORS)
    try {
      for (const pair of res.headers.entries()) {
        console.log('DEBUG header:', pair[0], '=', pair[1])
      }
    } catch (hErr) {
      console.warn('DEBUG: kunde inte läsa headers pga CORS eller annat', hErr)
    }

    const text = await res.text()
    console.log('DEBUG: raw response (first 1000 chars):', text.slice(0, 1000))

    const data = JSON.parse(text)
    if (!Array.isArray(data)) throw new Error('Svaret är inte en array med hundar')

    const dogs = data.map((d, i) => {
      const id = d.id ?? d._id ?? (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(i + 1))
      return {
        id,
        name: d.name ?? 'Namnlös',
        breed: d.breed ?? 'Okänd',
        age: d.age ?? null,
        image: d.img ?? d.image ?? null,
        ownerName: d.owner ? `${d.owner.name || ''} ${d.owner.lastName || ''}`.trim() : (d.ownerName ?? 'Okänd'),
        chipNumber: d.chipNumber ?? null,
        notes: d.notes ?? ''
      }
    })

    sessionStorage.setItem('dogs', JSON.stringify(dogs))
    return dogs
  } catch (err) {
    console.error('DEBUG fetchDogs error (full):', err)
    // kasta ett tydligt fel till UI
    throw new Error('Nätverksfel vid hämtning av data — se console för detaljer')
  }
}