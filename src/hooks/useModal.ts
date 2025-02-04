import { ReactNode, useCallback, useState } from "react";
import { IModalState } from "./types";

export function useModal() {
    const [modalState, setModalState] = useState<IModalState>({
        isOpen: false,
        title: '',
        content: null,
    });

    const openModal =
        useCallback((content: ReactNode, title?: string) => {
        setModalState({ isOpen: true, title, content })
    }, []);

    const closeModal = useCallback(() => {
        setModalState({ isOpen: false, title: "", content: null });
    }, []);

    return {modalState, openModal, closeModal};
}