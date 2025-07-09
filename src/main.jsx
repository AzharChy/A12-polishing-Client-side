import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  RouterProvider
} from "react-router-dom";
import { router } from './Components/Routes/router.jsx';
import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './Components/Routes/Pages/Authentication/AuthProvider/AuthProvider.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
     <HelmetProvider>
   <AuthProvider>
    <div className='max-w-7xl m-auto'>
    <RouterProvider router={router} />
   </div>
   </AuthProvider>


  </HelmetProvider>
    </StrictMode>,
)
