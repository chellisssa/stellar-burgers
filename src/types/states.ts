import { IIngredient } from "./ingredient.ts";
import { ThunkDispatch } from "redux-thunk";
import { AppStore } from "../main.tsx";
import React from "react";

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

export interface IModalState {
    isOpen: boolean,
    title: string,
    onClose: () => void,
    children: React.ReactNode | React.ComponentType | null,
}