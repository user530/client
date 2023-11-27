import React from 'react';
import { GameField } from '../components/game-field/game-field';

interface IGameInstancePage {
    emitCB: (ev: string, ...args: any[]) => void
}


export const GameInstancePage: React.FC<IGameInstancePage> = (props: IGameInstancePage) => {
    const { emitCB } = props;

    return <>
        <GameField emitCB={emitCB} />
    </>
} 