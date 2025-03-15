import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients.ts";
import { currentBurgerReducer } from "./current-burger.ts";
import { currentIngredientReducer } from "./current-ingredient.ts";
import { orderReducer } from "./order.ts";
import { modalReducer } from "./modal.ts";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    currentBurger: currentBurgerReducer,
    currentIngredient: currentIngredientReducer,
    order: orderReducer,
    modal: modalReducer,
});