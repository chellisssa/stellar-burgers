import styles from "./constructor.module.css";
import { AppThunkDispatch, useAppDispatch, useAppSelector } from "../../hooks/services.ts";
import { useEffect } from "react";
import { getIngredients } from "../../services/actions/ingredients.ts";
import { Loading } from "../../components/loading/loading.tsx";
import { Error } from "../../components/error/error.tsx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BurgerIngredients } from "../../components/burger-ingredients/burger-ingredients.tsx";
import { BurgerConstructor } from "../../components/burger-constructor/burger-constructor.tsx";
import { IIngredient } from "../../types/ingredient.ts";

export function ConstructorPage() {
    const { ingredients, ingredientsLoading, ingredientsError } = useAppSelector(state => state.ingredients);
    const dispatch = useAppDispatch<AppThunkDispatch>();

    useEffect(()=> {
        dispatch(getIngredients());
    }, []);

    return (
        <>
            {ingredientsLoading && !(ingredients as IIngredient[]).length && <Loading />}
            {ingredientsError && <Error />}

            {
                ingredients && (ingredients as IIngredient[]).length > 0 &&
                <div className={`${styles.container} container`}>
                    <DndProvider debugMode={true} backend={HTML5Backend}>
                        <BurgerIngredients />
                        <BurgerConstructor />
                    </DndProvider>
                </div>
            }
        </>
    )
}