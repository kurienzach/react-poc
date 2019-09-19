import React from 'react';
import styles from './Card.module.css';

interface Props {
    children?: any;
    className: string;
}

const Card: React.FC<Props> = ({ children, className }) => {
    const cardStyles = `${styles.card} ${className}`;
    return (
        <div className={cardStyles}>
            { children }
        </div>
    );
}

export default Card;