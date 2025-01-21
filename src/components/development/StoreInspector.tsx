import {
  Box,
  Code,
  Collapse,
  Heading,
  IconButton,
  Text,
  useDisclosure,
  VStack,
  Tooltip,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { useItemsStore } from '../../hooks/useItemsStore';
import { useWizardStore } from '../../hooks/useWizardStore';
import { useEffect, useState } from 'react';

interface StoreSnapshot {
  name: string;
  state: Record<string, unknown>;
}

export const StoreInspector = () => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: false });
  const itemsStore = useItemsStore();
  const wizardStore = useWizardStore();
  const [snapshots, setSnapshots] = useState<StoreSnapshot[]>([]);

  // Actualizar los snapshots cada vez que cambien los stores
  useEffect(() => {
    const storesData: StoreSnapshot[] = [
      {
        name: 'Items Store',
        state: Object.fromEntries(
          Object.entries(itemsStore).filter(
            ([, value]) => typeof value !== 'function'
          )
        ),
      },
      {
        name: 'Wizard Store',
        state: Object.fromEntries(
          Object.entries(wizardStore).filter(
            ([, value]) => typeof value !== 'function'
          )
        ),
      },
    ];
    setSnapshots(storesData);
  }, [itemsStore, wizardStore]);

  return (
    <Box
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      bg="gray.900"
      color="white"
      p={4}
      zIndex={1000}
      borderTop="4px solid"
      borderColor="blue.500"
      boxShadow="0 -4px 6px -1px rgba(0, 0, 0, 0.1)"
    >
      <Box 
        display="flex" 
        alignItems="center" 
        justifyContent="space-between" 
        mb={2}
        cursor="pointer"
        onClick={onToggle}
        _hover={{ bg: 'whiteAlpha.100' }}
        p={2}
        borderRadius="md"
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Heading size="sm">Store Inspector</Heading>
          <Text fontSize="sm" color="gray.400">
            ({isOpen ? 'Click para ocultar' : 'Click para ver el estado'})
          </Text>
        </Box>
        <Tooltip label={isOpen ? 'Ocultar estado' : 'Mostrar estado'}>
          <IconButton
            aria-label="Toggle inspector"
            size="sm"
            icon={isOpen ? <ChevronDownIcon /> : <ChevronUpIcon />}
            variant="ghost"
            color="white"
            _hover={{ bg: 'whiteAlpha.200' }}
          />
        </Tooltip>
      </Box>

      <Collapse in={isOpen}>
        <Tabs variant="soft-rounded" colorScheme="blue" mt={4}>
          <TabList>
            {snapshots.map((snapshot) => (
              <Tab
                key={snapshot.name}
                color="gray.300"
                _selected={{ color: 'white', bg: 'blue.500' }}
              >
                {snapshot.name}
              </Tab>
            ))}
          </TabList>

          <TabPanels>
            {snapshots.map((snapshot) => (
              <TabPanel key={snapshot.name} p={4}>
                <VStack align="stretch" spacing={2}>
                  {Object.entries(snapshot.state).map(([key, value]) => (
                    <Box 
                      key={key} 
                      display="flex" 
                      gap={2}
                      p={2}
                      borderRadius="md"
                      bg="gray.800"
                      borderLeft="3px solid"
                      borderLeftColor="blue.400"
                    >
                      <Text fontWeight="bold" color="blue.300" minWidth="80px">
                        {key}:
                      </Text>
                      <Code 
                        bg="transparent"
                        color="green.300"
                        fontSize="sm"
                        fontFamily="mono"
                        letterSpacing="wide"
                      >
                        {JSON.stringify(value, null, 2)}
                      </Code>
                    </Box>
                  ))}
                </VStack>
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Collapse>
    </Box>
  );
}; 