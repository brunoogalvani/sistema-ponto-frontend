import { useState } from 'react'
import api from '../services/api';
import Alert from './Alert';

function ModalCriarSolicitacao({ onClose, ponto, id = 'main' }) {

    const userId = sessionStorage.getItem('userId');
    const [motivo, setMotivo] = useState("")

    const [entradaManhaNovo, setEntradaManhaNovo] = useState(ponto.entradaManha);
    const [saidaManhaNovo, setSaidaManhaNovo] = useState(ponto.saidaManha);
    const [entradaTardeNovo, setEntradaTardeNovo] = useState(ponto.entradaTarde);
    const [saidaTardeNovo, setSaidaTardeNovo] = useState(ponto.saidaTarde);

    const [alertMessage, setAlertMessage] = useState(null)

    async function postSolicitacao() {
        try {
            await api.post('/solicitacoes', {
                "userId": userId,
                "pontoId": ponto.id,
                "diaPontoOriginal": ponto.dia,
                "entradaManhaOriginal": ponto.entradaManha,
                "saidaManhaOriginal": ponto.saidaManha,
                "entradaTardeOriginal": ponto.entradaTarde,
                "saidaTardeOriginal": ponto.saidaTarde,
                "entradaManhaNovo": entradaManhaNovo,
                "saidaManhaNovo": saidaManhaNovo,
                "entradaTardeNovo": entradaTardeNovo,
                "saidaTardeNovo": saidaTardeNovo,
                "motivo": motivo
            });

            setAlertMessage('Solicitação enviada com sucesso!');
        } catch (error) {
            setAlertMessage('Erro ao enviar solicitação!');
        }
    }

    
    const handleOutClick = (e) => {
        if (e.target.id !== id) return
        onClose()
    }

    const handleAlertClose = () => {
        setAlertMessage(null)
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            postSolicitacao();
        }
    }

    return (
        <>
            <main id='main' className='fixed z-[1000] top-0 w-screen h-screen bg-[#00000099] content-center' onClick={handleOutClick}>
                <div className='bg-[#f1f1f1] w-[350px] border border-[#d8d8d8] rounded-[10px] shadow-[0px_0px_10px_1px_rgba(0,0,0,0.2)] my-0 mx-auto p-5 text-center'>
                    <form className='h-[350px] flex flex-col justify-evenly items-center' onKeyDown={handleKeyPress}>
                        <h1 className='text-[28px] font-bold'>Alterar Ponto</h1>

                        <div className='w-[200px] flex justify-between items-center'>
                            Entrada:
                            <input
                                className='bg-white w-[120px] h-[30px] text-sm border border-[#d1d1d1] rounded-[5px] outline-none pl-2'
                                type="time"
                                value={entradaManhaNovo}
                                onChange={e => setEntradaManhaNovo(e.target.value)}
                            />
                        </div>

                        <div className='w-[200px] flex justify-between items-center'>
                            Saída:
                            <input
                                className='bg-white w-[120px] h-[30px] text-sm border border-[#d1d1d1] rounded-[5px] outline-none pl-2'
                                type="time"
                                value={saidaManhaNovo}
                                onChange={e => setSaidaManhaNovo(e.target.value)}
                            />
                        </div>

                        <div className='w-[200px] flex justify-between items-center'>
                            Entrada:
                            <input
                                className='bg-white w-[120px] h-[30px] text-sm border border-[#d1d1d1] rounded-[5px] outline-none pl-2'
                                type="time"
                                value={entradaTardeNovo}
                                onChange={e => setEntradaTardeNovo(e.target.value)}
                            />
                        </div>

                        <div className='w-[200px] flex justify-between items-center'>
                            Saída:
                            <input
                                className='bg-white w-[120px] h-[30px] text-sm border border-[#d1d1d1] rounded-[5px] outline-none pl-2'
                                type="time"
                                value={saidaTardeNovo}
                                onChange={e => setSaidaTardeNovo(e.target.value)}
                            />
                        </div>

                        <input
                            className='bg-white w-[200px] h-[30px] text-sm border border-[#d1d1d1] rounded-[5px] outline-none text-center'
                            placeholder='Motivo'
                            name='motivo'
                            type='motivo'
                            value={motivo}
                            onChange={e => setMotivo(e.target.value)}
                            autoComplete='off'
                        />

                        
                        <button className='bg-white w-[170px] h-[40px] text-base border border-[#d1d1d1] rounded-[10px] cursor-pointer duration-300 hover:bg-[#eeeeee] active:bg-[#f7f7f7]' type='button' onClick={postSolicitacao}>Solicitar Alteração</button>
                    </form>

                    <button className='bg-white w-[170px] h-[40px] text-base border border-[#d1d1d1] rounded-[10px] cursor-pointer duration-300 hover:bg-[#eeeeee] active:bg-[#f7f7f7]' onClick={onClose}>Fechar</button>
                </div>
            </main>

            {alertMessage ? <Alert onClose={() => {handleAlertClose(); onClose();}}>{alertMessage}</Alert> : null}
        </>
    )
}

export default ModalCriarSolicitacao
