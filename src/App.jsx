import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [busqueda, setBusqueda] = useState('')
  const [series, setSeries] = useState([])
  const [favoritos, setFavoritos] = useState([])
  const [serieSeleccionada, setSerieSeleccionada] = useState(null)
  const [mostrarModal, setMostrarModal] = useState(false)

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

  const verDetalle = async (id) => {
    const respuesta = await fetch(`https://api.tvmaze.com/shows/${id}`)
    const datos = await respuesta.json()
    setSerieSeleccionada(datos)
      setMostrarModal(true)
  }

  return (
    <div className="container">
      <h1>Buscador de Series</h1>

      <div className="busqueda">
        <input
          type="text"
          placeholder="Buscar series"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <button onClick={buscarSeries}>Buscar</button>
      </div>

      <div className="resultados">
        <h2>Resultados</h2>
        <div className="series-grid">
          {series.map((item) => (
            <div key={item.show.id} className="serie-card">
              <img
                src={item.show.image ? item.show.image.medium : 'https://via.placeholder.com/210x295'}
                onClick={() => verDetalle(item.show.id)}
              />
              <h3>{item.show.name}</h3>
              <button onClick={() => esFavorito(item.show.id) ? quitarFavorito(item.show.id) : agregarFavorito(item)}>
                {esFavorito(item.show.id) ? '❤️' : '🤍'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="favoritos">
        <h2>Mis Favoritos</h2>
        <div className="series-grid">
          {favoritos.map((item) => (
            <div key={item.show.id} className="serie-card">
              <img
                src={item.show.image ? item.show.image.medium : 'https://via.placeholder.com/210x295'}
                onClick={() => verDetalle(item.show.id)}
              />
              <h3>{item.show.name}</h3>
              <button onClick={() => quitarFavorito(item.show.id)}>❤️</button>
            </div>
          ))}
        </div>
      </div>

      {mostrarModal && (
        <div className="modal">
          <div className="modal-contenido">
        <button className="cerrar" onClick={() => setMostrarModal(false)}>X</button>
            <h2>{serieSeleccionada.name}</h2>
            <img src={serieSeleccionada.image.medium} />
            <div dangerouslySetInnerHTML={{ __html: serieSeleccionada.summary }} />
              <p>Géneros: {serieSeleccionada.genres.join(', ')}</p>
            <p>Rating: {serieSeleccionada.rating.average}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
