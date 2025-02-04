import styles from './loading.module.css';

export function Loading() {
    const classes = `${styles.Loading} text text_type_main-medium`;

    return (
        <div className={classes}>
            Сканируем космическую кладовую... Ингредиенты телепортируются!
        </div>
    )
}