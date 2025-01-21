import { Input, VStack } from '@chakra-ui/react';
import { useItemsSlice } from '../store';

export const Filters = () => {
  const { search, setSearch } = useItemsSlice();

  return (
    <VStack gap={4} alignItems="stretch" marginBottom={4}>
      <Input
        placeholder="Buscar por nombre..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </VStack>
  );
}; 