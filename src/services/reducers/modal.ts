import { CLOSE_MODAL, OPEN_MODAL } from "../actions/modal.ts";
import { IModalState } from "../../types/states.ts";

const initialState: IModalState = {
    isOpen: false,
    type: null,
    onClose: null,
}

export const modalReducer = (state: IModalState = initialState, action) => {
    switch(action.type) {
        case OPEN_MODAL:
            return {
                ...state,
                isOpen: true,
                type: action.payload,
                onClose: action.onClose,
            }
        case CLOSE_MODAL:
            return {
                ...state,
                isOpen: false,
                type: null,
                onClose: null,
            }
        default:
            return state;
    }
}