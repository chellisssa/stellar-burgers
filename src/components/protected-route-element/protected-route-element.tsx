import { useAppSelector } from "../../hooks/services.ts";
import { Navigate, useLocation } from "react-router-dom";
import { ROUTES } from "../../utils/constants/routes.ts";

interface IProps {
    element:  JSX.Element;
    forUser?: boolean;
}
export function ProtectedRouteElement({ element, forUser = false }: IProps) {
    const { user } = useAppSelector(state => state.auth);
    const location = useLocation();

    return forUser
        ? user.email ? element : <Navigate to={ROUTES.login} replace state={{ from: location.pathname }} />
        : user.email ? <Navigate to={ROUTES.base} replace /> : element;
}