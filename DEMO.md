# Demostración de Zustand + React Query

## 🎯 Descripción General

Esta aplicación es una demostración práctica que muestra la integración de Zustand para gestión de estado y React Query para manejo de datos del servidor, implementando un CRUD básico con una interfaz de usuario moderna usando Chakra UI.

## 💾 Gestión de Estado con Zustand

### Stores Implementados

1. **ItemsStore**: Maneja el estado de la tabla y filtros

   - Paginación
   - Tamaño de página
   - Filtros de búsqueda
   - Acciones para modificar el estado
   - Estado persistente entre componentes

2. **WizardStore**: Gestiona el flujo del formulario de creación
   - Estado del modal (abierto/cerrado)
   - Paso actual del wizard
   - Datos del formulario
   - Navegación entre pasos
   - Reset del formulario

### Ventajas de Zustand

- **Simplicidad**: API minimalista y fácil de entender
- **Performance**: Actualizaciones selectivas, solo re-renderiza lo necesario
- **TypeScript**: Soporte nativo para tipos
- **DevTools**: Integración con Redux DevTools para debugging
- **Middleware**: Fácil de extender con middleware como `devtools`

## 🔄 Gestión de Datos con React Query

### Características Implementadas

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

## 🛠 Herramientas de Desarrollo

### Store Inspector

- **Visualización en Tiempo Real**: Muestra el estado actual de todos los stores
- **Interfaz Amigable**:
  - Pestañas organizadas por store
  - Valores formateados y legibles
  - Actualización automática
  - Colapsable para no interferir

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
