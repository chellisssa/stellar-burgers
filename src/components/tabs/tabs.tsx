import styles from './tabs.module.css';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { IChoice } from "../../types/common";

interface IProps {
    tabs: IChoice[],
    className?: string,
}

export function Tabs({ tabs, className }: IProps) {
    const [current, setCurrent] = useState<IChoice["value"]>(tabs[0].value);

    return (
        <div className={`${styles.Tabs} ${className}`}>
            { tabs.map((tab: IChoice) => (
                <Tab
                    key={tab.value}
                    value={tab.value}
                    active={current === tab.value}
                    onClick={setCurrent}
                >
                    { tab.label }
                </Tab>
            ))}
        </div>
    )
}