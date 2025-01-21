/// <reference types="node" />
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// Usar process.env.NODE_ENV que Jest configura automáticamente
const isDev = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';

interface WizardState {
  // Estado
  isOpen: boolean;
  currentStep: number;
  formData: {
    name: string;
    description: string;
  };

  // Acciones
  openWizard: () => void;
  closeWizard: () => void;
  nextStep: () => void;
  previousStep: () => void;
  setName: (name: string) => void;
  setDescription: (description: string) => void;
  resetForm: () => void;
}

const initialState = {
  isOpen: false,
  currentStep: 1,
  formData: {
    name: '',
    description: '',
  },
};

export const useWizardStore = create<WizardState>()(
  devtools(
    (set) => ({
      ...initialState,

      // Acciones
      openWizard: () => set({ isOpen: true }, false, 'openWizard'),
      closeWizard: () => set({ isOpen: false }, false, 'closeWizard'),
      
      nextStep: () => 
        set((state) => ({ currentStep: state.currentStep + 1 }), false, 'nextStep'),
      
      previousStep: () => 
        set((state) => ({ currentStep: state.currentStep - 1 }), false, 'previousStep'),
      
      setName: (name: string) => 
        set((state) => ({
          formData: { ...state.formData, name }
        }), false, 'setName'),
      
      setDescription: (description: string) => 
        set((state) => ({
          formData: { ...state.formData, description }
        }), false, 'setDescription'),
      
      resetForm: () => 
        set(initialState, false, 'resetForm'),
    }),
    {
      name: 'Wizard Store',
      enabled: isDev,
    }
  )
); 