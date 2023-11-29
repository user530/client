import React from 'react';
import styles from './game-field-cell.module.css';
import { GameTableCol, GameTableRow } from '@user530/ws_game_shared/enums';
import { createGameMakeTurnMessage } from '@user530/ws_game_shared/creators';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks/useStore';
import { sendGameCommand } from '../../../../app/store/reducers/slices/socket-messages.slice';
import { isValidUUID } from '../../../../app/functions/uuid.validate';

interface IGameFieldCell {
    col: GameTableCol;
    row: GameTableRow;
}

export const GameFieldCell: React.FC<IGameFieldCell> = (props: IGameFieldCell) => {
    const { col: column, row } = props;
    const player_id = useAppSelector((state) => state.gameInstance.player_id);
    const game_id = useAppSelector((state) => state.gameInstance.game_id);
    const dispatch = useAppDispatch();

    const cellClickHandler = () => {
        if (!player_id || !game_id || !isValidUUID(player_id) || !isValidUUID(game_id))
            return alert('PROVIDE CORRECT game_id and player_id!');

        const turnMessage = createGameMakeTurnMessage({ row, column, player_id, game_id });

        dispatch(sendGameCommand(turnMessage))

    };

    return (
        <div className={styles.cell} onClick={cellClickHandler}>
            {`${column}-${row}`}
        </div>)
}