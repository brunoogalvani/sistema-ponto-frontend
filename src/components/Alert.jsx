function Alert({ onClose, children, id = 'main' }) {

    const handleOutClick = (e) => {
        if (e.target.id !== id) return
        onClose()
    }

    return (
        <>
            <main className='fixed z-[1500] top-0 w-screen h-screen bg-[#00000099] content-center' onClick={handleOutClick}>
                <div className='bg-white p-5 rounded-[10px] w-fit flex flex-col mx-auto items-center'>
                    {children}
                <button className='mt-[15px] py-2 px-4 w-min bg-[#007bff] text-white border-none rounded-[5px] cursor-pointer transition-colors duration-300 ease-in-out hover:bg-[#0056b3]' onClick={onClose}>OK</button>
                </div>
            </main>
        </>
    )
}

export default Alert