// Tipos para el slice de items
export interface ItemsSlice {
  page: number;
  pageSize: number;
  search: string;
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
}

// Tipos para el slice del wizard
export interface WizardSlice {
  isOpen: boolean;
  currentStep: number;
  formData: {
    name: string;
    description: string;
  };
  openWizard: () => void;
  closeWizard: () => void;
  nextStep: () => void;
  previousStep: () => void;
  setName: (name: string) => void;
  setDescription: (description: string) => void;
  resetForm: () => void;
}

// Tipo para el store completo
export interface StoreState extends ItemsSlice, WizardSlice {}

// Tipo para la función set
export type SetState = {
  (
    partial: StoreState | Partial<StoreState> | ((state: StoreState) => StoreState | Partial<StoreState>),
    replace?: false,
    action?: string
  ): void;
  (state: StoreState | ((state: StoreState) => StoreState), replace: true, action?: string): void;
}; 