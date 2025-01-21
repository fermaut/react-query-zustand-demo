import { Input, VStack } from '@chakra-ui/react';
import { useItemsStore } from '../hooks/useItemsStore';

export const Filters = () => {
  const { search, setSearch } = useItemsStore();

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