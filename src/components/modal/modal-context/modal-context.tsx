import { createContext, useContext, ReactNode } from "react";
import { useModal } from "../../../hooks/useModal.ts";
import { Modal } from "../modal.tsx";
import { IModalState } from "../../../hooks/types";

interface IProps {
    children: ReactNode;
}

interface IContext {
    modalState: IModalState;
    openModal: (content: ReactNode, title?: string) => void;
    closeModal: () => void;
}

const ModalContext = createContext<IContext | null>(null);

export function ModalProvider({ children }: IProps) {
    const { modalState, openModal, closeModal } = useModal();

    return (
        <ModalContext.Provider value={{ openModal, closeModal, modalState }}>
            {children}
            {modalState.isOpen && (
                <Modal title={modalState.title} onClose={closeModal}>
                    {modalState.content}
                </Modal>
            )}
        </ModalContext.Provider>
    );
}

export function useModalContext() {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModalContext: context is not found");
    }
    return context;
}