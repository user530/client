import React from 'react';
import styles from './game-field.module.css';
import { GameTableRow } from '@user530/ws_game_shared/enums';
import { GameFieldRow } from './game-field-row/game-field-row';
import { useDispatch, useSelector } from 'react-redux';
import { } from '../../'

interface IGameField {

}

export const GameField: React.FC<IGameField> = (props: IGameField) => {

    return (
        <div className={styles.field}>
            {
                Object.values(GameTableRow).map(
                    (row) => <GameFieldRow key={row} row={row} />
                )
            }
        </div>
    )
}