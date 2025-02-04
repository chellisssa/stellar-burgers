import styles from './modal.module.css';
import ReactDOM from "react-dom";
import { ModalOverlay } from "./modal-overlay/modal-overlay.tsx";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ReactNode, useEffect, useState } from "react";

interface IProps {
    title?: string;
    children: ReactNode;
    onClose: () => void;
}

export function Modal({ title, children, onClose }: IProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        document.addEventListener('keydown', handleEscKey);

        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, []);

    function handleEscKey(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            onClose();
        }
    }

    return ReactDOM.createPortal(
        <div className={`${styles.Modal} ${isVisible ? styles.active : ''}`}>
            <ModalOverlay onClick={onClose}/>
            <div className={`${styles.content} pt-10 pr-10 pb-15 pl-10`}>
                <header className={styles.header}>
                    {
                        title &&
                        <h3 className="text text_type_main-large">{title}</h3>
                    }
                    <button
                        className={styles.closeButton}
                        onClick={onClose}
                    >
                        <CloseIcon type="primary"/>
                    </button>
                </header>
                <main>
                    {children}
                </main>
            </div>
        </div>,
        document.getElementById('modal') as HTMLElement
    )
}