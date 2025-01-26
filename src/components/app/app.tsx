import { IIngredient } from "../../types/ingredient.ts";
import { AppHeader } from '../app-header/AppHeader.tsx';
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients.tsx";
import { BurgerConstructor } from "../burger-constructor/burger-constructor.tsx";
import { Loading } from "../loading/loading.tsx";
import { Error} from "../error/error.tsx";
import { useFetch } from "../../hooks/useFetch.ts";
import { BASE_URL} from '../../utils/constants.ts';

function App() {
    const { payload, loading, error } = useFetch<{data: IIngredient[]}>(BASE_URL);
    const ingredients = payload?.data as IIngredient[];

    return (
        <>
            <AppHeader></AppHeader>

            {loading && <Loading />}
            {error && <Error />}
            {
                ingredients &&
                <div
                    className="container"
                    style={{ display: 'flex', gap: '40px' }}
                >
                    <BurgerIngredients
                        title="Соберите бургер"
                        ingredients={ingredients}
                    />
                    <BurgerConstructor ingredients={ingredients}/>
                </div>

            }

        </>
    )
}

export default App
