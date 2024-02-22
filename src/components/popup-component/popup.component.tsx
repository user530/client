import React from 'react';
import { PopUpWindow } from './popup-window/popup-window';
import { useAppDispatch, useAppSelector } from '../../app/hooks/useStore';
import { resetMessages, setGame } from '../../app/store/reducers/slices/game-data.slice';
import { hubSocketConnection } from '../../app/store/reducers/slices/socket-messages.slice';

export const PopupComponent: React.FC = () => {
    const popup = useAppSelector((state) => state.gameData.popupWindow);

    const dispatch = useAppDispatch();

    const closeConnection = () => {
        dispatch(setGame(null));
        dispatch(resetMessages());
        dispatch(hubSocketConnection());
    }

    return <>

        {
            // Error pop-up
            popup && popup.type === 'Error'
                ? <PopUpWindow heading={popup.heading} message={popup.message} colorSchema='error' />
                : null
        }

        {
            // Win result pop-up
            (popup && popup.type === 'GameResult' && popup.result === 'Win')
                ? <PopUpWindow heading={popup.heading} message={popup.message} colorSchema='success' cb={closeConnection} />
                : null
        }

        {
            // Lose result pop-up
            (popup && popup.type === 'GameResult' && popup.result === 'Lose')
                ? <PopUpWindow heading={popup.heading} message={popup.message} colorSchema='fail' cb={closeConnection} />
                : null
        }

        {
            // Draw result pop-up
            (popup && popup.type === 'GameResult' && popup.result === 'Draw')
                ? <PopUpWindow heading={popup.heading} message={popup.message} colorSchema='neutral' cb={closeConnection} />
                : null
        }
    </>
}