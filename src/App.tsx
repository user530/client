import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { io } from 'socket.io-client';
import { ErrorMessage } from '@user530/ws_game_shared/interfaces';

function App() {
  const socket = io('http://localhost:5000');

  React.useEffect(() => {
    socket.emit('message', (res: string) => console.log(res));
    socket.on('error', ({ code, message }: ErrorMessage) => console.error(`Error ${code}: ${message}`))
  })

  const btnHandler = () => {
    socket.emit('make_turn',
      {
        version: 1,
        type: 'game_command',
        command: 'make_turn',
        data: {
          game_id: '77c9df73-5f52-4d28-92cf-d2402b843e95',
          player_id: '3e2d0add-38e1-43c5-95d4-c734b0b93c5d',
          row: 'Row_1',
          column: 'Col_1',
        }
      }
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
        <button onClick={btnHandler}>EMIT</button>
      </header>

    </div>
  );
}

export default App;
