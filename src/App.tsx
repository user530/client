import React from 'react';
import './App.css';
import { GameInstancePage } from './pages/game-instance/game-instance';
import { useAppSelector } from './app/hooks/useStore';
import { GameHubPage } from './pages/game-hub/game-hub';
import { GameStatus } from '@user530/ws_game_shared/enums';
import { GameLobbyPage } from './pages/game-lobby/game-lobby';
import { Login } from './pages/login/Login';

function App() {
  const playerId = useAppSelector((state) => state.gameData.player?.playerId);
  const game = useAppSelector((state) => state.gameData.game);

  return (
    <div className="App">
      {
        playerId && game && game.status === GameStatus.InProgress
          ? <GameInstancePage />
          : playerId && game
            ? <GameLobbyPage />
            : playerId
              ? <GameHubPage />
              : <Login />
      }

    </div>
  );
}

export default App;
