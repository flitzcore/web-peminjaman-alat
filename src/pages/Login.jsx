import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { useDisclosure, useBoolean } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";

import { useSelector, useDispatch } from "react-redux";
import { setAuth } from "../context/AuthSlice";

const Login = () => {
  const isAuthenticated = useSelector((state) => state.isAuthenticated.value);
  const dispatch = useDispatch();
  const [flag, setFlag] = useBoolean(isAuthenticated);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleLogin = () => {
    dispatch(setAuth(true));
    console.log("login");
    onClose(); // This will close the modal
  };
  const handleRegister = () => {
    dispatch(setAuth(true));
    console.log("register");
    onClose(); // This will close the modal
  };
  return (
    <>
      <Button variant="outline" colorScheme="white" onClick={onOpen}>
        Masuk
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        {flag ? (
          <ModalContent>
            <ModalHeader fontSize={"3xl"}>Masuk</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Masuk untuk mengakses peminjaman barang
              <FormControl>
                <FormLabel>Email atau Username</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl>
                <FormLabel>Kata Sandi</FormLabel>
                <Input type="password" />
              </FormControl>
              Belum punya akun?{" "}
              <Button
                onClick={setFlag.toggle}
                variant={"link"}
                colorScheme="blue"
              >
                Daftar disini
              </Button>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="facebook" mx={"auto"} onClick={handleLogin}>
                Masuk
              </Button>
            </ModalFooter>
          </ModalContent>
        ) : (
          <ModalContent>
            <ModalHeader fontSize={"3xl"}>Daftar</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Buat akun Anda sebelum melanjutkan
              <FormControl>
                <FormLabel>Email atau Username</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl>
                <FormLabel>Kata Sandi</FormLabel>
                <Input type="password" />
              </FormControl>
              <FormControl>
                <FormLabel>Konfirmasi kata Sandi</FormLabel>
                <Input type="password" />
              </FormControl>
              Sudah punya akun?{" "}
              <Button
                onClick={setFlag.toggle}
                variant={"link"}
                colorScheme="blue"
              >
                Masuk
              </Button>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="facebook"
                mx={"auto"}
                onClick={handleRegister}
              >
                Buat Akun
              </Button>
            </ModalFooter>
          </ModalContent>
        )}
      </Modal>
    </>
  );
};

export default Login;
