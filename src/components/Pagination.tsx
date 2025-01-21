import { Button, HStack, Text } from '@chakra-ui/react';
import { useItemsSlice } from '../store';
import { useItemsQuery } from '../hooks/useItemsQuery';

export const Pagination = () => {
  const { page, pageSize, search } = useItemsSlice();
  const { data } = useItemsQuery({ page, pageSize, search });
  const { setPage } = useItemsSlice();

  if (!data) return null;

  const totalPages = Math.ceil(data.total / pageSize);

  return (
    <HStack gap={4} justifyContent="center" marginY={4}>
      <Button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        Anterior
      </Button>
      
      <Text>
        Página {page} de {totalPages}
      </Text>

      <Button
        onClick={() => setPage(page + 1)}
        disabled={page >= totalPages}
      >
        Siguiente
      </Button>
    </HStack>
  );
}; 