import { IIngredient, IngredientTypeEnum } from "../../types/ingredient.ts";
import { calculateTotalPrice } from "./order.ts";
import { v4 as uuidv4 } from "uuid";
import { AppThunkDispatch } from "../../hooks/services.ts";

export const SET_BUN = 'SET_BUN';
export const SET_FILLING = 'SET_FILLING';
export const DELETE_FILLING = 'DELETE_FILLING';
export const MOVE_FILLING = 'MOVE_FILLING';
export const UPDATE_FILLINGS = 'UPDATE_FILLINGS';
export const RESET_BURGER = 'RESET_BURGER';

export function selectIngredient(ingredient: IIngredient) {
    return (dispatch: AppThunkDispatch) => {
        dispatch({
            type: ingredient.type === IngredientTypeEnum.Bun ? SET_BUN : SET_FILLING,
            payload: {...ingredient, tempId: uuidv4()}
        });

        dispatch(calculateTotalPrice());
    }
}

export function deleteIngredient(id: string) {
    return (dispatch: AppThunkDispatch) => {
        dispatch({ type: DELETE_FILLING, payload: id });
        dispatch(calculateTotalPrice());
    }
}

export function resetBurger() {
    return (dispatch: AppThunkDispatch) => {
        dispatch({ type: RESET_BURGER });
        dispatch(calculateTotalPrice());
    }
}