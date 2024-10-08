import { Flex, HStack, Image, StackDivider } from "@chakra-ui/react";

import { Brand, Hotel } from "../components";

import { useGetAllBrands } from "../services/brand";

const Home = () => {
  const { data: brands } = useGetAllBrands();

  return (
    <Flex p={4} flexDirection="column" gap={{ base: 12, md: 24 }}>
      <Flex w="100%" justifyContent="space-between" alignItems="center" gap={4}>
        <Image
          src="/images/logo.png"
          w={{ base: "100px", lg: "144px" }}
          loading="eager"
        />
      </Flex>

      <HStack
        divider={<StackDivider borderColor="gray.400" />}
        flexDirection={{ base: "column", lg: "row" }}
        align="stretch"
        gap={6}
      >
        <Hotel brands={brands} />
        <Brand brands={brands} name={""} hq={""} ceo={""} />
      </HStack>
    </Flex>
  );
};

export default Home;
