import './Home.css'
import api from '../../services/api'

function App() {

  async function baterPonto() {
    console.log('Ponto Registrado')
    let userId = '1';
    await api.post(`/pontos/bater/${userId}`)

  }

  return (
    <>
      <div className="container">
        <h1>Registro de Ponto</h1>
        <button type="button" onClick={baterPonto}>Registrar Ponto</button>
      </div>
    </>
  )
}

export default App
