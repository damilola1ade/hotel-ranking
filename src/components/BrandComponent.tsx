import { Card, Image, Text, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { BrandPayload } from "../types";

const BrandComponent = ({ id, name }: BrandPayload) => {
  return (
    <Card maxW="sm" w="300px" p={2} as={Link} to={`/brand/${id}`}>
      <Flex flexDirection="row" gap={3} alignItems="center">
        <Image
          w="50px"
          src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Text fontSize={{ base: "xs", lg: "sm" }} fontWeight="bold">
          {name}
        </Text>
      </Flex>
    </Card>
  );
};

export default BrandComponent;
