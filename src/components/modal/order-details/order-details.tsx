import styles from './order-details.module.css';
import doneImg from '../../../images/done.png';
import { ORDER_DETAILS } from "../../../utils/constants.ts";
import { useAppSelector } from "../../../hooks/services.ts";

export function OrderDetails() {
    const { orderCode } = useAppSelector(state => state.order);
    return (
        <div className={`${styles.OrderDetails} pb-15`}>
            {orderCode &&
                <p className={`${styles.number} mt-4 text text_type_digits-large`}>
                    {orderCode}
                </p>
            }
            <p className="mt-8 text text_type_main-medium">{ORDER_DETAILS.label}</p>
            <img
                className={`${styles.image} mt-15`}
                src={doneImg}
            />
            <p className="mt-15 text text_type_main-small">{ORDER_DETAILS.preparationLabel}</p>
            <p className="mt-2 text text_type_main-small text_color_inactive">{ORDER_DETAILS.waitLabel}</p>
        </div>
    )
}