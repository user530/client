import React from 'react';
import './App.css';
import { GameInstancePage } from './pages/game-instance';
import { useAppSelector } from './app/hooks/useStore';
import { TestLoginPage } from './pages/test-login';
import { GameHubPage } from './pages/game-hub';

function App() {
  const playerId = useAppSelector((state) => state.gameInstance.player?.playerId);
  const gameId = useAppSelector((state) => state.gameInstance.gameId);

  return (
    <div className="App">
      {
        gameId && playerId
          ? <GameInstancePage />
          : playerId
            ? <GameHubPage />
            : <TestLoginPage />
      }

    </div>
  );
}

export default App;
