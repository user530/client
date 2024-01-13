import React from 'react';
import styles from './game-hub.module.css';
import { LobbyItem } from '../../components/lobby-item/lobby-item';
import { useAppDispatch, useAppSelector } from '../../app/hooks/useStore';
import { sendSocketCommand } from '../../app/store/reducers/slices/socket-messages.slice';
import { createHubHostMessage, createHubJoinMessage, createHubLeaveMessage } from '@user530/ws_game_shared/creators/messages';

interface IGameHubPage {

}

export const GameHubPage: React.FC<IGameHubPage> = (props: IGameHubPage) => {
    const dispatch = useAppDispatch();
    const playerId = useAppSelector((state) => state.gameData.player.playerId)
    const lobbyList = useAppSelector((state) => state.gameData.lobbyList);
    const [selectedLobbyId, setSelectedLobbyId] = React.useState<null | string>(null);

    const lobbyRowClick = (id: string) => {
        setSelectedLobbyId(id);
    };

    const handleQuitHubClick = () => {
        if (!playerId) return;

        dispatch(sendSocketCommand(createHubLeaveMessage()));
    };

    const handleHostGameClick = () => {
        if (!playerId) return;

        dispatch(sendSocketCommand(createHubHostMessage({ playerId })));
    };
    const handleJoinGameClick = () => {
        if (!playerId || !selectedLobbyId) return;

        dispatch(sendSocketCommand(createHubJoinMessage({ playerId, lobbyId: selectedLobbyId })));
    };

    // Clear up selected lobby id if selected game is not open anymore
    React.useEffect(
        () => {
            const gameStillActive = lobbyList.reduce(
                (gameStillActive, lobby) => (gameStillActive || (lobby.gameId === selectedLobbyId)), false);

            if (!gameStillActive)
                setSelectedLobbyId(null);
        },
        [lobbyList]
    )

    return <>
        <div className={styles['hub-wrapper']}>
            <div className={styles['hub-list']}>
                {
                    lobbyList.map(
                        (lobbyData) =>
                        (<LobbyItem
                            key={lobbyData.gameId}
                            onClick={(e) => lobbyRowClick(lobbyData.gameId)}
                            isActive={selectedLobbyId === lobbyData.gameId}
                            {...lobbyData}
                        />))
                }
            </div>

            <div className={styles['hub-controls']}>
                <button onClick={handleQuitHubClick}>Quit</button>
                <button onClick={handleHostGameClick}>Host</button>
                <button onClick={handleJoinGameClick}>Join</button>
            </div>
        </div>
    </>
};