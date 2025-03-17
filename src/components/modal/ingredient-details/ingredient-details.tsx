import styles from './ingredient-details.module.css';
import { IIngredient } from "../../../types/ingredient.ts";
import { useEffect, useState } from "react";
import { MACRONUTRIENTS } from "../../../utils/constants.ts";
import { IChoice } from "../../../types/common.ts";
import { useAppSelector } from "../../../hooks/services.ts";


type MacronutrientKey = keyof typeof MACRONUTRIENTS;

export function IngredientDetails() {
    const [infoList, setInfoList] = useState<IChoice[]>([]);
    const { currentIngredient: ingredient } = useAppSelector(state => state.currentIngredient);

    useEffect(() => {
        if (ingredient) {
            const list: IChoice[] = []
            for (const key in MACRONUTRIENTS) {
                const mcKey = key as MacronutrientKey;
                list.push({ label: MACRONUTRIENTS[mcKey], value: ingredient[mcKey as keyof IIngredient] });
            }
            setInfoList(list);
        }
    }, [ingredient]);

    if (!ingredient) {
        return null;
    }

    return (
        <div className={ `${styles.IngredientDetails} pl-15 pr-15 ` }>
            <img className={styles.image} src={ingredient.image} alt={ingredient.name} />
            <p className={ `${styles.text} mt-4 text text_type_main-medium` }>{ ingredient.name }</p>
            <ul className={ `${styles.list} mt-8`}>
                {
                    infoList.length > 0 && infoList.map((info: IChoice) => (
                        <li className={styles.listItem} key={info.label}>
                            <p className="text text_type_main-default text_color_inactive">{ info.label }</p>
                            <p className="text text_type_digits-default text_color_inactive">{ info.value }</p>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}