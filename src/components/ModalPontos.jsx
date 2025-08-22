import { useState, useEffect } from 'react'
import api from '../services/api';
import Alert from './Alert';

function ModalPontos({ onClose, id = 'main' }) {

  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [pontos, setPontos] = useState([])
  
  const [alertMessage, setAlertMessage] = useState(null)

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

  const handleOutClick = (e) => {
    if (e.target.id !== id) return
    onClose()
  }

  const handleAlertClose = () => {
    setAlertMessage(null)
  }

  return (
    <>
      <main id='main' className='fixed z-[1000] top-0 w-screen h-screen bg-[#00000099] content-center' onClick={handleOutClick}>
        <div className='bg-[#f1f1f1] w-[600px] h-[550px] border border-[#d8d8d8] rounded-[10px] shadow-[0px_0px_10px_1px_rgba(0,0,0,0.2)] my-0 mx-auto p-5 flex flex-col justify-evenly items-center'>
          <h1 className='text-[32px] font-bold'>Pontos dos Usuários</h1>
          <select className='bg-white h-[25px] w-[300px] pl-2.5 border border-[#b6b6b6] rounded-[10px] outline-none' value={selectedUserId} onChange={handleSelectChange}>
            <option value="" disabled>Selecione</option>
            {users.length!==0 ?
              users.map((user) => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))
              : <option disabled>Nenhum usuário foi registrado</option>  
            }
          </select>

          <div className='h-[250px] content-center overflow-y-auto'>
            {pontos.length!==0 ? (
              pontos.map((ponto) => (
                <div key={ponto.id} className='bg-[#f8f8f8] w-[500px] rounded-[10px] mt-[30px] mb-0 my-auto p-5 grid grid-cols-[1fr_1fr_1fr_1fr] grid-rows-[auto_auto] gap-2.5 text-center h-auto mr-2.5 first:mt-0'>
                  <div className='col-span-full'>
                    Dia:
                    <span className='text-[#808080]'> {ponto.dia}</span>
                  </div>
                  <div className='flex flex-col'>
                    Entrada
                    <span className='text-[#808080]'>{ponto.entradaManha || "--:--"}</span>
                  </div>
                  <div className='flex flex-col'>
                    Saída
                    <span className='text-[#808080]'>{ponto.saidaManha || "--:--"}</span>
                  </div>
                  <div className='flex flex-col'>
                    Entrada
                    <span className='text-[#808080]'>{ponto.entradaTarde || "--:--"}</span>
                  </div>
                  <div className='flex flex-col'>
                    Saída
                    <span className='text-[#808080]'>{ponto.saidaTarde || "--:--"}</span>
                  </div>
                  <div className='col-span-full'>
                    Total de Horas:
                    <span className='text-[#808080]'> {ponto.totalHoras || "--:--"}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className='bg-[#f8f8f8] w-[500px] h-[100px] rounded-[10px] mt-[30px] mb-0 mx-auto flex justify-center items-center'>
                <span className='text-black'>Não existe nenhum registro de ponto deste usuário</span>
              </div>
            )}
          </div>

          <button className='bg-white w-[200px] p-2.5 text-base border border-[#d1d1d1] rounded-[10px] cursor-pointer duration-300 hover:bg-[#eeeeee] active:bg-[#f7f7f7]' onClick={onClose}>Fechar</button>
        </div>
      </main>

      {alertMessage ? <Alert onClose={handleAlertClose}>{alertMessage}</Alert> : null}
    </>
  )
}

export default ModalPontos
