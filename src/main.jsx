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
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const queryClient = new QueryClient();
<Toaster position='top-right' reverseOrder={false}></Toaster>

const stripePromiese = loadStripe(import.meta.env.VITE_STRIPE_SECRET_KEY)

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <HelmetProvider>
    <QueryClientProvider client={queryClient}>
   <Elements stripe={stripePromiese}>
    <AuthProvider>
    <div className=' m-auto bg-base-100'>
    <RouterProvider router={router} />
   </div>
   </AuthProvider>
   </Elements>
  </QueryClientProvider>


  </HelmetProvider>
    </StrictMode>,
)
