import { HStack, StackDivider } from "@chakra-ui/react";

import { Brand, Hotel } from "../components";

import { useGetAllBrands } from "../services/brand";

const Home = () => {
  const { data: brands, isLoading } = useGetAllBrands();

  return (
    <HStack
      divider={<StackDivider borderColor="gray.400" />}
      flexDirection={{ base: "column", lg: "row" }}
      align="stretch"
      gap={10}
    >
      <Hotel brands={brands} />
      <Brand brands={brands} isLoading={isLoading} />
    </HStack>
  );
};

export default Home;
