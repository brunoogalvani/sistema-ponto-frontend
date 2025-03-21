import { useState, useEffect } from 'react'
import './Dashboard.css'
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

function Dashboard() {

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
            </div>
          ))
        ) : (
          <div className="sem-ponto-container">
            <span className='sem-ponto'>Não existe nenhum registro de ponto deste usuário</span>
          </div>
        )}

        <button type="button" onClick={() => navigate('/')}>Voltar</button>
      </div>
    </>
  )
}

export default Dashboard
