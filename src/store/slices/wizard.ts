import type { WizardSlice, SetState } from '../types';

const initialState = {
  isOpen: false,
  currentStep: 1,
  formData: {
    name: '',
    description: '',
  },
};

export const createWizardSlice = (set: SetState): WizardSlice => ({
  ...initialState,
  openWizard: () => set({ isOpen: true }, false, 'wizard/openWizard'),
  closeWizard: () => set({ isOpen: false }, false, 'wizard/closeWizard'),
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 }), false, 'wizard/nextStep'),
  previousStep: () => set((state) => ({ currentStep: state.currentStep - 1 }), false, 'wizard/previousStep'),
  setName: (name) => set((state) => ({
    formData: { ...state.formData, name }
  }), false, 'wizard/setName'),
  setDescription: (description) => set((state) => ({
    formData: { ...state.formData, description }
  }), false, 'wizard/setDescription'),
  resetForm: () => set(initialState, false, 'wizard/resetForm'),
});

// Selectores
export const selectIsOpen = (state: WizardSlice) => state.isOpen;
export const selectCurrentStep = (state: WizardSlice) => state.currentStep;
export const selectFormData = (state: WizardSlice) => state.formData; 