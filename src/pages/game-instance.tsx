import React from 'react';
import { GameField } from '../components/game-field/game-field';
import { ForfeitGameBtn } from '../components/forfeit-btn/forfeit-game-btn';

interface IGameInstancePage {
}


export const GameInstancePage: React.FC<IGameInstancePage> = (props: IGameInstancePage) => {

    return <>
        <GameField />
        <ForfeitGameBtn />
    </>
} 