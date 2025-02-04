import styles from "./order-sum.module.css";
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { BUTTON_NAME } from "../../../utils/constants.ts";
import { useModalContext } from "../../modal/modal-context/modal-context.tsx";
import { OrderDetails } from "../../modal/order-details/order-details.tsx";

export function OrderSum() {
    const { openModal } = useModalContext();

    return (
        <div className={ `${styles.OrderSum} pt-10`}>
            <p className={styles.price}>
                <span className="text text_type_digits-medium mr-2">{ 610 }</span>
                <CurrencyIcon type="primary"/>
            </p>
            <Button
                htmlType="button"
                type="primary"
                size="medium"
                onClick={() => openModal(<OrderDetails />)}
            >
                { BUTTON_NAME.place_order }
            </Button>
        </div>
    )
}