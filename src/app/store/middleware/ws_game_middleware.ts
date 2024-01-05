import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { ErrorEvent, GameEventNewTurn, GameEventGameWon, GameEventGameDraw } from '@user530/ws_game_shared/interfaces/ws-events';
import { Socket, io } from 'socket.io-client';
import { setGameField, setPopup } from '../reducers/slices/game-instance.slice';
import { GameInstanceEventsHandler, GameHubEventsHandler } from '@user530/ws_game_shared/interfaces/ws-listeners';
import { GameEvent, HubEvent, MessageType } from '@user530/ws_game_shared/types';
import { RootState, StoreDispatch } from '../ws_game_store';


export const createWSMiddleware: Middleware<any, any, Dispatch<AnyAction>> =
    (api: MiddlewareAPI<StoreDispatch, RootState>) => {
        // const socket = io('http://localhost:5000', { extraHeaders: { Top: 'Default' } });

        let gameSocket: Socket;

        const hubEventHandler: GameHubEventsHandler = {
            async wsErrorListener(errEvent: ErrorEvent) {
                console.log('Socket - Error Event!');
            },

            async wsHubGamesUpdatedListener(gamesUpdatedEvent) {
                console.log('Socket - HUB GAMES UPDATE EVENT!');
            },

            async wsHubMovedToLobbyListener(movedToLobbyEvent) {
                console.log('Socket - HUB MOVED TO LOBBY EVENT!');
            },

            async wsHubQuitHubListener(quitHubEvent) {
                console.log('Socket - HUB QUIT HUB EVENT!');
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
                const playerName = api.getState().gameInstance.player?.playerName;
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

        return (next: StoreDispatch) => (action: any) => {
            console.log('MIDDLEWARE FIRED!');
            console.log(action.type);
            if (action.type === 'socketMessageSlice/sendGameCommand') {
                const { command } = action.payload;
                gameSocket.emit(command, action.payload);
            }
            else if (action.type === 'socketMessageSlice/gameSocketConnection') {
                console.log('ACTION - CONNECT TO THE GAME WEBSOCKET');

                const { gameInstance: { gameId, player } } = api.getState();

                // Connect to the WS game namespace with auth
                gameSocket = io('http://localhost:5000/game',
                    {
                        auth: {
                            userId: player?.playerId,
                            gameId: gameId
                        }
                    });

                gameSocket.on('connect', () => console.log('GAME SOCKET CONNECTED!'))
                gameSocket.on('disconnect', () => console.log('GAME SOCKET DISCONNECTED!'))
                // Set up game listeners
                gameSocket.on(MessageType.ErrorMessage, gameEventHandler.wsErrorListener);
                gameSocket.on(GameEvent.GameWon, gameEventHandler.wsGameWonListener);
                gameSocket.on(GameEvent.GameDraw, gameEventHandler.wsGameDrawListener);
                gameSocket.on(GameEvent.NewTurn, gameEventHandler.wsGameNewTurnListener);
            }
            else if (action.type === 'socketMessageSlice/hubSocketConnection') {
                console.log('ACTION - CONNECT TO THE HUB WEBSOCKET');

                // ADD SEPARATE SLICE FOR THE PLAYER?
                const { gameInstance: { player } } = api.getState();

                // Connect to the WS game namespace with auth
                gameSocket = io('http://localhost:5000/hub',
                    {
                        auth: {
                            userId: player?.playerId,
                        }
                    });

                gameSocket.on('connect', () => console.log('HUB SOCKET CONNECTED!'))
                gameSocket.on('disconnect', () => console.log('HUB SOCKET DISCONNECTED!'))
                // Set up game listeners
                gameSocket.on(MessageType.ErrorMessage, hubEventHandler.wsErrorListener);
                gameSocket.on(HubEvent.GamesUpdated, hubEventHandler.wsHubGamesUpdatedListener);
                gameSocket.on(HubEvent.MovedToLobby, hubEventHandler.wsHubMovedToLobbyListener);
                gameSocket.on(HubEvent.QuitHub, hubEventHandler.wsHubQuitHubListener);
            }

            next(action);
        }
    }