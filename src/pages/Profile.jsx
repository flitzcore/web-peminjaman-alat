import React from "react";
import { useSelector } from "react-redux";
import { Flex, Text, Image } from "@chakra-ui/react";
const Profile = () => {
  const storedUser = useSelector((state) => state.userData.value);

  return (
    <Flex
      height="100vh" // Full viewport height
      justifyContent="center" // Center horizontally
      alignItems="center" // Center vertically
      flexDirection="column"
    >
      {storedUser && storedUser.user ? (
        <>
          <Text fontSize="4xl" fontWeight="bold">
            Profil
          </Text>
          <Image
            src="/image/pp.jpg" // Replace with your image path
            alt="Descriptive Alt Text"
            w={"10%"}
            mb={4} // Margin bottom for spacing
          />
          <Text fontSize="2xl" fontWeight="medium">
            Nama : {storedUser.user.name}
          </Text>
          <Text fontSize="2xl" fontWeight="medium">
            Email : {storedUser.user.email}
          </Text>
          <Text fontSize="2xl" fontWeight="medium">
            Hak Akses : {storedUser.user.role}
          </Text>
        </>
      ) : (
        <>
          <Image
            src="/image/auth.jpg" // Replace with your image path
            alt="Descriptive Alt Text"
            w={"40%"}
            mb={4} // Margin bottom for spacing
          />
          <Text fontSize="4xl" fontWeight="bold">
            Silahkan masuk untuk mengakses halaman
          </Text>
        </>
      )}
    </Flex>
  );
};

export default Profile;
