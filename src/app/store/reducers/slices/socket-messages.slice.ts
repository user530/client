import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameCommandDataType } from '@user530/ws_game_shared/interfaces';

const initialState = {};

const socketMessagesSlice = createSlice({
    name: 'socketMessageSlice',
    initialState,
    reducers: {
        sendMakeTurnMessage(state, action: PayloadAction<GameCommandDataType>) {
            return 'SEND WS MESSAGE';
        }
    }
});

export const { sendMakeTurnMessage } = socketMessagesSlice.actions;
export default socketMessagesSlice.reducer;