import { useMutation, useQuery } from "react-query";
import { BrandPayload } from "../types";
import {
  createBrand,
  deleteBrand,
  getAllBrands,
  getSingleBrand,
  updateBrand,
} from "../api/brand";

import { queryClient } from "../client/client";


export const useCreateBrandMutation = () => {
  const {
    isLoading,
    isSuccess,
    isError,
    error,
    mutate: CreateBrand,
  } = useMutation<string, Error, BrandPayload>(
    (payload) => createBrand(payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["brands"]);
      },
    }
  );

  return {
    isLoading,
    isSuccess,
    isError,
    error,
    CreateBrand,
  };
};

export const useGetAllBrands = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["brands"],
    queryFn: () => getAllBrands(),
  });

  return { data, isLoading, isError, error };
};

export const useGetSingleBrand = (id: string | undefined)  => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["brand", id],
    queryFn: () => getSingleBrand(id as string),
  });

  return { data, isLoading, isError, error };
};

export const useUpdateBrand = () => {
  const {
    isLoading,
    isSuccess,
    isError,
    error,
    mutate: UpdateBrand,
    data,
  } = useMutation(
    ({ id, payload }: { id: string; payload: BrandPayload }) =>
      updateBrand({ id, payload }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["brand"]);
      },
    }
  );

  return {
    isLoading,
    isSuccess,
    isError,
    error,
    UpdateBrand,
    data,
  };
};

export const useDeleteBrand = () => {
  const {
    isLoading,
    isSuccess,
    isError,
    error,
    mutate: DeleteBrand,
  } = useMutation((id: string | undefined) => deleteBrand(id as string), {
    onSuccess: () => {
      queryClient.invalidateQueries(["brands"]);
    },
  });

  return {
    isLoading,
    isSuccess,
    isError,
    error,
    DeleteBrand,
  };
};
