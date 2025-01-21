import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useItemsQuery, useCreateItemMutation } from '../useItemsQuery';
import { fetchItems, createItem } from '../../utils/api';
import type { Item } from '../../utils/api';

// Mock de las funciones de API
jest.mock('../../utils/api', () => ({
  fetchItems: jest.fn(),
  createItem: jest.fn()
}));

describe('useItemsQuery', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('debería llamar a fetchItems con los filtros correctos y devolver los datos', async () => {
    const mockData = {
      data: [{ id: '1', name: 'Item 1', description: 'Description 1' }],
      total: 1
    };
    
    (fetchItems as jest.Mock).mockResolvedValueOnce(mockData);

    const filters = { page: 1, pageSize: 10, search: '' };
    const { result } = renderHook(() => useItemsQuery(filters), { wrapper: Wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // Verificar que se llamó a la API con los parámetros correctos
    expect(fetchItems).toHaveBeenCalledWith(filters);
    // Verificar que los datos se devuelven correctamente
    expect(result.current.data).toEqual(mockData);
  });
});

describe('useCreateItemMutation', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('debería llamar a createItem con los datos correctos', async () => {
    const newItem = { 
      name: 'Nuevo Item',
      description: 'Descripción del nuevo item'
    };
    const mockResponse: Item = { 
      id: '1', 
      ...newItem 
    };
    
    (createItem as jest.Mock).mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useCreateItemMutation(), { wrapper: Wrapper });

    // Ejecutar la mutación
    result.current.mutate(newItem);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // Verificar que se llamó a la API con los datos correctos
    expect(createItem).toHaveBeenCalledWith(newItem);
  });
}); 