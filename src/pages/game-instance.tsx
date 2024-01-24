import React from 'react';
import { GameField } from '../components/game-field/game-field';
import { ForfeitGameBtn } from '../components/forfeit-btn/forfeit-game-btn';
import { useAppDispatch, useAppSelector } from '../app/hooks/useStore';
import { PopUpWindow } from '../components/pop-up-windows/pop-up-window';
import { setGame } from '../app/store/reducers/slices/game-data.slice';
import { hubSocketConnection } from '../app/store/reducers/slices/socket-messages.slice';

interface IGameInstancePage {
}


export const GameInstancePage: React.FC<IGameInstancePage> = (props: IGameInstancePage) => {
    const popup = useAppSelector((state) => state.gameData.popupWindow);

    const dispatch = useAppDispatch();

    const closeConnection = () => {
        console.log('CLOSE WS CONNECTION'); //PLACEHOLDER
        dispatch(setGame(null));
        dispatch(hubSocketConnection());
    }

    return <>
        <GameField />
        <ForfeitGameBtn />
        {
            popup === 'win'
                ? <PopUpWindow type='green' message='You won!' cb={closeConnection} />
                : popup === 'loose'
                    ? <PopUpWindow type='red' message='You lost!' cb={closeConnection} />
                    : popup === 'draw'
                        ? <PopUpWindow type='yellow' message='Game draw!' cb={closeConnection} />
                        : null
        }
    </>
} 