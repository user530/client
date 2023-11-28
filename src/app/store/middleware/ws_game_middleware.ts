import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { ErrorMessage, GameCommandDataType } from '@user530/ws_game_shared/interfaces';
import { Socket, io } from 'socket.io-client';

export const createWSMiddleware: Middleware<any, any, Dispatch<AnyAction>> =
    (api: MiddlewareAPI<Dispatch<AnyAction>, any>) => {
        console.log('MIDDLEWARE CREATED!');
        const socket = io('http://localhost:5000');

        socket.on('error', ({ code, message }: ErrorMessage) => console.error(`Error ${code}: ${message}`))
        socket.on('game_over_win', (winner_id: string) => console.log(`Game Won: ${winner_id}`))
        socket.on('game_over_draw', () => console.error(`Game Draw!`))
        socket.on('new_turn', ({ player_id, column, row }: GameCommandDataType) => console.error(`New Turn: Player ${player_id}: Column - ${column}, Row - ${row}`))

        return (next: Dispatch<AnyAction>) => (action: any) => {
            console.log('MIDDLEWARE FIRED!');
            console.log(socket)
            console.log(action)
            next(action);
        }
    }


// (socketURI: string) => {
//     return (storeAPI: string) => {
//         console.log('CREATE MIDDLEWARE FIRED!');
//         const socket = io(socketURI);

//         return (next: any) => (action: any) => {
//             console.log('MIDDLEWARE FIRED!');

//             next(action);
//         }
//     }
// }