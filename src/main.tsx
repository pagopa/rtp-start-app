import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ApiClient } from './components/ApiClient';
import { client } from './api/client';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/it';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="it">
      <ApiClient client={client.api} />
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </LocalizationProvider>
  </QueryClientProvider>,
);
