import { request } from "../../utils/request.ts";
import { ENDPOINTS } from "../../utils/constants.ts";
import { AppThunkDispatch } from "../../hooks/services.ts";
import { AppState } from "../../main.tsx";
import { IBaseAuthRes } from "../../types/auth.ts";
import { IBaseRes } from "../../types/common.ts";

export const SET_EMAIL = 'SET_EMAIL';
export const SET_NAME = 'SET_NAME';
export const SET_TOKEN = 'SET_TOKEN';
export const RESET_USER = 'RESET_USER';

export function sendRegister(data: {name: string, email: string, password: string}) {
    return (dispatch: AppThunkDispatch) => {
        return request<IBaseAuthRes>(ENDPOINTS.auth.register, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        }).then(res => {
            dispatch({ type: SET_EMAIL, payload: res.user.email });
            dispatch({ type: SET_NAME, payload: res.user.name });
            dispatch({ type: SET_TOKEN, payload: res.accessToken });
            localStorage.setItem('refreshToken', res.refreshToken);
            localStorage.setItem('accessToken', res.accessToken);
        }).catch(() => {
            return Promise.reject('Пользователь с таким email уже зарегистрирован');
        })
    }
}

export function sendLogin(data: { email: string, password: string }) {
    return (dispatch: AppThunkDispatch, getState: () => AppState) => {
        const { accessToken } = getState().auth.user;

        return request<IBaseAuthRes>(ENDPOINTS.auth.login, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken,
            },
            body: JSON.stringify(data),
        }).then(res => {
            dispatch({ type: SET_EMAIL, payload: res.user.email });
            dispatch({ type: SET_NAME, payload: res.user.name });
            dispatch({ type: SET_TOKEN, payload: res.accessToken });
            localStorage.setItem('refreshToken', res.refreshToken);
            localStorage.setItem('accessToken', res.accessToken);
        }).catch(() => {
            return Promise.reject('Такой пользователь не найден');
        })
    }
}

export function getUser() {
    return (dispatch: AppThunkDispatch, getState: () => AppState) => {
        const { accessToken } = getState().auth.user;
        const localAccessToken = localStorage.getItem('accessToken');
        if (!accessToken && !localAccessToken) {
            return Promise.reject('Нет токена пользователя');
        }

        return request<IBaseAuthRes>(ENDPOINTS.auth.user, {
            headers: {
                'Authorization': accessToken || localAccessToken,
            },
        }).then(res => {
            dispatch({ type: SET_EMAIL, payload: res.user.email });
            dispatch({ type: SET_NAME, payload: res.user.name });
        }).catch(() => {
            dispatch(updateRefreshToken());
            return Promise.reject('Такой пользователь не найден');
        })
    }
}

export function logOut() {
    return (dispatch: AppThunkDispatch) => {
        const localRefreshToken = localStorage.getItem('refreshToken');
        if (!localRefreshToken) {
            return Promise.reject('Нет токена пользователя для выхода');
        }

        return request<IBaseRes>(ENDPOINTS.auth.logout, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ token: localRefreshToken }),
        }).then(() => {
            dispatch({ type: RESET_USER });
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        }).catch(() => {
            return Promise.reject('Не удалось выйти из приложения');
        })
    }
}

export function updateUser({ email, name, password }: { email: string, name: string, password: string }) {
    return (dispatch: AppThunkDispatch, getState: () => AppState) => {
        const { accessToken } = getState().auth.user;
        const localAccessToken = localStorage.getItem('accessToken');
        if (!accessToken && !localAccessToken) {
            return Promise.reject('Нет токена пользователя');
        }

        return request<IBaseAuthRes>(ENDPOINTS.auth.user, {
            method: 'PATCH',
            headers: {
                'Authorization': accessToken || localAccessToken,
            },
            body: JSON.stringify({ email, name, password }),
        }).then(res => {
            if (res.success) {
                dispatch({ type: SET_EMAIL, payload: res.user.email });
                dispatch({ type: SET_NAME, payload: res.user.name });
            }
        })
    }
}

function updateRefreshToken() {
    return (dispatch: AppThunkDispatch) => {
        return request<IBaseAuthRes>(ENDPOINTS.auth.token, {
            method: 'POST',
            body: JSON.stringify({
                token: localStorage.getItem('refreshToken'),
            })
        }).then(res => {
            dispatch({ type: SET_TOKEN, payload: res.accessToken });
            localStorage.setItem('refreshToken', res.refreshToken);
            localStorage.setItem('accessToken', res.accessToken);
        })
    }
}
