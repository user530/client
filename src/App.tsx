import React from 'react';
import './App.css';
import { GameInstancePage } from './pages/game-instance';
import { useAppSelector } from './app/hooks/useStore';
import { TestLoginPage } from './pages/test-login';
import { GameHubPage } from './pages/game-hub/game-hub';
import { GameStatus } from '@user530/ws_game_shared/enums';

function App() {
  const playerId = useAppSelector((state) => state.gameData.player?.playerId);
  const game = useAppSelector((state) => state.gameData.game);

  return (
    <div className="App">
      {
        playerId && game && game.status === GameStatus.InProgress
          ? <GameInstancePage />
          : playerId
            ? <GameHubPage />
            : <TestLoginPage />
      }

    </div>
  );
}

export default App;
