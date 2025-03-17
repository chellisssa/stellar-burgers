export const FETCH_REQUEST = 'FETCH_REQUEST';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_ERROR = 'FETCH_ERROR';

export interface IFetchState<T> {
    payload: T | null;
    loading: boolean;
    error: string | null;
}

export type TFetchAction<T> =
    { type: typeof FETCH_REQUEST } |
    { type: typeof FETCH_SUCCESS; payload: T } |
    { type: typeof FETCH_ERROR; payload: string };
