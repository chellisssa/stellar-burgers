import styles from './ingredients-group.module.css';
import { IIngredient } from "../../../types/ingredient.ts";
import { IngredientCard } from "../ingredient-card/ingredient-card.tsx";
import { forwardRef } from "react";

interface IProps {
    title: string;
    ingredients: IIngredient[];
    from?: string;
}

export const IngredientsGroup = forwardRef<HTMLDivElement, IProps>(({title, ingredients, from}, ref) => {

    return (
        <div ref={ref} className="pt-10" data-tab-id={title}>
            <h2 className="text text_type_main-medium mb-6">{title}</h2>
            <ul className={ `${styles.group} pl-4 pr-4` }>
                { ingredients && ingredients.length > 0 && ingredients.map((el: IIngredient) => (
                    <IngredientCard
                        key={el._id}
                        ingredient={el}
                        from={from}
                    />
                ))}
            </ul>
        </div>
    )
})