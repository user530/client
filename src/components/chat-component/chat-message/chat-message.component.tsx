import React from 'react';
import styles from './chat-message.module.css';
import { ChatEventNewMsgData } from '@user530/ws_game_shared/interfaces/ws-events';

interface IChatMessage extends ChatEventNewMsgData { }

export const ChatMessage: React.FC<IChatMessage> = ({ timestamp, user, message, isWhisper }: IChatMessage) => {
    return <>
        <div className={`${styles['chat-msg']} ${isWhisper ? styles['chat-msg--whisper'] : ''}`}>
            <span className={styles['chat-msg__timestamp']}>{`[${timestamp[0]} : ${timestamp[1]}]`}</span>
            <p className={styles['chat-msg__user']}>{`[${user}]`}</p>
            <p className={styles['chat-msg__text']}>{message}</p>
        </div>
    </>
}