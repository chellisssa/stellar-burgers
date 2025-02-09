import { MutableRefObject, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragTypeEnum, type IIngredient, IngredientTypeEnum, } from "../../types/ingredient.ts";
import styles from './burger-constructor.module.css';
import { OrderSum } from "./order-sum/order-sum.tsx";
import { ConstructorItem } from "./constructor-item/constructor-item.tsx";
import { EmptyItem } from "./empty-item/empty-item.tsx";
import { useDrop } from 'react-dnd';
import { MOVE_FILLING, selectIngredient } from "../../services/actions/current-burger.ts";
import { AppDispatch } from "../../types/states.ts";
import { EMPTY_BURGER } from "../../utils/constants.ts";

export function BurgerConstructor() {
    const { bun, filling } = useSelector(state => state.currentBurger);
    const dispatch = useDispatch<AppDispatch>();
    const [maxListHeight, setMaxListHeight] = useState<number>(0);
    const listRef: MutableRefObject<HTMLUListElement | null> = useRef<HTMLUListElement | null>(null);
    const dropTarget = useRef<HTMLUListElement | null>(null);

    const [{canDrop, itemType}, drop] = useDrop(() => ({
        accept: DragTypeEnum.Ingredient,
        collect: monitor => ({
            canDrop: monitor.canDrop(),
            itemType: monitor.getItem()?.ingredient?.type as IngredientTypeEnum || null,
        }),
        drop: ({ ingredient }) => {
            dispatch(selectIngredient(ingredient));
        },
    }));
    drop(dropTarget);

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

    const handleMoveCard = (dragIndex, hoverIndex) => {
        dispatch({
            type: MOVE_FILLING,
            payload: {
                dragIndex,
                hoverIndex,
            }
        });
    };

    return (
        <section className={`${styles.BurgerConstructor} mt-25 pr-4 pl-4`}>
            <ul ref={dropTarget} className={styles.list}>
                <li >
                    {
                        bun
                            ?
                            <ConstructorItem
                                type="top"
                                name={bun.name + ' (верх)'}
                                image={bun.image}
                                price={bun.price}
                                isLocked={true}
                                isActive={canDrop && itemType === IngredientTypeEnum.Bun}

                            />
                            : <EmptyItem
                                title={EMPTY_BURGER.bun}
                                type="top"
                                isActive={canDrop && itemType === IngredientTypeEnum.Bun}
                            />

                    }
                </li>

                <li>
                    <ul
                        className={`${styles.list} custom-scroll`}
                        style={{ maxHeight: maxListHeight + 'px' }}
                        ref={listRef}
                    >
                        {
                            filling.length > 0
                                ? filling.map((ingredient: IIngredient, index: number) => (
                                    <li key={ingredient.tempId}>
                                        <ConstructorItem
                                            id={ingredient.tempId}
                                            name={ingredient.name}
                                            image={ingredient.image}
                                            price={ingredient.price}
                                            isActive={canDrop && itemType !== IngredientTypeEnum.Bun}
                                            index={index}
                                            moveCard={handleMoveCard}

                                        />
                                    </li>
                                ))
                                : <EmptyItem
                                    title={EMPTY_BURGER.filling}
                                    isActive={canDrop && itemType !== IngredientTypeEnum.Bun}
                                />
                        }
                    </ul>
                </li>

                <li>
                    {
                        bun
                            ?
                            <ConstructorItem
                                type="bottom"
                                name={bun.name + ' (низ)'}
                                image={bun.image}
                                price={bun.price}
                                isLocked={true}
                                isActive={canDrop && itemType === IngredientTypeEnum.Bun}
                            />
                            : <EmptyItem
                                title={EMPTY_BURGER.bun}
                                type="bottom"
                                isActive={canDrop && itemType === IngredientTypeEnum.Bun}
                            />

                    }
                </li>
            </ul>
            <OrderSum/>
        </section>
    )
}