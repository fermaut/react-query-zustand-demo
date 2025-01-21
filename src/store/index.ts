import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createItemsSlice, selectPage, selectPageSize, selectSearch } from './slices/items';
import { createWizardSlice, selectIsOpen, selectCurrentStep, selectFormData } from './slices/wizard';
import type { StoreState } from './types';

// Crear el store unificado
const isDev = process.env.NODE_ENV !== 'production';

export const useStore = create<StoreState>()(
  devtools(
    (set) => ({
      ...createItemsSlice(set),
      ...createWizardSlice(set),
    }),
    {
      name: 'App Store',
      enabled: isDev,
    }
  )
);

// Hooks personalizados para cada slice
export const useItemsSlice = () => {
  return {
    page: useStore(selectPage),
    pageSize: useStore(selectPageSize),
    search: useStore(selectSearch),
    setPage: useStore((state) => state.setPage),
    setSearch: useStore((state) => state.setSearch),
  };
};

export const useWizardSlice = () => {
  return {
    isOpen: useStore(selectIsOpen),
    currentStep: useStore(selectCurrentStep),
    formData: useStore(selectFormData),
    openWizard: useStore((state) => state.openWizard),
    closeWizard: useStore((state) => state.closeWizard),
    nextStep: useStore((state) => state.nextStep),
    previousStep: useStore((state) => state.previousStep),
    setName: useStore((state) => state.setName),
    setDescription: useStore((state) => state.setDescription),
    resetForm: useStore((state) => state.resetForm),
  };
}; 