import { BASE_URL } from "../../utils/constants.ts";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR';

export function getIngredients() {
    return function (dispatch) {
        dispatch({ type: GET_INGREDIENTS_REQUEST });

        fetch(BASE_URL).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                dispatch({ type: GET_INGREDIENTS_ERROR });
            }
        }).then(res => {
            dispatch({ type: GET_INGREDIENTS_SUCCESS, payload: res.data });
        }).catch(() => {
            dispatch({ type: GET_INGREDIENTS_ERROR });
        })
    }
}