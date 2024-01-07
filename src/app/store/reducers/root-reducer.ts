import { combineReducers } from '@reduxjs/toolkit';
import socketMessagesSlice from './slices/socket-messages.slice';
import gameInstanceSlice from './slices/game-instance.slice';
import { AllReducerActions } from '../../../shared/types';

export const rootReducer = combineReducers({
    socket: socketMessagesSlice.reducer,
    gameInstance: gameInstanceSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type RootActionsType =
    | AllReducerActions<typeof socketMessagesSlice.actions>
    | AllReducerActions<typeof gameInstanceSlice.actions>