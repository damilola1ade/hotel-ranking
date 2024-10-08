import { Card, CardBody, Image, Text, Flex } from "@chakra-ui/react";

import { MdLocationPin } from "react-icons/md";

import { HotelPayload } from "../types";
import { Link } from "react-router-dom";

const HotelComponent = ({ id, name, country, city }: HotelPayload) => {
  return (
    <Card
      maxW="md"
      as={Link}
      to={`/hotel/${id}`}
      _hover={{ transform: "scale(1.05)" }}
      transition="all 0.3s ease"
    >
      <CardBody>
        <Flex alignItems="center" justifyContent="flex-end" mb={4}>
          <MdLocationPin color="red" />
          <Text
            fontSize={{ base: "2xs", lg: "sm" }}
          >{` ${city}, ${country}`}</Text>
        </Flex>
        <Image
          src="/images/hotel.jpg"
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />

        <Text mt={4} fontSize={{ base: "xs", lg: "sm" }} fontWeight="bold">
          {name}
        </Text>
      </CardBody>
    </Card>
  );
};

export default HotelComponent;
