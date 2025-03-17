import { SET_CURRENT_INGREDIENT, RESET_CURRENT_INGREDIENT } from "../actions/current-ingredient.ts";
import { ICurrentIngredientState } from "../../types/states.ts";
import { IAction } from "../../hooks/services.ts";

const initialState: ICurrentIngredientState = {
    currentIngredient: null,
};

export const currentIngredientReducer = (state: ICurrentIngredientState = initialState, action: IAction) => {
    switch (action.type) {
        case SET_CURRENT_INGREDIENT:
            return {
                ...state,
                currentIngredient: action.payload,
            }
        case RESET_CURRENT_INGREDIENT:
            return {
                ...state,
                currentIngredient: null,
            }
        default:
            return state;
    }
}