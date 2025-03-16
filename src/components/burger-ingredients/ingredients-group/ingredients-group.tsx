import styles from './ingredients-group.module.css';
import { IIngredient } from "../../../types/ingredient.ts";
import { IngredientCard } from "../ingredient-card/ingredient-card.tsx";
import { forwardRef } from "react";
import { AppThunkDispatch, useAppDispatch } from "../../../hooks/services.ts";
import { RESET_CURRENT_INGREDIENT, SET_CURRENT_INGREDIENT } from "../../../services/actions/current-ingredient.ts";
import { OPEN_MODAL } from "../../../services/actions/modal.ts";
import { INGREDIENT_DETAILS_TITLE } from "../../../utils/constants.ts";
import { IngredientDetails } from "../../modal/ingredient-details/ingredient-details.tsx";
import { ROUTES } from "../../../utils/constants/routes.ts";

interface IProps {
    title: string;
    ingredients: IIngredient[];
    from?: string;
}

export const IngredientsGroup = forwardRef<HTMLDivElement, IProps>(({title, ingredients}, ref) => {
    const dispatch = useAppDispatch<AppThunkDispatch>();

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
         window.history.replaceState({ background: true, ingredient: el }, '', ROUTES.ingredient(el._id));
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