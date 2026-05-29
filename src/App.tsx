import { SettingsProvider } from '@/context/SettingsProvider';
import { SimulatorPage } from '@/views/SimulatorPage';

export default function App() {
  return (
    <SettingsProvider>
      <SimulatorPage />
    </SettingsProvider>
  );
}
