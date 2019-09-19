import React, {useState} from 'react';
import styles from './Token.module.css';

interface Props {
    token: string;
    onDelete: (token: string) => void;
}

const Token: React.FC<Props> = ({ token, onDelete }) => {
    const [isHover, setIsHover] = useState<boolean>(false);
    return (
        <div
            className={styles.tokenContainer}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <div className={styles.token}>
                { token }
            </div>
            { isHover &&
                <span
                    className={styles.tokenDelete}
                    onClick={() => onDelete(token)}
                >x</span>
            }
        </div>
    );
};

export default Token;