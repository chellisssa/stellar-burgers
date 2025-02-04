import styles from './modal-overlay.module.css';

interface IProps {
    onClick: () => void;
}

export function ModalOverlay({ onClick }: IProps) {
    return (
        <div className={ styles.ModalOverlay } onClick={onClick}></div>
    )
}