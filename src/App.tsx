import React from 'react';
import './App.css';
import { GameInstancePage } from './pages/game-instance';
import { useAppSelector } from './app/hooks/useStore';
import { TestLoginPage } from './pages/test-login';

function App() {
  const player_id = useAppSelector((state) => state.gameInstance.player_id);
  const game_id = useAppSelector((state) => state.gameInstance.game_id);

  return (
    <div className="App">
      {
        game_id && player_id
          ? <GameInstancePage />
          : <TestLoginPage />
      }

    </div>
  );
}

export default App;
