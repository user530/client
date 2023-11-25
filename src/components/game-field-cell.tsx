import { GameTableCol, GameTableRow } from '@user530/ws_game_shared/enums';
import React from 'react';

interface IGameFieldCell {
    col: GameTableCol;
    row: GameTableRow;
}

export const GameFieldCell: React.FC<IGameFieldCell> = (props: IGameFieldCell) => {
    const { col, row } = props;
    return <div className='game-field-cell'>{`${col}-${row}`}</div>
}