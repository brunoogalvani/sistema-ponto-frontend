import { useState } from 'react'
import api from '../services/api'
import Alert from './Alert';

function ModalCriarUser({ onClose, id = 'main' }) {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    
    const [alertMessage, setAlertMessage] = useState(null)

    async function criarUser() {
        if (!name || !email || !password || !role) {
            // alert("Todos os campos devem ser preenchidos!");
            setAlertMessage('Todos os campos devem ser preenchidos!')
            return;
        }

        try {
            const response = await api.post('/users/register', {
                name: name,
                email: email,
                password: password,
                role: role
            })

            if (response.status === 201) {
                setAlertMessage("Usuário criado!")
                setName('')
                setEmail('')
                setPassword('')
                setRole('')
            }
        } catch (error) {
            console.error("Erro no cadastro", error);
            // alert("Usuário já existe");
            setAlertMessage('Usuário já existe')
        }
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            criarUser();
        }
    }

    const handleOutClick = (e) => {
        if (e.target.id !== id) return
        onClose()
    }
    
    const handleAlertClose = () => {
        setAlertMessage(null)
    }

    return (
        <>
            <main id='main' className='fixed z-[1000] top-0 w-screen h-screen bg-[#00000099] content-center' onClick={handleOutClick}>
                <div className='bg-[#f1f1f1] w-[350px] border border-[#d8d8d8] rounded-[10px] shadow-[0px_0px_10px_1px_rgba(0,0,0,0.2)] my-0 mx-auto p-5 text-center'>
                    <form className='h-[350px] flex flex-col justify-evenly items-center' onKeyDown={handleKeyPress}>
                        <h1 className='text-[28px] font-bold'>Cadastre um usuário</h1>

                        <input
                            className='bg-white w-[270px] h-[30px] text-sm border border-[#d1d1d1] rounded-[5px] outline-none text-center'
                            placeholder='Nome'
                            name='name'
                            type='text'
                            value={name}
                            onChange={e => setName(e.target.value)}
                            autoComplete='off' 
                        />

                        <input
                            className='bg-white w-[270px] h-[30px] text-sm border border-[#d1d1d1] rounded-[5px] outline-none text-center'
                            placeholder='Email'
                            name='email'
                            type='email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            autoComplete='off'
                        />

                        <div className='bg-white flex items-center w-[270px] gap-2 border border-[#d1d1d1] rounded-[5px]'>
                            <input
                                className='bg-white w-[270px] h-[30px] text-sm rounded-[5px] outline-none text-center flex-1 pl-[35px]'
                                placeholder='Senha'
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />

                            <i className={`text-xl cursor-pointer pr-[5px] bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`} onClick={() => setShowPassword(!showPassword)}></i>
                        </div>

                        <select className='bg-white h-[25px] w-[200px] pl-2.5 border border-[#b6b6b6] rounded-[10px] outline-none' value={role} onChange={e => setRole(e.target.value)}>
                            <option value="" disabled>Selecione um Role</option>
                            <option value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>
                        <button className='bg-white w-[120px] h-[40px] text-base border border-[#d1d1d1] rounded-[10px] cursor-pointer duration-300 hover:bg-[#eeeeee] active:bg-[#f7f7f7]' type='button' onClick={criarUser}>Cadastrar</button>
                    </form>

                    <button className='bg-white w-[120px] h-[40px] text-base border border-[#d1d1d1] rounded-[10px] cursor-pointer duration-300 hover:bg-[#eeeeee] active:bg-[#f7f7f7]' onClick={onClose}>Fechar</button>
                </div>
            </main>

            {alertMessage ? <Alert onClose={handleAlertClose}>{alertMessage}</Alert> : null}
        </>
    )
}

export default ModalCriarUser
