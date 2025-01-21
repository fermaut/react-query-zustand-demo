import { Container, VStack } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Table } from './components/Table';
import { Pagination } from './components/Pagination';
import { Filters } from './components/Filters';
import { Wizard } from './components/CreateWizard/Wizard';
import { DevTools } from './components/development/DevTools';

// Configuración de React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DevTools>
        <Container maxWidth="container.lg" paddingY={8}>
          <VStack gap={4} alignItems="stretch">
            <Wizard />
            <Filters />
            <Table />
            <Pagination />
          </VStack>
        </Container>
      </DevTools>
    </QueryClientProvider>
  );
}

export default App;
