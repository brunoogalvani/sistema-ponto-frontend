import { useState } from 'react'
import './AreaAdmin.css'
import Header from '../../components/Header/Header'
import ModalPontos from '../../components/ModalPontos/ModalPontos'
import ModalUsers from '../../components/ModalUsers/ModalUsers'

function AreaAdmin() {

  const [isModalPontosOpen, setIsModalPontosOpen] = useState(false)
  const [isModalUsersOpen, setIsModalUsersOpen] = useState(false)

  return (
    <>
      <Header />
      <main>
        <div className="dashboard-container">
          <h1>Área do Administrador</h1>
          <button onClick={() => setIsModalPontosOpen(true)}>Visualizar Pontos</button>
          <button onClick={() => setIsModalUsersOpen(true)}>Gerenciar Usuários</button>
        </div>
      </main>

        {isModalPontosOpen && <ModalPontos onClose={() => setIsModalPontosOpen(false)} outClickClose={true} />}
        {isModalUsersOpen && <ModalUsers onClose={() => setIsModalUsersOpen(false)} outClickClose={true} />}
    </>
  )
}

export default AreaAdmin
