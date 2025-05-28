import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router';
import { router } from './App.tsx'
import { Toaster } from 'react-hot-toast';
import CartProvider from './contexts/CartContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <Toaster position='top-center' reverseOrder={false} />
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>,
)
