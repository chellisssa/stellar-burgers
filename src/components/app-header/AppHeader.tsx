import styles from './app-header.module.css';
import type { INavigationItem } from '../../types/navigation.ts';
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavigationItem } from '../navigation-item/navigation-item.tsx';
import { NAVIGATION } from "../../utils/constants.ts";
import { useLocation } from "react-router-dom";

export function AppHeader () {
    const location = useLocation();

    return (
        <header className={`${styles.header} pt-4 pb-4`}>
            <div className="container">
                <Logo className={styles.logo} />
                <nav className={styles.navigation}>
                    { NAVIGATION.map((group: INavigationItem[], index: number) => (
                        <ul
                            key={`nav-${index}`}
                            className={styles.navigationList}
                        >
                            { group.map((el: INavigationItem) => (
                                <NavigationItem
                                    key={el.id}
                                    name={el.name}
                                    icon={el.icon}
                                    isActive={el.link === location.pathname}
                                    link={el.link}
                                />
                            ))}
                        </ul>
                    ))}
                </nav>
            </div>
        </header>
    )
}

