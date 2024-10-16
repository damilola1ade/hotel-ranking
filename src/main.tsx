import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { queryClient } from "./client/client.ts";
import { Toaster } from "sonner";
import App from "./App.tsx";
import theme from "./theme/theme.ts";
import "./index.css";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Router>
          <Toaster />
          <App />
        </Router>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
