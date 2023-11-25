import { GameTableCol, GameTableRow } from '@user530/ws_game_shared/enums';
import React from 'react';
import { GameFieldCell } from '../components';

interface IGameFieldRow {
    row: GameTableRow;
}

export const GameFieldRow: React.FC<IGameFieldRow> = (props: IGameFieldRow) => {
    const { row } = props;
    return (
        <div className='game-field-row'>
            {
                Object.values(GameTableCol).map(
                    (col) => < GameFieldCell key={row} row={row} col={col} />
                )
            }
        </div>)
}