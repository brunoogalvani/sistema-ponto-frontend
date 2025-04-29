import { useEffect, useState } from 'react'
import './SeusPontos.css'
import api from '../../services/api'
import Header from '../../components/Header/Header'

function SeusPontos() {

    const userId = sessionStorage.getItem('userId');
    const [pontos, setPontos] = useState([])
    
    useEffect(() => {
        getPontos()
      }, [userId]);

    async function getPontos() {
        try {
          const response = await api.get(`/pontos/${userId}`);
    
          setPontos(response.data);
        } catch (error) {
          console.error("Erro na requisição", error);
        }
    }

    return (
        <>
            <Header />
            <main>
                <div className="pontos-container">
                    <div className="pontos">
                        {pontos.length!==0 ? (
                            pontos.map((ponto) => (
                                <div key={ponto.id} className="pontos-dia">
                                <div className="dia">
                                    Dia:
                                    <span> {ponto.dia}</span>
                                </div>
                                <div className="horario">
                                    Entrada
                                    <span>{ponto.entradaManha || "--:--"}</span>
                                </div>
                                <div className="horario">
                                    Saída
                                    <span>{ponto.saidaManha || "--:--"}</span>
                                </div>
                                <div className="horario">
                                    Entrada
                                    <span>{ponto.entradaTarde || "--:--"}</span>
                                </div>
                                <div className="horario">
                                    Saída
                                    <span>{ponto.saidaTarde || "--:--"}</span>
                                </div>
                                <div className="total-horas">
                                    Total de Horas:
                                    <span> {ponto.totalHoras || "--:--"}</span>
                                </div>
                                </div>
                            ))
                            ) : (
                            <div className="sem-ponto-container">
                                <span className='sem-ponto'>Não existe nenhum registro de ponto deste usuário</span>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </>
    )
}

export default SeusPontos
