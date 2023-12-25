import React, { MouseEvent } from 'react';
import { useAppDispatch } from '../app/hooks/useStore';
import { setGame, setPlayer } from '../app/store/reducers/slices/game-instance.slice';
import { gameSocketConnection } from '../app/store/reducers/slices/socket-messages.slice';
import { isValidUUID } from '../app/functions/uuid.validate';

export const TestLoginPage: React.FC = () => {
    const dispatch = useAppDispatch();

    const gameRef = React.useRef<HTMLInputElement | null>(null);
    const playerRef = React.useRef<HTMLInputElement | null>(null);

    const handleJoinBtn = (e: MouseEvent) => {
        e.preventDefault();

        const game_id = gameRef.current?.value?.trim();
        const player_id = playerRef.current?.value?.trim();

        console.log('Game: ' + game_id);
        console.log('Player: ' + player_id);

        if (!game_id || !player_id)
            return alert('Enter game and user ID');


        if (!isValidUUID(game_id) || !isValidUUID(player_id))
            return alert('Game and player IDs should be valid UUID');

        dispatch(setGame(game_id));
        dispatch(setPlayer(player_id));

        dispatch(gameSocketConnection());
    }

    return (
        <>
            <form>
                <label>
                    Game ID:
                    <input type="text" ref={gameRef} defaultValue={'394f6fdc-a43f-4ed7-b0fd-90e767ff3f54'}></input>
                </label>

                <label>
                    Player ID:
                    <input type="text" ref={playerRef} defaultValue={'bfb9551f-ee05-4b69-b19c-e471f81f3e4d'}></input>
                    <input type="text" defaultValue={'6a3b895b-da50-422f-9d77-a861aa1c0a59'}></input>
                </label>

                <button onClick={handleJoinBtn}>Join</button>
            </form>
        </>
    )
}