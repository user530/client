import React from 'react';
import './App.css';
import { GameInstancePage } from './pages/game-instance';
import { useAppSelector } from './app/hooks/useStore';
import { TestLoginPage } from './pages/test-login';

function App() {
  const playerId = useAppSelector((state) => state.gameInstance.player?.playerId);
  const gameId = useAppSelector((state) => state.gameInstance.gameId);

  return (
    <div className="App">
      {
        gameId && playerId
          ? <GameInstancePage />
          : <TestLoginPage />
      }

    </div>
  );
}

export default App;
