export enum IngredientTypeEnum {
    Bun = 'bun',
    Sauce = 'sauce',
    Main = 'main',
}

export interface IIngredient {
    __v: number;
    _id: string;
    calories: number;
    carbohydrates: number;
    fat: number;
    image: string;
    image_large: string;
    image_mobile: string;
    name: string;
    price: number;
    proteins: number;
    type: IngredientTypeEnum;
}

export interface IGroupedIngredient {
    groupName: string;
    ingredients: IIngredient[];
}