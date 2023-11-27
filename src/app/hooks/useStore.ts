import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState, StoreDispatch } from '../store/ws_game_store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<StoreDispatch>();