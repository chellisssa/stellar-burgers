import { CLOSE_MODAL, OPEN_MODAL } from "../actions/modal.ts";
import { IModalState } from "../../types/states.ts";
import { IAction } from "../../hooks/services.ts";

const initialState: IModalState = {
    isOpen: false,
    title: '',
    children: null,
    onClose: null,
}

export const modalReducer = (state: IModalState = initialState, action: IAction) => {
    switch(action.type) {
        case OPEN_MODAL:
            return {
                ...state,
                isOpen: true,
                title: (action.payload as Record<string, string>).title || '',
                children: (action.payload as Record<string, JSX.Element>).component,
                onClose: (action.payload as (Record<string, () => void> | null))?.onClose || null,
            }
        case CLOSE_MODAL:
            return {
                ...state,
                isOpen: false,
                title: '',
                children: null,
                onClose: null,
            }
        default:
            return state;
    }
}