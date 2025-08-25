import { useEffect, useState } from 'react';
import api from '../services/api'

function ModalSolicitacao({ onClose, id = 'main' }) {

    const userId = sessionStorage.getItem('userId');
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState("");
    const [solicitacoes, setSolicitacoes] = useState([]);
    
    useEffect(() => {
        getSolicitacoes()
    }, []);

    async function getSolicitacoes() {
        try {
            const response = await api.get('/solicitacoes');
    
            setSolicitacoes(response.data);
        } catch (error) {
            console.error("Erro na requisição", error);
        }
    }

    useEffect(() => {
        getUsers()
    }, []);

    async function getUsers() {
        try {
            const response = await api.get('/users');
        
            setUsers(response.data); 
        } catch (error) {
            console.error("Erro ao buscar usuários: ", error);
        }
    }

    async function processarSolicitacao(id, aprovada) {
        try {
            await api.put(`/solicitacoes/${id}/processar/${userId}?aprovada=${aprovada}`);
            getSolicitacoes(); // atualizar lista
        } catch (err) {
            console.error(err);
        }
    }

    function handleSelectChange(event) {
        const id = event.target.value;
        setSelectedUserId(id);

        if (id) {
            api.get(`/solicitacoes/${id}`)
                .then(res => setSolicitacoes(res.data))
                .catch(err => console.error("Erro ao buscar solicitações do usuário: ", err))
        } else {
            api.get('/solicitacoes')
                .then(res => setSolicitacoes(res.data))
                .catch(err => console.error("Erro ao buscar solicitações de todos: ", err))
        }
    }

    const handleOutClick = (e) => {
        if (e.target.id !== id) return
        onClose()
    }

    const statusColors = {
        APROVADA: "#0d9b00",
        REJEITADA: "#c00000",
        PENDENTE: "#d4a017"
    };

    return (
        <>
            <main id='main' className='fixed z-[1000] top-0 w-screen h-screen bg-[#00000099] content-center' onClick={handleOutClick}>
                <div className='bg-[#f1f1f1] w-[700px] h-[600px] border border-[#d8d8d8] rounded-[10px] shadow-[0px_0px_10px_1px_rgba(0,0,0,0.2)] my-0 mx-auto p-5 flex flex-col justify-evenly items-center'>
                    <h1 className='text-[32px] font-bold'>Solicitações dos Usuários</h1>
                    <select className='bg-white h-[25px] w-[300px] pl-2.5 border border-[#b6b6b6] rounded-[10px] outline-none' value={selectedUserId} onChange={handleSelectChange}>
                        <option value="">Todos</option>
                        {users.length!==0 ?
                            users.map((user) => (
                                <option key={user.id} value={user.id}>{user.name}</option>
                            ))
                            : <option disabled>Nenhum usuário foi registrado</option>
                        }
                    </select>
                    <div className='h-[350px] overflow-y-auto'>
                        {solicitacoes.length!==0 ? (
                            solicitacoes.map((solicitacao) => (
                                <div key={solicitacao.id} className='bg-[#f8f8f8] w-[600px] h-auto rounded-[10px] mt-[30px] mb-0 mx-auto p-5 grid grid-cols-[1fr_1fr_1fr_1fr] grid-rows-[auto] gap-2.5 text-center mr-2.5 first:mt-0'>
                                    <div className='col-span-1'>
                                        Dia:
                                        <span className='text-[#808080]'> {solicitacao.diaPontoOriginal}</span>
                                    </div>
                                    <div className='col-span-2'>
                                        Motivo:
                                        <span className={`text-[#808080]`}> {solicitacao.motivo}</span>
                                    </div>
                                    {solicitacao.status!=='PENDENTE' ? (
                                        <div className='flex justify-evenly'>
                                            <i class="text-2xl text-gray-300 bi bi-check-square-fill"></i>
                                            <i class="text-2xl text-gray-300 bi bi-x-square-fill"></i>
                                        </div>
                                    ) : (
                                        <div className='flex justify-evenly'>
                                            <i class="text-2xl text-green-600 cursor-pointer bi bi-check-square-fill" onClick={() => processarSolicitacao(solicitacao.id, true)}></i>
                                            <i class="text-2xl text-red-600 cursor-pointer bi bi-x-square-fill" onClick={() => processarSolicitacao(solicitacao.id, false)}></i>
                                        </div>
                                    )}
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
                                    <div className='flex flex-col col-span-1'>
                                        Usuário:
                                        <span className='text-[#808080]'> {solicitacao.userName}</span>
                                    </div>
                                    <div className='col-span-2 content-center'>
                                        Status:
                                        <span className="text-[color]" style={{color: statusColors[solicitacao.status]}}> {solicitacao.status}</span>
                                    </div>
                                    <div className='flex flex-col col-span-1'>
                                        Admin:
                                        <span className='text-[#808080]'> {solicitacao.userAdminName ? solicitacao.userAdminName : '--'}</span>
                                    </div>
                                </div>
                            ))
                            ) : (
                            <div className='bg-[#f8f8f8] w-[550px] h-[100px] rounded-[10px] mt-[30px] mb-0 mx-auto flex justify-center items-center'>
                                <span className='text-black'>Não existe nenhuma solicitação</span>
                            </div>
                        )}
                    </div>
                    <button className='bg-white w-[200px] p-2.5 text-base border border-[#d1d1d1] rounded-[10px] cursor-pointer duration-300 hover:bg-[#eeeeee] active:bg-[#f7f7f7]' onClick={onClose}>Fechar</button>
                </div>
            </main>
        </>
    )
}

export default ModalSolicitacao