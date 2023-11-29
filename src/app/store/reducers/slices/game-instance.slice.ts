import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameCommandDataType } from '@user530/ws_game_shared/interfaces';
import { GameFieldSquare } from '@user530/ws_game_shared/enums';
import { getGridSquare } from '@user530/ws_game_shared/helpers';

interface IGameInstanceSlice {
    player_id: string | null;
    game_id: string | null;
    gameField: {
        [key in keyof typeof GameFieldSquare]: string | null;
    },
}

const initialState: IGameInstanceSlice = {
    game_id: null,
    player_id: null,
    gameField: {
        Square_1: null,
        Square_2: null,
        Square_3: null,
        Square_4: null,
        Square_5: null,
        Square_6: null,
        Square_7: null,
        Square_8: null,
        Square_9: null,
    },
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
        },
        setGameField(state, action: PayloadAction<GameCommandDataType>) {
            const { row, column: col, player_id } = action.payload;
            const gameFieldSquare = getGridSquare(row, col);
            state.gameField = { ...state.gameField, [gameFieldSquare]: player_id };
        }
    }
})

export const { setGame, setPlayer } = gameInstanceSlice.actions;
export default gameInstanceSlice.reducer;