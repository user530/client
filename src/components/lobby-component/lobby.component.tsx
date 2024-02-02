import React from 'react';
import styles from './lobby.module.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks/useStore';
import { sendSocketCommand } from '../../app/store/reducers/slices/socket-messages.slice';
import { createLobbyKickMessage, createLobbyLeaveMessage, createLobbyStartMessage } from '@user530/ws_game_shared/creators/messages';

interface ILobbyComponent { }

export const LobbyComponent: React.FC<ILobbyComponent> = () => {

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

    return <>
        <div className={styles['lobby-wrapper']}>
            <div className={styles['lobby-heading']}>
                <h2 className={styles['h2']}>Game#: {gameId}</h2>
            </div>
            <div className={styles['lobby-body']}>
                <div className={styles['column']}>
                    <p className={styles['player-name']}>{host.hostName}</p>
                    <p className={styles['player-role']}>X</p>
                </div>
                <div className={styles['column']}>
                    <p className={styles['player-name']}>{guest ? guest.guestName : '...'}</p>
                    <p className={styles['player-role']}>O</p>
                </div>
            </div>
            <div className={styles['lobby-controls']}>
                <button className={styles['lobby-controls__btn']} onClick={handleLeaveLobbyClick}>Leave</button>

                {
                    playerRole === 'host'
                        ? <>
                            <button className={styles['lobby-controls__btn']} onClick={handleKickGuestClick}>Kick</button>
                            <button className={styles['lobby-controls__btn']} onClick={handleStartGameClick}>Start</button>
                        </>
                        : null
                }

            </div>
        </div>
    </>
};