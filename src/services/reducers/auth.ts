import { SET_EMAIL, SET_NAME, SET_TOKEN, RESET_USER } from "../actions/auth.ts";
import { IAction } from "../../hooks/services.ts";
import { IAuthState } from "../../types/states.ts";

const initialState: IAuthState = {
    user: {
        email: '',
        name: '',
        accessToken: '',
    },
}

export const authReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case SET_EMAIL:
            return {
                ...state,
                user: {
                    ...state.user,
                    email: action.payload,
                },
            }
        case SET_NAME:
            return {
                ...state,
                user: {
                    ...state.user,
                    name: action.payload,
                },
            }
        case SET_TOKEN:
            return {
                ...state,
                user: {
                    ...state.user,
                    accessToken: action.payload,
                },
            }
        case RESET_USER:
            return {
                ...state,
                user: {
                    ...initialState.user,
                }
            }
    }

    return state;
}