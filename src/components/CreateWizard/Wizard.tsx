import { Button } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/modal';
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { useCreateItemMutation } from '../../hooks/useItemsQuery';
import { useWizardStore } from '../../hooks/useWizardStore';

export const Wizard = () => {
  const {
    isOpen,
    currentStep,
    formData,
    openWizard,
    closeWizard,
    nextStep,
    previousStep,
    resetForm,
  } = useWizardStore();

  const createMutation = useCreateItemMutation();

  const handleNext = () => {
    if (currentStep === 1) {
      nextStep();
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => {
          closeWizard();
          resetForm();
        },
      });
    }
  };

  return (
    <>
      <Button onClick={openWizard} colorScheme="blue" marginBottom={4}>
        Crear Nuevo
      </Button>

      <Modal isOpen={isOpen} onClose={closeWizard}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {currentStep === 1 ? 'Crear Nuevo - Nombre' : 'Crear Nuevo - Descripción'}
          </ModalHeader>

          <ModalBody>
            {currentStep === 1 ? <Step1 /> : <Step2 />}
          </ModalBody>

          <ModalFooter>
            {currentStep === 1 ? (
              <>
                <Button onClick={closeWizard} mr={3}>
                  Cancelar
                </Button>
                <Button
                  colorScheme="blue"
                  onClick={handleNext}
                  isDisabled={!formData.name.trim()}
                >
                  Siguiente
                </Button>
              </>
            ) : (
              <>
                <Button onClick={previousStep} mr={3}>
                  Atrás
                </Button>
                <Button
                  colorScheme="blue"
                  onClick={handleNext}
                  isLoading={createMutation.isPending}
                  loadingText="Guardando..."
                >
                  Crear
                </Button>
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}; 