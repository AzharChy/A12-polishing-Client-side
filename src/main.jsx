import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  RouterProvider
} from "react-router-dom";
import { router } from './Components/Routes/router.jsx';
import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './Components/Routes/Pages/Authentication/AuthProvider/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();
<Toaster position='top-right' reverseOrder={false}></Toaster>

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <HelmetProvider>
    <QueryClientProvider client={queryClient}>
   <AuthProvider>
    <div className='max-w-7xl m-auto'>
    <RouterProvider router={router} />
   </div>
   </AuthProvider>
  </QueryClientProvider>


  </HelmetProvider>
    </StrictMode>,
)
