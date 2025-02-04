import styles from './app-header.module.css';
import type { INavigationItem } from '../../types/navigation.ts';
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavigationItem } from '../navigation-item/navigation-item.tsx';
import { NAVIGATION, ACTIVE_PAGE } from "../../utils/constants.ts";

export function AppHeader () {

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
                                    isActive={el.id === ACTIVE_PAGE}
                                />
                            ))}
                        </ul>
                    ))}
                </nav>
            </div>
        </header>
    )
}

