import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchItems, createItem } from '../utils/api';

export const useItemsQuery = (filters: { page: number; pageSize: number; search: string }) => {
  return useQuery({
    queryKey: ['items', filters],
    queryFn: () => fetchItems(filters),
  });
};

export const useCreateItemMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });
}; 