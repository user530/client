import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { ErrorEvent, GameEventNewTurn, GameEventGameWon, GameEventGameDraw, ChatEventNewMessage } from '@user530/ws_game_shared/interfaces/ws-events';
import { Socket, io } from 'socket.io-client';
import { addMessage, resetMessages, setGame, setGameField, setLobby, setLobbyList, setPlayer, setPopup } from '../reducers/slices/game-data.slice';
import { gameSocketConnection, handleFailedAuth, hubSocketConnection, lobbySocketConnection } from '../reducers/slices/socket-messages.slice';
import { GameInstanceEventsHandler, GameHubEventsHandler, GameLobbyEventsHandler, ErrorEventsHandler, ChatEventsHandler } from '@user530/ws_game_shared/interfaces/ws-listeners';
import { ChatEvent, GameEvent, HubEvent, LobbyEvent, MessageType } from '@user530/ws_game_shared/types';
import { RootState, StoreDispatch, StoreActions } from '../ws_game_store';
import { createDrawPopup, createErrorPopup, createLosePopup, createWinPopup } from '../../functions/popup.creator';


export const createWSMiddleware: Middleware<any, any, Dispatch<AnyAction>> =
    (api: MiddlewareAPI<StoreDispatch, RootState>) => {
        let socket: Socket;

        const errorEventHandler: ErrorEventsHandler = {
            async wsErrorListener(errEvent: ErrorEvent) {
                const { code, message } = errEvent;

                // Pop-up error
                api.dispatch(setPopup(createErrorPopup({ heading: `Error #${code}`, message })));
            },
        };

        const chatEventHandler: ChatEventsHandler = {
            async wsChatNewMsgListener(newMsgEvent: ChatEventNewMessage) {
                const { data } = newMsgEvent;

                api.dispatch(addMessage(data));
            },
        };

        const hubEventHandler: GameHubEventsHandler = {
            async wsHubGamesUpdatedListener(gamesUpdatedEvent) {
                const { data } = gamesUpdatedEvent;

                api.dispatch(setLobbyList(data))
            },

            async wsHubMovedToLobbyListener(movedToLobbyEvent) {
                const { data } = movedToLobbyEvent;

                // Set lobby data, clear up lobby list and connect to the lobby socket
                api.dispatch(setLobby(data));
                api.dispatch(setLobbyList([]));
                api.dispatch(resetMessages());
                api.dispatch(lobbySocketConnection());
            },

            async wsHubMovedToGameListener(movedToGameEvent) {
                const { data } = movedToGameEvent;

                // Set game data, clear up lobby list and connect to the game socket
                api.dispatch(setGame(data));
                api.dispatch(setLobbyList([]));
                api.dispatch(resetMessages());
                api.dispatch(gameSocketConnection());
            },

            async wsHubQuitHubListener(quitHubEvent) {
                // Clean up the store
                api.dispatch(setPlayer(null));
                api.dispatch(setGame(null));
                api.dispatch(setLobbyList([]));
                api.dispatch(setGameField(null));
                api.dispatch(resetMessages());

                // Disconnect from the socket server
                socket.removeAllListeners();
                socket.disconnect();
            },
        };

        const lobbyEventHandler: GameLobbyEventsHandler = {
            async wsLobbyGuestJoinedListener(guestJoinedEvent) {
                const guest = guestJoinedEvent.data;
                const gameData = api.getState().gameData.game;

                if (!gameData || gameData.guest) return;

                api.dispatch(setGame({ ...gameData, guest }))
            },

            async wsLobbyGuestLeftListener(guestLeftEvent) {
                const gameData = api.getState().gameData.game;

                if (!gameData || !gameData.guest) return;

                api.dispatch(setGame({ ...gameData, guest: null }));
            },

            async wsLobbyToGameListener(movedToGameEvent) {
                const { data } = movedToGameEvent;

                // Set game data, clean up chat and move to the game
                api.dispatch(setGame(data));
                api.dispatch(resetMessages());
                api.dispatch(gameSocketConnection());
            },

            async wsLobbyToHubListener(movedToHubEvent) {
                const gameData = api.getState().gameData.game;

                if (!gameData) return;

                // Clean up game data, clean up chat and move to the hub
                api.dispatch(setGame(null));
                api.dispatch(resetMessages());
                api.dispatch(hubSocketConnection());
            },
        };

        const gameEventHandler: GameInstanceEventsHandler = {
            async wsGameNewTurnListener(newTurnEvent: GameEventNewTurn): Promise<void> {
                const { data: newTurnData } = newTurnEvent;

                api.dispatch(setGameField(newTurnData));
            },

            async wsGameWonListener(gameWonEvent: GameEventGameWon): Promise<void> {
                const playerId = api.getState().gameData.player?.playerId;

                // Show up pop-up based on the userId
                if (gameWonEvent.data.playerId === playerId)
                    api.dispatch(setPopup(createWinPopup()))
                else
                    api.dispatch(setPopup(createLosePopup()))

                // Clear the gameField store
                api.dispatch(setGameField(null));
            },

            async wsGameDrawListener(gameDrawEvent: GameEventGameDraw): Promise<void> {
                // Draw pop up
                api.dispatch(setPopup(createDrawPopup()))

                // Clear the gameField store
                api.dispatch(setGameField(null));
            },
        };

        return (next: StoreDispatch) => (action: StoreActions) => {
            // Intercept socket messages to 
            if (action.type === 'socketMessageSlice/hubSocketConnection') {
                const { gameData: { player } } = api.getState();

                // Clean up previous connection, if any
                socket?.removeAllListeners();
                socket?.disconnect();

                // Connect to the WS hub namespace with auth
                socket = io('http://localhost:5000/hub',
                    {
                        auth: {
                            userId: player?.playerId,
                        }
                    });

                // Debug listeners
                // socket.on('connect', () => console.log('HUB SOCKET CONNECTED!'));
                // socket.on('disconnect', () => console.log('HUB SOCKET DISCONNECTED!'));

                // Set up error listener
                socket.on(MessageType.ErrorMessage, errorEventHandler.wsErrorListener);

                // Set up chat new message listener
                socket.on(ChatEvent.NewMessage, chatEventHandler.wsChatNewMsgListener);

                // Set up hub listeners
                socket.on(HubEvent.GamesUpdated, hubEventHandler.wsHubGamesUpdatedListener);
                socket.on(HubEvent.MovedToLobby, hubEventHandler.wsHubMovedToLobbyListener);
                socket.on(HubEvent.MovedToGame, hubEventHandler.wsHubMovedToGameListener);
                socket.on(HubEvent.QuitHub, hubEventHandler.wsHubQuitHubListener);
            }
            else if (action.type === 'socketMessageSlice/lobbySocketConnection') {
                const { gameData: { player, game } } = api.getState();

                // Clean up previous connection, if any
                socket?.removeAllListeners();
                socket?.disconnect();

                // Connect to the WS lobby namespace with auth
                socket = io('http://localhost:5000/lobby',
                    {
                        auth: {
                            userId: player?.playerId,
                            gameId: game?.gameId,
                        }
                    });

                // Debug listeners
                // socket.on('connect', () => console.log('LOBBY SOCKET CONNECTED!'));
                // socket.on('disconnect', () => console.log('LOBBY SOCKET DISCONNECTED!'));

                // Set up error listener
                socket.on(MessageType.ErrorMessage, errorEventHandler.wsErrorListener);

                // Set up chat new message listener
                socket.on(ChatEvent.NewMessage, chatEventHandler.wsChatNewMsgListener);

                // Set up lobby listeners
                socket.on(LobbyEvent.GuestJoined, lobbyEventHandler.wsLobbyGuestJoinedListener);
                socket.on(LobbyEvent.GuestLeft, lobbyEventHandler.wsLobbyGuestLeftListener);
                socket.on(LobbyEvent.MovedToGame, lobbyEventHandler.wsLobbyToGameListener);
                socket.on(LobbyEvent.MovedToHub, lobbyEventHandler.wsLobbyToHubListener);
            }
            else if (action.type === 'socketMessageSlice/gameSocketConnection') {
                const { gameData: { player, game } } = api.getState();

                // If there is no player data -> return
                if (!player || !game)
                    return api.dispatch(handleFailedAuth());

                // Clean up previous connection, if any
                socket?.removeAllListeners();
                socket?.disconnect();

                // Connect to the WS game namespace with auth
                socket = io('http://localhost:5000/game',
                    {
                        auth: {
                            userId: player.playerId,
                            gameId: game.gameId,
                        }
                    });

                // Debug listeners
                // socket.on('connect', () => console.log('GAME SOCKET CONNECTED!'));
                // socket.on('disconnect', () => console.log('GAME SOCKET DISCONNECTED!'));

                // Set up error listener
                socket.on(MessageType.ErrorMessage, errorEventHandler.wsErrorListener);

                // Set up chat new message listener
                socket.on(ChatEvent.NewMessage, chatEventHandler.wsChatNewMsgListener);

                // Set up game listeners
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