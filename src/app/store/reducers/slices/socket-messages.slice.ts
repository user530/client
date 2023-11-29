import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameCommandForfeit, GameCommandMakeTurn } from '@user530/ws_game_shared/interfaces';

const initialState = {};

const socketMessagesSlice = createSlice({
    name: 'socketMessageSlice',
    initialState,
    reducers: {
        sendGameCommand(state, action: PayloadAction<GameCommandMakeTurn | GameCommandForfeit>) {
            return 'SENT GAME COMMAND MESSAGE';
        }
    }
});

export const { sendGameCommand } = socketMessagesSlice.actions;
export default socketMessagesSlice.reducer;