import { ENDPOINTS } from "../../utils/constants.ts";
import { OPEN_MODAL } from "./modal.ts";
import { request } from "../../utils/request.ts";
import { OrderDetails } from "../../components/modal/order-details/order-details.tsx";
import { resetBurger } from "./current-burger.ts";
import { IIngredient } from "../../types/ingredient.ts";
import { AppThunkDispatch } from "../../hooks/services.ts";
import { AppState } from "../../main.tsx";

export const SET_TOTAL_PRICE = 'SET_TOTAL_PRICE';
export const SET_ORDER_REQUEST = 'SET_ORDER_REQUEST';
export const SET_ORDER_SUCCESS = 'SET_ORDER_SUCCESS';
export const SET_ORDER_ERROR = 'SET_ORDER_ERROR';

export function calculateTotalPrice() {
    return (dispatch: AppThunkDispatch, getState: () => AppState) => {
        const { bun, filling } = getState().currentBurger;
        dispatch({
            type: SET_TOTAL_PRICE,
            payload:  ((bun as IIngredient)?.price || 0) * 2 + (filling as IIngredient[]).reduce((sum: number, item: IIngredient) => sum + item.price, 0),
        });
    }
}

export function setOrder() {
    return (dispatch: AppThunkDispatch, getState: () => AppState) => {
        const { bun, filling } = getState().currentBurger;
        const ingredients = [(bun as IIngredient)._id, ...(filling as IIngredient[]).map((el: IIngredient) => el._id), (bun as IIngredient)._id];

        dispatch({ type: SET_ORDER_REQUEST });

        request(ENDPOINTS.order, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ingredients}),
        }).then(res => {
            if (res.success && res.order) {
                dispatch({ type: SET_ORDER_SUCCESS, payload: res.order.number });
                dispatch({ type: OPEN_MODAL, payload: {
                    component: OrderDetails,
                    onClose: () => dispatch(resetBurger()),
                }});
            }
        }).catch(() => {
            dispatch({ type: SET_ORDER_ERROR });
        })
    }
}