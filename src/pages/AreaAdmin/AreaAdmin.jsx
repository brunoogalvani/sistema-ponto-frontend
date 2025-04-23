import { useState, useEffect } from 'react'
import './AreaAdmin.css'
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';

function AreaAdmin() {

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [pontos, setPontos] = useState([])

  useEffect(() => {
    getUsers()
  }, [users]);

  async function getUsers() {
    try {
      const response = await api.get('/users');
  
      setUsers(response.data); 
    } catch (error) {
      console.error("Erro ao buscar usuários: ", error);
    }
  }

  async function getPontos(userId) {
    try {
      const response = await api.get(`/pontos/${userId}`);

      setPontos(response.data);
    } catch (error) {
      console.error("Erro na requisição", error);
      setPontos([]);
    }
  }

  function handleSelectChange(event) {
    const userId = event.target.value;
    setSelectedUserId(userId);

    if (userId) {
      getPontos(userId);
    } else {
      setPontos([]);
    }
  }

  return (
    <>
      <Header />
      <main>
        <div className="dashboard-container">
          <select value={selectedUserId} onChange={handleSelectChange}>
            <option value="" defaultValue>Selecione</option>
            {users.length!==0 ?
              users.map((user) => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))
              : <option disabled>Nenhum usuário foi registrado</option>  
            }
          </select>

          <div className="pontos">
            {pontos.length!==0 ? (
              pontos.map((ponto) => (
                <div key={ponto.id} className="pontos-dia">
                  <div className="dia">
                    Dia:
                    <span> {ponto.dia}</span>
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
              ))
            ) : (
              <div className="sem-ponto-container">
                <span className='sem-ponto'>Não existe nenhum registro de ponto deste usuário</span>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export default AreaAdmin
