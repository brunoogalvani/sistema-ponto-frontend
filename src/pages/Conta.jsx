import api from '../services/api';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import Alert from '../components/Alert';

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
            <main className='flex flex-col justify-center items-center w-screen h-[calc(100vh-80px)]'>
                <div className='bg-[#f1f1f1] w-[500px] h-[400px] border border-[#d8d8d8] rounded-[10px] shadow-[0px_0px_10px_1px_rgba(0,0,0,0.2)] mx-auto my-0 p-5 flex flex-col justify-evenly items-center'>
                    <h1 className='text-[32px] font-bold'>Alterar suas informações</h1>
                    <div className='h-[150px] w-[320px] flex content-between justify-between flex-wrap'>
                        <p>Nome: </p>
                        <input
                            className={`w-[250px] h-[25px] text-sm border border-[#d1d1d1] rounded-[5px] outline-none text-center ${isEditing ? 'bg-white' : ''}`} 
                            placeholder={nameAtual}
                            type='text'
                            value={name}
                            onChange={e => setName(e.target.value)}
                            disabled={!isEditing}
                        />

                        <p>Email: </p>
                        <input
                            className={`w-[250px] h-[25px] text-sm border border-[#d1d1d1] rounded-[5px] outline-none text-center ${isEditing ? 'bg-white' : ''}`}
                            placeholder={emailAtual}
                            type='email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            disabled={!isEditing}
                        />

                        <p>Senha: </p>
                        <input
                            className={`w-[250px] h-[25px] text-sm border border-[#d1d1d1] rounded-[5px] outline-none text-center ${isEditing ? 'bg-white' : ''}`} 
                            placeholder='Nova Senha'
                            type='password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            disabled={!isEditing}
                        />
                    </div>
                    {!isEditing ? (
                        <button className='bg-white w-[120px] h-[40px] text-base border border-[#d1d1d1] rounded-[10px] cursor-pointer duration-300 hover:bg-[#eeeeee] active:bg-[#f7f7f7]' type='button' onClick={() => setIsEditing(true)}>Editar</button>
                    ) : (
                        <button className='bg-white w-[120px] h-[40px] text-base border border-[#d1d1d1] rounded-[10px] cursor-pointer duration-300 hover:bg-[#eeeeee] active:bg-[#f7f7f7]' type='button' onClick={updateUser} onKeyDown={handleKeyPress}>Salvar</button>
                    )}
                </div>
            </main>

            {alertMessage ? <Alert onClose={handleAlertClose}>{alertMessage}</Alert> : null}
        </>
    )
}

export default Conta
