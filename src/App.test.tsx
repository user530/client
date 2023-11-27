import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import gameStore from './app/store/ws_game_store';

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={gameStore}>
      <App />
    </Provider>
  );

  expect(getByText(/learn/i)).toBeInTheDocument();
});
