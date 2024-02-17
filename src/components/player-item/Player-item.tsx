import React from 'react';
import styles from './Player-item.module.css';

interface IPlayerItem {
    index: number;
    playerName: string;
    isSelected: boolean;
    clickHandler: (...args: any[]) => void;
}

export const PlayerItem: React.FC<IPlayerItem> = (props: IPlayerItem) => {
    const { index, playerName, isSelected, clickHandler } = props;

    return (
        <div
            className={
                styles['player-item']
                + (isSelected ? ` ${styles['player-item--selected']}` : '')
            }
            onClick={clickHandler}
        >
            <span className={styles['player-item__index']}>{index}</span>
            <span className={styles['player-item__name']}>{playerName}</span>
        </div>
    )
}