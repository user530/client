import React from 'react';
import styles from './game-lobby.module.css';
import { AppPageTemplate } from '../app-page-wrapper/app-page-template';
import { ChatComponent } from '../../components/chat-component/chat.component';
import { LobbyComponent } from '../../components/lobby-component/lobby.component';

interface IGameLobbyPage {

}

export const GameLobbyPage: React.FC<IGameLobbyPage> = (props: IGameLobbyPage) => {
    return (
        <>
            <AppPageTemplate>
                <div className={styles['flex-column']}>
                    <div className={styles['row-1']}>
                        <LobbyComponent />
                    </div>

                    <div className={styles['row-2']}>
                        <ChatComponent heading='Lobby chat:' />
                    </div>
                </div>
            </AppPageTemplate>
        </>)
}