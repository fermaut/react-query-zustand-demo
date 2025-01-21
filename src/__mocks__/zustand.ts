import { act } from '@testing-library/react';
import * as zustand from 'zustand';

const storeResetFns = new Set<() => void>();

const createImpl = jest.requireActual<typeof zustand>('zustand').create;

export const create = (<T>(createState: zustand.StateCreator<T>) => {
  // Si se llama como una función currificada, devolver la implementación
  if (typeof createState === 'function') {
    const store = createImpl(createState);
    const initialState = store.getState();

    const resetFn = () => {
      act(() => {
        store.setState(initialState, true);
      });
    };

    storeResetFns.add(resetFn);
    return store;
  }

  // Si se llama como una función normal, devolver la función currificada
  return create;
}) as typeof zustand.create;

// Resetear todos los stores antes de cada test
beforeEach(() => {
  act(() => {
    storeResetFns.forEach((resetFn) => {
      resetFn();
    });
  });
}); 