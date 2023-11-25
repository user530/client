import React from 'react';
import { GameField } from '../components/game-field';

interface IGameInstanceComponent {

}


export const GameInstanceComponent: React.FC<IGameInstanceComponent> = (props: IGameInstanceComponent) => {
    return <>
        <GameField />
    </>
} 