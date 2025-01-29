import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import 'src/translations/i18n';
import { Layout } from 'src/components/Layout';
import { checkoutTheme } from 'src/style';
import { CreateRtpPage } from 'src/pages/CreateRtpPage';

export const App = () => (
  <ThemeProvider theme={checkoutTheme}>
    <CssBaseline />
    <Layout>
      <CreateRtpPage />
    </Layout>
  </ThemeProvider>
);
