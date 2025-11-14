import { useState } from 'react'

function App() {
  const [busqueda, setBusqueda] = useState('')
  const [series, setSeries] = useState([])

  const buscarSeries = async () => {
    const respuesta = await fetch(`https://api.tvmaze.com/search/shows?q=${busqueda}`)
    const datos = await respuesta.json()
      setSeries(datos)
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
        </div>
      ))}
    </div>
  )
}

export default App
