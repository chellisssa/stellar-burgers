import styles from './ingredient.module.css';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../utils/constants/routes.ts";
import { RESET_CURRENT_INGREDIENT, SET_CURRENT_INGREDIENT } from "../../services/actions/current-ingredient.ts";
import { OPEN_MODAL } from "../../services/actions/modal.ts";
import { INGREDIENT_DETAILS_TITLE, LOADING } from "../../utils/constants.ts";
import { IngredientDetails } from "../../components/modal/ingredient-details/ingredient-details.tsx";
import { AppThunkDispatch, useAppDispatch, useAppSelector } from "../../hooks/services.ts";
import { useEffect, useRef, useState } from "react";
import { IIngredient } from "../../types/ingredient.ts";
import { getIngredients } from "../../services/actions/ingredients.ts";
import { Loading } from "../../components/loading/loading.tsx";

export function IngredientPage() {
    const dispatch = useAppDispatch<AppThunkDispatch>();
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const currentPath = useRef(location.pathname);
    const { ingredients } = useAppSelector(state => state.ingredients);
    const [currentIngredient, setCurrentIngredient] = useState<IIngredient | null>(null);
    const [popupIngredient, setPopupIngredient] = useState<IIngredient | null>(null);

    useEffect(() => {
        if (currentPath.current !== location.pathname) {
            closeModal();
        }
        currentPath.current = location.pathname;
    }, [currentPath]);

    useEffect(() => {
        if (ingredients.length === 0) {
            dispatch(getIngredients());
        }
    }, [dispatch, ingredients.length]);

    const closeModal = () => {
        dispatch({ type: RESET_CURRENT_INGREDIENT });
        navigate(location.pathname, { replace: true });
        setTimeout(() => {
            navigate(ROUTES.base, { replace: true });
        }, 50);
    }

    useEffect(() => {
        if (history.state && history.state.background) {
            if (history.state.ingredient) {
                setPopupIngredient(history.state.ingredient);
            }
            navigate(ROUTES.base);
        } else {
            if (ingredients.length === 0) return;
            const ingredient = ingredients.find((i: IIngredient) => i._id === params.id)
            setCurrentIngredient(ingredient);
            if (!ingredient) {
                return;
            }
            dispatch({ type: SET_CURRENT_INGREDIENT, payload: ingredient });
        }
    }, [ingredients, dispatch]);

    useEffect(() => {
        if (!popupIngredient) {
            return;
        }

        window.history.replaceState({ background: true, ingredient: popupIngredient }, '', ROUTES.ingredient(popupIngredient?._id));
        dispatch({ type: SET_CURRENT_INGREDIENT, payload: popupIngredient });
        dispatch({
            type: OPEN_MODAL,
            payload: {
                title: INGREDIENT_DETAILS_TITLE,
                children: <IngredientDetails/>,
                onClose: () => closeModal()
            },
        });
    }, [popupIngredient]);

    if (ingredients.length === 0) {
        return (<Loading text={LOADING.ingredient} />);
    }

    return (
        <>
            {currentIngredient &&
                <div className={`${styles.Ingredient} mt-30`}>
                    <h2 className="text text_type_main-large">{INGREDIENT_DETAILS_TITLE}</h2>
                    <IngredientDetails/>
                </div>
            }
        </>
    )
}