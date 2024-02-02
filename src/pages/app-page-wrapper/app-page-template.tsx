import React, { PropsWithChildren } from 'react';
import styles from './app-page-template.module.css';

export const AppPageTemplate: React.FC<PropsWithChildren> = ({ children }) => {
    return <>
        <div className={styles['page-wrapper']}>
            <div className={styles['page-heading']}>
                <h1 className={styles['h1']}>Tic-Tac-Toe Game App</h1>
            </div>
            <div className={styles['page-main']}>
                {children}
            </div>
        </div>
    </>
}

