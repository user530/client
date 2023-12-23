import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks/useStore';
import { isValidUUID } from '../../app/functions/uuid.validate';
import { createGameForfeitMessage } from '@user530/ws_game_shared/creators/messages';
import { sendGameCommand } from '../../app/store/reducers/slices/socket-messages.slice';

interface IForfeitGameBtn {

}

export const ForfeitGameBtn: React.FC<IForfeitGameBtn> = (props: IForfeitGameBtn) => {
    const player_id = useAppSelector((state) => state.gameInstance.player_id);
    const game_id = useAppSelector((state) => state.gameInstance.game_id);

    const dispatch = useAppDispatch();

    const forfeitBtnHandler = () => {
        console.log('Forfeit Game Handler fired!')
        if (!player_id || !game_id || !isValidUUID(player_id) || !isValidUUID(game_id))
            return alert('PROVIDE CORRECT game_id and player_id!');

        const forfeitMessage = createGameForfeitMessage({ player_id, game_id });

        dispatch(sendGameCommand(forfeitMessage));
    };

    return (<>
        <button onClick={forfeitBtnHandler}>Forfeit game</button>
    </>)
}