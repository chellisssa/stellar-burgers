import { SET_ORDER_ERROR, SET_ORDER_REQUEST, SET_ORDER_SUCCESS, SET_TOTAL_PRICE } from "../actions/order.ts";
import { IOrderState } from "../../types/states.ts";
import { IAction } from "../../hooks/services.ts";

const initialState: IOrderState = {
    totalPrice: 0,
    orderCode: 0,
    orderLoading: false,
    orderError: false,
};

export const orderReducer = (state: IOrderState = initialState, action: IAction) => {
    switch(action.type) {
        case SET_TOTAL_PRICE:
            return {
                ...state,
                totalPrice: action.payload,
            }
        case SET_ORDER_REQUEST:
            return {
                ...state,
                orderLoading: true,
                orderError: false,
            }
        case SET_ORDER_SUCCESS:
            return {
                ...state,
                orderCode: action.payload,
                orderLoading: false,
            }
        case SET_ORDER_ERROR:
            return {
                ...state,
                orderError: true,
                orderLoading: false,
            }
        default:
            return state;
    }
}