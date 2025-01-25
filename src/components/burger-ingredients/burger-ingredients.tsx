import styles from './burger-ingredients.module.css';
import { MutableRefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import { IGroupedIngredient, IIngredient } from "../../types/ingredient.ts";
import { IChoice } from "../../types/common.ts";
import { Tabs } from "../tabs/tabs.tsx";
import { IngredientsGroup } from "./ingredients-group/ingredients-group.tsx";
import { TABS, TYPE_TO_GROUP_NAME } from "../../utils/constants.ts";

const orderMap: Record<string, number> = TABS.reduce((acc: Record<string, number>, tab:IChoice, index: number): Record<string, number> => {
    acc[tab.label] = index;
    return acc;
}, {} as Record<string, number>);

interface IProps {
    title: string;
    ingredients: IIngredient[];
}

export function BurgerIngredients({ title, ingredients }: IProps) {
    const [groupedIngredients, setGroupedIngredients] = useState<IGroupedIngredient[]>([]);
    const [scrolledHeight, setScrolledHeight] = useState<number>(0);
    const scrolledRef: MutableRefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const grouped: IGroupedIngredient[] = ingredients.reduce((acc: IGroupedIngredient[], ingredient: IIngredient): IGroupedIngredient[] => {
            const groupName: string = TYPE_TO_GROUP_NAME[ingredient.type];
            let group: IGroupedIngredient | undefined = acc.find((g: IGroupedIngredient): boolean => g?.groupName === groupName);
            if (!group) {
                group = { groupName, ingredients: [] };
                acc.push(group);
            }
            group.ingredients.push(ingredient);
            return acc;
        }, [])
            .sort((a: IGroupedIngredient, b: IGroupedIngredient) => (orderMap[a.groupName] ?? Infinity) - (orderMap[b.groupName] ?? Infinity));

        setGroupedIngredients(grouped);
    }, [ingredients]);

    useLayoutEffect(() => {
        if (!scrolledRef.current) {
            return;
        }
        const offsetY = scrolledRef.current.getBoundingClientRect().top;
        setScrolledHeight(window.innerHeight - offsetY);
    }, []);

    return (
        <section className={ `${styles.BurgerIngredients} pt-10` }>
            <h1 className="text text_type_main-large">{title}</h1>

            <Tabs
                className="mt-5"
                tabs={TABS}
            />

            <div className="pb-10">
                <div
                    ref={scrolledRef}
                    style={{ height: scrolledHeight + 'px' }}
                    className={styles.scrolled}
                >
                    {groupedIngredients.map((group: IGroupedIngredient) => (
                        <IngredientsGroup
                            key={group.groupName}
                            title={group.groupName}
                            ingredients={group.ingredients}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}