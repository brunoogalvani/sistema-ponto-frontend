import { useEffect, useState } from 'react';
import api from '../services/api'
import Header from '../components/Header';

function Solicitacoes() {

    const userId = sessionStorage.getItem('userId');
    const [solicitacoes, setSolicitacoes] = useState([]);
    
    useEffect(() => {
        getSolicitacoes()
    }, []);

    async function getSolicitacoes() {
        try {
            const response = await api.get(`/solicitacoes/${userId}`);
    
            setSolicitacoes(response.data);
        } catch (error) {
            console.error("Erro na requisição", error);
        }
    }

    const statusColors = {
        APROVADA: "#0d9b00",
        REJEITADA: "#c00000",
        PENDENTE: "#d4a017"
    };

    return (
        <>
            <Header />
            <main className='flex flex-col justify-center items-center w-screen h-[calc(100vh-80px)]'>
                <div className='bg-[#f1f1f1] w-[700px] h-[500px] border border-[#d8d8d8] rounded-[10px] shadow-[0px_0px_10px_1px_rgba(0,0,0,0.2)] my-0 mx-auto p-5 flex flex-col justify-evenly items-center'>
                    <h1 className='text-[32px] font-bold'>Suas Solicitações</h1>
                    <div className='h-[350px] overflow-y-auto'>
                        {solicitacoes.length ? (
                            solicitacoes.map((solicitacao) => (
                                <div key={solicitacao.id} className='bg-[#f8f8f8] w-[600px] h-auto rounded-[10px] mt-[30px] mb-0 mx-auto p-5 grid grid-cols-[1fr_1fr_1fr_1fr] grid-rows-[auto_auto_auto_auto] gap-2.5 text-center mr-2.5 first:mt-0'>
                                    <div className='col-span-2'>
                                        Dia:
                                        <span className='text-[#808080]'> {solicitacao.diaPontoOriginal}</span>
                                    </div>
                                    <div className='col-span-2'>
                                        Motivo:
                                        <span className={`text-[#808080]`}> {solicitacao.motivo}</span>
                                    </div>
                                    <div className='col-span-full'>
                                        Original
                                    </div>
                                    <div className='flex flex-col'>
                                        Entrada
                                        <span className='text-[#808080]'>{solicitacao.entradaManhaOriginal || "--:--"}</span>
                                    </div>
                                    <div className='flex flex-col'>
                                        Saída
                                        <span className='text-[#808080]'>{solicitacao.saidaManhaOriginal || "--:--"}</span>
                                    </div>
                                    <div className='flex flex-col'>
                                        Entrada
                                        <span className='text-[#808080]'>{solicitacao.entradaTardeOriginal || "--:--"}</span>
                                    </div>
                                    <div className='flex flex-col'>
                                        Saída
                                        <span className='text-[#808080]'>{solicitacao.saidaTardeOriginal || "--:--"}</span>
                                    </div>
                                    <div className='col-span-full'>
                                        Novo
                                    </div>
                                    <div className='flex flex-col'>
                                        Entrada
                                        <span className='text-[#808080]'>{solicitacao.entradaManhaNovo || "--:--"}</span>
                                    </div>
                                    <div className='flex flex-col'>
                                        Saída
                                        <span className='text-[#808080]'>{solicitacao.saidaManhaNovo || "--:--"}</span>
                                    </div>
                                    <div className='flex flex-col'>
                                        Entrada
                                        <span className='text-[#808080]'>{solicitacao.entradaTardeNovo || "--:--"}</span>
                                    </div>
                                    <div className='flex flex-col'>
                                        Saída
                                        <span className='text-[#808080]'>{solicitacao.saidaTardeNovo || "--:--"}</span>
                                    </div>
                                    {solicitacao.status!=='PENDENTE' ? (
                                        <>
                                            <div className='col-span-2'>
                                                Status:
                                                <span className="text-[color]" style={{color: statusColors[solicitacao.status]}}> {solicitacao.status}</span>
                                            </div>
                                            <div className='col-span-2'>
                                                Admin:
                                                <span className="text-[#808080]"> {solicitacao.userAdminName}</span>
                                            </div>
                                        </>
                                    ) : (
                                        <div className='col-span-full'>
                                            Status:
                                            <span className="text-[color]" style={{color: statusColors[solicitacao.status]}}> {solicitacao.status}</span>
                                        </div>
                                    )}
                                </div>
                            ))
                            ) : (
                            <div className='bg-[#f8f8f8] w-[550px] h-[100px] rounded-[10px] mt-[30px] mb-0 mx-auto flex justify-center items-center'>
                                <span className='text-black'>Não existe nenhuma solicitação deste usuário</span>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </>
    )
}

export default Solicitacoes