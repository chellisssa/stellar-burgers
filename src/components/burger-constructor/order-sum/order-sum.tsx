import styles from "./order-sum.module.css";
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { BUTTON_NAME, ORDER_ERROR_MESSAGE } from "../../../utils/constants.ts";
import { setOrder } from "../../../services/actions/order.ts";
import { AppThunkDispatch, useAppDispatch, useAppSelector } from "../../../hooks/services.ts";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../utils/constants/routes.ts";

export function OrderSum() {
    const { totalPrice, orderLoading, orderError } = useAppSelector(state => state.order);
    const { user } = useAppSelector(state => state.auth);
    const { bun } = useAppSelector(state => state.currentBurger);
    const dispatch = useAppDispatch<AppThunkDispatch>();
    const navigate = useNavigate();

    function placeOrder() {
        if (!user.email) {
            navigate(ROUTES.login);
        } else {
            dispatch(setOrder());
        }
    }

    return (
        <>
            <div className={ `${styles.OrderSum} pt-10`}>
                <p>
                    <span className="text text_type_digits-medium mr-2">{ totalPrice }</span>
                    <CurrencyIcon type="primary"/>
                </p>
                <Button
                    htmlType="button"
                    type="primary"
                    size="medium"
                    disabled={ orderLoading || totalPrice <= 0 || !bun }
                    onClick={placeOrder}
                >
                    { orderLoading ? BUTTON_NAME.loading : BUTTON_NAME.place_order }
                </Button>
            </div>
            { orderError &&
                <p className={`${styles.error} mt-4 text text_type_main-default`}>
                    {ORDER_ERROR_MESSAGE}
                </p>
            }
        </>
    )
}