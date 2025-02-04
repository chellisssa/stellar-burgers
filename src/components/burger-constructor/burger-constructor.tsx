import styles from './burger-constructor.module.css';
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { OrderSum } from "./order-sum/order-sum.tsx";
import { ConstructorItem } from "./constructor-item/constructor-item.tsx";
import { type IIngredient,  } from "../../types/ingredient.ts";

interface IProps {
    ingredients: IIngredient[];
}

export function BurgerConstructor({ ingredients }: IProps) {
    const [maxListHeight, setMaxListHeight] = useState<number>(0);
    const listRef: MutableRefObject<HTMLUListElement | null> = useRef<HTMLUListElement | null>(null);
    const bun: IIngredient | undefined = ingredients.find((el: IIngredient): boolean => el.type === 'bun');
    const main: IIngredient[] | undefined = ingredients?.filter((el: IIngredient): boolean => el.type !== 'bun');

    useEffect((): void => {
        const maxHeight: number = getMaxListHeight();
        setMaxListHeight(maxHeight);
    }, []);

    function getMaxListHeight(): number {
        if (!listRef.current) {
            return 0;
        }
        const OFFSET_BOTTOM = 276;
        return window.innerHeight - listRef.current?.getBoundingClientRect().top - OFFSET_BOTTOM;
    }

    return (
        <section className={ `${styles.BurgerConstructor} mt-25 pr-4 pl-4` }>
            <ul className={ styles.list }>
                {
                    bun &&
                    <li>
                        <ConstructorItem
                            type="top"
                            name={bun.name + ' (верх)'}
                            image={bun.image}
                            price={bun.price}
                            isLocked={true}
                        />
                    </li>
                }
                <li>
                    <ul
                        className={`${styles.list} custom-scroll`}
                        style={{ maxHeight: maxListHeight + 'px' }}
                        ref={listRef}
                    >
                        {
                            main.length > 0 && main.map((ingredient: IIngredient) => (
                                <li key={ingredient._id}>
                                    <ConstructorItem
                                        name={ingredient.name}
                                        image={ingredient.image}
                                        price={ingredient.price}
                                    />
                                </li>
                            ))
                        }
                    </ul>
                </li>
                {
                    bun &&
                    <li>
                        <ConstructorItem
                            type="bottom"
                            name={bun.name + ' (низ)'}
                            image={bun.image}
                            price={bun.price}
                            isLocked={true}
                        />
                    </li>
                }
            </ul>
            <OrderSum/>
        </section>
    )
}