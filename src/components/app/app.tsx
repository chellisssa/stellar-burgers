import styles from './app.module.css';
import { AppHeader } from '../app-header/AppHeader.tsx';
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients.tsx";
import { BurgerConstructor } from "../burger-constructor/burger-constructor.tsx";
import { Loading } from "../loading/loading.tsx";
import { Error} from "../error/error.tsx";
import { useEffect } from "react";
import { getIngredients } from "../../services/actions/ingredients.ts";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAppDispatch, useAppSelector } from "../../hooks/services.ts";

function App() {
    const { ingredients, ingredientsLoading, ingredientsError } = useAppSelector(state => state.ingredients);
    const dispatch = useAppDispatch();

    useEffect(()=> {
        dispatch(getIngredients());
    }, [])

    return (
        <>
            <AppHeader></AppHeader>

            {ingredientsLoading && <Loading />}
            {ingredientsError && <Error />}

                {
                    ingredients && ingredients.length > 0 &&
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

export default App
