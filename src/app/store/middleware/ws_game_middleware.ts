import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { ErrorMessage, GameCommandDataType } from '@user530/ws_game_shared/interfaces';
import { io } from 'socket.io-client';
import { setGameField } from '../reducers/slices/game-instance.slice';

export const createWSMiddleware: Middleware<any, any, Dispatch<AnyAction>> =
    (api: MiddlewareAPI<Dispatch<AnyAction>, any>) => {
        const socket = io('http://localhost:5000');

        socket.on('error', ({ code, message }: ErrorMessage) => console.error(`Error ${code}: ${message}`))
        socket.on('game_over_win', (winner_id: string) => console.log(`Game Won: ${winner_id}`))
        socket.on('game_over_draw', () => console.error(`Game Draw!`))

        socket.on('new_turn',
            (newTurn: GameCommandDataType) => {
                const { player_id, column, row } = newTurn;
                console.log(`New Turn: Player ${player_id}: Column - ${column}, Row - ${row}`)
                api.dispatch(setGameField(newTurn));
            })

        return (next: Dispatch<AnyAction>) => (action: any) => {
            console.log('MIDDLEWARE FIRED!');

            if (action.type === 'socketMessageSlice/sendGameCommand') {
                const { version, type, command, data } = action.payload;
                socket.emit(command, action.payload);
            }

            next(action);
        }
    }