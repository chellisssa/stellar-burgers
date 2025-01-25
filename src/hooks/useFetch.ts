import { Reducer, useEffect, useReducer } from "react";
import { IFetchState, TFetchAction } from "./types";

export function useFetch<T>(url: string, options?: RequestInit) {
    const initialState: IFetchState<T> = {
        payload: null,
        loading: false,
        error: null,
    };

    function fetchReducer(state: IFetchState<T>, action: TFetchAction<T>): IFetchState<T> {
        switch (action.type) {
            case 'FETCH_LOADING':
                return { ...state, loading: true, error: null };
            case 'FETCH_SUCCESS':
                return { ...state, loading: false, payload: action.payload };
            case 'FETCH_FAILURE':
                return { ...state, loading: false, error: action.payload };
            default:
                return initialState;
        }
    }

    const [state, dispatch] = useReducer<Reducer<IFetchState<T>, TFetchAction<T>>>(
        (state: IFetchState<T>, action: TFetchAction<T>) => fetchReducer(state, action),
        initialState as IFetchState<T>
    );

    const fetchData = async () => {
        dispatch({ type: 'FETCH_LOADING' });
        try {
            // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

            // await delay(100000);
            const response = await fetch(url, options);
            const result: T = await response.json();
            dispatch({ type: 'FETCH_SUCCESS', payload: result });
        } catch (error) {
            dispatch({ type: 'FETCH_FAILURE', payload: (error as Error).message });
        }
    };

    useEffect(() => {
        if (url) {
            fetchData().catch((error) => {
                console.error('Error fetching data:', error);
            })
        }
    }, [url, options]);

    return { ...state };
}