import { useEffect, useState } from 'react';
import './Header.css'
import { useNavigate } from 'react-router-dom';
import api from '../../services/api'

function Header() {

    const navigate = useNavigate()
    const userId = sessionStorage.getItem('userId');
    const [role, setRole] = useState("")
    const [name, setName] = useState("")

    useEffect(() => {
        validarRole()
    }, [userId]);
    
    async function validarRole() {
        try {
            const response = await api.get(`/users/${userId}`)
            setRole(response.data.role)
            setName(response.data.name)
        } catch (error) {
            console.error("Erro na autenticação", error);
        }
    }

    function voltar() {
        sessionStorage.setItem('userId', '');
        navigate('/')
    }

    return (
        <>
            <header>
                <div className='header-group'>
                    {userId ? (
                        <>
                            <button onClick={() => navigate('/')}>
                                Home
                            </button>
                            <button onClick={() => navigate('/registrar-ponto')}>
                                Registrar Ponto
                            </button>
                            <button onClick={() => navigate('/seus-pontos')}>
                                Acessar seus Pontos
                            </button>
                            <button onClick={() => navigate('/solicitacoes')}>
                                Solicitações
                            </button>
                        
                        {role==="ADMIN" ? (
                            <button onClick={() => navigate('/area-admin')}>
                                Área do Administrador
                            </button>
                        ) : null}
                        </>
                    ) : 
                        <button onClick={() => navigate('/')}>
                            Home
                        </button>
                    }
                </div>
                <div className="conta-group">
                    {userId ? (
                        <>
                            <button onClick={() => navigate('/conta')} className='conta verificado'>
                                <i className='bi bi-person-circle'></i>
                                <p>Bem vindo, {name}</p>
                            </button>

                            <button onClick={voltar} className='sair'>
                                Sair
                            </button>
                        </>
                    ) : (
                        <button onClick={() => navigate('/login')} className='conta'>
                            <i className='bi bi-person-circle'></i>
                            <p>Entrar Cadastrar</p>
                        </button>
                    )}
                </div>
            </header>
        </>
    )
}

export default Header
