import React from 'react';
import styles from './game.module.css';
import { GameField } from './game-field/game-field';
import { ForfeitGameBtn } from './forfeit-btn/forfeit-game-btn';
import { useAppDispatch, useAppSelector } from '../../app/hooks/useStore';
import { setGame } from '../../app/store/reducers/slices/game-data.slice';
import { hubSocketConnection } from '../../app/store/reducers/slices/socket-messages.slice';

export const GameComponent: React.FC = () => {
    const popup = useAppSelector((state) => state.gameData.popupWindow);

    const dispatch = useAppDispatch();

    const closeConnection = () => {
        console.log('CLOSE WS CONNECTION'); //PLACEHOLDER
        dispatch(setGame(null));
        dispatch(hubSocketConnection());
    }

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

        {/* 
        {
            popup === 'win'
                ? <PopUpWindow type='green' message='You won!' cb={closeConnection} />
                : popup === 'loose'
                    ? <PopUpWindow type='red' message='You lost!' cb={closeConnection} />
                    : popup === 'draw'
                        ? <PopUpWindow type='yellow' message='Game draw!' cb={closeConnection} />
                        : null
        } */}
    </>
}