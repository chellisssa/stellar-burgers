import { CLOSE_MODAL, OPEN_MODAL } from "../actions/modal.ts";
import { IModalState } from "../../types/states.ts";

const initialState: IModalState = {
    isOpen: false,
    title: '',
    children: null,
    onClose: null,
}

export const modalReducer = (state: IModalState = initialState, action) => {
    switch(action.type) {
        case OPEN_MODAL:
            return {
                ...state,
                isOpen: true,
                title: action.payload.title || '',
                children: action.payload.children,
                onClose: action.payload.onClose || null,
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