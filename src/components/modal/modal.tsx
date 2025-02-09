import styles from './modal.module.css';
import ReactDOM from "react-dom";
import { ModalOverlay } from "./modal-overlay/modal-overlay.tsx";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { INGREDIENT_DETAILS_TITLE } from "../../utils/constants.ts";
import { OrderDetails } from "./order-details/order-details.tsx";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_MODAL } from "../../services/actions/modal.ts";
import { IngredientDetails } from "./ingredient-details/ingredient-details.tsx";
import { ModalTypeEnum } from "../../types/states.ts";

interface IProps {
    type: string;
    onClose: () => void;
}

const modalType = {
    [ModalTypeEnum.OrderDetails]: {
        title: '',
        children: <OrderDetails />
    },
    [ModalTypeEnum.IngredientDetails]: {
        title: INGREDIENT_DETAILS_TITLE,
        children: <IngredientDetails />
    }
}

export function Modal() {
    const { isOpen, type, onClose } = useSelector((state) => state.modal);
    const dispatch = useDispatch();
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

    return ReactDOM.createPortal(
        <div className={`${styles.Modal} ${isVisible ? styles.active : ''}`}>
            <ModalOverlay onClick={closeModal}/>
            <div className={`${styles.content} pt-10 pr-10 pb-15 pl-10`}>
                <header className={styles.header}>
                    {
                        modalType[type]?.title &&
                        <h3 className="text text_type_main-large">{modalType[type].title}</h3>
                    }
                    <button
                        className={styles.closeButton}
                        onClick={closeModal}
                    >
                        <CloseIcon type="primary"/>
                    </button>
                </header>
                <main>
                    {modalType[type]?.children}
                </main>
            </div>
        </div>,
        document.getElementById('modal') as HTMLElement
    )
}