import React from 'react';
import styles from './game-lobby.module.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks/useStore';
import { sendSocketCommand } from '../../app/store/reducers/slices/socket-messages.slice';
import { createLobbyKickMessage, createLobbyLeaveMessage, createLobbyStartMessage } from '@user530/ws_game_shared/creators/messages';

interface IGameLobbyPage {

}

export const GameLobbyPage: React.FC<IGameLobbyPage> = (props: IGameLobbyPage) => {

    const playerId = useAppSelector((state) => state.gameData.player!.playerId)!;
    const { gameId, guest, host } = useAppSelector((state) => state.gameData.game)!;
    const dispatch = useAppDispatch();

    const [playerRole] = React.useState<'host' | 'guest'>(
        playerId === host.hostId
            ? 'host'
            : 'guest');

    const handleLeaveLobbyClick = () => {
        console.log('Handle Leave Lobby Click');

        dispatch(sendSocketCommand(createLobbyLeaveMessage({ playerId, gameId })))
    };

    const handleKickGuestClick = () => {
        console.log('Handle Kick Guest Click');
        console.log(playerRole)
        console.log(guest)
        if (playerRole === 'guest' || !guest) return;
        dispatch(sendSocketCommand(createLobbyKickMessage({ gameId, playerId })));
    };

    const handleStartGameClick = () => {
        console.log('Handle Start Game Click');
        console.log(playerRole)
        console.log(guest)

        if (playerRole === 'guest' || !guest) return;
        dispatch(sendSocketCommand(createLobbyStartMessage({ gameId, playerId: host.hostId })));
    };

    return (
        <>
            <div className={styles["lobby-wrapper"]}>
                <div className={styles["lobby-header"]}>
                    <h3>Game#: {gameId}</h3>
                </div>
                <div className={styles["lobby-body"]}>
                    <div className={styles["column"]}>
                        <p>{host.hostName}</p>
                        <p className={styles['big-text']}>X</p>
                    </div>
                    <div className={styles["column"]}>
                        <p>{guest ? guest.guestName : '...'}</p>
                        <p className={styles['big-text']}>O</p>
                    </div>
                </div>
                <div className={styles["lobby-controls"]}>
                    <button onClick={handleLeaveLobbyClick}>Leave</button>

                    {
                        playerRole === 'host'
                            ? <>
                                <button onClick={handleKickGuestClick}>Kick</button>
                                <button onClick={handleStartGameClick}>Start</button>
                            </>
                            : null
                    }

                </div>
            </div>
        </>)
}