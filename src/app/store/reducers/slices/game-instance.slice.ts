import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameTableCol, GameTableRow } from '@user530/ws_game_shared/enums';

interface IGameInstanceSlice {
    player_id: string | null;
    game_id: string | null;
    gameField: {
        -readonly [key in keyof typeof GameTableRow]: {
            -readonly [key in keyof typeof GameTableCol]: string | null;
        }
    },
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
    gameField
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
        setGameField(state, action: PayloadAction<{    // CHANGE PAYLOAD ACTION TYPE!                             // CHANGE TO THE GAME EVENT TYPES!
            row: GameTableRow,
            column: GameTableCol,
            mark: 'X' | 'O',
        }>) {
            const { row, column: col, mark } = action.payload;

            state.gameField[row][col] = mark;
        },
    }
})

export const { setGame, setPlayer, setGameField } = gameInstanceSlice.actions;
export default gameInstanceSlice.reducer;