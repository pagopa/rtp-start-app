import { Outlet } from "react-router-dom";
import { setupInterceptors } from "src/api/interceptors";
import { Client } from "src/models/Client";

type ApiClientProps = {
  client: Client;
};

export const ApiClient = ({ client }: ApiClientProps) => {
  setupInterceptors(client);

  return <Outlet />;
};
