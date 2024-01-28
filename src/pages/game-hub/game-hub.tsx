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
    const playerId = useAppSelector((state) => state.gameData.player!.playerId)
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

        dispatch(sendSocketCommand(createHubJoinMessage({ playerId, gameId: selectedLobbyId })));
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
        <div className={styles['page-wrapper']}>
            <div className={styles['page-heading']}>
                <h2>Tic-Tac-Toe Game App</h2>
                <input type="button" value="Leave Hub" />
            </div>
            <div className={styles['page-body']}>
                <div className={styles['chat-wrapper']}>
                    <div className={styles['chat-heading']}>
                        <h3>General Chat:</h3>
                    </div>
                    <div className={styles['chat-main']}>
                        <div className={styles['chat-msg']}>
                            <p>[11:11:11]</p>
                            <p>[User1]</p>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste repudiandae beatae animi illum, tempore possimus ab in suscipit quas minima, sapiente provident aperiam odio doloremque libero maxime facilis ad obcaecati?</p>
                        </div>
                        <div className={styles['chat-msg']}>
                            <p>[11:11:11]</p>
                            <p>[User1]</p>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste repudiandae beatae animi illum, tempore possimus ab in suscipit quas minima, sapiente provident aperiam odio doloremque libero maxime facilis ad obcaecati?</p>
                        </div>
                        <div className={styles['chat-msg']}>
                            <p>[11:11:11]</p>
                            <p>[User1]</p>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste repudiandae beatae animi illum, tempore possimus ab in suscipit quas minima, sapiente provident aperiam odio doloremque libero maxime facilis ad obcaecati?</p>
                        </div>
                    </div>
                    <div className={styles['chat-controls']}>
                        <input type="text" />
                        <input type="button" value="Send" />
                    </div>
                </div>
                <div className={styles['hub-wrapper']}>
                    <div className={styles['hub-heading']}>
                        <h3>Open lobbies:</h3>
                    </div>
                    <div className={styles['hub-main']}>
                        <div className={styles['lobby-item']}>
                            <p>№</p>
                            <p>Host name</p>
                        </div>
                    </div>
                    <div className={styles['hub-controls']}>
                        <input type="text" value="Host game" />
                        <input type="text" value="Join game" />
                    </div>
                </div>
            </div>

        </div>
        {/* <div className={styles['hub-wrapper']}>
            <div className={styles['hub-list']}>
                {
                    lobbyList.map(
                        ({ gameId, host: { hostName } }) =>
                        (<LobbyItem
                            key={gameId}
                            onClick={(e) => lobbyRowClick(gameId)}
                            isActive={selectedLobbyId === gameId}
                            gameId={gameId}
                            hostName={hostName}
                        />))
                }
            </div>

            <div className={styles['hub-controls']}>
                <button onClick={handleQuitHubClick}>Quit</button>
                <button onClick={handleHostGameClick}>Host</button>
                <button onClick={handleJoinGameClick}>Join</button>
            </div>
        </div> */}
    </>
};