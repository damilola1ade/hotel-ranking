import { Flex, Image } from "@chakra-ui/react";

const NavBar = () => {
  return (
    <Flex w="100%" justifyContent="space-between" alignItems="center" gap={4}>
      <Image
        src="/images/hotely.png"
        w={{ base: "72px", lg: "100px" }}
        alt="logo"
        loading="eager"
      />
    </Flex>
  );
};

export default NavBar;
