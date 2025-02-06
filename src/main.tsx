import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApiClient } from "./components/ApiClient";
import { client } from "./api/client";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/it";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { useAuth } from "./hooks/useAuth";
import { routeTree } from "./routeTree.gen";

const queryClient = new QueryClient();

export const router = createRouter({
  routeTree,
  context: {
    // auth will initially be undefined
    auth: undefined!,
  },
});

const AppRouter = () => {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
};

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="it">
        <ApiClient client={client.api} />
        <AppRouter />
      </LocalizationProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
