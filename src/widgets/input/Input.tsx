import React from 'react';
import styles from './Input.module.css';
import { placeholder } from '@babel/types';

export interface Props {
    className?: string;
    value: any;
    placeholder?: string;
    onChange: (val: any) => void;
}

const Input: React.FC<Props> = ({ className, value, placeholder, onChange }) => (
    <input
        className={`${styles.input} ${className}`}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)} />
);

export default Input;