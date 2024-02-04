import React from 'react';
import styles from './game.module.css';
import { GameField } from './game-field/game-field';
import { ForfeitGameBtn } from './forfeit-btn/forfeit-game-btn';

export const GameComponent: React.FC = () => {
    return <>
        <div className={styles['game-wrapper']}>
            <div className={styles['game-heading']}>
                <h2 className={styles['h2']}>Game Field:</h2>
            </div>
            <div className={styles['game-body']}>
                <GameField />
            </div>
            <div className={styles['game-controls']}>
                <ForfeitGameBtn />
            </div>
        </div>
    </>
}