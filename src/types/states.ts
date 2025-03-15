import { IIngredient } from "./ingredient.ts";
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
    onClose: (() => void) | null,
    children: React.ReactNode | React.ComponentType | null,
}

export interface IAuthState {
    user: {
        email: string,
        name: string,
        accessToken: string,
    },
}