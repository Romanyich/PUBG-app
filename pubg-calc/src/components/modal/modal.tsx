import { useEffect } from 'react'
import './modal.css'

interface ModalProps {
    show: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

function Modal({ show, onClose, children }: ModalProps) {
    useEffect(() => {
        function handleOutsideClick(event: MouseEvent) {
            if ((event.target as HTMLElement).classList.contains('modal')) {
                onClose()
            }
        }
        
        document.addEventListener('click', handleOutsideClick)
        
        return () => {
            document.removeEventListener('click', handleOutsideClick)
        };
    }, [onClose])

    if (!show) return null

    return (
        <div className="modal">
            <div className="modal_content" onClick={e => e.stopPropagation()}>
                <span className="close" onClick={onClose}>&times;</span>
                {children}
            </div>
        </div>
    )
}

export default Modal