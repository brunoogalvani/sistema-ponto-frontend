import { useRef, useState } from 'react'
import './ModalCriarUser.css'
import api from '../../services/api'

function ModalCriarUser({ onClose, outClickClose = false, id = 'main' }) {

    const inputName = useRef();
    const inputEmail = useRef();
    const inputPassword = useRef();
    const inputRole = useRef();
    const [showPassword, setShowPassword] = useState(false)

    async function criarUser() {
        if (!inputName.current.value || !inputEmail.current.value || !inputPassword.current.value || !inputRole.current.value) {
            alert("Todos os campos devem ser preenchidos!");
            return;
        }

        try {
            const response = await api.post('/users/register', {
                name: inputName.current.value,
                email: inputEmail.current.value,
                password: inputPassword.current.value,
                role: inputRole.current.value
            })

            if (response.status === 201) {
                alert('Usuário criado com sucesso!')
                onClose()
            }
        } catch (error) {
            console.error("Erro no cadastro", error);
            alert("Usuário já existe");
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

    return (
        <>
            <main id='main' className='main-criar-user' onClick={handleOutClick}>
                <div className='criar-user-container'>
                    <form className='register-form' onKeyDown={handleKeyPress}>
                        <h1>Cadastre um usuário</h1>
                        <input placeholder='Nome' name='name' type='text' ref={inputName} autoComplete='off' />
                        <input placeholder='Email' name='email' type='email' ref={inputEmail} autoComplete='off' />
                        <div className="password-input">
                            <input placeholder='Senha' name='senha' type={showPassword ? 'text' : 'password'} ref={inputPassword} autoComplete='off' />
                            <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`} onClick={() => setShowPassword(!showPassword)}></i>
                        </div>
                        <select ref={inputRole} defaultValue=''>
                            <option value="" disabled>Selecione um Role</option>
                            <option value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>
                        <button type='button' onClick={criarUser}>Cadastrar</button>
                    </form>

                    <button onClick={onClose}>Fechar</button>
                </div>
            </main>
        </>
    )
}

export default ModalCriarUser
