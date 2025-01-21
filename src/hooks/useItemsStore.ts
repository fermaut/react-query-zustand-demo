/// <reference types="node" />
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// Usar process.env.NODE_ENV que Jest configura automáticamente
const isDev = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';

interface ItemsState {
  page: number;
  pageSize: number;
  search: string;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  setSearch: (search: string) => void;
  resetFilters: () => void;
}

const initialState = {
  page: 1,
  pageSize: 3,
  search: '',
};

export const useItemsStore = create<ItemsState>()(
  devtools(
    (set) => ({
      ...initialState,
      setPage: (page) => set({ page }, false, 'setPage'),
      setPageSize: (pageSize) => set({ pageSize, page: 1 }, false, 'setPageSize'),
      setSearch: (search) => set({ search, page: 1 }, false, 'setSearch'),
      resetFilters: () => set(initialState, false, 'resetFilters'),
    }),
    {
      name: 'Items Store',
      enabled: isDev,
    }
  )
); 