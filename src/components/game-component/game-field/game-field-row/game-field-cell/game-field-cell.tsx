import React from 'react';
import styles from './game-field-cell.module.css';
import { GameTableCol, GameTableRow } from '@user530/ws_game_shared/enums';
import { createInstanceMakeTurnMessage } from '@user530/ws_game_shared/creators/messages';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks/useStore';
import { isValidUUID } from '../../../../../app/functions/uuid.validate';
import { sendSocketCommand } from '../../../../../app/store/reducers/slices/socket-messages.slice';

interface IGameFieldCell {
    col: GameTableCol;
    row: GameTableRow;
}

export const GameFieldCell: React.FC<IGameFieldCell> = (props: IGameFieldCell) => {
    const { col: column, row } = props;

    const playerId = useAppSelector((state) => state.gameData.player?.playerId);
    const gameId = useAppSelector((state) => state.gameData.game?.gameId);
    const cellMark = useAppSelector((state) => state.gameData.gameField[row][column])

    const dispatch = useAppDispatch();

    const cellClickHandler = () => {
        if (!playerId || !gameId || !isValidUUID(playerId) || !isValidUUID(gameId))
            return alert('PROVIDE CORRECT gameId and playerId!');

        const turnMessage = createInstanceMakeTurnMessage({ row, column, playerId, gameId });

        dispatch(sendSocketCommand(turnMessage));
    };

    return (
        <div
            className={`${styles['cell']} ${cellMark === 'X' ? styles['cell--cross'] : styles['cell--nought']}`}
            onClick={cellClickHandler}>
            {cellMark}
        </div>)
}