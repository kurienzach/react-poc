import React from 'react';
import styles from './SageBar.module.css';
import Card from '../../widgets/card/Card';
import Token from './Token';

interface Props {
    tokens: string[];
    onTokenDelete: (token: string) => void;
}

const DataSources: React.FC<Props> = ({ tokens, onTokenDelete}) => {
    return (
        <Card className={styles.sageBar}>
            { tokens.map(token => 
                <Token key={token} token={token} onDelete={(token) => onTokenDelete(token)}/>
            )}
        </Card>
    );
};

export default DataSources