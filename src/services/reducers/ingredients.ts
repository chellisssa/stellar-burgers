import {
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_ERROR,
    GET_INGREDIENTS_REQUEST,
} from '../actions/ingredients.ts';
import { IIngredientsState } from "../../types/states.ts";
import { IAction } from "../../hooks/services.ts";

const initialState: IIngredientsState = {
    ingredients: [],
    ingredientsLoading: false,
    ingredientsError: false,
};

export const ingredientsReducer = (state: IIngredientsState = initialState, action: IAction) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST:
            return {
                ...state,
                ingredientsLoading: true,
                ingredientsError: false,
            }
        case GET_INGREDIENTS_SUCCESS:
            return {
                ...state,
                ingredients: action.payload,
                ingredientsLoading: false,
            }
        case GET_INGREDIENTS_ERROR:
            return {
                ...state,
                ingredientsError: true,
                ingredientsLoading: false,
            }
        default:
            return state;
    }
}