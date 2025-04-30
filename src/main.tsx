import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider, QueryClientConfig } from "@tanstack/react-query";

const queryClientConfig: QueryClientConfig ={
  defaultOptions: {
    queries: {
      gcTime: 0,
      staleTime: 0,
    },
  },
}

const queryClient = new QueryClient(queryClientConfig)

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
)
