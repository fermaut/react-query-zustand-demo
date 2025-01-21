import { Text } from '@chakra-ui/react';
import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/table';
import { useItemsQuery } from '../hooks/useItemsQuery';
import { useItemsSlice } from '../store';
import type { Item } from '../utils/api';

export const Table = () => {
  const { page, pageSize, search } = useItemsSlice();
  const { data, isLoading, isError } = useItemsQuery({ page, pageSize, search });

  if (isLoading) {
    return <Text>Cargando...</Text>;
  }

  if (isError) {
    return <Text color="red.500">Error al cargar los datos</Text>;
  }

  if (!data?.data.length) {
    return <Text>No hay elementos para mostrar</Text>;
  }

  return (
    <TableContainer>
      <ChakraTable>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Nombre</Th>
            <Th>Descripción</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.data.map((item: Item) => (
            <Tr key={item.id}>
              <Td>{item.id}</Td>
              <Td>{item.name}</Td>
              <Td>{item.description}</Td>
            </Tr>
          ))}
        </Tbody>
      </ChakraTable>
    </TableContainer>
  );
}; 