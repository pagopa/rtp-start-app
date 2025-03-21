import {
  createRootRouteWithContext,
  Outlet,
  redirect,
} from '@tanstack/react-router';
import { Layout } from 'src/components/Layout/Layout';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import 'src/translations/i18n';
import { checkoutTheme } from 'src/style';
import { AppState } from 'src/models/AppState';
import DialogComponent from 'src/components/Dialogs/Dialog';

interface RouterContext {
  auth: AppState['auth'];
}

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: ({ context, location }) => {
    if (location.pathname !== '/login' && !context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
      });
    }
  },
  component: () => (
    <>
      <ThemeProvider theme={checkoutTheme}>
        <CssBaseline />
        <Layout>
          <Outlet />
          <DialogComponent />
        </Layout>
      </ThemeProvider>
      {/*<TanStackRouterDevtools /> */}
    </>
  ),
});
