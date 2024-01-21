import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    HubCommandHostGame,
    HubCommandJoinGame,
    HubCommandLeaveHub,
    LobbyCommandLeaveLobby,
    LobbyCommandKickGuest,
    LobbyCommandStartGame,
    GameCommandForfeit,
    GameCommandMakeTurn,
} from '@user530/ws_game_shared/interfaces/ws-messages';


const initialState = {};

const socketMessagesSlice = createSlice({
    name: 'socketMessageSlice',
    initialState,
    reducers: {
        handleFailedAuth() {
            console.log('FAILED SOCKET AUTHENTICATION!');
            // ERROR LOGIC PLACEHOLDER
            throw new Error('FAILED SOCKET AUTHENTICATION!');
        },
        hubSocketConnection() {
            return 'CONNECT TO THE WS HUB SOCKET';
        },
        lobbySocketConnection() {
            return 'CONNECT TO THE WS LOBBY SOCKET';
        },
        gameSocketConnection() {
            return 'CONNECT TO THE WS GAME SOCKET';
        },
        sendSocketCommand(state, action: PayloadAction<
            | HubCommandHostGame
            | HubCommandJoinGame
            | HubCommandLeaveHub
            | LobbyCommandLeaveLobby
            | LobbyCommandKickGuest
            | LobbyCommandStartGame
            | GameCommandMakeTurn
            | GameCommandForfeit
        >) {
            return 'SENT GAME COMMAND MESSAGE';
        },

    }
});

export const { sendSocketCommand, gameSocketConnection, hubSocketConnection, lobbySocketConnection, handleFailedAuth } = socketMessagesSlice.actions;
export default socketMessagesSlice;