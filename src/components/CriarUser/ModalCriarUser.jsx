import { useRef } from 'react'
import './ModalCriarUser.css'
import api from '../../services/api'

function ModalCriarUser({ onClose }) {

    const inputName = useRef();
    const inputEmail = useRef();
    const inputPassword = useRef();
    const inputRole = useRef();

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

            if (response.status === 200) {
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

    return (
        <>
            <main className='main-criar-user'>
                <div className='criar-user-container'>
                    <form className='register-form' onKeyDown={handleKeyPress}>
                        <h1>Cadastre um usuário</h1>
                        <input placeholder='Nome' name='name' type='text' ref={inputName} autoComplete='off' />
                        <input placeholder='Email' name='email' type='email' ref={inputEmail} autoComplete='off' />
                        <input placeholder='Senha' name='senha' type='password' ref={inputPassword} autoComplete='off' />
                        <select ref={inputRole}>
                            <option value="" disabled selected>Selecione um Role</option>
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
