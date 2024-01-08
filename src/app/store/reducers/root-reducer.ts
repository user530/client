import { combineReducers } from '@reduxjs/toolkit';
import socketMessagesSlice from './slices/socket-messages.slice';
import gameDataSlice from './slices/game-data.slice';

export const rootReducer = combineReducers({
    socket: socketMessagesSlice.reducer,
    gameData: gameDataSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

type ActionsType<ReducerActions> = ReducerActions[keyof ReducerActions] extends (...args: any[]) => infer R ? R : never;
export type RootActionsType =
    | ActionsType<typeof socketMessagesSlice.actions>
    | ActionsType<typeof gameDataSlice.actions>