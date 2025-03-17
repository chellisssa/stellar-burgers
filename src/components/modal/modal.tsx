import styles from './modal.module.css';
import ReactDOM from "react-dom";
import { ModalOverlay } from "./modal-overlay/modal-overlay.tsx";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect, useState } from "react";
import { CLOSE_MODAL } from "../../services/actions/modal.ts";
import { renderModalContent } from "../common/render-modal-content.tsx";
import { AppThunkDispatch, useAppDispatch, useAppSelector } from "../../hooks/services.ts";

export function Modal() {
    const { isOpen, title, children, onClose } = useAppSelector((state) => state.modal);
    const dispatch = useAppDispatch<AppThunkDispatch>();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        document.addEventListener('keydown', handleEscKey);

        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [isOpen]);

    if (!isOpen) return null;

    function handleEscKey(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            dispatch({type: CLOSE_MODAL});
        }
    }

    function closeModal() {
        if (typeof onClose === 'function') {
            onClose();
        }
        dispatch({type: CLOSE_MODAL});
    }

    if (!children) {
        return;
    }

    return ReactDOM.createPortal(
        <div className={`${styles.Modal} ${isVisible ? styles.active : ''}`}>
            <ModalOverlay onClick={closeModal}/>
            <div className={`${styles.content} pt-10 pr-10 pb-15 pl-10`}>
                <header className={styles.header}>
                    {
                        title &&
                        <h3 className="text text_type_main-large">{title}</h3>
                    }
                    <button
                        className={styles.closeButton}
                        onClick={closeModal}
                    >
                        <CloseIcon type="primary"/>
                    </button>
                </header>
                <main>
                    {
                        React.isValidElement(children)
                            ? children
                            : renderModalContent(children as React.ComponentType)
                    }
                </main>
            </div>
        </div>,
        document.getElementById('modal') as HTMLElement
    )
}