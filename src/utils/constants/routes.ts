export const ROUTES = {
    base: '/',
    login: '/login',
    register: '/register',
    forgotPassword: '/forgot-password',
    resetPassword: '/reset-password',
    profile: '/profile',
    orders: '/profile/orders',
    ingredient: (id: string) => `/ingredients/${id}`,
    notFound: '*',
};