import styles from './not-found.module.css';
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/constants/routes.ts";

export function NotFoundPage() {
    return (
        <section className={styles.NotFound}>
            <div className={`${styles.figure} mb-10`}>404</div>
            <p className="text text_type_main-medium mb-5">
                Страница исчезла в черной дыре
            </p>
            <p className="text text_type_main-default mb-10">
                Мы не знаем, вернётся ли она, но точно знаем, что вкусный бургер спасёт ситуацию.
            </p>

            <Link to={ROUTES.base}>
                <Button
                    htmlType="button"
                    size="medium"
                >
                    Собрать бургер
                </Button>
            </Link>
        </section>
    )
}




