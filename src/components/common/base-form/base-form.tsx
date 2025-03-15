import React, { SyntheticEvent } from "react";
import styles from './base-form.module.css';
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

interface IProps {
    title: string;
    inputChildren: React.ReactNode;
    buttonName: string;
    linkChildren?: React.ReactNode;
    onSubmit: (e: SyntheticEvent<Element, Event>) => void;
    isLoading?: boolean;
    isDisabled?: boolean;
}

export function BaseForm({ title, inputChildren, buttonName, linkChildren, onSubmit, isLoading, isDisabled }: IProps) {
    return (
        <div className={styles.BaseForm}>
            {
                title &&
                <h2 className="text text_type_main-medium">
                    {title}
                </h2>
            }

            {
                inputChildren &&
                <form className={`${styles.form} mt-6`} onSubmit={onSubmit}>
                    {inputChildren}
                    {
                        buttonName &&
                        <Button
                            htmlType="submit"
                            type="primary"
                            size="medium"
                            disabled={isDisabled || isLoading}
                            extraClass={styles.button}
                        >
                            { isLoading ? 'Отправка...' : buttonName }
                        </Button>
                    }
                </form>
            }

            {
                linkChildren &&
                <div className={`${styles.links} mt-20`}>
                    {linkChildren}
                </div>
            }
        </div>
    )
}