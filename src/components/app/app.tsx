import { AppHeader } from '../app-header/AppHeader.tsx';
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients.tsx";
import { BurgerConstructor } from "../burger-constructor/burger-constructor.tsx";
import { useFetch } from "../../hooks/useFetch.ts";
import { BASE_URL} from '../../utils/constants.ts';
import { Loading } from "../loading/loading.tsx";
import { IIngredient } from "../../types/ingredient.ts";

function App() {
    const { payload, loading, error } = useFetch<{data: IIngredient[]}>(BASE_URL);
    const ingredients = payload?.data as IIngredient[];

    return (
        <>
            <AppHeader></AppHeader>

            {loading && <Loading />}
            {error && <p>Error: {error}</p>}
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
