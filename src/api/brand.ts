/* eslint-disable @typescript-eslint/no-explicit-any */
import { BrandPayload } from "../types";
import { api } from "./api";

export const createBrand = async (payload: BrandPayload) => {
  try {
    const res = await api.post("/brand/create-brand", payload);

    if (res.status < 200 || res.status >= 300) {
      throw new Error(res?.data?.message || "error");
    }

    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message);
  }
};

export const getAllBrands = async () => {
  try {
    const res = await api.get("/brand/get-all-brands");

    if (res.status < 200 || res.status >= 300) {
      throw new Error(res.data.message || "Something went wrong");
    }

    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message);
  }
};

export const getSingleBrand = async (id: string) => {
  try {
    const res = await api.get(`/brand/get-brand/${id}`);

    if (res.status < 200 || res.status >= 300) {
      throw new Error(res.data.message);
    }

    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message);
  }
};

export const deleteBrand = async (id: string) => {
  try {
    const res = await api.delete(`brand/delete-brand/${id}`);

    if (res.status < 200 || res.status >= 300) {
      throw new Error(res.data.message);
    }

    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message);
  }
};

export const updateBrand = async ({
  id,
  payload,
}: {
  id: string;
  payload: BrandPayload;
}) => {
  try {
    const res = await api.put(`brand/update-brand/${id}`, payload);

    if (res.status < 200 || res.status >= 300) {
      throw new Error(res.data.message);
    }

    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "failed");
  }
};
