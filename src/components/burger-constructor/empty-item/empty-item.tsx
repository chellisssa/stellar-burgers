import styles from './empty-item.module.css';

interface Props {
    title: string;
    type?: 'top' | 'middle' | 'bottom';
    isActive: boolean;
}

export function EmptyItem({ title, type = 'middle', isActive }: Props) {
    return (
        <div className={`${styles.EmptyItem} ${styles['_' + type]} ${isActive ? styles['_active'] : ''} ml-8`}>
            <p className="text text_type_main-default">{ title }</p>
        </div>
    )
}