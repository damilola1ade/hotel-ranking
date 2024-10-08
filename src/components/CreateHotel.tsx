import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Flex,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import { BrandPayload, HotelPayload } from "../types";
import Button from "./Button";
import { ErrorText } from ".";
import { useFormValidation } from "../hooks/useFormValidation";

import { useGetAllBrands } from "../services/brand";

import { useCreateHotelMutation } from "../services/hotel";

const CreateHotel = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<HotelPayload>();

  const { isLoading, CreateHotel } = useCreateHotelMutation();

  const { otherValidation } = useFormValidation();

  const { data: brands } = useGetAllBrands();

  const onSubmit: SubmitHandler<HotelPayload> = (payload) => {
    CreateHotel(payload, {
      onSuccess: () => {
        onClose();
        toast.success("Hotel created successfully!");
        reset();
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    });
  };

  return (
    <>
      <Button onClick={onOpen}>Create hotel</Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader textAlign="center">Create brand</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex flexDirection="column" gap={4}>
                <Box>
                  <FormLabel
                    fontWeight="bold"
                    fontSize={{ base: "xs", md: "sm" }}
                  >
                    Hotel name
                  </FormLabel>

                  <Input
                    {...register("name", {
                      ...otherValidation,
                    })}
                    fontSize={{ base: "xs", md: "sm" }}
                    height="50px"
                    borderRadius="sm"
                    type="text"
                    borderColor={errors.name && "red"}
                  />
                  {errors.name && <ErrorText error={errors.name.message} />}
                </Box>

                <Box>
                  <FormLabel
                    fontWeight="bold"
                    fontSize={{ base: "xs", md: "sm" }}
                  >
                    Brand
                  </FormLabel>

                  <Select
                    {...register("brandName", {
                      ...otherValidation,
                    })}
                    placeholder="Select brand"
                    height="50px"
                    borderRadius="sm"
                  >
                    {brands?.brands?.map((brand: BrandPayload, idx: string) => (
                      <option value={brand.name} key={idx}>
                        {brand.name}
                      </option>
                    ))}
                  </Select>
                  {errors.brandName && (
                    <ErrorText error={errors.brandName.message} />
                  )}
                </Box>

                <Box>
                  <FormLabel
                    fontWeight="bold"
                    fontSize={{ base: "xs", md: "sm" }}
                  >
                    Country
                  </FormLabel>

                  <Input
                    {...register("country", {
                      ...otherValidation,
                    })}
                    fontSize={{ base: "xs", md: "sm" }}
                    height="50px"
                    borderRadius="sm"
                    type="text"
                    borderColor={errors.country && "red"}
                  />
                  {errors.country && (
                    <ErrorText error={errors.country.message} />
                  )}
                </Box>

                <Box>
                  <FormLabel
                    fontWeight="bold"
                    fontSize={{ base: "xs", md: "sm" }}
                  >
                    City
                  </FormLabel>

                  <Input
                    {...register("city", {
                      ...otherValidation,
                    })}
                    fontSize={{ base: "xs", md: "sm" }}
                    height="50px"
                    borderRadius="sm"
                    type="text"
                    borderColor={errors.city && "red"}
                  />
                  {errors.city && <ErrorText error={errors.city.message} />}
                </Box>

                <Box>
                  <FormLabel
                    fontWeight="bold"
                    fontSize={{ base: "xs", md: "sm" }}
                  >
                    Address
                  </FormLabel>

                  <Input
                    {...register("address", {
                      ...otherValidation,
                    })}
                    fontSize={{ base: "xs", md: "sm" }}
                    height="50px"
                    borderRadius="sm"
                    type="text"
                    borderColor={errors.address && "red"}
                  />
                  {errors.address && (
                    <ErrorText error={errors.address.message} />
                  )}
                </Box>
              </Flex>
            </ModalBody>

            <ModalFooter bg="gray.200" borderRadius="md">
              <Button
                isLoading={isLoading}
                isDisabled={isLoading}
                type="submit"
              >
                Create hotel
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default CreateHotel;
