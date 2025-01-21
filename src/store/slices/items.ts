import type { ItemsSlice, SetState } from '../types';

const initialState = {
  page: 1,
  pageSize: 3,
  search: '',
};

export const createItemsSlice = (set: SetState): ItemsSlice => ({
  ...initialState,
  setPage: (page) => set({ page }, false, 'items/setPage'),
  setSearch: (search) => set({ search, page: 1 }, false, 'items/setSearch'),
});

// Selectores
export const selectPage = (state: ItemsSlice) => state.page;
export const selectPageSize = (state: ItemsSlice) => state.pageSize;
export const selectSearch = (state: ItemsSlice) => state.search; 