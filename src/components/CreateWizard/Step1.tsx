import { Input } from '@chakra-ui/react';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { useWizardSlice } from '../../store';

export const Step1 = () => {
  const { formData, setName } = useWizardSlice();

  return (
    <FormControl>
      <FormLabel>Nombre del elemento</FormLabel>
      <Input
        value={formData.name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ingrese el nombre..."
      />
    </FormControl>
  );
}; 