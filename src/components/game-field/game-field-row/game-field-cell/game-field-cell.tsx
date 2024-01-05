import React from 'react';
import styles from './game-field-cell.module.css';
import { GameTableCol, GameTableRow } from '@user530/ws_game_shared/enums';
import { createInstanceMakeTurnMessage } from '@user530/ws_game_shared/creators/messages';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks/useStore';
import { sendGameCommand } from '../../../../app/store/reducers/slices/socket-messages.slice';
import { isValidUUID } from '../../../../app/functions/uuid.validate';

interface IGameFieldCell {
    col: GameTableCol;
    row: GameTableRow;
}

export const GameFieldCell: React.FC<IGameFieldCell> = (props: IGameFieldCell) => {
    const { col: column, row } = props;

    console.log(`GAME FIELD CELL ${row}:${column}`)

    const playerId = useAppSelector((state) => state.gameInstance.player?.playerId);
    const gameId = useAppSelector((state) => state.gameInstance.gameId);
    const gameGrid = useAppSelector((state) => state.gameInstance.gameField[row][column])

    const dispatch = useAppDispatch();

    const cellClickHandler = () => {
        if (!playerId || !gameId || !isValidUUID(playerId) || !isValidUUID(gameId))
            return alert('PROVIDE CORRECT gameId and playerId!');

        const turnMessage = createInstanceMakeTurnMessage({ row, column, playerId, gameId });

        dispatch(sendGameCommand(turnMessage));
    };

    return (
        <div className={styles.cell} onClick={cellClickHandler}>
            {gameGrid}
        </div>)
}