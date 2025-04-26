import { useState, useEffect } from 'react';
import './RegistrarPonto.css'
import api from '../../services/api'
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';

function RegistrarPonto() {

  const navigate = useNavigate()

  const [userName, setUserName] = useState("");
  const userId = sessionStorage.getItem('userId');

  const [ponto, setPonto] = useState("");

  const dataAtual = new Date();
  const dia = String(dataAtual.getDate()).padStart(2, '0');
  const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
  const ano = dataAtual.getFullYear();
  const dataFormatada = `${dia}-${mes}-${ano}`;

  useEffect(() => {
    getPonto()
  }, [userId]);

  async function getPonto() {
    try {
      const response = await api.get(`/pontos/${userId}/${dataFormatada}`);

      setPonto(response.data);
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
      getPonto();
    } catch (error) {
      alert("Todas as marcações de ponto do dia já foram preenchidas")
      console.error("Erro ao registrar ponto:", error);
    }
  }

  return (
    <>
      <Header />
      <main>
        <div className="registrar-container">
          <h1>Registrar Ponto</h1>
          <button type="button" onClick={baterPonto}>Registrar Ponto</button>
        </div>

          {ponto ? (
            <>
              <div className="pontos-dia">
                <div className="dia">
                  Dia:
                  <span> {dia}/{mes}/{ano}</span>
                </div>
                <div className="horario">
                  Entrada
                  <span>{ponto.entradaManha || "--:--"}</span>
                </div>
                <div className="horario">
                  Saída
                  <span>{ponto.saidaManha || "--:--"}</span>
                </div>
                <div className="horario">
                  Entrada
                  <span>{ponto.entradaTarde || "--:--"}</span>
                </div>
                <div className="horario">
                  Saída
                  <span>{ponto.saidaTarde || "--:--"}</span>
                </div>
                <div className="total-horas">
                  Total de Horas:
                  <span> {ponto.totalHoras || "--:--"}</span>
                </div>
              </div>
            </>
          ) : (
            <div className="sem-ponto-container">
              <span className='sem-ponto'>Não existe nenhum registro de ponto no dia {dia}/{mes}/{ano}</span>
            </div>
          )}
      </main>
    </>
  )
}

export default RegistrarPonto
