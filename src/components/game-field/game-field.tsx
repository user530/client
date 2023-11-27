import React from 'react';
import styles from './game-field.module.css';
import { GameTableRow } from '@user530/ws_game_shared/enums';
import { GameFieldRow } from './game-field-row/game-field-row';

interface IGameField {
    emitCB: (ev: string, ...args: any[]) => void
}

export const GameField: React.FC<IGameField> = (props: IGameField) => {
    const { emitCB } = props;

    return (
        <div className={styles.field}>
            {
                Object.values(GameTableRow).map(
                    (row) => <GameFieldRow key={row} row={row} emitCB={emitCB} />
                )
            }
        </div>
    )
}