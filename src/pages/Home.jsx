import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Image,
  VStack,
  HStack,
  Text,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import * as Yup from "yup";
import {
  InputControl,
  NumberInputControl,
  SubmitButton,
} from "formik-chakra-ui";
import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import axios from "axios";
const ListItem = ({ item, onDelete }) => {
  return (
    <Box m={7} w={"70%"}>
      <HStack justifyContent="space-between">
        <Text>Nama: {item.name}</Text>
        <Text>Stock: {item.stock}</Text>
        <Button colorScheme="red" onClick={() => onDelete(item.id)}>
          Hapus
        </Button>
      </HStack>
    </Box>
  );
};
const Home = () => {
  const storedUser = useSelector((state) => state.userData.value);
  const [items, setItems] = useState([]);
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();
  useEffect(() => {
    if (storedUser) fetchItem();
  }, [storedUser]);
  const fetchItem = async () => {
    try {
      // Replace with your API endpoint and adjust payload as needed
      const response = await axios.get("http://127.0.0.1:3000/v1/inventory", {
        headers: {
          Authorization: `Bearer ${storedUser.tokens.access.token}`,
        },
      });
      const items = response.data;
      if (response && response.data) {
        setItems(items);
      }
    } catch (error) {
      console.error(
        "Add item failed:",
        error.response ? error.response.data : error.message
      );
      // Handle login failure (show error message, etc.)
    }
  };
  const addItem = async (values) => {
    try {
      // Replace with your API endpoint and adjust payload as needed
      const response = await axios.post(
        "http://127.0.0.1:3000/v1/inventory",
        values,
        {
          headers: {
            Authorization: `Bearer ${storedUser.tokens.access.token}`,
          },
        }
      );

      console.log(response);
      fetchItem();
    } catch (error) {
      console.error(
        "Add item failed:",
        error.response ? error.response.data : error.message
      );
      // Handle login failure (show error message, etc.)
    }
    // const newItem = {
    //   name: `Item ${items.length + 1}`,
    //   stock: Math.floor(Math.random() * 100), // Random stock number for demonstration
    // };
    // setItems([...items, newItem]);
  };
  const deleteItem = async (itemId) => {
    try {
      // Replace with your API endpoint and adjust payload as needed
      const response = await axios.delete(
        "http://127.0.0.1:3000/v1/inventory/" + itemId,
        {
          headers: {
            Authorization: `Bearer ${storedUser.tokens.access.token}`,
          },
        }
      );
      fetchItem();
    } catch (error) {
      console.error(
        "Delete item failed:",
        error.response ? error.response.data : error.message
      );
      // Handle login failure (show error message, etc.)
    }
    // const newItem = {
    //   name: `Item ${items.length + 1}`,
    //   stock: Math.floor(Math.random() * 100), // Random stock number for demonstration
    // };
    // setItems([...items, newItem]);
  };
  const addItemInitialValues = {
    name: "",
    stock: 0,
  };
  const addItemValidationSchema = Yup.object({
    name: Yup.string().required(),
    stock: Yup.number().required(),
  });

  return (
    <>
      {storedUser && storedUser.user ? (
        <>
          <Box mt={"30px"} mx={"10%"} w={"100vw"}>
            <Text fontSize="3xl" fontWeight="bold">
              Daftar Barang
            </Text>
            <Button colorScheme="facebook" onClick={onAddOpen}>
              Tambah Barang
            </Button>
            {items.map((item, index) => (
              <ListItem
                onDelete={deleteItem}
                item={item}
                key={index}
              ></ListItem>
            ))}
            <Modal isOpen={isAddOpen} onClose={onAddClose}>
              <ModalOverlay />
              <ModalContent>
                <Formik
                  initialValues={addItemInitialValues}
                  onSubmit={addItem}
                  validationSchema={addItemValidationSchema}
                >
                  {({ handleSubmit, values, errors }) => (
                    <Box as="form" onSubmit={handleSubmit}>
                      <ModalHeader fontSize={"3xl"}>Tambah Barang</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <InputControl name="name" label="Nama Barang" />
                        <NumberInputControl name="stock" label="Jumlah" />
                      </ModalBody>
                      <ModalFooter>
                        <SubmitButton colorScheme="facebook" mx={"auto"}>
                          Tambah
                        </SubmitButton>
                      </ModalFooter>
                    </Box>
                  )}
                </Formik>
              </ModalContent>
            </Modal>
          </Box>
        </>
      ) : (
        <>
          <Flex
            justifyContent="center" // Center horizontally
            alignItems="center" // Center vertically
            flexDirection="column"
          >
            <Image
              src="/image/auth.jpg" // Replace with your image path
              alt="Descriptive Alt Text"
              w={"40%"}
              mb={4} // Margin bottom for spacing
            />
            <Text fontSize="4xl" fontWeight="bold">
              Silahkan masuk untuk mengakses halaman
            </Text>
          </Flex>
        </>
      )}
    </>
  );
};

export default Home;
