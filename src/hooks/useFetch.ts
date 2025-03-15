import { Reducer, useEffect, useReducer } from "react";
import { IFetchState, TFetchAction } from "./types";
import { request } from "../utils/request.ts";
import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_ERROR } from "./types";

export function useFetch<T>() {
    const initialState: IFetchState<T> = {
        payload: null,
        loading: false,
        error: null,
    };

    function fetchReducer(state: IFetchState<T>, action: TFetchAction<T>): IFetchState<T> {
        switch (action.type) {
            case FETCH_REQUEST:
                return { ...state, loading: true, error: null };
            case FETCH_SUCCESS:
                return { ...state, loading: false, payload: action.payload };
            case FETCH_ERROR:
                return { ...state, loading: false, error: action.payload };
            default:
                return initialState;
        }
    }

    const [state, dispatch] = useReducer<Reducer<IFetchState<T>, TFetchAction<T>>>(
        (state: IFetchState<T>, action: TFetchAction<T>) => fetchReducer(state, action),
        initialState as IFetchState<T>
    );

    const fetchData = async (url: string, options?: RequestInit) => {
        dispatch({ type: FETCH_REQUEST });
        try {
            request(url, options).then(res => {
                dispatch({ type: FETCH_SUCCESS, payload: res });
            });
        } catch (error) {
            dispatch({ type: FETCH_ERROR, payload: (error as Error).message });
        }
    };

    return { ...state, fetchData };
}