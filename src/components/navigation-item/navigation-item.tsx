import styles from './navigation-item.module.css';
import { INavigationItem } from "../../types/navigation";

interface IProps {
    name: INavigationItem["name"];
    icon: INavigationItem["icon"];
    isActive?: boolean;
}

export function NavigationItem({ icon: Icon, name, isActive }: IProps) {
    const Tag = isActive ? 'div' : 'a';

    return (
        <li className={`${styles.navigationItem} ${isActive ? styles._active : ''} text text_type_main-default`}>
            <Tag className={ `${styles.link} pt-4 pb-4 pr-5 pl-5` } href="#">
                {Icon && <Icon type={isActive ? 'primary' : 'secondary'} />}
                <p className="ml-2">{name}</p>
            </Tag>
        </li>
    )
}