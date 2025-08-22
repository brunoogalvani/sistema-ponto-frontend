import { useEffect, useState } from 'react'
import api from '../services/api'
import Header from '../components/Header';
import ModalCriarSolicitacao from '../components/ModalCriarSolicitacao';

function SeusPontos() {

    const userId = sessionStorage.getItem('userId');
    const [pontos, setPontos] = useState([])
    const [isModalSolicitacaoOpen, setIsModalSolicitacaoOpen] = useState(false)
    const [pontoSelecionado, setPontoSelecionado] = useState(null)
    
    useEffect(() => {
        getPontos()
      }, [userId]);

    async function getPontos() {
        try {
          const response = await api.get(`/pontos/${userId}`);
    
          setPontos(response.data);
        } catch (error) {
          console.error("Erro na requisição", error);
        }
    }

    const abrirModal = (ponto) => {
        setPontoSelecionado(ponto)
        setIsModalSolicitacaoOpen(true)
    }

    return (
        <>
            <Header />
            <main className='flex flex-col justify-center items-center w-screen h-[calc(100vh-80px)]'>
                <div className='bg-[#f1f1f1] w-[600px] h-[500px] border border-[#d8d8d8] rounded-[10px] shadow-[0px_0px_10px_1px_rgba(0,0,0,0.2)] my-0 mx-auto p-5 flex flex-col justify-evenly items-center'>
                    <h1 className='text-[32px] font-bold'>Sua Folha Ponto</h1>
                    <div className='h-[340px] overflow-y-auto'>
                        {pontos.length!==0 ? (
                            pontos.map((ponto) => (
                                <div key={ponto.id} className='bg-[#f8f8f8] w-[500px] h-[150px] rounded-[10px] mt-[30px] mb-0 mx-auto p-5 grid grid-cols-[1fr_1fr_1fr_1fr_auto] grid-rows-[auto_auto] gap-2.5 text-center mr-2.5 first:mt-0'>
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
                                    <div className='flex flex-col justify-center'>
                                        <i onClick={() => abrirModal(ponto)} className="text-[18px] cursor-pointer bi bi-pencil-square"></i>
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
                </div>
            </main>

            {isModalSolicitacaoOpen && <ModalCriarSolicitacao onClose={() => setIsModalSolicitacaoOpen(false)} ponto={pontoSelecionado} />}
        </>
    )
}

export default SeusPontos
