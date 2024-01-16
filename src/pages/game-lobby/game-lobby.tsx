import React from 'react';
import styles from './game-lobby.module.css';

interface IGameLobbyPage {

}

export const GameLobbyPage: React.FC<IGameLobbyPage> = (props: IGameLobbyPage) => {

    const [playerRole, setPlayerRole] = React.useState<'host' | 'guest'>('host');

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
                    <h3>GAME ID</h3>
                </div>
                <div className={styles["lobby-body"]}>
                    <div className={styles["column"]}>
                        <p>Host name</p>
                        <p>X</p>
                    </div>
                    <div className={styles["column"]}>
                        <p>Guest name</p>
                        <p>O</p>
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