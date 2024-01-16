import React from 'react';
import './App.css';
import { GameInstancePage } from './pages/game-instance';
import { useAppSelector } from './app/hooks/useStore';
import { TestLoginPage } from './pages/test-login';
import { GameHubPage } from './pages/game-hub/game-hub';
import { GameStatus } from '@user530/ws_game_shared/enums';
import { GameLobbyPage } from './pages/game-lobby/game-lobby';

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
              : <TestLoginPage />
      }

    </div>
  );
}

export default App;
