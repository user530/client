import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameTableCol, GameTableRow } from '@user530/ws_game_shared/enums';
import { StorePlayerData, StoreGameData, OpenLobbyStateData, LobbyStateData, TurnData } from '@user530/ws_game_shared/interfaces/general';

interface IGameDataSlice {
    lobbyList: OpenLobbyStateData[];
    player: null | StorePlayerData;
    game: null | StoreGameData;
    gameField: {
        -readonly [key in keyof typeof GameTableRow]: {
            -readonly [key in keyof typeof GameTableCol]: string | null;
        }
    };
    popupWindow: 'win' | 'loose' | 'draw' | null;
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

    }, {} as IGameDataSlice['gameField']
)

const initialState: IGameDataSlice = {
    lobbyList: [],
    player: null,
    game: null,
    gameField: defaultGameField,
    popupWindow: null,
}

const gameDataSlice = createSlice({
    name: 'gameDataSlice',
    initialState,
    reducers: {
        setLobbyList(state, action: PayloadAction<OpenLobbyStateData[]>) {
            state.lobbyList = action.payload;
        },
        setLobby(state, action: PayloadAction<null | LobbyStateData>) {
            // If payload is not null, add empty turns to the lobby data
            state.game = action.payload ? { ...action.payload, turns: [] } : action.payload;
        },
        setGame(state, action: PayloadAction<null | StoreGameData>) {
            state.game = action.payload;
        },
        setPlayer(state, action: PayloadAction<null | StorePlayerData>) {
            state.player = action.payload;
        },
        setGameField(state, action: PayloadAction<null | TurnData>) {
            if (action.payload === null)
                state.gameField = defaultGameField;
            else {
                const { row, column: col, mark } = action.payload;

                state.gameField[row][col] = mark;
            }
        },
        setPopup(state, action: PayloadAction<'win' | 'loose' | 'draw' | null>) {
            state.popupWindow = action.payload;
        }
    }
})

export const { setGame, setLobby, setPlayer, setGameField, setPopup, setLobbyList } = gameDataSlice.actions;
export default gameDataSlice;