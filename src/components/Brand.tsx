/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Flex, Text } from "@chakra-ui/react";
import CreateBrand from "./CreateBrand";
import BrandComponent from "./BrandComponent";
import { BrandPayload } from "../types";
import { Loader } from ".";

const Brand = ({
  brands,
  isLoading,
}: {
  brands: BrandPayload;
  isLoading: boolean;
}) => {
  return (
    <Box>
      <Flex w="100%" justifyContent="space-between" alignItems="center" gap={4}>
        <Text fontWeight="bold" align="left" w="100px">
          Top Brands
        </Text>
        <CreateBrand />
      </Flex>

      {isLoading ? (
        <Flex mt={24} justifyContent="center" alignItems="center">
          <Loader />
        </Flex>
      ) : (
        <Flex flexDirection="column" mt={4} gap={6}>
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
      )}
    </Box>
  );
};

export default Brand;
