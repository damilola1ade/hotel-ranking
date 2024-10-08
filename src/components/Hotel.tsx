import { useState } from "react";
import { useGetHotelsByBrand } from "../services/hotel";

import { BrandPayload, HotelPayload } from "../types";

import { Flex, Select, SimpleGrid, Text, Tooltip } from "@chakra-ui/react";

import { MdOutlineClear } from "react-icons/md";

import CreateHotel from "./CreateHotel";
import HotelComponent from "./HotelComponent";
import Loader from "./Loader";

const Hotel = ({ brands }: { brands: BrandPayload }) => {
  const [selectedBrand, setSelectedBrand] = useState<string>("");

  const { data: hotels, isLoading } = useGetHotelsByBrand(selectedBrand);

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBrand(e.target.value);
  };

  return (
    <Flex flexDirection="column" w="100%" gap={6}>
      <Text fontWeight="bold" fontSize="xl">
        Top Hotels
      </Text>
      <Flex
        w="100%"
        justifyContent={{ base: "normal", lg: "space-between" }}
        alignItems="center"
        gap={{ base: 4, lg: 0 }}
      >
        <Flex alignItems="center" gap={1}>
          <Text fontSize={{ base: "xs", lg: "sm" }} fontWeight="semibold">
            Sort by brands:
          </Text>
          <Select
            value={selectedBrand}
            onChange={handleBrandChange}
            w={{ base: "150px", lg: "150px" }}
            h="30px"
            fontSize="sm"
            borderColor="black"
            placeholder="Select brand"
          >
            {brands?.brands?.map((brand: BrandPayload) => (
              <option value={brand.name}>{brand.name}</option>
            ))}
          </Select>

          {selectedBrand && (
            <Tooltip label="Clear filter" shouldWrapChildren>
              <MdOutlineClear
                onClick={() => setSelectedBrand("")}
                cursor="pointer"
                size={25}
              />
            </Tooltip>
          )}
        </Flex>
        <CreateHotel />
      </Flex>

      {selectedBrand ? (
        hotels?.hotels?.length === 0 ? (
          <Text fontSize={{ base: "xs", lg: "sm" }}>
            No results found for:{" "}
            <Text
              as="span"
              fontWeight="bold"
              fontSize={{ base: "xs", lg: "sm" }}
            >
              {selectedBrand}
            </Text>
          </Text>
        ) : (
          <Text fontSize={{ base: "xs", lg: "sm" }}>
            Showing results for:{" "}
            <Text
              as="span"
              fontWeight="bold"
              fontSize={{ base: "xs", lg: "sm" }}
            >
              {selectedBrand}
            </Text>
          </Text>
        )
      ) : null}

      {isLoading ? (
        <Flex mt={24} justifyContent="center" alignItems="center">
          <Loader />
        </Flex>
      ) : (
        <SimpleGrid columns={[1, 2, 3]} spacing={6}>
          {hotels?.hotels?.map((hotel: HotelPayload) => (
            <HotelComponent
              key={hotel.id}
              id={hotel.id}
              name={hotel.name}
              country={hotel.country}
              city={hotel.city}
              address={hotel.address}
              brand={[]}
              brandName={""}
            />
          ))}
        </SimpleGrid>
      )}
    </Flex>
  );
};

export default Hotel;
