/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetHotelsByBrand } from "../services/hotel";

import { BrandPayload, HotelPayload } from "../types";

import { Flex, SimpleGrid, Text } from "@chakra-ui/react";

import CreateHotel from "./CreateHotel";
import HotelComponent from "./HotelComponent";
import Loader from "./Loader";

import Select from "react-select";

const Hotel = ({ brands }: { brands: BrandPayload }) => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const { data: hotels, isLoading } = useGetHotelsByBrand(selectedBrands);

  const handleBrandChange = (selectedOptions: any) => {
    setSelectedBrands(
      selectedOptions.map((option: { value: string }) => option.value)
    );
  };

  return (
    <Flex flexDirection="column" w="100%" gap={6}>
      <Text fontWeight="bold" fontSize="xl">
        Top Hotels
      </Text>
      <Flex
        w="100%"
        justifyContent={{ base: "normal", md: "space-between" }}
        alignItems="center"
        flexDirection={{ base: "column-reverse", md: "row" }}
        gap={{ base: 4, lg: 0 }}
      >
        <Flex alignItems="center" gap={1}>
          <Text fontSize={{ base: "xs", lg: "sm" }} fontWeight="semibold">
            Sort by brands:
          </Text>
          <Select
            isMulti
            options={brands?.brands?.map((brand: BrandPayload) => ({
              value: brand.name,
              label: brand.name,
            }))}
            value={selectedBrands.map((brand) => ({
              value: brand,
              label: brand,
            }))}
            onChange={handleBrandChange}
            className="react-select"
            placeholder="Select brands to filter"
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                borderColor: "black",
                minHeight: "10px",
                minWidth: "150px",
                fontSize: "12px",
              }),
            }}
          />
        </Flex>
        <CreateHotel />
      </Flex>

      {selectedBrands.length > 0 ? (
        <Text fontSize={{ base: "xs", lg: "sm" }}>
          Showing results for:{" "}
          <Text as="span" fontWeight="bold" fontSize={{ base: "xs", lg: "sm" }}>
            {selectedBrands.join(", ")}
          </Text>
        </Text>
      ) : null}

      {!isLoading && !brands?.brands?.length && (
        <Text fontSize={{ base: "xs", lg: "sm" }} fontWeight="bold" mt={12}>
          You must create a brand before creating a hotel
        </Text>
      )}

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
