import styles from './ingredients-group.module.css';
import { IIngredient } from "../../../types/ingredient.ts";
import { IngredientCard } from "../ingredient-card/ingredient-card.tsx";
import { IngredientDetails } from "../../modal/ingredient-details/ingredient-details.tsx";
import { INGREDIENT_DETAILS_TITLE } from "../../../utils/constants.ts";
import { useModalContext } from "../../modal/modal-context/modal-context.tsx";

interface IProps {
    title: string;
    ingredients: IIngredient[];
}

export function IngredientsGroup({title, ingredients}: IProps) {
    const { openModal } = useModalContext();

    return (
        <div className="pt-10">
            <h2 className="text text_type_main-medium mb-6">{title}</h2>
            <ul className={ `${styles.group} pl-4 pr-4` }>
                { ingredients && ingredients.length > 0 && ingredients.map((el: IIngredient) => (
                    <IngredientCard
                        key={el._id}
                        ingredient={el}
                        onClick={() => openModal(<IngredientDetails ingredient={el} />, INGREDIENT_DETAILS_TITLE)}
                    />
                ))}
            </ul>
        </div>
    )
}