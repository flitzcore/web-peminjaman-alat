import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
} from "@chakra-ui/react";
import { useDisclosure, useBoolean } from "@chakra-ui/react";
import * as Yup from "yup";
import { InputControl, SubmitButton } from "formik-chakra-ui";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";
import { setUser } from "../context/UserSlice";
import { setToken } from "../context/TokenSlice";
import { setAuth } from "../context/AuthSlice";
const Login = () => {
  const isAuthenticated = useSelector((state) => state.isAuthenticated.value);
  const token = useSelector((state) => state.jwtToken.value);
  const dispatch = useDispatch();
  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose,
  } = useDisclosure();
  const {
    isOpen: isRegisterOpen,
    onOpen: onRegisterOpen,
    onClose: onRegisterClose,
  } = useDisclosure();
  const openRegisterModal = () => {
    onLoginClose();
    onRegisterOpen();
  };
  const openLoginModal = () => {
    onRegisterClose();
    onLoginOpen();
  };
  const handleLogin = async (values) => {
    try {
      // Replace with your API endpoint and adjust payload as needed
      const response = await axios.post(
        "http://127.0.0.1:3000/v1/auth/login",
        values
      );
      if (response.data) {
        dispatch(setUser(response.data));
      }
      console.log(response);
      if (response.data.tokens.access.token) {
        dispatch(setAuth(true));
        dispatch(setToken(response.data.tokens.access.token));

        console.log(token);
      }
      onLoginClose();
    } catch (error) {
      console.error(
        "Login failed:",
        error.response ? error.response.data : error.message
      );
      // Handle login failure (show error message, etc.)
    }
  };
  const handleRegister = async (values) => {
    try {
      // Replace with your API endpoint and adjust payload as needed
      const response = await axios.post(
        "http://127.0.0.1:3000/v1/auth/register",
        values
      );
      console.log(response);

      if (response.data) {
        dispatch(setUser(response.data));
      }
      console.log(response);
      if (response.data.tokens.access.token) {
        dispatch(setAuth(true));
        dispatch(setToken(response.data.tokens.access.token));

        console.log(token);
      }
      onRegisterClose();
    } catch (error) {
      console.error(
        "Register failed:",
        error.response ? error.response.data : error.message
      );
      // Handle login failure (show error message, etc.)
    }
  };
  const loginInitialValues = {
    email: "",
    password: "",
  };
  const loginValidationSchema = Yup.object({
    email: Yup.string().required(),
    password: Yup.string().required(),
  });
  const registerInitialValues = {
    name: "",
    email: "",
    password: "",
  };
  const registerValidationSchema = Yup.object({
    name: Yup.string().required(),
    email: Yup.string().required(),
    password: Yup.string().required(),
  });
  return (
    <>
      <Button variant="outline" colorScheme="white" onClick={onLoginOpen}>
        Masuk
      </Button>
      {/* login Modal */}
      <Modal isOpen={isLoginOpen} onClose={onLoginClose}>
        <ModalOverlay />
        <ModalContent>
          <Formik
            initialValues={loginInitialValues}
            onSubmit={handleLogin}
            validationSchema={loginValidationSchema}
          >
            {({ handleSubmit, values, errors }) => (
              <Box as="form" onSubmit={handleSubmit}>
                <ModalHeader fontSize={"3xl"}>Masuk</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  Masuk untuk mengakses peminjaman barang
                  <InputControl name="email" label="Email" />
                  <InputControl
                    inputProps={{ type: "password" }}
                    name="password"
                    label="Kata Sandi"
                  />
                  Belum punya akun?{" "}
                  <Button
                    onClick={openRegisterModal}
                    variant={"link"}
                    colorScheme="blue"
                  >
                    Daftar disini
                  </Button>
                </ModalBody>
                <ModalFooter>
                  <SubmitButton colorScheme="facebook" mx={"auto"}>
                    Masuk
                  </SubmitButton>
                </ModalFooter>
              </Box>
            )}
          </Formik>
        </ModalContent>
      </Modal>
      {/* register Modal */}
      <Modal isOpen={isRegisterOpen} onClose={onRegisterClose}>
        <ModalOverlay />
        <ModalContent>
          <Formik
            initialValues={registerInitialValues}
            onSubmit={handleRegister}
            validationSchema={registerValidationSchema}
          >
            {({ handleSubmit, values, errors }) => (
              <Box as="form" onSubmit={handleSubmit}>
                <ModalHeader fontSize={"3xl"}>Daftar</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  Buat akun Anda sebelum melanjutkan
                  <InputControl name="name" label="Nama" />
                  <InputControl name="email" label="Email" />
                  <InputControl
                    inputProps={{ type: "password" }}
                    name="password"
                    label="Kata Sandi"
                  />
                  Sudah punya akun?{" "}
                  <Button
                    onClick={openLoginModal}
                    variant={"link"}
                    colorScheme="blue"
                  >
                    Masuk
                  </Button>
                </ModalBody>
                <ModalFooter>
                  <SubmitButton colorScheme="facebook" mx={"auto"}>
                    Daftar
                  </SubmitButton>
                </ModalFooter>
              </Box>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Login;
