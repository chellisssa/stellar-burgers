import { ROUTES } from "./routes.ts";

export const AUTH_TITLES = {
    login: 'Вход',
    register: 'Регистрация',
    forgotPassword: 'Восстановление пароля',
}

export const AUTH_PLACEHOLDERS = {
    fillEmail: 'Укажите e-mail',
    email: 'E-mail',
    password: 'Пароль',
    name: 'Имя',
    newPassword: 'Введите новый пароль',
    code: 'Введите код из письма',
}

export const BUTTON_NAMES = {
    login: 'Войти',
    register: 'Зарегистрироваться',
    restore: 'Восстановить',
    save: 'Сохранить',
}

export const LINK_TEXTS = {
    register: {
        text: 'Вы — новый пользователь?',
        link: 'Зарегистрироваться',
        url: ROUTES.register,
    },
    forgotPassword: {
        text: 'Забыли пароль?',
        link: 'Восстановить пароль',
        url: ROUTES.forgotPassword,
    },
    login: {
        text: 'Уже зарегистрированы?',
        link: 'Войти',
        url: ROUTES.login,
    },
    rememberPassword: {
        text: 'Вспомнили пароль?',
        link: 'Войти',
        url: ROUTES.login,
    }
}