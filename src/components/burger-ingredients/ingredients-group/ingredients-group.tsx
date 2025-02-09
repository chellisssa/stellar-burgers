import styles from './ingredients-group.module.css';
import { IIngredient } from "../../../types/ingredient.ts";
import { IngredientCard } from "../ingredient-card/ingredient-card.tsx";
import { useDispatch } from "react-redux";
import { RESET_CURRENT_INGREDIENT, SET_CURRENT_INGREDIENT } from "../../../services/actions/current-ingredient.ts";
import { OPEN_MODAL } from "../../../services/actions/modal.ts";
import { forwardRef } from "react";
import { ModalTypeEnum } from "../../../types/states.ts";

interface IProps {
    title: string;
    ingredients: IIngredient[];
}

export const IngredientsGroup = forwardRef<HTMLDivElement, IProps>(({title, ingredients}, ref) => {
    const dispatch = useDispatch();

     function clickIngredient(el: IIngredient) {
         dispatch({ type: SET_CURRENT_INGREDIENT, payload: el});
         dispatch({
             type: OPEN_MODAL,
             payload: ModalTypeEnum.IngredientDetails,
             onClose: () => dispatch({ type: RESET_CURRENT_INGREDIENT })
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