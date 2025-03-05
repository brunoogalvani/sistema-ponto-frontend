import { useState, useEffect } from 'react';
import './Home.css'
import api from '../../services/api'

function Home() {

  const [userName, setUserName] = useState("");
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    async function getUserName() {
      try {
        const response = await api.get(`/users/${userId}`);
        setUserName(response.data.name)
      } catch (error) {
        console.error("Erro ao buscar o usuário:", error);
      }
    }

      if (userId) {
        getUserName();
      }

  }, [userId]);

  async function baterPonto() {
    try {
      await api.post(`/pontos/bater/${userId}`)
    } catch (error) {
      alert("Todas as marcações de ponto do dia já foram preenchidas")
      console.error("Erro ao registrar ponto:", error);
    }
  }

  return (
    <>
      <div className="home-container">
        <h1>Registro de Ponto</h1>
        <h3>Bem-vindo, {userName}</h3>
        <button type="button" onClick={baterPonto}>Registrar Ponto</button>
      </div>
    </>
  )
}

export default Home
