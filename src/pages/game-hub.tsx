import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks/useStore';
import { sendSocketCommand } from '../app/store/reducers/slices/socket-messages.slice';
import { createHubHostMessage, createHubJoinMessage, createHubLeaveMessage } from '@user530/ws_game_shared/creators/messages';

interface IGameHubPage {

}

export const GameHubPage: React.FC<IGameHubPage> = (props: IGameHubPage) => {
    const dispatch = useAppDispatch();
    const playerId = useAppSelector((state) => state.gameData.player)?.playerId;
    const lobbyList = useAppSelector((state) => state.gameData.lobbyList);

    let selectedLobbyId: null | string = null;

    const setSelectedLobby = (id: string) => {
        selectedLobbyId = id;
        console.log('Lobby selected: ', selectedLobbyId)
    };

    const handleQuitHubClick = () => {
        console.log('Quit btn clicked!');
        if (!playerId) return;
        dispatch(sendSocketCommand(createHubLeaveMessage()));
    };

    const handleHostGameClick = () => {
        console.log('Host Game btn clicked!');
        if (!playerId) return;
        dispatch(sendSocketCommand(createHubHostMessage({ playerId })));
    };
    const handleJoinGameClick = () => {
        console.log('Join Game btn clicked!');
        if (!playerId || !selectedLobbyId) return;
        dispatch(sendSocketCommand(createHubJoinMessage({ playerId, lobbyId: '' + selectedLobbyId })));
    };

    return <>
        <div style={{ minWidth: 600, minHeight: 350, backgroundColor: 'gray', padding: 50 }}>
            <div className="lobby-list" style={{ minWidth: 300, minHeight: 200, backgroundColor: 'white' }} >
                {
                    lobbyList.map(
                        ({ gameId, hostName }) => (
                            <div
                                key={gameId}
                                style={{ display: 'flex' }}
                                onClick={(e) => setSelectedLobby(gameId)}>
                                <p>{gameId}</p>
                                <p>{hostName}</p>
                            </div>
                        )
                    )
                }
            </div>

            <div className='hub-controls'>
                <button onClick={handleQuitHubClick}>Quit</button>
                <button onClick={handleHostGameClick}>Host</button>
                <button onClick={handleJoinGameClick}>Join</button>
            </div>
        </div>
    </>
};