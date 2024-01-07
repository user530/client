import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameTableCol, GameTableRow } from '@user530/ws_game_shared/enums';
import { GameEventTurnData } from '@user530/ws_game_shared/interfaces/ws-events';

interface PlayerData {
    playerId: string;
    playerName: string;
}

interface IGameInstanceSlice {
    player: PlayerData | null,
    gameId: string | null,
    gameField: {
        -readonly [key in keyof typeof GameTableRow]: {
            -readonly [key in keyof typeof GameTableCol]: string | null;
        }
    },
    popupWindow: 'win' | 'loose' | 'draw' | null,
}

const defaultGameField = Object.keys(GameTableRow).reduce(
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
    gameId: null,
    player: null,
    gameField: defaultGameField,
    popupWindow: null,
}

const gameInstanceSlice = createSlice({
    name: 'gameInstanceSlice',
    initialState,
    reducers: {
        setGame(state, action: PayloadAction<string | null>) {
            state.gameId = action.payload;
        },
        setPlayer(state, action: PayloadAction<PlayerData | null>) {
            state.player = action.payload;
        },
        setGameField(state, action: PayloadAction<GameEventTurnData>) {
            const { row, column: col, mark } = action.payload;

            state.gameField[row][col] = mark;
        },
        setPopup(state, action: PayloadAction<'win' | 'loose' | 'draw' | null>) {
            state.popupWindow = action.payload;
        }
    }
})

export const { setGame, setPlayer, setGameField, setPopup } = gameInstanceSlice.actions;
export default gameInstanceSlice;