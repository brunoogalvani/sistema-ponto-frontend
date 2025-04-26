import { useState, useEffect, useRef } from 'react'
import './ModalUsers.css'
import api from '../../services/api';
import ModalCriarUser from '../CriarUser/ModalCriarUser';

function ModalUsers({ onClose }) {

    const [users, setUsers] = useState([]);
    const [isModalCriarUserOpen, setIsModalCriarUserOpen] = useState(false)
    const userId = sessionStorage.getItem('userId');

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
            alert('Usuário deletado com sucesso!')
            getUsers();
        } catch (error) {
            console.error("Erro ao deletar usuário: ", error)
        }
    }

    return (
        <>
            <main className='main-users'>
                <div className="modal-users-container">
                    <div className="usuarios">
                        {users.length!==0 ?
                            users.map((user) => (
                                <div key={user.id} className="usuario">
                                    <span>Nome do usuário: </span> <div className="dados">{user.name}</div>
                                    <span>Email do Usuário: </span> <div className="dados">{user.email}</div>
                                    <span>Cargo do usuário: </span> <div className="dados">{user.role}</div>
                                    
                                    {user.id.toString()===userId ? null : (
                                        <div className='trash'>
                                            <i onClick={() => deletarUser(user.id)} className="bi bi-trash3-fill"></i>
                                        </div>
                                    )}
                                </div>
                            ))
                            : null
                        }
                    </div>

                    <button onClick={() => setIsModalCriarUserOpen(true)}>Criar Usuário</button>

                    <button onClick={onClose}>Fechar</button>
                </div>
            </main>

            {isModalCriarUserOpen && <ModalCriarUser onClose={() => setIsModalCriarUserOpen(false)} />}
        </>
    )
}

export default ModalUsers
