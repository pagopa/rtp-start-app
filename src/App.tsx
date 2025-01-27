import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import "src/translations/i18n";
import { Layout } from "src/components/commons/Layout";
import { checkoutTheme } from "./style";
import { CreateRtp } from "src/feature/createRtp/pages/createRtp";

export const App = () => (
  <ThemeProvider theme={checkoutTheme}>
    <CssBaseline />
    <Layout>
      <CreateRtp />
    </Layout>
  </ThemeProvider>
);
