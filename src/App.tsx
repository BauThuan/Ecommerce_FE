import { Button, Checkbox, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import NewPro from './components/ImportUrl';
import { ActiveBar } from './components/ActiveBar';
import ImportUrl from './components/ImportUrl';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from './store/StoreProvider';

const App = () => {
  return (
    <QueryClientProvider client={new QueryClient}>
      <UserProvider>
        <ImportUrl />
        <ActiveBar />
      </UserProvider>
    </QueryClientProvider>
  );
}
export default App;