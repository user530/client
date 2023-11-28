import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers/root-reducer';
import { createWSMiddleware } from './middleware/ws_game_middleware';


const gameStore = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().prepend(createWSMiddleware)
});


export type RootState = ReturnType<typeof gameStore.getState>;
export type StoreDispatch = typeof gameStore.dispatch;
export default gameStore;