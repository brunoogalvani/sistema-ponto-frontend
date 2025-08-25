function Alert({ onClose, onConfirm, children, id = 'main', confirmText = 'Confirmar' }) {

    const handleOutClick = (e) => {
        if (e.target.id !== id) return
        onClose()
    }

    return (
        <>
            <main className='fixed z-[1500] top-0 w-screen h-screen bg-[#00000099] content-center' onClick={handleOutClick}>
                <div className='bg-white p-5 rounded-[10px] w-fit flex flex-col mx-auto items-center'>
                    {children}
                    
                    {onConfirm ? (
                        <div className="flex gap-3 mt-[15px]">
                            <button
                            className='py-2 px-4 bg-white border border-[#d1d1d1] rounded-[10px] cursor-pointer transition-colors duration-300 ease-in-out hover:bg-[#eeeeee] active:bg-[#f7f7f7]'
                            onClick={onClose}
                            >
                            Cancelar
                            </button>
                            <button
                            className="py-2 px-4 bg-red-600 text-white border border-[#a00000] rounded-[10px] cursor-pointer transition-colors duration-300 ease-in-out hover:bg-red-700 active:bg-red-500"
                            onClick={() => {
                                onConfirm();
                                onClose();
                            }}
                            >
                            {confirmText}
                            </button>
                        </div>
                        ) : (
                        <button className='mt-[15px] py-2 px-4 w-min bg-[#007bff] text-white border-none rounded-[5px] cursor-pointer transition-colors duration-300 ease-in-out hover:bg-[#0056b3]' onClick={onClose}>OK</button>
                    )}
                </div>
            </main>
        </>
    )
}

export default Alert