import styles from './ingredient-card.module.css';
import { IIngredient } from "../../../types/ingredient.ts";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface IProps {
    ingredient: IIngredient;
}

export function IngredientCard({ingredient}: IProps) {
    return (
        <li className={styles.IngredientCard}>
            <Counter count={1} />
            <img src={ingredient.image} alt={ingredient.name} className={styles.image} />
            <p className={ `${styles.price} pt-1` }>
                <span className="text text_type_digits-default">{ingredient.price}</span>
                <CurrencyIcon type="primary" />
            </p>
            <p className={`${styles.name} text text_type_main-default pt-1`}>
                {ingredient.name}
            </p>
        </li>
    )
}