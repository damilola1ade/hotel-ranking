import { useForm, SubmitHandler } from "react-hook-form";

import { useFormValidation } from "../hooks/useFormValidation";

import { useCreateBrandMutation } from "../services/brand";

import { BrandPayload } from "../types";

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
} from "@chakra-ui/react";

import { Button, ErrorText } from ".";

import { toast } from "sonner";

const CreateBrand = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BrandPayload>();

  const { isLoading, CreateBrand } = useCreateBrandMutation();

  const { otherValidation } = useFormValidation();

  const onSubmit: SubmitHandler<BrandPayload> = (payload) => {
    CreateBrand(payload, {
      onSuccess: () => {
        onClose();
        toast.success("Brand created successfully!");
        reset();
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    });
  };

  return (
    <>
      <Button onClick={onOpen}>Create brand</Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
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
                    fontSize={{ base: "xs", md: "sm" }}
                  >
                    Brand name
                  </FormLabel>

                  <Input
                    {...register("name", {
                      ...otherValidation,
                    })}
                    fontSize={{ base: "xs", md: "sm" }}
                    placeholder="Provide a name for the event"
                    height="50px"
                    borderRadius="sm"
                    type="text"
                    borderColor={errors.name && "red"}
                  />
                  {errors.name && (
                    <ErrorText error={errors.name.message} />
                  )}
                </Box>

                <Box>
                  <FormLabel
                    fontWeight="bold"
                    fontSize={{ base: "xs", md: "sm" }}
                  >
                    CEO
                  </FormLabel>

                  <Input
                    {...register("ceo", {
                      ...otherValidation,
                    })}
                    fontSize={{ base: "xs", md: "sm" }}
                    placeholder="Provide a name for the event"
                    height="50px"
                    borderRadius="sm"
                    type="text"
                    borderColor={errors.ceo && "red"}
                  />
                  {errors.ceo && (
                    <ErrorText error={errors.ceo.message} />
                  )}
                </Box>

                <Box>
                  <FormLabel
                    fontWeight="bold"
                    fontSize={{ base: "xs", md: "sm" }}
                  >
                    Headquarters
                  </FormLabel>

                  <Input
                    {...register("hq", {
                      ...otherValidation,
                    })}
                    fontSize={{ base: "xs", md: "sm" }}
                    placeholder="Provide a name for the event"
                    height="50px"
                    borderRadius="sm"
                    type="text"
                    borderColor={errors.hq && "red"}
                  />
                  {errors.hq && (
                    <ErrorText error={errors.hq.message} />
                  )}
                </Box>
              </Flex>
            </ModalBody>

            <ModalFooter bg="gray.200" borderRadius="md">
              <Button isLoading={isLoading} isDisabled={isLoading} type="submit">
                Create brand
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default CreateBrand;
