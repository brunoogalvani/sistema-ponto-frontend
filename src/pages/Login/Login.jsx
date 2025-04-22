import { useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Login.css'
import api from '../../services/api'
import Header from '../../components/Header/Header'

function Login() {

    const navigate = useNavigate()
    const inputLogin = useRef()
    const inputPassword = useRef()

    async function autenticarUser() {
        try {
            const response = await api.post('/auth/login', {
                login: inputLogin.current.value,
                password: inputPassword.current.value
            })
            
            if (response.status === 200) {
                
                sessionStorage.setItem("userId", response.data.id);
                navigate('/registrar-ponto');
                
            }
        } catch (error) {
            console.error("Erro na autenticação", error);
            alert("Usuário e/ou Senha Inválidos");
        }

    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            autenticarUser();
        }
    }

    return (
        <>
            <Header />
            <main>
                <div className='login-container'>
                    <form className='login-form' onKeyDown={handleKeyPress}>
                        <h1>Faça seu Login</h1>
                        <input placeholder='Email' name='email' type='email' ref={inputLogin} autoComplete='off' />
                        <input placeholder='Senha' name='senha' type='password' ref={inputPassword} autoComplete='off' />
                        <button type='button' onClick={autenticarUser}>Entrar</button>
                        <span>Não possui cadastro? <Link to ='/register'>Registre-se aqui</Link></span>
                    </form>
                </div>
            </main>
        </>
    )
}

export default Login
