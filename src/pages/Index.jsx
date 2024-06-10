import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  List,
  ListItem,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaTrash, FaEdit } from "react-icons/fa";

const Index = () => {
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleAddOrUpdateTransaction = () => {
    if (editIndex !== null) {
      const updatedTransactions = transactions.map((transaction, index) =>
        index === editIndex ? { description, amount: parseFloat(amount) } : transaction
      );
      setTransactions(updatedTransactions);
      setEditIndex(null);
    } else {
      setTransactions([...transactions, { description, amount: parseFloat(amount) }]);
    }
    setDescription("");
    setAmount("");
  };

  const handleEditTransaction = (index) => {
    setEditIndex(index);
    setDescription(transactions[index].description);
    setAmount(transactions[index].amount);
  };

  const handleDeleteTransaction = (index) => {
    const updatedTransactions = transactions.filter((_, i) => i !== index);
    setTransactions(updatedTransactions);
  };

  const totalAmount = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);

  return (
    <Container maxW="container.md" py={10}>
      <Heading as="h1" mb={6} textAlign="center">
        Transaction Manager
      </Heading>
      <Flex mb={6} justifyContent="space-between">
        <Box>
          <FormControl id="description" mb={4}>
            <FormLabel>Description</FormLabel>
            <Input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>
          <FormControl id="amount" mb={4}>
            <FormLabel>Amount</FormLabel>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </FormControl>
          <Button onClick={handleAddOrUpdateTransaction} colorScheme="teal">
            {editIndex !== null ? "Update Transaction" : "Add Transaction"}
          </Button>
        </Box>
        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Total: ${totalAmount.toFixed(2)}
          </Heading>
        </Box>
      </Flex>
      <Box>
        <Heading as="h2" size="md" mb={4}>
          Transactions
        </Heading>
        <List spacing={3}>
          {transactions.map((transaction, index) => (
            <ListItem key={index} p={3} borderWidth="1px" borderRadius="md">
              <Flex justifyContent="space-between" alignItems="center">
                <Box>
                  <Text fontWeight="bold">{transaction.description}</Text>
                  <Text>${transaction.amount.toFixed(2)}</Text>
                </Box>
                <Box>
                  <Button
                    size="sm"
                    mr={2}
                    onClick={() => handleEditTransaction(index)}
                    leftIcon={<FaEdit />}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => handleDeleteTransaction(index)}
                    leftIcon={<FaTrash />}
                  >
                    Delete
                  </Button>
                </Box>
              </Flex>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default Index;