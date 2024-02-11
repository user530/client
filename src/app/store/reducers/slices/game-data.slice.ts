import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameTableCol, GameTableRow } from '@user530/ws_game_shared/enums';
import { StorePlayerData, StoreGameData, OpenLobbyStateData, LobbyStateData, TurnData } from '@user530/ws_game_shared/interfaces/general';
import { PopupGameResult, PopupError } from '../../../functions/popup.creator';
import { ChatEventNewMsgData } from '@user530/ws_game_shared/interfaces/ws-events';

interface IGameDataSlice {
    lobbyList: OpenLobbyStateData[];
    player: null | StorePlayerData;
    game: null | StoreGameData;
    gameField: {
        -readonly [key in keyof typeof GameTableRow]: {
            -readonly [key in keyof typeof GameTableCol]: 'X' | 'O' | null;
        }
    };
    popupWindow: PopupGameResult | PopupError | null;
    messages: ChatEventNewMsgData[];
}

const defaultGameField = Object.keys(GameTableRow).reduce(
    (fieldObj, row) => {
        fieldObj[row as keyof typeof GameTableRow] = Object.keys(GameTableCol).reduce(
            (rowObj, col) => {
                rowObj[col as keyof typeof GameTableCol] = null;
                return rowObj;
            },
            {} as Record<GameTableCol, 'X' | 'O' | null>
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
    messages: [],
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
        setPopup(state, action: PayloadAction<PopupGameResult | PopupError | null>) {
            state.popupWindow = action.payload;
        },
        addMessage(state, action: PayloadAction<ChatEventNewMsgData>) {
            state.messages.push(action.payload);
        },
        resetMessages(state) {
            state.messages = [];
        }
    }
})

export const { setGame, setLobby, setPlayer, setGameField, setPopup, setLobbyList, addMessage, resetMessages } = gameDataSlice.actions;
export default gameDataSlice;