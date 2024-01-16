import React from 'react';
import styles from './game-lobby.module.css';
import { useAppSelector } from '../../app/hooks/useStore';

interface IGameLobbyPage {

}

export const GameLobbyPage: React.FC<IGameLobbyPage> = (props: IGameLobbyPage) => {

    const playerId = useAppSelector((state) => state.gameData.player.playerId)!;
    const { gameId, guest, host } = useAppSelector((state) => state.gameData.game)!;

    const [playerRole, setPlayerRole] = React.useState<'host' | 'guest'>(
        playerId === host.hostId
            ? 'host'
            : 'guest');

    const handleLeaveLobbyClick = () => {
        console.log('Handle Leave Lobby Click');
    };

    const handleKickGuestClick = () => {
        console.log('Handle Kick Guest Click');
    };

    const handleStartGameClick = () => {
        console.log('Handle Start Game Click');
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