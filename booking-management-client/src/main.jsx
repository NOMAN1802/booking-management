import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { router } from './Routes/Routes.jsx'
import { RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import {
  
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import AuthProvider from './providers/AuthProvider'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'



const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <AuthProvider>
     
      
      <HelmetProvider>

      <QueryClientProvider client={queryClient}>
      
      <RouterProvider router={router} />
     
      </QueryClientProvider>
    
      </HelmetProvider>
 
    </AuthProvider>
  </React.StrictMode>,
)
