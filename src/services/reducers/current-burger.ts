import {
    SET_BUN,
    SET_FILLING,
    DELETE_FILLING,
    MOVE_FILLING,
    UPDATE_FILLINGS,
    RESET_BURGER
} from '../actions/current-burger.ts';
import { ICurrentBurgerState } from "../../types/states.ts";
import { IAction } from "../../hooks/services.ts";
import { IIngredient } from "../../types/ingredient.ts";

const initialState: ICurrentBurgerState = {
    bun: null,
    filling: [],
};

export const currentBurgerReducer = (state: ICurrentBurgerState = initialState, action: IAction) => {
    switch (action.type) {
        case SET_BUN:
            if (!action.payload) {
                console.warn('SET_BUN: no element passed');
                return state;
            }

            return {
                ...state,
                bun: action.payload
            }
        case SET_FILLING:
            return {
                ...state,
                filling: [
                    ...state.filling,
                    action.payload,
                ]
            }
        case DELETE_FILLING:
            return {
                ...state,
                filling: [
                    ...state.filling.filter(el => el.tempId !== action.payload),
                ]
            }
        case MOVE_FILLING: {
            const { dragIndex, hoverIndex } = action.payload as Record<string, number>;
            const updatedFillings = [...state.filling];
            const [draggedItem] = updatedFillings.splice(dragIndex, 1);
            updatedFillings.splice(hoverIndex, 0, draggedItem);
            return {
                ...state,
                filling: updatedFillings,
            };
        }
        case UPDATE_FILLINGS:
            return {
                ...state,
                filling: [...action.payload as IIngredient[]],
            }
        case RESET_BURGER:
            return {
                ...state,
                bun: null,
                filling: [],
            }
    }
    return state;
}