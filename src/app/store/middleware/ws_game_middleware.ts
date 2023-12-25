import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { ErrorEvent, GameEventNewTurn, GameEventGameWon, GameEventGameDraw } from '@user530/ws_game_shared/interfaces/ws-events';
import { Socket, io } from 'socket.io-client';
import { setGameField } from '../reducers/slices/game-instance.slice';
import { GameInstanceEventsHandler } from '@user530/ws_game_shared/interfaces/ws-listeners';
import { GameEvent, MessageType } from '@user530/ws_game_shared/types';
import { RootState, StoreDispatch } from '../ws_game_store';


export const createWSMiddleware: Middleware<any, any, Dispatch<AnyAction>> =
    (api: MiddlewareAPI<StoreDispatch, RootState>) => {
        // const socket = io('http://localhost:5000', { extraHeaders: { Top: 'Default' } });

        let gameSocket: Socket;

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
            },

            async wsGameDrawListener(gameDrawEvent: GameEventGameDraw): Promise<void> {
                console.log('Socket - Game Draw Event!');
                console.log(gameDrawEvent);
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

                const { gameInstance: { player_id: playerId, game_id: gameId } } = api.getState();

                // Connect to the WS game namespace with auth
                gameSocket = io('http://localhost:5000/game',
                    {
                        auth: {
                            userId: playerId,
                            gameId: gameId
                        }
                    });
                gameSocket.on('connect', () => console.log(gameSocket))
                gameSocket.on('disconnect', () => console.log('SOCKET DISCONNECTED!'))
                // Set up game listeners
                gameSocket.on(MessageType.ErrorMessage, gameEventHandler.wsErrorListener);
                gameSocket.on(GameEvent.GameWon, gameEventHandler.wsGameWonListener);
                gameSocket.on(GameEvent.GameDraw, gameEventHandler.wsGameDrawListener);
                gameSocket.on(GameEvent.NewTurn, gameEventHandler.wsGameNewTurnListener);
            }

            next(action);
        }
    }