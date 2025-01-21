# Demostración de Zustand + React Query

## 🎯 Descripción General

Esta aplicación es una demostración práctica que muestra la integración de Zustand para gestión de estado y React Query para manejo de datos del servidor, implementando un CRUD básico con una interfaz de usuario moderna usando Chakra UI.

## 💾 Gestión de Estado con Zustand

### Arquitectura del Store

El store está organizado en slices para mejor mantenibilidad y separación de responsabilidades:

1. **items.ts**: Gestión de la tabla y filtros

   - Paginación y tamaño de página
   - Filtros de búsqueda
   - Estado persistente entre componentes
   - Acciones relacionadas con items

2. **wizard.ts**: Gestión del formulario multi-paso
   - Estado del modal (abierto/cerrado)
   - Navegación entre pasos
   - Validación y persistencia de datos del formulario
   - Acciones de reset y actualización

### Ventajas de Zustand

- **Simplicidad**: API minimalista y fácil de entender
- **Performance**: Actualizaciones selectivas, solo re-renderiza lo necesario
- **TypeScript**: Soporte nativo para tipos
- **DevTools**: Integración con Redux DevTools para debugging
- **Middleware**: Fácil de extender con middleware como `devtools`

## 🔄 Gestión de Datos con React Query

### Características

1. **Queries**:

   - Obtención de datos paginados
   - Caché automática
   - Revalidación inteligente
   - Estado de carga y error

2. **Mutations**:
   - Creación de nuevos elementos
   - Invalidación automática de caché
   - Manejo de estado de la mutación

### Beneficios de React Query

- **Caché Inteligente**: Reduce llamadas al servidor
- **Stale-While-Revalidate**: Muestra datos mientras actualiza en background
- **Optimistic Updates**: Mejor experiencia de usuario
- **DevTools**: Panel de desarrollo integrado

## 🧪 Testing

### Mock de Zustand

Se implementa un mock personalizado de Zustand (`src/__mocks__/zustand.ts`) que:

- Permite crear stores de prueba con estado inicial
- Proporciona funciones de reset automático entre tests
- Integra con `act` de React Testing Library
- Mantiene el estado consistente durante los tests

### Tests de React Query

Los tests de React Query (`src/hooks/__tests__`) demuestran:

- Configuración del QueryClient para testing
- Mock de llamadas a API
- Verificación de estados de carga y éxito
- Pruebas de mutaciones y queries
- Manejo de caché y revalidación

### Tests de Componentes

Se implementan tests para:

- Formulario wizard multi-paso
- Componentes de tabla y filtros
- Integración de stores y queries
- Comportamiento de UI y estados

## 🛠 Herramientas de Desarrollo

### React Query DevTools

- **Panel de Queries**: Muestra todas las queries activas
- **Estado de Caché**: Visualiza el estado de la caché
- **Debugging**: Herramientas para depurar queries y mutations
- **Tiempo Real**: Actualización en vivo de estados y datos

### Redux DevTools

- **Time-Travel Debugging**: Navega por el historial de cambios
- **Action Log**: Registro de todas las acciones
- **State Diff**: Visualiza diferencias entre estados
- **Export/Import**: Guarda y carga estados para debugging

## 📚 Recursos Adicionales

- [Documentación de Zustand](https://github.com/pmndrs/zustand)
- [Documentación de React Query](https://tanstack.com/query/latest)
