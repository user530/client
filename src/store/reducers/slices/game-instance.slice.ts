import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IGameInstanceSlice {
    player_id: string | null;
    game_id: string | null;

}

const initialState: IGameInstanceSlice = {
    game_id: null,
    player_id: null,
}

const gameInstanceSlice = createSlice({
    name: 'gameInstanceSlice',
    initialState,
    reducers: {
        setGame(state, action: PayloadAction<string>) {
            state.game_id = action.payload;
        },
        setPlayer(state, action: PayloadAction<string>) {
            state.player_id = action.payload;
        }
    }
})

export const { setGame, setPlayer } = gameInstanceSlice.actions;
export default gameInstanceSlice.reducer;