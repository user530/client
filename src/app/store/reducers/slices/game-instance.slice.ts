import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameTableCol, GameTableRow } from '@user530/ws_game_shared/enums';
import { GameTurnDataType } from '@user530/ws_game_shared/interfaces/ws-events';

interface IGameInstanceSlice {
    player_id: string | null,
    game_id: string | null,
    gameField: {
        -readonly [key in keyof typeof GameTableRow]: {
            -readonly [key in keyof typeof GameTableCol]: string | null;
        }
    },
    popupWindow: 'win' | 'loose' | 'draw' | null,
}

const gameField = Object.keys(GameTableRow).reduce(
    (fieldObj, row) => {
        fieldObj[row as keyof typeof GameTableRow] = Object.keys(GameTableCol).reduce(
            (rowObj, col) => {
                rowObj[col as keyof typeof GameTableCol] = null;
                return rowObj;
            },
            {} as Record<GameTableCol, string | null>
        )

        return fieldObj

    }, {} as IGameInstanceSlice['gameField']
)

const initialState: IGameInstanceSlice = {
    game_id: null,
    player_id: null,
    gameField,
    popupWindow: null,
}

const gameInstanceSlice = createSlice({
    name: 'gameInstanceSlice',
    initialState,
    reducers: {
        setGame(state, action: PayloadAction<string | null>) {
            state.game_id = action.payload;
        },
        setPlayer(state, action: PayloadAction<string | null>) {
            state.player_id = action.payload;
        },
        setGameField(state, action: PayloadAction<GameTurnDataType>) {
            const { row, column: col, mark } = action.payload;

            state.gameField[row][col] = mark;
        },
        setPopup(state, action: PayloadAction<'win' | 'loose' | 'draw' | null>) {
            state.popupWindow = action.payload;
        }
    }
})

export const { setGame, setPlayer, setGameField, setPopup } = gameInstanceSlice.actions;
export default gameInstanceSlice.reducer;