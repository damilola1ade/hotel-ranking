import { useMutation, useQuery } from "react-query";
import {
  createHotel,
  deleteHotel,
  getAllHotels,
  getHotelsByBrand,
  getSingleHotel,
  updateHotel,
} from "../api/hotel";
import { HotelPayload } from "../types";
import { queryClient } from "../api/api";

export const useCreateHotelMutation = () => {
  const {
    isLoading,
    isSuccess,
    isError,
    error,
    mutate: CreateHotel,
  } = useMutation<string, Error, HotelPayload>(
    (payload) => createHotel(payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["hotels"]);
      },
    }
  );

  return {
    isLoading,
    isSuccess,
    isError,
    error,
    CreateHotel,
  };
};

export const useGetAllHotels = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["hotels"],
    queryFn: () => getAllHotels(),
  });

  return { data, isLoading, isError, error };
};

export const useGetSingleHotel = (id: string | undefined) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["hotel", id],
    queryFn: () => getSingleHotel(id as string),
  });

  return { data, isLoading, isError, error };
};

export const useGetHotelsByBrand = (brandName: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["hotels", brandName],
    queryFn: () => getHotelsByBrand(brandName),
  });

  return { data, isLoading, isError, error };
};

export const useUpdateHotel = () => {
  const {
    isLoading,
    isSuccess,
    isError,
    error,
    mutate: UpdateHotel,
    data,
  } = useMutation(
    ({ id, payload }: { id: string; payload: HotelPayload }) =>
      updateHotel({ id, payload }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["hotel"]);
      },
    }
  );

  return {
    isLoading,
    isSuccess,
    isError,
    error,
    UpdateHotel,
    data,
  };
};

export const useDeleteHotel = () => {
  const {
    isLoading,
    isSuccess,
    isError,
    error,
    mutate: DeleteHotel,
  } = useMutation((id: string | undefined) => deleteHotel(id as string), {
    onSuccess: () => {
      queryClient.invalidateQueries(["hotels"]);
    },
  });

  return {
    isLoading,
    isSuccess,
    isError,
    error,
    DeleteHotel,
  };
};
