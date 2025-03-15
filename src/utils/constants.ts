import { BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import type { INavigationItem } from "../types/navigation.ts";
import type { IChoice } from "../types/common.ts";
import { IngredientTypeEnum } from "../types/ingredient.ts";
import { ROUTES } from "./constants/routes.ts";

export const BASE_URL = 'https://norma.nomoreparties.space/api/';
export const ENDPOINTS = {
    ingredients: BASE_URL + 'ingredients',
    order: BASE_URL + 'orders',
    auth: {
        login: BASE_URL + 'auth/login',
        register: BASE_URL + 'auth/register',
        logout: BASE_URL + 'auth/logout',
        token: BASE_URL + 'auth/token',
        user: BASE_URL + 'auth/user',
    },
    passwordReset: BASE_URL + 'password-reset',
    confirmPasswordReset: BASE_URL + 'password-reset/reset',
}

export const NAVIGATION: INavigationItem[][] = [
    [
        {
            name: 'Конструктор',
            id: 'constructor',
            icon: BurgerIcon,
            position: 'left',
            link: ROUTES.base,
        },
        {
            name: 'Лента заказов',
            id: 'orders',
            icon: ListIcon,
            position: 'left',
            link: ROUTES.orders,
        },
    ],
    [
        {
            name: 'Личный кабинет',
            id: 'client',
            icon: ProfileIcon,
            position: 'right',
            link: ROUTES.profile,
        }
    ]
];

export const ACTIVE_PAGE = 'constructor';

export const TABS: IChoice[] = [
    {
        value: 'buns',
        label: 'Булки'
    },
    {
        value: 'sauces',
        label: 'Соусы'
    },
    {
        value: 'main',
        label: 'Начинки',
    },
];

export const INGREDIENTS_TITLE = 'Соберите бургер';

export const TYPE_TO_GROUP_NAME = {
    [IngredientTypeEnum.Bun]: 'Булки',
    [IngredientTypeEnum.Sauce]: 'Соусы',
    [IngredientTypeEnum.Main]: 'Начинки',
};

export const BUTTON_NAME = {
    place_order: 'Оформить заказ',
    loading: 'Оформляется...'
}

export const MACRONUTRIENTS = {
    calories: 'Калории,ккал',
    proteins: 'Белки, г',
    fat: 'Жиры, г',
    carbohydrates: 'Углеводы, г',
}

export const INGREDIENT_DETAILS_TITLE = 'Детали ингредиента';

export const ORDER_DETAILS = {
    number: '034536',
    label: 'идентификатор заказа',
    preparationLabel: 'Ваш заказ начали готовить',
    waitLabel: 'Дождитесь готовности на орбитальной станции',
}

export const ORDER_ERROR_MESSAGE = 'Ваш заказ исчез в чёрной дыре. Попробуйте ещё раз!';

export const EMPTY_BURGER = {
    bun: 'Выберите булку',
    filling: 'Выберите начинку',
}

export const LOADING = {
    ingredients: 'Сканируем космическую кладовую... Ингредиенты телепортируются!',
    ingredient: 'Ингредиент в пути... Скоро всё будет на месте!',
}