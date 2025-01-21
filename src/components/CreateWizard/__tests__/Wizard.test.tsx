import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Wizard } from '../Wizard';
import { useWizardStore } from '../../../hooks/useWizardStore';
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

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>{component}</ChakraProvider>
    </QueryClientProvider>
  );
};

describe('Wizard Component', () => {
  beforeEach(() => {
    // Reset mocks
    (createItem as jest.Mock).mockReset();
    // Reset store to initial state
    const resetStore = useWizardStore.getState().resetForm;
    resetStore();
  });

  it('should show the create button and open modal when clicked', () => {
    renderWithProviders(<Wizard />);
    
    // Verificar que el botón existe
    const createButton = screen.getByText('Crear Nuevo');
    expect(createButton).toBeInTheDocument();
    
    // Click en el botón y verificar que se abre el modal
    fireEvent.click(createButton);
    expect(screen.getByText('Crear Nuevo - Nombre')).toBeInTheDocument();
  });

  it('should disable next button when name is empty', () => {
    renderWithProviders(<Wizard />);
    
    // Abrir el modal
    fireEvent.click(screen.getByText('Crear Nuevo'));
    
    // Verificar que el botón siguiente está deshabilitado
    const nextButton = screen.getByText('Siguiente');
    expect(nextButton).toBeDisabled();
  });

  it('should enable next button when name is filled', () => {
    renderWithProviders(<Wizard />);
    
    // Abrir el modal
    fireEvent.click(screen.getByText('Crear Nuevo'));
    
    // Llenar el campo nombre
    const nameInput = screen.getByPlaceholderText('Ingrese el nombre...');
    fireEvent.change(nameInput, { target: { value: 'Test Item' } });
    
    // Verificar que el botón siguiente está habilitado
    const nextButton = screen.getByText('Siguiente');
    expect(nextButton).not.toBeDisabled();
  });

  it('should navigate to step 2 when clicking next', () => {
    renderWithProviders(<Wizard />);
    
    // Abrir el modal y llenar el nombre
    fireEvent.click(screen.getByText('Crear Nuevo'));
    const nameInput = screen.getByPlaceholderText('Ingrese el nombre...');
    fireEvent.change(nameInput, { target: { value: 'Test Item' } });
    
    // Ir al siguiente paso
    fireEvent.click(screen.getByText('Siguiente'));
    
    // Verificar que estamos en el paso 2
    expect(screen.getByText('Crear Nuevo - Descripción')).toBeInTheDocument();
  });

  it('should create item when form is complete', async () => {
    // Mock de respuesta exitosa
    (createItem as jest.Mock).mockResolvedValueOnce({
      id: '4',
      name: 'Test Item',
      description: 'Test Description',
    });

    renderWithProviders(<Wizard />);
    
    // Abrir el modal y completar el formulario
    fireEvent.click(screen.getByText('Crear Nuevo'));
    
    // Paso 1: Nombre
    fireEvent.change(screen.getByPlaceholderText('Ingrese el nombre...'), {
      target: { value: 'Test Item' },
    });
    fireEvent.click(screen.getByText('Siguiente'));
    
    // Paso 2: Descripción
    fireEvent.change(screen.getByPlaceholderText('Ingrese la descripción...'), {
      target: { value: 'Test Description' },
    });
    
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

    renderWithProviders(<Wizard />);
    
    // Completar y enviar el formulario
    fireEvent.click(screen.getByText('Crear Nuevo'));
    fireEvent.change(screen.getByPlaceholderText('Ingrese el nombre...'), {
      target: { value: 'Test Item' },
    });
    fireEvent.click(screen.getByText('Siguiente'));
    fireEvent.change(screen.getByPlaceholderText('Ingrese la descripción...'), {
      target: { value: 'Test Description' },
    });
    fireEvent.click(screen.getByText('Crear'));
    
    // Verificar estado de carga
    await waitFor(() => {
      const submitButton = screen.getByRole('button', { name: /Crear|Guardando/i });
      expect(submitButton).toHaveAttribute('disabled');
      expect(submitButton).toHaveTextContent('Guardando...');
    });
  });

  it('should allow navigation back to step 1', () => {
    renderWithProviders(<Wizard />);
    
    // Ir al paso 2
    fireEvent.click(screen.getByText('Crear Nuevo'));
    fireEvent.change(screen.getByPlaceholderText('Ingrese el nombre...'), {
      target: { value: 'Test Item' },
    });
    fireEvent.click(screen.getByText('Siguiente'));
    
    // Volver al paso 1
    fireEvent.click(screen.getByText('Atrás'));
    
    // Verificar que estamos en el paso 1
    expect(screen.getByText('Crear Nuevo - Nombre')).toBeInTheDocument();
    // Verificar que el nombre se mantiene
    expect(screen.getByPlaceholderText('Ingrese el nombre...')).toHaveValue('Test Item');
  });
}); 