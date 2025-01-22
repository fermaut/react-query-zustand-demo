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
      retry: 1, // Número de reintentos si la request falla
      staleTime: 1000 * 60 * 5, // Tiempo que los datos se consideran válidos antes de recargar (5 min)
      gcTime: 1000 * 60 * 10, // Tiempo que los datos inactivos permanecen en caché antes de ser eliminados (10 min)
      refetchOnMount: true, // Recarga los datos cuando el componente se monta
      refetchOnReconnect: true, // Recarga los datos cuando se recupera la conexión a internet
    },
    mutations: {
      retry: 2, // Número de reintentos para operaciones de escritura (crear/actualizar/eliminar)
      onError: (error) => {
        // Manejador global de errores para todas las mutaciones
        console.error('Mutation error:', error);
      }
    }
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
