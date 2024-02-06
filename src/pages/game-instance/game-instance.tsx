import React from 'react';
import styles from './game-instance.module.css';
import { AppPageTemplate } from '../app-page-wrapper/app-page-template';
import { ChatComponent } from '../../components/chat-component/chat.component';
import { GameComponent } from '../../components/game-component/game.component';

interface IGameInstancePage {
}


export const GameInstancePage: React.FC<IGameInstancePage> = (props: IGameInstancePage) => {

    return <>
        <AppPageTemplate>
            <div className={styles['flex-column']}>
                <div className={styles['row-1']}>
                    <GameComponent />
                </div>

                <div className={styles['row-2']}>
                    <ChatComponent heading='Game chat:' />
                </div>
            </div>
        </AppPageTemplate>
    </>
} 