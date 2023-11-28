import React from 'react';
import './App.css';
import { Socket, io } from 'socket.io-client';
import { ErrorMessage, GameCommandDataType } from '@user530/ws_game_shared/interfaces';
import { GameInstancePage } from './pages/game-instance';
import { useAppDispatch, useAppSelector } from './app/hooks/useStore';
import { TestLoginPage } from './pages/test-login';
import { sendMakeTurnMessage } from './app/store/reducers/slices/socket-messages.slice'

function App() {
  const player_id = useAppSelector((state) => state.gameInstance.player_id);
  const game_id = useAppSelector((state) => state.gameInstance.game_id);
  const dispatch = useAppDispatch();

  const emitMessage = (ev: string, ...args: any[]) => {
    console.log(ev);
    console.log(...args);
    sendMakeTurnMessage(args[0]);
    // socketRef.current!.emit(ev, ...args);
  };

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
