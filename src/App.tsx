import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { io } from 'socket.io-client';
import { ErrorMessage, GameCommandDataType } from '@user530/ws_game_shared/interfaces';
import { GameTableCol, GameTableRow } from '@user530/ws_game_shared/enums';
import { GameInstanceComponent } from './pages/game-instance';

function App() {
  const socket = io('http://localhost:5000');

  React.useEffect(() => {
    socket.emit('message', (res: string) => console.log(res));
    socket.on('error', ({ code, message }: ErrorMessage) => console.error(`Error ${code}: ${message}`))
    socket.on('game_over', (winner_id: string) => console.error(`Game Won: ${winner_id}`))
    socket.on('new_state', ({ player_id, column, row }: GameCommandDataType) => console.error(`New Turn: Player ${player_id}: Column - ${column}, Row - ${row}`))
  })

  const btnHandler = () => {
    socket.emit('make_turn',
      {
        version: 1,
        type: 'game_command',
        command: 'make_turn',
        data: {
          game_id: '394f6fdc-a43f-4ed7-b0fd-90e767ff3f54',
          player_id: 'bfb9551f-ee05-4b69-b19c-e471f81f3e4d', //Player1
          // player_id: '6a3b895b-da50-422f-9d77-a861aa1c0a59', //Player2
          row: GameTableRow.Row_3,
          column: GameTableCol.Col_3,
        }
      }
    )
  }

  return (
    <div className="App">
      <GameInstanceComponent />
    </div>
  );
}

export default App;
