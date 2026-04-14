import { AppShell } from './components/layout/AppShell';
import { GameScreen } from './game/components/GameScreen';

function App() {
  return (
    <AppShell>
      <GameScreen />
    </AppShell>
  );
}

export default App;

