import { IIngredient, IngredientTypeEnum } from "../../types/ingredient.ts";
import { calculateTotalPrice } from "./order.ts";
import { AppDispatch } from "../../types/states.ts";

export const SET_BUN = 'SET_BUN';
export const SET_FILLING = 'SET_FILLING';
export const DELETE_FILLING = 'DELETE_FILLING';
export const MOVE_FILLING = 'MOVE_FILLING';
export const UPDATE_FILLINGS = 'UPDATE_FILLINGS';

export function selectIngredient(ingredient: IIngredient) {
    return (dispatch: AppDispatch) => {
        dispatch({
            type: ingredient.type === IngredientTypeEnum.Bun ? SET_BUN : SET_FILLING,
            item: ingredient
        });

        dispatch(calculateTotalPrice());
    }
}

export function deleteIngredient(id: string) {
    return (dispatch: AppDispatch) => {
        dispatch({ type: DELETE_FILLING, payload: id });
        dispatch(calculateTotalPrice());
    }
}