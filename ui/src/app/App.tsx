import type { ReactElement } from 'react';
import { AppRouter } from './providers/router';

const App = (): ReactElement => (
  <div id="app">
    <AppRouter />
  </div>
);

export default App;
