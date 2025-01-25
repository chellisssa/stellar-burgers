export interface IFetchState<T> {
    payload: T | null;
    loading: boolean;
    error: string | null;
}

export type TFetchAction<T> = { type: 'FETCH_LOADING' } | { type: 'FETCH_SUCCESS'; payload: T } | { type: 'FETCH_FAILURE'; payload: string };