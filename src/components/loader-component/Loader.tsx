import React from 'react';
import styles from './Loader.module.css';

export const Loader: React.FC = () => {
    return <span className={styles['loading']}></span>
}