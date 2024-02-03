import React, { PropsWithChildren } from 'react';
import styles from './app-page-template.module.css';
import { PopUpWindow } from '../../components/pop-up-windows/pop-up-window';
import { useAppDispatch, useAppSelector } from '../../app/hooks/useStore';
import { setGame } from '../../app/store/reducers/slices/game-data.slice';
import { hubSocketConnection } from '../../app/store/reducers/slices/socket-messages.slice';

export const AppPageTemplate: React.FC<PropsWithChildren> = ({ children }) => {
    const popup = useAppSelector((state) => state.gameData.popupWindow);

    const dispatch = useAppDispatch();

    const closeConnection = () => {
        console.log('CLOSE WS CONNECTION'); //PLACEHOLDER
        dispatch(setGame(null));
        dispatch(hubSocketConnection());
    }

    return <>
        <div className={styles['page-wrapper']}>
            <div className={styles['page-heading']}>
                <h1 className={styles['h1']}>Tic-Tac-Toe Game App</h1>
            </div>
            <div className={styles['page-main']}>
                {children}
            </div>

            {
                popup === 'win'
                    ? <PopUpWindow type='green' message='You won!' cb={closeConnection} />
                    : popup === 'loose'
                        ? <PopUpWindow type='red' message='You lost!' cb={closeConnection} />
                        : popup === 'draw'
                            ? <PopUpWindow type='yellow' message='Game draw!' cb={closeConnection} />
                            : null
            }
        </div>
    </>
}

