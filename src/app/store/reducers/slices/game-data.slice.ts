import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameTableCol, GameTableRow } from '@user530/ws_game_shared/enums';
import { GameEventTurnData } from '@user530/ws_game_shared/interfaces/ws-events';

interface PlayerData {
    playerId: null | string;
    playerName: null | string;
}

interface LobbyData {
    gameId: string;
    hostName: string;
}

interface IGameDataSlice {
    lobbyList: LobbyData[];
    player: PlayerData;
    gameId: string | null;
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

const defaultPlayer: PlayerData = { playerId: null, playerName: null };

const initialState: IGameDataSlice = {
    lobbyList: [],
    gameId: null,
    player: defaultPlayer,
    gameField: defaultGameField,
    popupWindow: null,
}

const gameDataSlice = createSlice({
    name: 'gameDataSlice',
    initialState,
    reducers: {
        setLobbyList(state, action: PayloadAction<LobbyData[]>) {
            state.lobbyList = action.payload;
        },
        setGame(state, action: PayloadAction<string | null>) {
            state.gameId = action.payload;
        },
        setPlayer(state, action: PayloadAction<PlayerData>) {
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

export const { setGame, setPlayer, setGameField, setPopup, setLobbyList } = gameDataSlice.actions;
export default gameDataSlice;