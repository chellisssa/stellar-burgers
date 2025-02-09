import { v4 as uuidv4 } from 'uuid';
import { SET_BUN, SET_FILLING, DELETE_FILLING, MOVE_FILLING, UPDATE_FILLINGS } from '../actions/current-burger.ts';
import { ICurrentBurgerState } from "../../types/states.ts";

const initialState: ICurrentBurgerState = {
    bun: null,
    filling: [],
};

export const currentBurgerReducer = (state: ICurrentBurgerState = initialState, action) => {
    switch (action.type) {
        case SET_BUN:
            if (!action.item) {
                console.warn('SET_BUN: no element passed');
                return state;
            }

            return {
                ...state,
                bun: action.item
            }
        case SET_FILLING:
            return {
                ...state,
                filling: [
                    ...state.filling,
                    { ...action.item, tempId: uuidv4() },
                ]
            }
        case DELETE_FILLING:
            return {
                ...state,
                filling: [
                    ...state.filling.filter(el => el.tempId !== action.payload),
                ]
            }
        case MOVE_FILLING:
            const { dragIndex, hoverIndex } = action.payload;
            const updatedFillings = [...state.filling];
            const [draggedItem] = updatedFillings.splice(dragIndex, 1);
            updatedFillings.splice(hoverIndex, 0, draggedItem);
            return {
                ...state,
                filling: updatedFillings,
            };
        case UPDATE_FILLINGS:
            return {
                ...state,
                filling: [...action.payload],
            }
    }
    return state;
}