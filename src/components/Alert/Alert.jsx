import './Alert.css'

function Alert({ onClose, children, id = 'main' }) {

    const handleOutClick = (e) => {
        if (e.target.id !== id) return
        onClose()
    }

    return (
        <>
            <main id='main' className='alert-main' onClick={handleOutClick}>
                <div className="alert-container">
                    {children}
                <button onClick={onClose}>OK</button>
                </div>
            </main>
        </>
    )
}

export default Alert