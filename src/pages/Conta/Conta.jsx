import './Conta.css'
import api from '../../services/api';
import Header from '../../components/Header/Header';
import { useEffect, useState } from 'react';
import Alert from '../../components/Alert/Alert';

function Conta() {

    const userId = sessionStorage.getItem('userId')
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [nameAtual, setNameAtual] = useState("")
    const [emailAtual, setEmailAtual] = useState("")
    const [isEditing, setIsEditing] = useState(false)

    const [alertMessage, setAlertMessage] = useState(null)

    useEffect(() => {
        async function getUser() {
            const response = await api.get(`/users/${userId}`)
            setNameAtual(response.data.name)
            setEmailAtual(response.data.email)
        }

        getUser()
    }, [isEditing]);
    
    async function updateUser() {
        try {
            if(!name && !email && !password) {
                setIsEditing(false)
                setAlertMessage('Nenhuma informação foi alterada')
                return
            }

            await api.put(`/users/${userId}`, {
                name, 
                email, 
                password,
            })

            setNameAtual(name)
            setEmailAtual(email)
            setPassword("")
            setIsEditing(false)
            setName("")
            setEmail("")

            setAlertMessage('Informações atualizadas com sucesso!')
        } catch (error) {
            console.error("Erro na atualização", error);
            setAlertMessage('Erro ao atualizar as informações.')
        }
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            updateUser();
        }
    }

    const handleAlertClose = () => {
        setAlertMessage(null)
    }

    return (
        <>
            <Header />
            <main>
                <div className='conta-container'>
                    <h1>Alterar suas informações</h1>
                    <div className="conta-info">
                        <p>Nome: </p>
                        <input 
                            placeholder={nameAtual}
                            type='text'
                            value={name}
                            onChange={e => setName(e.target.value)}
                            disabled={!isEditing}
                        />

                        <p>Email: </p>
                        <input 
                            placeholder={emailAtual}
                            type='email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            disabled={!isEditing}
                        />

                        <p>Senha: </p>
                        <input 
                            placeholder='Nova Senha'
                            type='password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            disabled={!isEditing}
                        />
                    </div>
                    {!isEditing ? (
                        <button type='button' onClick={() => setIsEditing(true)}>Editar</button>
                    ) : (
                        <button type='button' onClick={updateUser} onKeyDown={handleKeyPress}>Salvar</button>
                    )}
                </div>
            </main>

            {alertMessage ? <Alert onClose={handleAlertClose}>{alertMessage}</Alert> : null}
        </>
    )
}

export default Conta
