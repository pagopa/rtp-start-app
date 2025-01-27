import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApiClient } from "./components/ApiClient";
import { client } from "./api/client";

const AppRouter = () => {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
};

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ApiClient client={client.api} />
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </QueryClientProvider>,
);
