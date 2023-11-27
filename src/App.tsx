import React from 'react';
import './App.css';
import { io } from 'socket.io-client';
import { ErrorMessage, GameCommandDataType } from '@user530/ws_game_shared/interfaces';
import { GameInstancePage } from './pages/game-instance';
import { useAppDispatch, useAppSelector } from './app/hooks/useStore';
import { setSocket } from './app/store/reducers/slices/socket.slice';
import { TestLoginPage } from './pages/test-login';
import { error } from 'console';

function App() {
  const socket = io('http://localhost:5000');

  const player_id = useAppSelector((state) => state.gameInstance.player_id);
  const game_id = useAppSelector((state) => state.gameInstance.game_id);

  const emitMessage = (ev: string, ...args: any[]) => {
    console.log(ev);
    console.log(...args);
    socket.emit(ev, ...args);
  };

  React.useEffect(() => {
    // Setup listeners
    socket.on('error', ({ code, message }: ErrorMessage) => console.error(`Error ${code}: ${message}`))
    socket.on('game_over_win', (winner_id: string) => console.log(`Game Won: ${winner_id}`))
    socket.on('game_over_draw', () => console.error(`Game Draw!`))
    socket.on('new_turn', ({ player_id, column, row }: GameCommandDataType) => console.error(`New Turn: Player ${player_id}: Column - ${column}, Row - ${row}`))

    console.log(socket.listeners('error'))

    return () => {
      socket.removeAllListeners('error');
      socket.disconnect();

    }
  }, [])

  return (
    <div className="App">
      {
        game_id && player_id
          ? <GameInstancePage emitCB={emitMessage} />
          : <TestLoginPage />
      }

    </div>
  );
}

export default App;
