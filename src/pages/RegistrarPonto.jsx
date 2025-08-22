import { useState, useEffect } from 'react';
import api from '../services/api'
import Header from '../components/Header';
import Alert from '../components/Alert';

function RegistrarPonto() {

  const userId = sessionStorage.getItem('userId');

  const [ponto, setPonto] = useState("");

  const dataAtual = new Date();
  const dia = String(dataAtual.getDate()).padStart(2, '0');
  const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
  const ano = dataAtual.getFullYear();
  const dataFormatada = `${dia}-${mes}-${ano}`;

  const [alertMessage, setAlertMessage] = useState(null)

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

  async function baterPonto() {
    try {
      await api.post(`/pontos/bater/${userId}`);
      getPonto();
    } catch (error) {
      setAlertMessage('Todas as marcações de ponto do dia já foram preenchidas')
      console.error("Erro ao registrar ponto:", error);
    }
  }

  const handleAlertClose = () => {
    setAlertMessage(null)
  }

  return (
    <>
      <Header />
      <main className='flex flex-col justify-center items-center w-screen h-[calc(100vh-80px)]'>
        <div className='bg-[#f1f1f1] w-[450px] h-[400px] border border-[#d8d8d8] rounded-[10px] shadow-[0px_0px_10px_1px_rgba(0,0,0,0.2)] my-0 mx-auto p-5 flex flex-col justify-evenly items-center'>
          <h1 className='text-[32px] font-bold'>Registre seu Ponto</h1>
          <button className='text-base bg-white flex justify-center border border-[#d1d1d1] rounded-[10px] w-[200px] p-2.5 cursor-pointer duration-300 hover:bg-[#eeeeee] active:bg-[#f7f7f7]' type="button" onClick={baterPonto}>Registrar</button>
        </div>

          {ponto ? (
            <>
              <div className='bg-[#f8f8f8] w-[500px] h-[150px] shadow-[0px_0px_10px_1px_rgba(0,0,0,0.2)] rounded-[10px] mt-[30px] mb-0 mx-auto p-5 grid grid-cols-[1fr_1fr_1fr_1fr] grid-rows-[auto_auto] gap-2.5 text-center'>
                <div className='col-span-full'>
                  Dia:
                  <span className='text-[#808080]'> {dia}/{mes}/{ano}</span>
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
            </>
          ) : (
            <div className='bg-[#f8f8f8] w-[500px] h-[100px] shadow-[0px_0px_10px_1px_rgba(0,0,0,0.2)] rounded-[10px] mt-[30px] mb-0 mx-auto flex justify-center items-center'>
              <span className='text-black'>Não existe nenhum registro de ponto no dia {dia}/{mes}/{ano}</span>
            </div>
          )}
      </main>

      {alertMessage ? <Alert onClose={handleAlertClose}>{alertMessage}</Alert> : null}
    </>
  )
}

export default RegistrarPonto
