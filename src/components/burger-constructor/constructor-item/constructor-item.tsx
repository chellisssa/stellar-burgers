import styles from './constructor-item.module.css';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface IProps {
    type?: 'top' | 'bottom';
    name: string;
    image: string;
    price: number;
    isLocked?: boolean;
}

export function ConstructorItem({type, name, image, price, isLocked}: IProps) {
    return (
        <div className={ `${styles.ConstructorItem} pl-8` }>
            {
                !isLocked &&
                <DragIcon type="primary" className={styles.icon} />
            }
            <ConstructorElement
                type={type}
                text={name}
                thumbnail={image}
                price={price}
                isLocked={isLocked}
            />
        </div>
    )
}