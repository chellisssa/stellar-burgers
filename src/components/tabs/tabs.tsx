import styles from './tabs.module.css';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { IChoice } from "../../types/common";

interface IProps {
    tabs: IChoice[],
    className?: string,
    activeTab?: string,
    onTabClick: (label: string) => void,
}

export function Tabs({ tabs, className, activeTab, onTabClick }: IProps) {

    return (
        <div className={`${styles.Tabs} ${className}`}>
            { tabs.map((tab: IChoice) => (
                <Tab
                    key={tab.value}
                    value={tab.label as string}
                    active={activeTab === tab.label}
                    onClick={onTabClick}
                >
                    { tab.label }
                </Tab>
            ))}
        </div>
    )
}