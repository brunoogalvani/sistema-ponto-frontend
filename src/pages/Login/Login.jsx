import { useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Login.css'
import api from '../../services/api'
import Header from '../../components/Header/Header'

function Login() {

    const navigate = useNavigate()
    const inputEmail = useRef()
    const inputPassword = useRef()

    async function autenticar() {
        try {
            const response = await api.post('/auth/login', {
                email: inputEmail.current.value,
                password: inputPassword.current.value
            })
            
            if (response.status === 200) {  
                sessionStorage.setItem("userId", response.data.id);
                navigate('/');
            }
        } catch (error) {
            console.error("Erro na autenticação", error);
            alert("Usuário e/ou Senha Inválidos");
        }
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            autenticar();
        }
    }

    return (
        <>
            <Header />
            <main>
                <div className='login-container'>
                    <form className='login-form' onKeyDown={handleKeyPress}>
                        <h1>Faça seu Login</h1>
                        <input placeholder='Email' name='email' type='email' ref={inputEmail} autoComplete='off' />
                        <input placeholder='Senha' name='senha' type='password' ref={inputPassword} autoComplete='off' />
                        <button type='button' onClick={autenticar}>Entrar</button>
                        <span>Não possui cadastro? <Link to ='/register'>Registre-se aqui</Link></span>
                    </form>
                </div>
            </main>
        </>
    )
}

export default Login
