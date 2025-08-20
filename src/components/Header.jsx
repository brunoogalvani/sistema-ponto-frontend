import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'
import Alert from './Alert';

function Header() {

    const navigate = useNavigate()
    const userId = sessionStorage.getItem('userId');
    const [role, setRole] = useState("")
    const [name, setName] = useState("")
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef()
    const dropdownContainerRef = useRef()

    const [alertMessage, setAlertMessage] = useState(null)

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
        setAlertMessage('Desconectado com sucesso!')
        setTimeout(() => {
            navigate('/')
        }, 3000);
    }

    function toggleDropdown() {
        setIsDropdownOpen(!isDropdownOpen)
    }

    const handleAlertClose = () => {
        setAlertMessage(null)
    }

    return (
        <>
            <header className='flex justify-between items-center w-screen h-20 bg-[#f1f1f1] shadow-[0px_1px_10px_1px_rgba(0,0,0,0.2)]'>
                <div className='flex gap-[100px] ml-[50px]'>
                    {userId ? (
                        <>
                            <button className='h-min p-2.5 border-0 rounded-[10px] text-base cursor-pointer bg-transparent duration-500 hover:shadow-[0px_0px_10px_0.5px]' onClick={() => navigate('/')}>Home</button>
                            <button className='h-min p-2.5 border-0 rounded-[10px] text-base cursor-pointer bg-transparent duration-500 hover:shadow-[0px_0px_10px_0.5px]' onClick={() => navigate('/registrar-ponto')}>Registrar Ponto</button>
                            <button className='h-min p-2.5 border-0 rounded-[10px] text-base cursor-pointer bg-transparent duration-500 hover:shadow-[0px_0px_10px_0.5px]' onClick={() => navigate('/seus-pontos')}>Acessar seus Pontos</button>
                            <button className='h-min p-2.5 border-0 rounded-[10px] text-base cursor-pointer bg-transparent duration-500 hover:shadow-[0px_0px_10px_0.5px]' onClick={() => navigate('/solicitacoes')}>Solicitações</button>
                        
                        {role==="ADMIN" ? (
                            <button className='h-min p-2.5 border-0 rounded-[10px] text-base cursor-pointer bg-transparent duration-500 hover:shadow-[0px_0px_10px_0.5px]' onClick={() => navigate('/area-admin')}>Área do Administrador</button>
                        ) : null}
                        </>
                    ) : 
                        <button className='h-min p-2.5 border-0 rounded-[10px] text-base cursor-pointer bg-transparent duration-500 hover:shadow-[0px_0px_10px_0.5px]' onClick={() => navigate('/')}>Home</button>
                    }
                </div>
                <div className='flex items-center gap-[50px] mr-[50px]'>
                    {userId ? (
                        <>
                            <div className='relative inline-block w-auto' ref={dropdownContainerRef}>
                                <button onClick={toggleDropdown} className='h-min p-2.5 border-0 rounded-[10px] text-base cursor-pointer bg-transparent duration-500 hover:shadow-[0px_0px_10px_0.5px] flex text-start gap-2.5 w-auto items-center'>
                                    <i className='text-[32px] bi bi-person-circle'></i>
                                    <p>Bem vindo, {name}</p>
                                </button>
 
                                <div className={`bg-[#f1f1f1] absolute top-full right-0 border border-[#d1d1d1] rounded-[5px] shadow-[0px_0px_10px_1px_rgba(0,0,0,0.1)] w-[200px] z-[1000] flex flex-col p-2.5 gap-2.5 max-h-0 opacity-0 overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${isDropdownOpen ? 'max-h-[500px] opacity-100' : ''}`} ref={dropdownRef}>
                                    <button className='h-min p-2.5 border-0 rounded-[10px] text-base cursor-pointer bg-transparent duration-500 bg-none text-left hover:shadow-none hover:bg-[#e2e2e2] active:bg-[#f5f5f5]' onClick={() => navigate('/conta')}>Editar conta</button>
                                    <button className='h-min p-2.5 border-0 rounded-[10px] text-base cursor-pointer bg-transparent duration-500 bg-none text-left hover:shadow-none hover:bg-[#e2e2e2] active:bg-[#f5f5f5]' onClick={voltar}>Sair</button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <button onClick={() => navigate('/login')} className='flex text-start gap-2.5 w-[140px] duration-500 hover:shadow-[0px_0px_10px_0.5px] h-min p-2.5 border-0 rounded-[10px] text-base cursor-pointer bg-transparent'>
                            <i className='text-[32px] bi bi-person-circle'></i>
                            <p>Entrar Cadastrar</p>
                        </button>
                    )}
                </div>
            </header>

            {alertMessage ? <Alert onClose={handleAlertClose}>{alertMessage}</Alert> : null}
        </>
    )
}

export default Header
