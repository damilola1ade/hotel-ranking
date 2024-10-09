/* eslint-disable @typescript-eslint/no-explicit-any */
import { HotelPayload } from "../types";
import { api } from "./api";

export const createHotel = async (payload: HotelPayload) => {
  try {
    const res = await api.post("/hotel/create-hotel", payload);

    if (res.status < 200 || res.status >= 300) {
      throw new Error(res?.data?.message || "error");
    }

    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message);
  }
};

export const getAllHotels = async () => {
  try {
    const res = await api.get("/hotel/get-all-hotels");

    if (res.status < 200 || res.status >= 300) {
      throw new Error(res.data.message || "Something went wrong");
    }

    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message);
  }
};

export const getSingleHotel = async (id: string) => {
  try {
    const res = await api.get(`/hotel/get-hotel/${id}`);

    if (res.status < 200 || res.status >= 300) {
      throw new Error(res.data.message || "Something went wrong");
    }

    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message);
  }
};

export const getHotelsByBrand = async (brandNames: string[]) => {
  try {
    const res = await api.get("/hotel/get-all-hotels", {
      params: {
        brandName: brandNames,
      },
    });

    if (res.status < 200 || res.status >= 300) {
      throw new Error(res.data.message || "Something went wrong");
    }

    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message);
  }
};

export const deleteHotel = async (id: string) => {
  try {
    const res = await api.delete(`hotel/delete-hotel/${id}`);

    if (res.status < 200 || res.status >= 300) {
      throw new Error(res.data.message || "Something went wrong");
    }

    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "failed");
  }
};

export const updateHotel = async ({
  id,
  payload,
}: {
  id: string;
  payload: HotelPayload;
}) => {
  try {
    const res = await api.put(`hotel/update-hotel/${id}`, payload);

    if (res.status < 200 || res.status >= 300) {
      throw new Error(res.data.message || "wrong");
    }

    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "failed");
  }
};
