import { BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import type { INavigationItem } from "../types/navigation.ts";
import type { IChoice } from "../types/common.ts";
import { IngredientTypeEnum } from "../types/ingredient.ts";

export const BASE_URL = 'https://norma.nomoreparties.space/api/ingredients';

export const NAVIGATION: INavigationItem[][] = [
    [
        {
            name: 'Конструктор',
            id: 'constructor',
            icon: BurgerIcon,
            position: 'left',
        },
        {
            name: 'Лента заказов',
            id: 'orders',
            icon: ListIcon,
            position: 'left',
        },
    ],
    [
        {
            name: 'Личный кабинет',
            id: 'client',
            icon: ProfileIcon,
            position: 'right',
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

export const TYPE_TO_GROUP_NAME = {
    [IngredientTypeEnum.Bun]: 'Булки',
    [IngredientTypeEnum.Sauce]: 'Соусы',
    [IngredientTypeEnum.Main]: 'Начинки',
};

export const BUTTON_NAME = {
    place_order: 'Оформить заказ'
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