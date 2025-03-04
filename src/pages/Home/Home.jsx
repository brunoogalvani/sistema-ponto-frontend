import './Home.css'
import api from '../../services/api'

function Home() {

  const userId = sessionStorage.getItem('userId');
  console.log(userId);

  async function baterPonto(id) {
    try {
      await api.post(`/pontos/bater/${id}`)
    } catch (error) {
      alert("Todas as marcações de ponto do dia já foram preenchidas")
      console.error("Erro ao registrar ponto:", error);
    }
  }

  return (
    <>
      <div className="home-container">
        <h1>Registro de Ponto</h1>
        <button type="button" onClick={() => baterPonto(userId)}>Registrar Ponto</button>
      </div>
    </>
  )
}

export default Home
