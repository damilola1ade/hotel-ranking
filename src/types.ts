/* eslint-disable @typescript-eslint/no-explicit-any */

export interface HotelPayload {
  id: string;
  name: string;
  country: string;
  city: string;
  address: string;
  brand: BrandPayload[];
  brandName: string;
  hotels?: HotelPayload[];
}

export interface BrandPayload {
  id?: string;
  name: string;
  hq: string;
  ceo: string;
  brands?: BrandPayload[];
}


export interface ButtonProps {
  onClick?: VoidFunction;
  isLoading?: boolean;
  isDisabled?: boolean;
  variant?: "ghost" | "outline" | "solid" | "link" | "unstyled";
  type?: "button" | "reset" | "submit";
  children: string;
}

export type ErrorTextProp = {
  error: any;
};
