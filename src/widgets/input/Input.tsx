import React from 'react';
import styles from './Input.module.css';

export interface Props {
    className?: string;
    value: any;
    onChange: (val: any) => void;
}

const Input: React.FC<Props> = ({ className, value, onChange }) => (
    <input 
        className={`${styles.input} ${className}`}
        type="text" 
        value={value} 
        onChange={(e) => onChange(e.target.value)} />
);

export default Input;