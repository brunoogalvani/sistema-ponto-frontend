import { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import './Register.css'
import api from '../../services/api'

function Register() {

    const navigate = useNavigate();
    const inputName = useRef();
    const inputLogin = useRef();
    const inputPassword = useRef();

    async function cadastrar() {
        try {
            const response = await api.post('/users/register', {
                name: inputName.current.value,
                login: inputLogin.current.value,
                password: inputPassword.current.value,
                role: 1
            })

            if (response.status === 200) {
                navigate('/');
            }
        } catch (error) {
            console.error("Erro no cadastro", error);
            alert("Usuário já existe");
        }
    }

    return (
        <>
            <div className='register-container'>
                <form>
                    <h1>Cadastre-se</h1>
                    <input placeholder='Nome' name='name' type='text' ref={inputName} autoComplete='off' />
                    <input placeholder='Login' name='login' type='text' ref={inputLogin} autoComplete='off' />
                    <input placeholder='Senha' name='senha' type='password' ref={inputPassword} autoComplete='off' />
                    <button type='button' onClick={cadastrar}>Cadastrar</button>
                </form>
            </div>
        </>
    )
}

export default Register
