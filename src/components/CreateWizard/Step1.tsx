import { Input } from '@chakra-ui/react';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { useWizardStore } from '../../hooks/useWizardStore';

export const Step1 = () => {
  const { formData, setName } = useWizardStore();

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