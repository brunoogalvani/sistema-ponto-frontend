import Header from '../components/Header';
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
            <main className='flex flex-col justify-center items-center w-screen h-[calc(100vh-80px)]'>
                <div className='h-[200px] mx-auto my-0 flex flex-col justify-evenly items-center'>
                    {userId ? (
                        <>
                            <h1 className='text-[32px] font-bold'>Sistema de Ponto Eletrônico</h1>

                            <h2 className='text-2xl font-bold'>Navegue pelas abas para utilizar o sistema!</h2>
                        </>
                    ) : (
                        <>
                            <h1 className='text-[32px] font-bold'>Sistema de Ponto Eletrônico</h1>

                            <h2 className='text-2xl font-bold'>Faça login ou cadastre-se para utilizar o sistema!</h2>
                        </>
                    )}   
                </div>
            </main>
        </>
    )
}

export default Home
