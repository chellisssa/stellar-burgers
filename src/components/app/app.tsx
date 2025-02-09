import { IIngredient } from "../../types/ingredient.ts";
import { AppHeader } from '../app-header/AppHeader.tsx';
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients.tsx";
import { BurgerConstructor } from "../burger-constructor/burger-constructor.tsx";
import { Loading } from "../loading/loading.tsx";
import { Error} from "../error/error.tsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getIngredients } from "../../services/actions/ingredients.ts";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
    const { ingredients, ingredientsLoading, ingredientsError } = useSelector(state => state.ingredients);
    const dispatch = useDispatch();

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
                    <div
                        className="container"
                        style={{ display: 'flex', gap: '40px' }}
                    >
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
