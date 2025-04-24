import './Conta.css'
import api from '../../services/api';
import Header from '../../components/Header/Header';
import { useEffect, useState } from 'react';

function Conta() {

    const userId = sessionStorage.getItem('userId')
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [nameAtual, setNameAtual] = useState("")
    const [emailAtual, setEmailAtual] = useState("")
    const [isEditing, setIsEditing] = useState(false)

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

            alert("Informações atualizadas com sucesso!");
        } catch (error) {
            console.error("Erro na atualização", error);
            alert("Erro ao atualizar as informações.");
        }
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
                        <button type='button' onClick={updateUser}>Salvar</button>
                    )}
                </div>
            </main>
        </>
    )
}

export default Conta
