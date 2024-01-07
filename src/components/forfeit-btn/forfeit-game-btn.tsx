import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks/useStore';
import { isValidUUID } from '../../app/functions/uuid.validate';
import { createInstanceForfeitMessage } from '@user530/ws_game_shared/creators/messages';
import { sendSocketCommand } from '../../app/store/reducers/slices/socket-messages.slice';

interface IForfeitGameBtn {

}

export const ForfeitGameBtn: React.FC<IForfeitGameBtn> = (props: IForfeitGameBtn) => {
    const playerId = useAppSelector((state) => state.gameInstance.player?.playerId);
    const gameId = useAppSelector((state) => state.gameInstance.gameId);

    const dispatch = useAppDispatch();

    const forfeitBtnHandler = () => {
        console.log('Forfeit Game Handler fired!')
        if (!playerId || !gameId || !isValidUUID(playerId) || !isValidUUID(gameId))
            return alert('PROVIDE CORRECT gameId and playerId!');

        const forfeitMessage = createInstanceForfeitMessage({ playerId, gameId });

        dispatch(sendSocketCommand(forfeitMessage));
    };

    return (<>
        <button onClick={forfeitBtnHandler}>Forfeit game</button>
    </>)
}