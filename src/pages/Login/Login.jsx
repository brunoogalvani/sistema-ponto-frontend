import { useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Login.css'
import api from '../../services/api'

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
                if (response.data.role == 'USER') {
                    sessionStorage.setItem("userId", response.data.id);
                    navigate('/home');
                } else {
                    sessionStorage.setItem("userId", response.data.id);
                    navigate('/dashboard');
                }
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
            <div className='login-container'>
                <h1>Faça seu Login</h1>
                    <form className='login-form' onKeyDown={handleKeyPress}>
                    <input placeholder='Login' name='login' type='text' ref={inputLogin} autoComplete='off' />
                    <input placeholder='Senha' name='senha' type='password' ref={inputPassword} autoComplete='off' />
                    <button type='button' onClick={autenticarUser}>Entrar</button>
                    <Link to ='/register'>Registre-se aqui</Link>
                </form>
            </div>
        </>
    )
}

export default Login
