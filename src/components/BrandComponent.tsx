import { Card, Image, Text, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { BrandPayload } from "../types";

const BrandComponent = ({ id, name }: BrandPayload) => {
  return (
    <Card maxW="sm" minW={{base: '100%', lg:"300px"}} p={2} as={Link} to={`/brand/${id}`}>
      <Flex flexDirection="row" gap={3} alignItems="center">
        <Image
          w="25px"
          src="/images/brand.jpg"
          alt="Random hotel photo"
          borderRadius="full"
        />
        <Text fontSize={{ base: "xs", lg: "sm" }} fontWeight="bold">
          {name}
        </Text>
      </Flex>
    </Card>
  );
};

export default BrandComponent;
