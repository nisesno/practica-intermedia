import { useState } from 'react'

function App() {
  const [busqueda, setBusqueda] = useState('')

  return (
    <div>
      <h1>Buscador de Series</h1>
      <input
        type="text"
        placeholder="Buscar series"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <button>Buscar</button>
    </div>
  )
}

export default App
