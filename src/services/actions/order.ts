import { ENDPOINTS } from "../../utils/constants.ts";
import { OPEN_MODAL } from "./modal.ts";
import { request } from "../../utils/request.ts";
import { OrderDetails } from "../../components/modal/order-details/order-details.tsx";
import { resetBurger } from "./current-burger.ts";

export const SET_TOTAL_PRICE = 'SET_TOTAL_PRICE';
export const SET_ORDER_REQUEST = 'SET_ORDER_REQUEST';
export const SET_ORDER_SUCCESS = 'SET_ORDER_SUCCESS';
export const SET_ORDER_ERROR = 'SET_ORDER_ERROR';

export function calculateTotalPrice() {
    return (dispatch, getState) => {
        const { bun, filling } = getState().currentBurger;
        dispatch({
            type: SET_TOTAL_PRICE,
            totalPrice:  (bun?.price || 0) * 2 + filling.reduce((sum, item) => sum + item.price, 0),
        });
    }
}

export function setOrder() {
    return (dispatch, getState) => {
        const { bun, filling } = getState().currentBurger;
        const ingredients = [bun._id, ...filling.map(el => el._id), bun._id];

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
                    children: OrderDetails,
                    onClose: () => dispatch(resetBurger()),
                }});
            }
        }).catch(() => {
            dispatch({ type: SET_ORDER_ERROR });
        })
    }
}