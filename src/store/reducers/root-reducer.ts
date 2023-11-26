import { combineReducers } from '@reduxjs/toolkit';
import socketSlice from './slices/socket.slice';
import gameInstanceSlice from './slices/game-instance.slice';

export const rootReducer = combineReducers({
    socket: socketSlice,
    gameInstance: gameInstanceSlice,
});

export type RootState = ReturnType<typeof rootReducer>;