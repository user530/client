import React from 'react';
import styles from './lobby-item.module.css';

interface ILobbyItem {
    onClick?: (...args: any[]) => any;
    className?: string | undefined;
    isActive: boolean;
    itemInd: string;
    hostName: string;
}

export const LobbyItem: React.FC<ILobbyItem> = (props: ILobbyItem) => {
    const { className, onClick, itemInd, hostName, isActive } = props;

    return <div
        onClick={onClick}
        className={
            (className ? className : '') +
            styles['item'] +
            (isActive ? ` ${styles['item--selected']}` : '')
        }
    >
        <p className={styles['item__index']}>{itemInd}</p>
        <p className={styles['item__name']}>{hostName}</p>
    </div>
}

