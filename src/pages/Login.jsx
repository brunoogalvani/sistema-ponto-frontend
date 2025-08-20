import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../services/api'
import Header from '../components/Header';
import Alert from '../components/Alert'

function Login() {

    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const [alertMessage, setAlertMessage] = useState(null)

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
            setAlertMessage("Usuário e/ou Senha Inválidos");
        }
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            autenticar();
        }
    }

    const handleAlertClose = () => {
        setAlertMessage(null)
    }

    return (
        <>
            <Header />
            <main className='flex flex-col justify-center items-center w-screen h-[calc(100vh-80px)]'>
                <div className='bg-[#f1f1f1] w-[350px] border border-[#d8d8d8] rounded-[10px] shadow-[0px_0px_10px_1px_rgba(0,0,0,0.2)] mx-auto my-0 p-5'>
                    <form className='h-[300px] flex flex-col justify-evenly items-center' onKeyDown={handleKeyPress}>
                        <h1 className='text-4xl font-bold'>Faça seu Login</h1>

                        <input
                            className='w-[270px] h-[30px] text-sm border border-[#d1d1d1] rounded-[5px] outline-none text-center bg-white'
                            placeholder='Email'
                            name='email'
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete='off'
                        />

                        <div className='bg-[#ffffff] flex items-center w-[270px] gap-2 border border-[#d1d1d1] rounded-[5px]'>
                            <input
                                className='w-[270px] h-[30px] text-sm border-0 border-[#d1d1d1] rounded-[5px] outline-none text-center bg-white flex-1 pl-[35px]'
                                placeholder='Senha'
                                name='senha'
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete='off'
                            />

                            <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} text-[22px] cursor-pointer pr-[5px]`} onClick={() => setShowPassword(!showPassword)}></i>
                        </div>
                        <button className='w-[120px] h-10 bg-white text-base border border-[#d1d1d1] rounded-[10px] cursor-pointer duration-300 hover:bg-[#eeeeee] active:bg-[#f7f7f7]' type='button' onClick={autenticar}>Entrar</button>
                        <span className='text-black'>Não possui cadastro? <Link to ='/register' className='text-[#3554e0]'>Registre-se aqui</Link></span>
                    </form>
                </div>
            </main>

            {alertMessage ? <Alert onClose={handleAlertClose}>{alertMessage}</Alert> : null}
        </>
    )
}

export default Login
