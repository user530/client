import React from 'react';
import styles from './game-hub.module.css';
import { ChatComponent } from '../../components/chat-component/chat.component';
import { HubComponent } from '../../components/hub-component/hub.component';

interface IGameHubPage {

}

export const GameHubPage: React.FC<IGameHubPage> = (props: IGameHubPage) => {


    return <>
        <div className={styles['page-wrapper']}>
            <div className={styles['page-heading']}>
                <h1 className={styles['h1']}>Tic-Tac-Toe Game App</h1>
            </div>
            <div className={styles['page-main']}>
                <div className={styles['page-main__col-1']}>
                    <ChatComponent />
                </div>
                <div className={styles['page-main__col-2']}>
                    <HubComponent />
                </div>
            </div>
        </div>
    </>
};