/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Flex, Text } from "@chakra-ui/react";
import CreateBrand from "./CreateBrand";
import BrandComponent from "./BrandComponent";

const Brand = ({ brands }: any) => {
  return (
    <Box>
      <Flex w="100%" justifyContent="space-between">
        <Text fontWeight="bold">Top Brands</Text>
        <CreateBrand />
      </Flex>

      <Flex flexDirection="column" gap={6}>
        {brands?.brands?.map((brand: any) => (
          <BrandComponent
            key={brand.id}
            id={brand.id}
            name={brand.name}
            hq={""}
            ceo={""}
          />
        ))}
      </Flex>
    </Box>
  );
};

export default Brand;
