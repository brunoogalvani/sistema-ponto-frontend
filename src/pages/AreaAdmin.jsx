import { useState } from 'react'
import Header from '../components/Header'
import ModalPontos from '../components/ModalPontos'
import ModalSolicitacao from '../components/ModalSolicitacao'
import ModalUsers from '../components/ModalUsers'

function AreaAdmin() {

  const [isModalPontosOpen, setIsModalPontosOpen] = useState(false)
  const [isModalSolicitacaoOpen, setIsModalSolicitacaoOpen] = useState(false)
  const [isModalUsersOpen, setIsModalUsersOpen] = useState(false)

  return (
    <>
      <Header />
      <main className='flex flex-col justify-center items-center w-screen h-[calc(100vh-80px)]'>
        <div className='bg-[#f1f1f1] w-[600px] h-[500px] border border-[#d8d8d8] rounded-[10px] shadow-[0px_0px_10px_1px_rgba(0,0,0,0.2)] my-0 mx-auto p-5 flex flex-col justify-evenly items-center'>
          <h1 className='text-[32px] font-bold'>Área do Administrador</h1>
          <button className='text-base bg-white flex justify-center border border-[#d1d1d1] rounded-[10px] w-[200px] p-2.5 cursor-pointer duration-300 hover:bg-[#eeeeee] active:bg-[#f7f7f7]' onClick={() => setIsModalPontosOpen(true)}>Visualizar Pontos</button>
          <button className='text-base bg-white flex justify-center border border-[#d1d1d1] rounded-[10px] w-[200px] p-2.5 cursor-pointer duration-300 hover:bg-[#eeeeee] active:bg-[#f7f7f7]' onClick={() => setIsModalSolicitacaoOpen(true)}>Visualizar Solicitações</button>
          <button className='text-base bg-white flex justify-center border border-[#d1d1d1] rounded-[10px] w-[200px] p-2.5 cursor-pointer duration-300 hover:bg-[#eeeeee] active:bg-[#f7f7f7]' onClick={() => setIsModalUsersOpen(true)}>Gerenciar Usuários</button>
        </div>
      </main>

        {isModalPontosOpen && <ModalPontos onClose={() => setIsModalPontosOpen(false)} />}
        {isModalSolicitacaoOpen && <ModalSolicitacao onClose={() => setIsModalSolicitacaoOpen(false)} />}
        {isModalUsersOpen && <ModalUsers onClose={() => setIsModalUsersOpen(false)} />}
    </>
  )
}

export default AreaAdmin
