import { useEffect, useRef } from "react";
import { useFormValidation } from "../hooks/useFormValidation";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  useDeleteHotel,
  useGetSingleHotel,
  useUpdateHotel,
} from "../services/hotel";
import { useGetAllBrands } from "../services/brand";

import { BiArrowBack } from "react-icons/bi";

import moment from "moment";

import { APIProvider, Map } from "@vis.gl/react-google-maps";

import { BrandPayload, HotelPayload } from "../types";

import { Loader, ErrorText, Divider } from "../components";

import {
  Button as ChakraButton,
  Stack,
  Image,
  Text,
  Flex,
  ButtonGroup,
  Box,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Select,
} from "@chakra-ui/react";

import { toast } from "sonner";

const ViewHotel = () => {
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<HotelPayload>();

  const navigate = useNavigate();

  const cancelRef = useRef<HTMLButtonElement>(null);

  const {
    isOpen: isEditModalOpen,
    onOpen: openEditModal,
    onClose: closeEditModal,
  } = useDisclosure();

  const {
    isOpen: isDeleteModalOpen,
    onOpen: openDeleteModal,
    onClose: closeDeleteModal,
  } = useDisclosure();

  const { isLoading, data } = useGetSingleHotel(id);

  const { data: brands } = useGetAllBrands();

  const {
    DeleteHotel,
    isSuccess: isDeleteSuccess,
    isLoading: isDeleting,
  } = useDeleteHotel();

  const { isLoading: isEditing, UpdateHotel } = useUpdateHotel();

  const { otherValidation } = useFormValidation();

  const onSubmit: SubmitHandler<HotelPayload> = (payload) => {
    if (id) {
      UpdateHotel(
        { id, payload },
        {
          onSuccess: () => {
            closeEditModal();
            toast.success("Hotel updated successfully!");
          },
        }
      );
    }
  };

  useEffect(() => {
    const defaults = {
      name: data?.hotel?.name,
      city: data?.hotel?.city,
      country: data?.hotel?.country,
      brandName: data?.hotel?.brandName,
      address: data?.hotel?.address,
    };
    reset(defaults);
  }, [
    data?.hotel?.address,
    data?.hotel?.brandName,
    data?.hotel?.city,
    data?.hotel?.country,
    data?.hotel?.name,
    reset,
  ]);

  useEffect(() => {
    if (isDeleteSuccess) {
      navigate(-1);
    }
  }, [navigate, isDeleteSuccess]);

  if (isLoading || isDeleting) {
    return (
      <Flex minH="100vh" justifyContent="center" alignItems="center">
        <Loader />
      </Flex>
    );
  }

  return (
    <>
      <Flex py={12} px={{ base: 2, lg: 20 }}>
        <Flex h="40px" w="100%" justifyContent="space-between">
          <ChakraButton
            as={Link}
            to="/home"
            leftIcon={<BiArrowBack />}
            variant="ghost"
          >
            Go back
          </ChakraButton>

          <ButtonGroup>
            <ChakraButton
              onClick={openEditModal}
              size="sm"
              variant="ghost"
              colorScheme="blue"
            >
              Edit hotel
            </ChakraButton>

            <ChakraButton
              colorScheme="red"
              onClick={openDeleteModal}
              size="sm"
              borderRadius="md"
            >
              Delete hotel
            </ChakraButton>
          </ButtonGroup>
        </Flex>
      </Flex>

      <Flex
        w="100%"
        p={4}
        flexDirection={{ base: "column", lg: "row-reverse" }}
        justifyContent="space-around"
        alignItems={{ base: "normal", lg: "center" }}
        gap={6}
      >
        <Image
          src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Green double couch with wooden legs"
          borderRadius="lg"
          w="400px"
        />

        <Stack w={{ base: "100%", lg: "500px" }} spacing={3} fontSize={{ base: "xs", md: "sm" }}>
          <Flex w="100%" justifyContent="space-between">
            <Text fontWeight="bold">Hotel name</Text>
            <Text>{data?.hotel?.name}</Text>
          </Flex>

          <Divider />

          <Flex w="100%" justifyContent="space-between">
            <Text fontWeight="bold">Address</Text>
            <Text align="right">{data?.hotel?.address}</Text>
          </Flex>

          <Divider />

          <Flex w="100%" justifyContent="space-between">
            <Text fontWeight="bold">City</Text>
            <Text>{data?.hotel?.city}</Text>
          </Flex>

          <Divider />

          <Flex w="100%" justifyContent="space-between">
            <Text fontWeight="bold">Country</Text>
            <Text>{data?.hotel?.country}</Text>
          </Flex>

          <Divider />

          <Flex w="100%" justifyContent="space-between">
            <Text fontWeight="bold">Brand</Text>
            <Text>{data?.hotel?.brandName}</Text>
          </Flex>

          <Divider />

          <Flex w="100%" justifyContent="space-between">
            <Text fontWeight="bold">Date created</Text>
            <Text>{moment(data?.card?.createdAt).format("lll")}</Text>
          </Flex>

          <Divider />
        </Stack>
      </Flex>

      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
        <Box px={{ base: 1, lg: 40 }} py={16}>
          <Flex
            height={{ base: "200px", lg: "500px" }}
            border="2px solid"
            borderRadius="40px"
            justifyContent="center"
            alignItems="center"
            overflow="hidden"
            position="relative"
          >
            <Map
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "40px",
              }}
              defaultCenter={{ lat: 22.54992, lng: 0 }}
              defaultZoom={3}
              gestureHandling="greedy"
              disableDefaultUI={true}
            />
          </Flex>
        </Box>
      </APIProvider>

      {/*Edit Hotel Modal */}
      <Modal isOpen={isEditModalOpen} onClose={closeEditModal} isCentered>
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader>Edit hotel</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex flexDirection="column" gap={4}>
                <Box>
                  <FormLabel
                    fontWeight="bold"
                    fontSize={{ base: "xs", md: "md" }}
                  >
                    Hotel name
                  </FormLabel>

                  <Input
                    {...register("name", {
                      ...otherValidation,
                    })}
                    fontSize={{ base: "xs", md: "md" }}
                    placeholder="Provide a name for the event"
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
                    fontSize={{ base: "xs", md: "md" }}
                  >
                    Brand
                  </FormLabel>

                  <Select
                    {...register("brandName", {
                      ...otherValidation,
                    })}
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
                    fontSize={{ base: "xs", md: "md" }}
                  >
                    Country
                  </FormLabel>

                  <Input
                    {...register("country", {
                      ...otherValidation,
                    })}
                    fontSize={{ base: "xs", md: "md" }}
                    placeholder="Provide a name for the event"
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
                    fontSize={{ base: "xs", md: "md" }}
                  >
                    City
                  </FormLabel>

                  <Input
                    {...register("city", {
                      ...otherValidation,
                    })}
                    fontSize={{ base: "xs", md: "md" }}
                    placeholder="Provide a name for the event"
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
                    fontSize={{ base: "xs", md: "md" }}
                  >
                    Address
                  </FormLabel>

                  <Input
                    {...register("address", {
                      ...otherValidation,
                    })}
                    fontSize={{ base: "xs", md: "md" }}
                    placeholder="Provide a name for the event"
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
              <ChakraButton
                bg="#002c8a"
                borderRadius="md"
                color="white"
                _hover={{ bg: "#002c8a" }}
                size="sm"
                isLoading={isEditing}
                isDisabled={isEditing}
                type="submit"
              >
                Update hotel
              </ChakraButton>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>

      {/*Delete Hotel Modal */}

      <AlertDialog
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        leastDestructiveRef={cancelRef}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete hotel
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <ChakraButton
                size="sm"
                onClick={closeDeleteModal}
                ref={cancelRef}
                borderRadius="md"
              >
                Cancel
              </ChakraButton>
              <ChakraButton
                ml={4}
                size="sm"
                borderRadius="md"
                colorScheme="red"
                onClick={() => DeleteHotel(id)}
                isLoading={isDeleting}
                isDisabled={isDeleting}
              >
                Delete
              </ChakraButton>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default ViewHotel;
