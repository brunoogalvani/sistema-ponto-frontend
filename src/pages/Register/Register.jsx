import { useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import './Register.css'
import api from '../../services/api'
import Header from '../../components/Header/Header';

function Register() {

    const navigate = useNavigate();
    const inputName = useRef();
    const inputEmail = useRef();
    const inputPassword = useRef();

    async function cadastrar() {
        if (!inputName.current.value || !inputEmail.current.value || !inputPassword.current.value) {
            alert("Todos os campos devem ser preenchidos!");
            return;
        }

        try {
            const response = await api.post('/users/register', {
                name: inputName.current.value,
                email: inputEmail.current.value,
                password: inputPassword.current.value,
                role: 'USER'
            })

            if (response.status === 200) {
                alert('Usuário criado com sucesso!')
                autenticar()
            }
        } catch (error) {
            console.error("Erro no cadastro", error);
            alert("Usuário já existe");
        }
    }

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
            cadastrar();
        }
    }

    return (
        <>
            <Header />
            <main>
                <div className='register-container'>
                    <form className='register-form' onKeyDown={handleKeyPress}>
                        <h1>Cadastre-se</h1>
                        <input placeholder='Nome' name='name' type='text' ref={inputName} autoComplete='off' />
                        <input placeholder='Email' name='email' type='email' ref={inputEmail} autoComplete='off' />
                        <input placeholder='Senha' name='senha' type='password' ref={inputPassword} autoComplete='off' />
                        <button type='button' onClick={cadastrar}>Cadastrar</button>
                        <span>Já possui cadastro? <Link to ='/login'>Volte para o Login</Link></span>
                    </form>
                </div>
            </main>
        </>
    )
}

export default Register
