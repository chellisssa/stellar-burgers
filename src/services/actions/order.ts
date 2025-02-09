import { ORDER_URL } from "../../utils/constants.ts";
import { OPEN_MODAL } from "./modal.ts";
import { AppDispatch, ModalTypeEnum } from "../../types/states.ts";

export const SET_TOTAL_PRICE = 'SET_TOTAL_PRICE';
export const SET_ORDER_REQUEST = 'SET_ORDER_REQUEST';
export const SET_ORDER_SUCCESS = 'SET_ORDER_SUCCESS';
export const SET_ORDER_ERROR = 'SET_ORDER_ERROR';

// const { openModal } = useModalContext();

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
    return (dispatch: AppDispatch, getState) => {
        const { bun, filling } = getState().currentBurger;
        const ingredients = [bun._id, ...filling.map(el => el._id), bun._id];

        dispatch({ type: SET_ORDER_REQUEST });

        fetch(ORDER_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ingredients}),
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                dispatch({ type: SET_ORDER_ERROR });
            }
        }).then(res => {
            if (res.success && res.order) {
                dispatch({ type: SET_ORDER_SUCCESS, payload: res.order.number });
                dispatch({ type: OPEN_MODAL, payload: ModalTypeEnum.OrderDetails });
            }
        }).catch(() => {
            dispatch({ type: SET_ORDER_ERROR });
        })
    }
}