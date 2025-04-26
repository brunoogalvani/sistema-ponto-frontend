import { useState, useEffect } from 'react'
import './ModalPontos.css'
import api from '../../services/api';

function ModalPontos({ onClose }) {

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
      <main className='main-pontos'>
        <div className="modal-pontos-container">
          <select value={selectedUserId} onChange={handleSelectChange}>
            <option value="" disabled selected>Selecione</option>
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

          <button onClick={onClose}>Fechar</button>
        </div>
      </main>
    </>
  )
}

export default ModalPontos
