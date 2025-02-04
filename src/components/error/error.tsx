import styles from './error.module.css';
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback } from "react";

export function Error() {

    const handleReload = useCallback(()=> {
        window.location.reload();
    }, []);

    return (
        <div className={styles.Error}>
            <p className={`${styles.text} text text_type_main-medium mb-15`}>
                Houston, у нас проблемы! Бургер потерялся в космосе. <br />Попробуем снова?
            </p>
            <Button htmlType="button" onClick={handleReload}>Перезагрузить страницу</Button>
        </div>
    )
}