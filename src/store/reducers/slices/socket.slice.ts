import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';

interface ISocketSlice {
    socket: Socket | null,
}

const initialState: ISocketSlice = {
    socket: null,
}

const socketSlice = createSlice({
    name: 'socketSlice',
    initialState,
    reducers: {
        setSocket(state, action: PayloadAction<Socket>): ISocketSlice {
            return {
                ...state,
                socket: action.payload
            };
        },
    },
})

export const { setSocket } = socketSlice.actions;
export default socketSlice.reducer;