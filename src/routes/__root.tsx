import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Layout } from 'src/components/Layout/Layout';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import 'src/translations/i18n';
import { checkoutTheme } from 'src/style';

export const Route = createRootRoute({
  component: () => (
    <>
      <ThemeProvider theme={checkoutTheme}>
        <CssBaseline />
        <Layout>
          <Outlet />
        </Layout>
      </ThemeProvider>
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
});
