import { VStack } from "@chakra-ui/react";

export default function WindowContainer({ children, ...props }) {
  return (
    <VStack
      bg={'purple.900'}
      w="full"
      minH="100Vh"
      p={4}
      alignContent="center"
      justifyContent="space-between"
      {...props}
    >
      {children}
    </VStack>
  );
}