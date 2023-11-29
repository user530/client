import React from 'react';
import styles from './game-field-row.module.css';
import { GameTableCol, GameTableRow } from '@user530/ws_game_shared/enums';
import { GameFieldCell } from './game-field-cell/game-field-cell';

interface IGameFieldRow {
    row: GameTableRow;
}

export const GameFieldRow: React.FC<IGameFieldRow> = (props: IGameFieldRow) => {
    const { row } = props;
    return (
        <div className={styles.row}>
            {
                Object.values(GameTableCol).map(
                    (col) => < GameFieldCell key={`${row},${col}`} row={row} col={col} />
                )
            }
        </div>)
}