import { useDispatch, useSelector, useStore } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AppDispatch, AppState, AppStore } from "../main.tsx";

export interface IAction {
    type: string;
    payload?: unknown;
}

export type AppThunkDispatch = ThunkDispatch<AppStore, undefined, IAction>;

export const useAppDispatch = useDispatch.withTypes<AppThunkDispatch | AppDispatch>()
export const useAppSelector = useSelector.withTypes<AppState>()
export const useAppStore = useStore.withTypes<AppStore>()
