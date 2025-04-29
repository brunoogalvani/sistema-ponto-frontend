import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import './Register.css'
import api from '../../services/api'
import Header from '../../components/Header/Header';
import Alert from '../../components/Alert/Alert';

function Register() {

    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const [alertMessage, setAlertMessage] = useState(null)

    async function cadastrar() {
        if (!name || !email || !password) {
            setAlertMessage('Todos os campos devem ser preenchidos!')
            return;
        }

        try {
            const response = await api.post('/users/register', {
                name: name,
                email: email,
                password: password,
                role: 'USER'
            })

            if (response.status === 201) {
                setAlertMessage('Usuário criado com sucesso!')
                autenticar()
            }
        } catch (error) {
            console.error("Erro no cadastro", error);
            setAlertMessage('Usuário já existe')
        }
    }

    async function autenticar() {
        try {
            const response = await api.post('/auth/login', {
                email: email,
                password: password
            })
            
            if (response.status === 200) {
                sessionStorage.setItem("userId", response.data.id);
                navigate('/');
            }
        } catch (error) {
            console.error("Erro na autenticação", error);
            setAlertMessage('Usuário e/ou Senha Inválidos')
        }
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            cadastrar();
        }
    }

    const handleAlertClose = () => {
        setAlertMessage(null)
    }

    return (
        <>
            <Header />
            <main>
                <div className='register-container'>
                    <form className='register-form' onKeyDown={handleKeyPress}>
                        <h1>Cadastre-se</h1>

                        <input
                            placeholder='Nome'
                            name='name'
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            autoComplete='off'
                        />

                        <input
                            placeholder='Email'
                            name='email'
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete='off'
                        />

                        <div className="password-input">

                            <input
                                placeholder='Senha'
                                name='senha'
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete='off'
                            />

                            <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`} onClick={() => setShowPassword(!showPassword)}></i>
                        </div>
                        <button type='button' onClick={cadastrar}>Cadastrar</button>
                        <span>Já possui cadastro? <Link to ='/login'>Volte para o Login</Link></span>
                    </form>
                </div>
            </main>

            {alertMessage ? <Alert onClose={handleAlertClose}>{alertMessage}</Alert> : null}
        </>
    )
}

export default Register
