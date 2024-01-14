import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameStatus, GameTableCol, GameTableRow } from '@user530/ws_game_shared/enums';
import { HubEventGameData, GameEventTurnData } from '@user530/ws_game_shared/interfaces/ws-events';

interface PlayerData {
    playerId: null | string;
    playerName: null | string;
}

interface LobbyData extends HubEventGameData { };

interface GameData {
    gameId: string;
    host: {
        hostId: string;
        hostName: string;
    };
    guest: null | {
        guestId: string;
        guestName: string;
    };
    status: GameStatus;
}

interface IGameDataSlice {
    lobbyList: HubEventGameData[];
    player: PlayerData;
    game: GameData | null;
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
    player: defaultPlayer,
    game: null,
    gameField: defaultGameField,
    popupWindow: null,
}

const gameDataSlice = createSlice({
    name: 'gameDataSlice',
    initialState,
    reducers: {
        setLobbyList(state, action: PayloadAction<HubEventGameData[]>) {
            state.lobbyList = action.payload;
        },
        setGame(state, action: PayloadAction<GameData | null>) {
            state.game = action.payload;
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