import styles from './base-text-link.module.css';
import { Link } from "react-router-dom";

interface IProps {
    text: string;
    linkName: string;
    linkUrl: string;
}

export function BaseTextLink({ text, linkName, linkUrl }: IProps) {
    return (
        <div>
            <span className={styles.text}>{text}</span>
            <Link className={`${styles.link} ml-2`} to={linkUrl}>
                {linkName}
            </Link>
        </div>
    )
}