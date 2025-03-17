import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import type { Identifier, XYCoord } from 'dnd-core';
import styles from './constructor-item.module.css';
import { deleteIngredient, UPDATE_FILLINGS } from "../../../services/actions/current-burger.ts";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragTypeEnum } from "../../../types/ingredient.ts";
import { AppThunkDispatch, useAppDispatch, useAppSelector } from "../../../hooks/services.ts";

interface IProps {
    id?: string;
    type?: 'top' | 'bottom';
    name: string;
    image: string;
    price: number;
    isLocked?: boolean;
    isActive?: boolean;
    index?: number;
    moveCard?: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
    index: number
    id: string
    type: string
}

export function ConstructorItem({id, type, name, image, price, isLocked, isActive, index, moveCard}: IProps) {
    const initialCardsRef = useRef<string[]>([]);
    const { filling } = useAppSelector(state => state.currentBurger);
    const dispatch = useAppDispatch<AppThunkDispatch>();
    const ref = useRef<HTMLDivElement | null>(null);

    const [{opacity}, drag] = useDrag({
        type: DragTypeEnum.Filling,
        item: () => {
            initialCardsRef.current = [...filling];
            return { id, index };
        },
        canDrag: !isLocked,
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0 : 1,
        }),
        end: (_, monitor) => {
            const didDrop = monitor.didDrop()
            if (!didDrop) {
                dispatch({ type: UPDATE_FILLINGS, payload: initialCardsRef.current});
            }
        },
    });

    const [, drop] = useDrop<
        DragItem,
        void,
        { handlerId: Identifier | null }
    >({
        accept: DragTypeEnum.Filling,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: DragItem, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex: number = item.index;
            const hoverIndex: number = Number(index);

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            if (typeof moveCard === 'function') {
                moveCard(dragIndex, hoverIndex);
            }
            if (hoverIndex != null) {
                item.index = hoverIndex;
            }
        },
    })

    drag(drop(ref));


    return (
        <div
            ref={ref}
            style={{ opacity }}
            className={ `${styles.ConstructorItem}  ${isActive ? styles['_active'] : ''} ${!isLocked ? styles['_draggable'] : ''} pl-8` }
        >
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
                extraClass="element"
                handleClose={() => dispatch(deleteIngredient(id as string))}
            />
        </div>
    )
}