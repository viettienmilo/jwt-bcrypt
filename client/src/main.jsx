import { createRoot } from 'react-dom/client'
import AppTheme from './shared-theme/AppTheme.jsx';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SnackbarProvider } from 'notistack'

import App from './App.jsx'
import './api/axiosInstance.js'; // set API globally and auto run interceptors to refresh accessToken

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(

  <QueryClientProvider client={queryClient}>
    <AppTheme >
      <CssBaseline enableColorScheme />
      <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} dense autoHideDuration={3000}>
        <App />
      </SnackbarProvider>
    </AppTheme>
  </QueryClientProvider>,
)
