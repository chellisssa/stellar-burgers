import { MutableRefObject, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styles from './burger-ingredients.module.css';
import { IGroupedIngredient, IIngredient } from "../../types/ingredient.ts";
import { IChoice } from "../../types/common.ts";
import { INGREDIENTS_TITLE, TABS, TYPE_TO_GROUP_NAME } from "../../utils/constants.ts";
import { Tabs } from "../tabs/tabs.tsx";
import { IngredientsGroup } from "./ingredients-group/ingredients-group.tsx";

const orderMap: Record<string, number> = TABS.reduce((acc: Record<string, number>, tab:IChoice, index: number): Record<string, number> => {
    acc[tab.label] = index;
    return acc;
}, {} as Record<string, number>);

export function BurgerIngredients() {
    const { ingredients } = useSelector(state => state.ingredients);
    const [scrolledHeight, setScrolledHeight] = useState<number>(0);
    const [activeTab, setActiveTab] = useState(TABS[0].label);
    const scrolledRef: MutableRefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null);
    const groupRefs: MutableRefObject<(HTMLDivElement | null)[]> = useRef<(HTMLDivElement | null)[]>([]);

    const groupedIngredients = useMemo(() => {
        return ingredients.reduce((acc: IGroupedIngredient[], ingredient: IIngredient): IGroupedIngredient[] => {
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
    }, [ingredients]);

    useLayoutEffect(() => {
        if (!scrolledRef.current) {
            return;
        }
        const offsetY = scrolledRef.current.getBoundingClientRect().top;
        setScrolledHeight(window.innerHeight - offsetY);
    }, []);

    useEffect(() => {
        if (!scrolledRef.current) return;
        const observerOptions = {
            root: scrolledRef.current,
            rootMargin: "0px 0px -100% 0px",
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    setActiveTab(entry.target.getAttribute("data-tab-id") || TABS[0].label);
                    break;
                }
            }
        }, observerOptions);


        groupRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, [groupedIngredients]);

    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
        const targetIndex = groupedIngredients.findIndex(group => group.groupName === tabId);
        const targetElement = groupRefs.current[targetIndex];

        if (targetElement && scrolledRef.current) {

            scrolledRef.current.scrollTo({
                top: targetElement.offsetTop - scrolledRef.current.offsetTop + parseFloat(window.getComputedStyle(targetElement).paddingTop) / 2,
                behavior: "smooth"
            });

        }
    };

    return (
        <section className={ `${styles.BurgerIngredients} pt-10` }>
            <h1 className="text text_type_main-large">{INGREDIENTS_TITLE}</h1>

            <Tabs
                className="mt-5"
                tabs={TABS}
                activeTab={activeTab}
                onTabClick={handleTabClick}
            />

            <div className="pb-10">
                <div
                    ref={scrolledRef}
                    style={{ height: scrolledHeight + 'px' }}
                    className={styles.scrolled}
                >
                    {groupedIngredients.map((group: IGroupedIngredient, index) => (
                        <IngredientsGroup
                            key={group.groupName}
                            title={group.groupName}
                            ingredients={group.ingredients}
                            ref={(el) => (groupRefs.current[index] = el)}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}