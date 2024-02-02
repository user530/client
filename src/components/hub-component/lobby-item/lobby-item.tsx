import React from 'react';
import styles from './lobby-item.module.css';

interface ILobbyItem {
    onClick?: (...args: any[]) => any;
    className?: string | undefined;
    isActive: boolean;
    gameId: string;
    hostName: string;
}

export const LobbyItem: React.FC<ILobbyItem> = (props: ILobbyItem) => {
    const { className, onClick, gameId, hostName, isActive } = props;

    return <div
        onClick={onClick}
        className={
            (className ? className : '') +
            styles['item'] +
            (isActive ? ` ${styles['item--selected']}` : '')
        }
    >
        <p>{gameId}</p>
        <p>{hostName}</p>
    </div>
}

