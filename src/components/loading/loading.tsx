import styles from './loading.module.css';
import { LOADING } from "../../utils/constants.ts";

export function Loading({ text = LOADING.ingredients }: { text?: string }) {
    const classes = `${styles.Loading} text text_type_main-medium`;

    return (
        <div className={classes}>
            { text }
        </div>
    )
}