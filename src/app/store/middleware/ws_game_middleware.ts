import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { ErrorEvent, GameEventNewTurn, GameEventGameWon, GameEventGameDraw } from '@user530/ws_game_shared/interfaces/ws-events';
import { Socket, io } from 'socket.io-client';
import { setGameField, setLobbyList, setPlayer, setPopup } from '../reducers/slices/game-data.slice';
import { lobbySocketConnection } from '../reducers/slices/socket-messages.slice';
import { GameInstanceEventsHandler, GameHubEventsHandler, GameLobbyEventsHandler } from '@user530/ws_game_shared/interfaces/ws-listeners';
import { GameEvent, HubEvent, LobbyEvent, MessageType } from '@user530/ws_game_shared/types';
import { RootState, StoreDispatch, StoreActions } from '../ws_game_store';


export const createWSMiddleware: Middleware<any, any, Dispatch<AnyAction>> =
    (api: MiddlewareAPI<StoreDispatch, RootState>) => {
        // const socket = io('http://localhost:5000', { extraHeaders: { Top: 'Default' } });

        let socket: Socket;

        const hubEventHandler: GameHubEventsHandler = {
            async wsErrorListener(errEvent: ErrorEvent) {
                console.log('Socket - Error Event!');
                const { code, message } = errEvent;
                console.error(`Error: ${code} ${message}`);
            },

            async wsHubGamesUpdatedListener(gamesUpdatedEvent) {
                console.log('Socket - HUB GAMES UPDATE EVENT!');
                console.log(gamesUpdatedEvent);

                const { data } = gamesUpdatedEvent;
                api.dispatch(setLobbyList(data))
            },

            async wsHubMovedToLobbyListener(movedToLobbyEvent) {
                console.log('Socket - HUB MOVED TO LOBBY EVENT!');
                console.log(movedToLobbyEvent);

                api.dispatch(lobbySocketConnection());
            },

            async wsHubQuitHubListener(quitHubEvent) {
                console.log('Socket - HUB QUIT HUB EVENT!');
                api.dispatch(setPlayer({ playerId: null, playerName: null }));
                socket.removeAllListeners();
                socket.disconnect();
            },
        }

        const lobbyEventHandler: GameLobbyEventsHandler = {
            async wsErrorListener(errEvent) {
                console.log('Socket - Error Event!');
                const { code, message } = errEvent;
                console.error(`Error: ${code} ${message}`);
            },
            async wsLobbyGuestJoinedListener(guestJoinedEvent) {
                console.log('Socket - LOBBY GUEST JOINED EVENT!');
                console.log(guestJoinedEvent);
            },
            async wsLobbyGuestLeftListener(guestLeftEvent) {
                console.log('Socket - LOBBY GUEST LEFT EVENT!');
                console.log(guestLeftEvent);
            },
            async wsLobbyToGameListener(movedToGameEvent) {
                console.log('Socket - LOBBY MOVED TO GAME EVENT!');
                console.log(movedToGameEvent);
            },
            async wsLobbyToHubListener(movedToHubEvent) {
                console.log('Socket - LOBBY MOVED TO HUB EVENT!');
                console.log(movedToHubEvent);
            },
        }

        const gameEventHandler: GameInstanceEventsHandler = {
            async wsErrorListener(errEvent: ErrorEvent): Promise<void> {
                console.log('Socket - Error Event!');
                const { code, message } = errEvent;
                console.error(`Error: ${code} ${message}`);
            },

            async wsGameNewTurnListener(newTurnEvent: GameEventNewTurn): Promise<void> {
                console.log('Socket - New Turn Event!');
                console.log(newTurnEvent);

                const { data: newTurnData } = newTurnEvent;
                api.dispatch(setGameField(newTurnData));
            },

            async wsGameWonListener(gameWonEvent: GameEventGameWon): Promise<void> {
                console.log('Socket - Game Won Event!');
                console.log(gameWonEvent);
                const playerName = api.getState().gameData.player?.playerName;
                if (gameWonEvent.data.playerName === playerName)
                    api.dispatch(setPopup('win'))
                else
                    api.dispatch(setPopup('loose'))
            },

            async wsGameDrawListener(gameDrawEvent: GameEventGameDraw): Promise<void> {
                console.log('Socket - Game Draw Event!');
                console.log(gameDrawEvent);
                api.dispatch(setPopup('draw'))
            },
        }

        return (next: StoreDispatch) => (action: StoreActions) => {
            console.log('MIDDLEWARE FIRED!');
            console.log(action.type);

            if (action.type === 'socketMessageSlice/hubSocketConnection') {
                console.log('ACTION - CONNECT TO THE HUB WEBSOCKET');

                // ADD SEPARATE SLICE FOR THE PLAYER?
                const { gameData: { player } } = api.getState();

                // Connect to the WS hub namespace with auth
                socket = io('http://localhost:5000/hub',
                    {
                        auth: {
                            userId: player?.playerId,
                        }
                    });

                socket.on('connect', () => console.log('HUB SOCKET CONNECTED!'))
                socket.on('disconnect', () => console.log('HUB SOCKET DISCONNECTED!'))
                // Set up hub listeners
                socket.on(MessageType.ErrorMessage, hubEventHandler.wsErrorListener);
                socket.on(HubEvent.GamesUpdated, hubEventHandler.wsHubGamesUpdatedListener);
                socket.on(HubEvent.MovedToLobby, hubEventHandler.wsHubMovedToLobbyListener);
                socket.on(HubEvent.QuitHub, hubEventHandler.wsHubQuitHubListener);
            }
            else if (action.type === 'socketMessageSlice/lobbySocketConnection') {
                console.log('ACTION - CONNECT TO THE LOBBY WEBSOCKET');

                // ADD SEPARATE SLICE FOR THE PLAYER?
                const { gameData: { player } } = api.getState();

                // Connect to the WS lobby namespace with auth
                socket = io('http://localhost:5000/lobby',
                    {
                        auth: {
                            userId: player?.playerId,
                        }
                    });

                socket.on('connect', () => console.log('LOBBY SOCKET CONNECTED!'))
                socket.on('disconnect', () => console.log('LOBBY SOCKET DISCONNECTED!'))
                // Set up lobby listeners
                socket.on(MessageType.ErrorMessage, lobbyEventHandler.wsErrorListener);
                socket.on(LobbyEvent.GuestJoined, lobbyEventHandler.wsLobbyGuestJoinedListener);
                socket.on(LobbyEvent.GuestLeft, lobbyEventHandler.wsLobbyGuestJoinedListener);
                socket.on(LobbyEvent.MovedToGame, lobbyEventHandler.wsLobbyToGameListener);
                socket.on(LobbyEvent.MovedToHub, lobbyEventHandler.wsLobbyToHubListener);
            }
            else if (action.type === 'socketMessageSlice/gameSocketConnection') {
                console.log('ACTION - CONNECT TO THE GAME WEBSOCKET');

                const { gameData: { player: { playerId }, game } } = api.getState();

                // Connect to the WS game namespace with auth
                socket = io('http://localhost:5000/game',
                    {
                        auth: {
                            userId: playerId,
                            gameId: game?.gameId,
                        }
                    });

                socket.on('connect', () => console.log('GAME SOCKET CONNECTED!'))
                socket.on('disconnect', () => console.log('GAME SOCKET DISCONNECTED!'))
                // Set up game listeners
                socket.on(MessageType.ErrorMessage, gameEventHandler.wsErrorListener);
                socket.on(GameEvent.GameWon, gameEventHandler.wsGameWonListener);
                socket.on(GameEvent.GameDraw, gameEventHandler.wsGameDrawListener);
                socket.on(GameEvent.NewTurn, gameEventHandler.wsGameNewTurnListener);
            }
            else if (action.type === 'socketMessageSlice/sendSocketCommand') {
                const { command } = action.payload;
                socket.emit(command, action.payload);
            }

            next(action);
        }
    }