import styles from './navigation-item.module.css';
import { INavigationItem } from "../../types/navigation";
import { Link } from "react-router-dom";

interface IProps {
    name: INavigationItem["name"];
    icon: INavigationItem["icon"];
    isActive?: boolean;
    link: string;
}

export function NavigationItem({ icon: Icon, name, isActive, link }: IProps) {
    const Tag = isActive ? 'div' : Link;

    return (
        <li className={`${styles.navigationItem} ${isActive ? styles._active : ''} text text_type_main-default`}>
            <Tag className={ `${styles.link} pt-4 pb-4 pr-5 pl-5` } to={link}>
                {Icon && <Icon type={isActive ? 'primary' : 'secondary'} />}
                <p className="ml-2">{name}</p>
            </Tag>
        </li>
    )
}