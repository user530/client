import { combineReducers } from '@reduxjs/toolkit';
import socketMessagesSlice from './slices/socket-messages.slice';
import gameInstanceSlice from './slices/game-instance.slice';

export const rootReducer = combineReducers({
    socket: socketMessagesSlice,
    gameInstance: gameInstanceSlice,
});

export type RootState = ReturnType<typeof rootReducer>;