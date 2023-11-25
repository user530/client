import { GameTableRow } from '@user530/ws_game_shared/enums';
import React from 'react';
import { GameFieldRow } from '../components';

interface IGameField {

}

export const GameField: React.FC<IGameField> = (props: IGameField) => {
    return (
        <div className='game-field'>
            {
                Object.values(GameTableRow).map(
                    (row) => <GameFieldRow key={row} row={row} />
                )
            }
        </div>
    )
}