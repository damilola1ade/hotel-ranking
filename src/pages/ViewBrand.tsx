import { useEffect, useRef } from "react";
import { useFormValidation } from "../hooks/useFormValidation";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  useDeleteBrand,
  useGetSingleBrand,
  useUpdateBrand,
} from "../services/brand";

import { BiArrowBack } from "react-icons/bi";

import moment from "moment";

import { BrandPayload } from "../types";

import { Loader, ErrorText, Divider, Button } from "../components";

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
} from "@chakra-ui/react";

import { toast } from "sonner";

const ViewBrand = () => {
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BrandPayload>();

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

  const { isLoading, data } = useGetSingleBrand(id);

  const {
    DeleteBrand,
    isSuccess: isDeleteSuccess,
    isLoading: isDeleting,
  } = useDeleteBrand();

  const { isLoading: isEditing, UpdateBrand } = useUpdateBrand();

  const { otherValidation } = useFormValidation();

  const onSubmit: SubmitHandler<BrandPayload> = (payload) => {
    if (id) {
      UpdateBrand(
        { id, payload },
        {
          onSuccess: () => {
            closeEditModal();
            toast.success("Brand updated successfully!");
          },
        }
      );
    }
  };

  useEffect(() => {
    const defaults = {
      name: data?.brand?.name,
      ceo: data?.brand?.ceo,
      hq: data?.brand?.hq,
    };
    reset(defaults);
  }, [data?.brand?.hq, data?.brand?.name, data?.brand?.ceo, reset]);

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
              Edit brand
            </ChakraButton>

            <ChakraButton
              colorScheme="red"
              onClick={openDeleteModal}
              borderRadius="md"
              size="sm"
            >
              Delete brand
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
        fontSize={{ base: "xs", lg: "sm" }}
      >
        <Image
          src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Green double couch with wooden legs"
          borderRadius="lg"
          w="400px"
        />

        <Stack w={{ base: "100%", lg: "500px" }} spacing={3}>
          <Flex w="100%" justifyContent="space-between">
            <Text fontWeight="bold">Brand name</Text>
            <Text>{data?.brand?.name}</Text>
          </Flex>

          <Divider />

          <Flex w="100%" justifyContent="space-between">
            <Text fontWeight="bold">CEO</Text>
            <Text align="right">{data?.brand?.ceo}</Text>
          </Flex>

          <Divider />

          <Flex w="100%" justifyContent="space-between">
            <Text fontWeight="bold">Headquarters</Text>
            <Text>{data?.brand?.hq}</Text>
          </Flex>

          <Divider />

          <Flex w="100%" justifyContent="space-between">
            <Text fontWeight="bold">Date created</Text>
            <Text>{moment(data?.card?.createdAt).format("lll")}</Text>
          </Flex>
        </Stack>
      </Flex>

      {/*Edit Brand Modal */}
      <Modal isOpen={isEditModalOpen} onClose={closeEditModal} isCentered>
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader>Create brand</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex flexDirection="column" gap={4}>
                <Box>
                  <FormLabel
                    fontWeight="bold"
                    fontSize={{ base: "xs", md: "md" }}
                  >
                    Brand name
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
                    CEO
                  </FormLabel>

                  <Input
                    {...register("ceo", {
                      ...otherValidation,
                    })}
                    fontSize={{ base: "xs", md: "md" }}
                    placeholder="Provide a name for the event"
                    height="50px"
                    borderRadius="sm"
                    type="text"
                    borderColor={errors.ceo && "red"}
                  />
                  {errors.ceo && <ErrorText error={errors.ceo.message} />}
                </Box>

                <Box>
                  <FormLabel
                    fontWeight="bold"
                    fontSize={{ base: "xs", md: "md" }}
                  >
                    Headquarters
                  </FormLabel>

                  <Input
                    {...register("hq", {
                      ...otherValidation,
                    })}
                    fontSize={{ base: "xs", md: "md" }}
                    placeholder="Provide a name for the event"
                    height="50px"
                    borderRadius="sm"
                    type="text"
                    borderColor={errors.hq && "red"}
                  />
                  {errors.hq && <ErrorText error={errors.hq.message} />}
                </Box>
              </Flex>
            </ModalBody>

            <ModalFooter bg="gray.200" borderRadius="md">
              <Button
                isLoading={isEditing}
                isDisabled={isEditing}
                type="submit"
              >
                Update brand
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>

      {/*Delete Brand Modal */}

      <AlertDialog
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        leastDestructiveRef={cancelRef}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete branch
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
                onClick={() => DeleteBrand(id)}
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

export default ViewBrand;
