import React from 'react';
import styles from './game-hub.module.css';
import { AppPageTemplate } from '../app-page-wrapper/app-page-template';
import { ChatComponent } from '../../components/chat-component/chat.component';
import { HubComponent } from '../../components/hub-component/hub.component';

export const GameHubPage: React.FC = () => {

    return <>
        <AppPageTemplate>
            <div className={styles['flex']}>
                <div className={styles['column-main']}>
                    <ChatComponent />
                </div>

                <div className={styles['column-sub']}>
                    <HubComponent />
                </div>
            </div>
        </AppPageTemplate>
    </>
};