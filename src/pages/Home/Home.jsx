import './Home.css'

import Header from '../../components/Header/Header';
import { useEffect, useState } from 'react';


function Home() {

    const [userId, setUserId] = useState(sessionStorage.getItem('userId')) 

    useEffect(() => {
        const interval = setInterval(() => {
            const storedUserId = sessionStorage.getItem('userId')
            if (storedUserId !== userId) {
                setUserId(storedUserId)
            }
        }, 500);

        return () => clearInterval(interval)
    }, [userId]);

    return (
        <>
            <Header />
            <main>
                <div className="home-container">
                    {userId ? (
                        <>
                            <h1>Sistema de Ponto Eletrônico</h1>

                            <h2>Navegue nas abas para utilizar o sistema!</h2>
                        </>
                    ) : (
                        <>
                            <h1>Sistema de Ponto Eletrônico</h1>

                            <h2>Faça login ou cadastre-se para utilizar o sistema!</h2>
                        </>
                    )}
                    
                </div>
            </main>
        </>
    )
}

export default Home
