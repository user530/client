import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers/root-reducer';


const gameStore = configureStore({
    reducer: rootReducer,
});


export type RootState = ReturnType<typeof gameStore.getState>;
export type StoreDispatch = typeof gameStore.dispatch;
export default gameStore;