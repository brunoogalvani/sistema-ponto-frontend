import { useState } from 'react'
import './ModalCriarUser.css'
import api from '../../services/api'
import Alert from '../Alert/Alert';

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
            <main id='main' className='main-criar-user' onClick={handleOutClick}>
                <div className='criar-user-container'>
                    <form className='register-form' onKeyDown={handleKeyPress}>
                        <h1>Cadastre um usuário</h1>

                        <input
                            placeholder='Nome'
                            name='name'
                            type='text'
                            value={name}
                            onChange={e => setName(e.target.value)}
                            autoComplete='off' 
                        />

                        <input
                            placeholder='Email'
                            name='email'
                            type='email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            autoComplete='off'
                        />

                        <div className="password-input">
                            <input
                                placeholder='Senha'
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />

                            <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`} onClick={() => setShowPassword(!showPassword)}></i>
                        </div>

                        <select value={role} onChange={e => setRole(e.target.value)}>
                            <option value="" disabled>Selecione um Role</option>
                            <option value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>
                        <button type='button' onClick={criarUser}>Cadastrar</button>
                    </form>

                    <button onClick={onClose}>Fechar</button>
                </div>
            </main>

            {alertMessage ? <Alert onClose={handleAlertClose}>{alertMessage}</Alert> : null}
        </>
    )
}

export default ModalCriarUser
