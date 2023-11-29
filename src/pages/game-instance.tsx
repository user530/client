import React from 'react';
import { GameField } from '../components/game-field/game-field';

interface IGameInstancePage {
}


export const GameInstancePage: React.FC<IGameInstancePage> = (props: IGameInstancePage) => {

    return <>
        <GameField />
    </>
} 