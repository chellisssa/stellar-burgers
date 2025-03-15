import { ResetPassword } from "../components/auth/reset-password/reset-password.tsx";
import { useEffect } from "react";
import { ROUTES } from "../utils/constants/routes.ts";
import { useLocation, useNavigate } from "react-router-dom";

export function ResetPasswordPage() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!location.state || location.state.from !== ROUTES.forgotPassword) {
            navigate(ROUTES.base, { replace: true });
        }
    }, []);

    return (
        <ResetPassword />
    )
}