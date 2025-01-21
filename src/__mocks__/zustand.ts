import * as zustand from 'zustand';
import { act } from '@testing-library/react';

const { create: actualCreate, createStore: actualCreateStore } =
  jest.requireActual<typeof zustand>('zustand');

// Conjunto para mantener las funciones de reset de todos los stores
export const storeResetFns = new Set<() => void>();

// Función auxiliar para crear stores no currificados
const createUncurried = <T>(stateCreator: zustand.StateCreator<T>) => {
  const store = actualCreate(stateCreator);
  const initialState = store.getState();
  // Agregar función de reset al conjunto
  storeResetFns.add(() => {
    store.setState(initialState, true);
  });
  return store;
};

// Mock de create que soporta tanto la versión currificada como la no currificada
export const create = (<T>(stateCreator: zustand.StateCreator<T>) => {
  console.log('zustand create mock');

  return typeof stateCreator === 'function'
    ? createUncurried(stateCreator)
    : createUncurried;
}) as typeof zustand.create;

// Función auxiliar para crear stores no currificados (createStore)
const createStoreUncurried = <T>(stateCreator: zustand.StateCreator<T>) => {
  const store = actualCreateStore(stateCreator);
  const initialState = store.getState();
  // Agregar función de reset al conjunto
  storeResetFns.add(() => {
    store.setState(initialState, true);
  });
  return store;
};

// Mock de createStore que soporta tanto la versión currificada como la no currificada
export const createStore = (<T>(stateCreator: zustand.StateCreator<T>) => {
  console.log('zustand createStore mock');

  return typeof stateCreator === 'function'
    ? createStoreUncurried(stateCreator)
    : createStoreUncurried;
}) as typeof zustand.createStore;

// Resetear todos los stores después de cada test
afterEach(() => {
  act(() => {
    storeResetFns.forEach((resetFn) => {
      resetFn();
    });
  });
}); 