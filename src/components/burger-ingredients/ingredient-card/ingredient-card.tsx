import styles from './ingredient-card.module.css';
import { DragTypeEnum, IIngredient, IngredientTypeEnum } from "../../../types/ingredient.ts";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useDrag } from 'react-dnd';

interface IProps {
    ingredient: IIngredient;
    onClick: () => void;
}

export function IngredientCard({ ingredient, onClick}: IProps) {
    const { bun, filling } = useSelector(state => state.currentBurger);
    const [count, setCount] = useState<number>(0);
    const dragTarget = useRef<HTMLLIElement | null>(null);
    const [{opacity}, drag] = useDrag(() => ({
        type: DragTypeEnum.Ingredient,
        item: { ingredient },
        collect: monitor => ({
            opacity: monitor.isDragging() ? .5 : 1,
        })
    }));
    drag(dragTarget);

    useEffect(() => {
        ingredient.type === IngredientTypeEnum.Bun
            ? ingredient._id === bun?._id
                ? setCount(2)
                : setCount(0)
            : setCount(filling.map((el: IIngredient) => el._id).filter((el: string) => el === ingredient._id).length);
    }, [bun, filling]);

    return (
        <li className={styles.IngredientCard} onClick={onClick} ref={dragTarget} style={{opacity}}>
            {count > 0 && <Counter count={count} /> }
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