import { useEffect, useState, useRef } from 'react';
import './Header.css'
import { useNavigate } from 'react-router-dom';
import api from '../../services/api'

function Header() {

    const navigate = useNavigate()
    const userId = sessionStorage.getItem('userId');
    const [role, setRole] = useState("")
    const [name, setName] = useState("")
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef()
    const dropdownContainerRef = useRef()

    useEffect(() => {
        const interval = setInterval(() => {
            validarRole()
        }, 50);
        
        return () => clearInterval(interval)
    }, [userId]);
    
    useEffect(() => {
        function handleOutClick(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target) && !dropdownContainerRef.current.contains(e.target)) {
                setIsDropdownOpen(false)
            }
        }

        document.addEventListener('mousedown', handleOutClick)

        return () => {
            document.removeEventListener('mousedown', handleOutClick)
        }
    }, []);

    async function validarRole() {
        try {
            if (userId) {
                const response = await api.get(`/users/${userId}`)
                setRole(response.data.role)
                setName(response.data.name)
            }
        } catch (error) {
            console.error("Erro na autenticação", error);
        }
    }

    function voltar() {
        sessionStorage.setItem('userId', '');
        navigate('/')
    }

    function toggleDropdown() {
        setIsDropdownOpen(!isDropdownOpen)
    }

    return (
        <>
            <header>
                <div className='header-group'>
                    {userId ? (
                        <>
                            <button onClick={() => navigate('/')}>Home</button>
                            <button onClick={() => navigate('/registrar-ponto')}>Registrar Ponto</button>
                            <button onClick={() => navigate('/seus-pontos')}>Acessar seus Pontos</button>
                            <button onClick={() => navigate('/solicitacoes')}>Solicitações</button>
                        
                        {role==="ADMIN" ? (
                            <button onClick={() => navigate('/area-admin')}>Área do Administrador</button>
                        ) : null}
                        </>
                    ) : 
                        <button onClick={() => navigate('/')}>Home</button>
                    }
                </div>
                <div className="conta-group">
                    {userId ? (
                        <>
                            <div className="dropdown-container" ref={dropdownContainerRef}>
                                <button onClick={toggleDropdown} className='conta verificado'>
                                    <i className='bi bi-person-circle'></i>
                                    <p>Bem vindo, {name}</p>
                                </button>
 
                                <div className={`dropdown-menu ${isDropdownOpen ? 'open' : ''}`} ref={dropdownRef}>
                                    <button onClick={() => navigate('/conta')}>Editar conta</button>
                                    <button onClick={voltar}>Sair</button>
                                </div>
                            </div>
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
