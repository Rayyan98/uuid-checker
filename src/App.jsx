import { useState } from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  Button, 
  Text, 
  VStack,
  Input,
  useToast as chakraToast
} from '@chakra-ui/react';
import { validate as uuidValidate } from 'uuid';
import ReactConfetti from 'react-confetti';
function App() {
  const [uuid, setUuid] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const toast = chakraToast();

  const isValidUUID = (value) => {
    return uuidValidate(value);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    
    if (!uuid.trim()) {
      toast({
        title: 'UUID is required',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    if (!isValidUUID(uuid)) {
      toast({
        title: 'Invalid UUID',
        description: 'Please enter a valid UUID',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    setIsValidated(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  const handleInputChange = (e) => {
    setUuid(e.target.value);
    setIsValidated(false);
  };

  return (
    <Container maxW="container.md" py={10} minH="100vh">
      {showConfetti && <ReactConfetti />}
      
      <VStack spacing={8} w="100%">
        <Heading 
          mb={6} 
          color="skyBlue.500"
          size="xl"
        >
          UUID Checker
        </Heading>
        
        <Box
          p={8}
          borderRadius="lg"
          boxShadow="lg"
          bg="white"
          w="100%"
        >
          <VStack spacing={4}>
            <Text fontSize="2xl" color="gray.600">
              {uuid && (isValidUUID(uuid) ? '😊' : '☹️')}
            </Text>
            
            <Input
              value={uuid}
              onChange={handleInputChange}
              placeholder="Enter UUID here..."
              size="lg"
            />
            
            <Button
              onClick={handleSubmit}
              size="lg"
              width="full"
              isDisabled={!isValidUUID(uuid)}
            >
              Check UUID
            </Button>

            {isValidated && (
              <Text
                mt={4}
                p={4}
                bg="green.50"
                color="green.600"
                borderRadius="md"
                fontWeight="medium"
                w="100%"
                textAlign="center"
              >
                UUID {uuid} is not used with 99.99% confidence
              </Text>
            )}
          </VStack>
        </Box>
        
        <Text color="gray.600" fontSize="sm">
          Enter a valid UUID to check if it's already in use
        </Text>
      </VStack>
    </Container>
  );
}

export default App
