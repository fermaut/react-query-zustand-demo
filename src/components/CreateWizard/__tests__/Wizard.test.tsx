import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Wizard } from '../Wizard';
import { useStore } from '../../../store';
import { createItem } from '../../../utils/api';

// Mock the API
jest.mock('../../../utils/api', () => ({
  createItem: jest.fn(),
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <ChakraProvider>{children}</ChakraProvider>
  </QueryClientProvider>
);

describe('Wizard', () => {
  beforeEach(() => {
    // Resetear el estado del store antes de cada test
    const resetForm = useStore.getState().resetForm;
    const closeWizard = useStore.getState().closeWizard;
    resetForm();
    closeWizard();
  });

  it('debería mostrar el primer paso al abrir el wizard', () => {
    render(<Wizard />, { wrapper: Wrapper });
    
    // Abrir el wizard
    const openButton = screen.getByText('Crear Nuevo');
    fireEvent.click(openButton);

    // Verificar que se muestra el primer paso
    expect(screen.getByText('Crear Nuevo - Nombre')).toBeInTheDocument();
    expect(screen.getByLabelText('Nombre del elemento')).toBeInTheDocument();
  });

  it('debería navegar al segundo paso cuando se ingresa un nombre', () => {
    render(<Wizard />, { wrapper: Wrapper });
    
    // Abrir el wizard
    const openButton = screen.getByText('Crear Nuevo');
    fireEvent.click(openButton);

    // Ingresar un nombre y avanzar
    const nameInput = screen.getByLabelText('Nombre del elemento');
    fireEvent.change(nameInput, { target: { value: 'Test Item' } });
    
    const nextButton = screen.getByText('Siguiente');
    fireEvent.click(nextButton);

    // Verificar que se muestra el segundo paso
    expect(screen.getByText('Crear Nuevo - Descripción')).toBeInTheDocument();
    expect(screen.getByLabelText('Descripción del elemento')).toBeInTheDocument();
  });

  it('no debería permitir avanzar si el nombre está vacío', () => {
    render(<Wizard />, { wrapper: Wrapper });
    
    // Abrir el wizard
    const openButton = screen.getByText('Crear Nuevo');
    fireEvent.click(openButton);

    // Verificar que el botón está deshabilitado
    const nextButton = screen.getByText('Siguiente');
    expect(nextButton).toBeDisabled();
  });

  it('should create item when form is complete', async () => {
    // Mock de respuesta exitosa
    (createItem as jest.Mock).mockResolvedValueOnce({
      id: '4',
      name: 'Test Item',
      description: 'Test Description',
    });

    render(<Wizard />, { wrapper: Wrapper });
    
    // Abrir el wizard y completar el formulario
    const openButton = screen.getByText('Crear Nuevo');
    fireEvent.click(openButton);
    
    // Paso 1: Nombre
    const nameInput = screen.getByLabelText('Nombre del elemento');
    fireEvent.change(nameInput, { target: { value: 'Test Item' } });
    fireEvent.click(screen.getByText('Siguiente'));
    
    // Paso 2: Descripción
    const descriptionInput = screen.getByLabelText('Descripción del elemento');
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    
    // Crear el item
    fireEvent.click(screen.getByText('Crear'));
    
    // Verificar que se llamó a la API con los datos correctos
    await waitFor(() => {
      expect(createItem).toHaveBeenCalledWith({
        name: 'Test Item',
        description: 'Test Description',
      });
    });
  });

  it('should show loading state while creating', async () => {
    // Mock con delay
    (createItem as jest.Mock).mockImplementationOnce(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    render(<Wizard />, { wrapper: Wrapper });
    
    // Completar y enviar el formulario
    const openButton = screen.getByText('Crear Nuevo');
    fireEvent.click(openButton);
    const nameInput = screen.getByLabelText('Nombre del elemento');
    fireEvent.change(nameInput, { target: { value: 'Test Item' } });
    fireEvent.click(screen.getByText('Siguiente'));
    const descriptionInput = screen.getByLabelText('Descripción del elemento');
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    fireEvent.click(screen.getByText('Crear'));
    
    // Verificar estado de carga
    await waitFor(() => {
      const submitButton = screen.getByRole('button', { name: /Crear|Guardando/i });
      expect(submitButton).toHaveAttribute('disabled');
      expect(submitButton).toHaveTextContent('Guardando...');
    });
  });

  it('should allow navigation back to step 1', () => {
    render(<Wizard />, { wrapper: Wrapper });
    
    // Ir al paso 2
    const openButton = screen.getByText('Crear Nuevo');
    fireEvent.click(openButton);
    const nameInput = screen.getByLabelText('Nombre del elemento');
    fireEvent.change(nameInput, { target: { value: 'Test Item' } });
    fireEvent.click(screen.getByText('Siguiente'));
    
    // Volver al paso 1
    fireEvent.click(screen.getByText('Atrás'));
    
    // Verificar que estamos en el paso 1
    expect(screen.getByText('Crear Nuevo - Nombre')).toBeInTheDocument();
    // Verificar que el nombre se mantiene
    expect(nameInput).toHaveValue('Test Item');
  });
}); 