import { useState, useEffect } from 'react';
import './Home.css'
import api from '../../services/api'

function Home() {

  const [userName, setUserName] = useState("");
  const userId = sessionStorage.getItem('userId');

  const [pontos, setPontos] = useState("");

  const dataAtual = new Date();
  const dia = String(dataAtual.getDate()).padStart(2, '0');
  const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
  const ano = dataAtual.getFullYear();
  const dataFormatada = `${dia}-${mes}-${ano}`;

  useEffect(() => {
    getPontos()
  }, [userId]);

  async function getPontos() {
    try {
      const response = await api.get(`/pontos/${userId}`);

      const pontoDia = response.data.find((ponto) => ponto.dia === dataFormatada);

      setPontos(pontoDia || null);
    } catch (error) {
      console.error("Erro na requisição", error);
    }
  }

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
      await api.post(`/pontos/bater/${userId}`);
      getPontos();
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

        {pontos ? (
          <>
            <div className="pontos-dia">
              <div className="dia">
                Dia:
                <span> {pontos.dia}</span>
              </div>
              <div className="horario">
                Entrada
                <span>{pontos.entradaManha || "--:--"}</span>
              </div>
              <div className="horario">
                Saída
                <span>{pontos.saidaManha || "--:--"}</span>
              </div>
              <div className="horario">
                Entrada
                <span>{pontos.entradaTarde || "--:--"}</span>
              </div>
              <div className="horario">
                Saída
                <span>{pontos.saidaTarde || "--:--"}</span>
              </div>
            </div>
          </>
        ) : (
          <div className="sem-ponto-container">
            <span className='sem-ponto'>Não existe nenhum registro de ponto no dia {dataFormatada}</span>
          </div>
        )}
    </>
  )
}

export default Home
