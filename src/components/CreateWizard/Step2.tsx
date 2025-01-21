import { Textarea } from '@chakra-ui/react';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { useWizardSlice } from '../../store';

export const Step2 = () => {
  const { formData, setDescription } = useWizardSlice();

  return (
    <FormControl>
      <FormLabel>Descripción del elemento</FormLabel>
      <Textarea
        value={formData.description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Ingrese la descripción..."
      />
    </FormControl>
  );
}; 