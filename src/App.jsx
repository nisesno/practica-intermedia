import { useState, useEffect } from 'react'

function App() {
  const [busqueda, setBusqueda] = useState('')
  const [series, setSeries] = useState([])
  const [favoritos, setFavoritos] = useState([])

  useEffect(() => {
    const favs = localStorage.getItem('favoritos')
    if (favs) {
      setFavoritos(JSON.parse(favs))
    }
  }, [])

  const buscarSeries = async () => {
    const respuesta = await fetch(`https://api.tvmaze.com/search/shows?q=${busqueda}`)
    const datos = await respuesta.json()
      setSeries(datos)
  }

  const agregarFavorito = (serie) => {
  const nuevos = [...favoritos, serie]
  setFavoritos(nuevos)
    localStorage.setItem('favoritos', JSON.stringify(nuevos))
  }

  const quitarFavorito = (id) => {
    const nuevos = favoritos.filter(fav => fav.show.id != id)
    setFavoritos(nuevos)
    localStorage.setItem('favoritos', JSON.stringify(nuevos))
  }

  const esFavorito = (id) => {
    return favoritos.some(fav => fav.show.id == id)
  }

  return (
    <div>
      <h1>Buscador de Series</h1>
      <input
        type="text"
        placeholder="Buscar series"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <button onClick={buscarSeries}>Buscar</button>

      <h2>Resultados</h2>
      {series.map((item) => (
        <div key={item.show.id}>
          <img src={item.show.image ? item.show.image.medium : 'https://via.placeholder.com/210x295'} />
          <h3>{item.show.name}</h3>
          <button onClick={() => esFavorito(item.show.id) ? quitarFavorito(item.show.id) : agregarFavorito(item)}>
            {esFavorito(item.show.id) ? '❤️' : '🤍'}
          </button>
        </div>
      ))}

      <h2>Mis Favoritos</h2>
      {favoritos.map((item) => (
        <div key={item.show.id}>
          <img src={item.show.image ? item.show.image.medium : 'https://via.placeholder.com/210x295'} />
          <h3>{item.show.name}</h3>
          <button onClick={() => quitarFavorito(item.show.id)}>❤️</button>
        </div>
      ))}
    </div>
  )
}

export default App
