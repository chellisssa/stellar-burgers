import { ENDPOINTS } from "../../utils/constants.ts";
import { request } from "../../utils/request.ts";
import { AppThunkDispatch } from "../../hooks/services.ts";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR';

export function getIngredients() {
    return function (dispatch: AppThunkDispatch) {
        dispatch({ type: GET_INGREDIENTS_REQUEST });

        request(ENDPOINTS.ingredients).then(res => {
            if (res.data) {
                dispatch({ type: GET_INGREDIENTS_SUCCESS, payload: res.data });
            }
        }).catch(() => {
            dispatch({ type: GET_INGREDIENTS_ERROR });
        })
    }
}