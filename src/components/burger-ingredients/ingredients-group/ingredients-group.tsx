import styles from './ingredients-group.module.css';
import { IIngredient } from "../../../types/ingredient.ts";
import { IngredientCard } from "../ingredient-card/ingredient-card.tsx";
import { RESET_CURRENT_INGREDIENT, SET_CURRENT_INGREDIENT } from "../../../services/actions/current-ingredient.ts";
import { OPEN_MODAL } from "../../../services/actions/modal.ts";
import { forwardRef } from "react";
import { IngredientDetails } from "../../modal/ingredient-details/ingredient-details.tsx";
import { INGREDIENT_DETAILS_TITLE } from "../../../utils/constants.ts";
import { useAppDispatch } from "../../../hooks/services.ts";

interface IProps {
    title: string;
    ingredients: IIngredient[];
}

export const IngredientsGroup = forwardRef<HTMLDivElement, IProps>(({title, ingredients}, ref) => {
    const dispatch = useAppDispatch();

     function clickIngredient(el: IIngredient) {
         dispatch({ type: SET_CURRENT_INGREDIENT, payload: el});
         dispatch({
             type: OPEN_MODAL,
             payload: {
                 title: INGREDIENT_DETAILS_TITLE,
                 children: <IngredientDetails />,
                 onClose: () => dispatch({ type: RESET_CURRENT_INGREDIENT })
             },
         });
    }

    return (
        <div ref={ref} className="pt-10" data-tab-id={title}>
            <h2 className="text text_type_main-medium mb-6">{title}</h2>
            <ul className={ `${styles.group} pl-4 pr-4` }>
                { ingredients && ingredients.length > 0 && ingredients.map((el: IIngredient) => (
                    <IngredientCard
                        key={el._id}
                        ingredient={el}
                        onClick={() => clickIngredient(el)}
                    />
                ))}
            </ul>
        </div>
    )
})