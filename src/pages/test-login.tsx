import React, { MouseEvent } from 'react';
import { useAppDispatch } from '../app/hooks/useStore';
import { setGame, setPlayer } from '../app/store/reducers/slices/game-instance.slice';
import { hubSocketConnection } from '../app/store/reducers/slices/socket-messages.slice';
import { isValidUUID } from '../app/functions/uuid.validate';

export const TestLoginPage: React.FC = () => {
    const dispatch = useAppDispatch();

    const gameRef = React.useRef<HTMLInputElement | null>(null);
    const playerIdRef = React.useRef<HTMLInputElement | null>(null);
    const playerNameRef = React.useRef<HTMLInputElement | null>(null);

    const handleJoinBtn = (e: MouseEvent) => {
        e.preventDefault();

        const gameId = gameRef.current?.value?.trim();
        const playerId = playerIdRef.current?.value?.trim();
        const playerName = playerNameRef.current?.value?.trim();

        console.log('Game: ' + gameId);
        console.log('Player: ' + playerId + playerName);

        if (!gameId || !playerId || !playerName)
            return alert('Enter game and user data');


        if (!isValidUUID(gameId) || !isValidUUID(playerId))
            return alert('Game and player IDs should be valid UUID');

        dispatch(setGame(gameId));
        dispatch(setPlayer({ playerId, playerName }));

        // dispatch(gameSocketConnection());                    DELETE LATER
        dispatch(hubSocketConnection());
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
                    <input type="text" ref={playerIdRef} defaultValue={'bfb9551f-ee05-4b69-b19c-e471f81f3e4d'}></input>
                    <input type="text" defaultValue={'6a3b895b-da50-422f-9d77-a861aa1c0a59'}></input>
                </label>

                <label>
                    Player Name:
                    <input type="text" ref={playerNameRef} defaultValue={'player_1'}></input>
                </label>

                <button onClick={handleJoinBtn}>Join</button>
            </form>
        </>
    )
}