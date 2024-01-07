import { configureStore } from '@reduxjs/toolkit';
import { rootReducer, RootActionsType } from './reducers/root-reducer';
import { createWSMiddleware } from './middleware/ws_game_middleware';


const gameStore = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().prepend(createWSMiddleware)
});


export type RootState = ReturnType<typeof gameStore.getState>;
export type StoreDispatch = typeof gameStore.dispatch;
export type AllActionsType = RootActionsType;
export default gameStore;