import axios from "axios";
import { QueryClient } from "react-query";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 100000,
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      refetchInterval: 0,
      refetchOnWindowFocus: false,
    },
  },
});
