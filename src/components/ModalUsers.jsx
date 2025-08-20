import { useState, useEffect } from 'react'
import api from '../services/api';
import ModalCriarUser from './ModalCriarUser';
import Alert from './Alert';

function ModalUsers({ onClose, id = 'main' }) {

    const [users, setUsers] = useState([]);
    const [isModalCriarUserOpen, setIsModalCriarUserOpen] = useState(false)
    const userId = sessionStorage.getItem('userId');
    
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

    async function deletarUser(id) {
        try {
            await api.delete(`/users/${id}`)
            // alert('Usuário deletado com sucesso!')
            setAlertMessage('Usuário deletado com sucesso!')
            getUsers();
        } catch (error) {
            setAlertMessage('Erro ao deletar usuário')
            console.error("Erro ao deletar usuário: ", error)
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
                <div className='bg-[#f1f1f1] w-[600px] h-[500px] border border-[#d8d8d8] rounded-[10px] shadow-[0px_0px_10px_1px_rgba(0,0,0,0.2)] my-0 mx-auto p-5 flex flex-col justify-around items-center'>
                    <div className='h-[290px] overflow-y-auto'>
                        {users.length!==0 ?
                            users.map((user) => (
                                <div key={user.id} className='bg-[#f8f8f8] rounded-[10px] w-[500px] h-auto p-[15px] grid grid-cols-[150px_250px_auto] gap-2.5 mt-5 mr-2.5 first:mt-0'>
                                    <span className='text-black font-bold col-1 content-center'>Nome do usuário: </span> <div className='content-center'>{user.name}</div>
                                    <span className='text-black font-bold col-1 content-center'>Email do Usuário: </span> <div className='content-center'>{user.email}</div>
                                    <span className='text-black font-bold col-1 content-center'>Cargo do usuário: </span> <div className='content-center'>{user.role}</div>
                                    
                                    {user.id.toString()===userId ? null : (
                                        <div className='col-3 row-2 text-center'>
                                            <i onClick={() => deletarUser(user.id)} className="text-[#ff0000] cursor-pointer bi bi-trash3-fill"></i>
                                        </div>
                                    )}
                                </div>
                            ))
                            : null
                        }
                    </div>

                    <button className='bg-white w-[200px] p-2.5 text-base border border-[#d1d1d1] rounded-[10px] cursor-pointer duration-300 hover:bg-[#eeeeee] active:bg-[#f7f7f7]' onClick={() => setIsModalCriarUserOpen(true)}>Criar Usuário</button>

                    <button className='bg-white w-[200px] p-2.5 text-base border border-[#d1d1d1] rounded-[10px] cursor-pointer duration-300 hover:bg-[#eeeeee] active:bg-[#f7f7f7]' onClick={onClose}>Fechar</button>
                </div>
            </main>

            {isModalCriarUserOpen && <ModalCriarUser onClose={() => setIsModalCriarUserOpen(false)} />}
            {alertMessage ? <Alert onClose={handleAlertClose}>{alertMessage}</Alert> : null}
        </>
    )
}

export default ModalUsers
