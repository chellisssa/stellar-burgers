import { AppHeader } from '../app-header/AppHeader.tsx';
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import {
    ConstructorPage,
    LoginPage,
    RegisterPage,
    ForgotPasswordPage,
    ResetPasswordPage,
    ProfilePage,
    OrdersPage,
    IngredientPage,
    NotFoundPage,
} from "../../pages";
import { ROUTES } from "../../utils/constants/routes.ts";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect } from "react";
import { ProtectedRouteElement } from "../protected-route-element/protected-route-element.tsx";
import { AppThunkDispatch, useAppDispatch } from "../../hooks/services.ts";
import { getUser } from "../../services/actions/auth.ts";

const routes = [
    { path: ROUTES.base, name: 'Конструктор', element: <ConstructorPage/> },
    { path: ROUTES.ingredient(':id'), name: 'Ингредиент', element: <IngredientPage />},
    { path: ROUTES.notFound, name: '404 Not Found', element: <NotFoundPage/> },
];

const protectedRoutes = [
    { path: ROUTES.profile, name: 'Профиль', element: <ProfilePage />, forUser: true },
    { path: ROUTES.orders, name: 'Лента заказов', element: <OrdersPage />, forUser: true },
    { path: ROUTES.login, name: 'Вход', element: <LoginPage/> },
    { path: ROUTES.register, name: 'Регистрация', element: <RegisterPage/> },
    { path: ROUTES.forgotPassword, name: 'Забыли пароль', element: <ForgotPasswordPage/> },
    { path: ROUTES.resetPassword, name: 'Восстановить пароль', element: <ResetPasswordPage/> },
];

const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

const PageWrapper = ({ children }: { children: ReactNode }) => (
    <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
    >
        {children}
    </motion.div>
);

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes
                location={location}
                key={location.pathname}
            >
                {routes.map(route => (
                    <Route
                        path={route.path}
                        key={route.name}
                        element={<PageWrapper>{route.element}</PageWrapper>}
                    />
                ))}
                {protectedRoutes.map(route => (
                    <Route
                        path={route.path}
                        key={route.name}
                        element={<PageWrapper>
                            <ProtectedRouteElement element={route.element} forUser={route.forUser} />
                        </PageWrapper>}
                    />
                ))}
            </Routes>
        </AnimatePresence>
    );
};

function App() {
    const dispatch = useAppDispatch<AppThunkDispatch>();

    useEffect(() => {
        dispatch(getUser());
    }, []);
    return (
        <>
            <BrowserRouter>
                <AppHeader></AppHeader>
                <AnimatedRoutes/>
            </BrowserRouter>
        </>
    )
}

export default App
