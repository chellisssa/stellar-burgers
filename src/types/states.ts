import { IIngredient } from "./ingredient.ts";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../main.tsx";

export interface IIngredientsState {
    ingredients: IIngredient[];
    ingredientsLoading: boolean;
    ingredientsError: boolean;
}

export interface ICurrentBurgerState {
    bun: IIngredient | null;
    filling: IIngredient[];
}

export interface ICurrentIngredientState {
    currentIngredient: IIngredient | null;
}

export interface IOrderState {
    totalPrice: number;
    orderCode: number;
    orderLoading: boolean;
    orderError: boolean;
}

export enum ModalTypeEnum {
    OrderDetails = 'ORDER_DETAILS',
    IngredientDetails = 'INGREDIENT_DETAILS',
}

export interface IModalState {
    isOpen: boolean,
    type: ModalTypeEnum | null,
    onClose: () => void,
}

export interface IAction {
    type: string;
    payload?: unknown;
}

export type AppDispatch = ThunkDispatch<AppState, undefined, IAction>;