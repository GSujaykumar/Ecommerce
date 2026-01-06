import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ShopProvider } from './Context/ShopContext.jsx';

import { lazy, Suspense } from 'react';
import LoadingSpinner from './Components/LoadingSpinner'; // We'll create this simple component

const Home = lazy(() => import('./Components/Home.jsx'));
const About = lazy(() => import('./Components/About.jsx'));
const Contact = lazy(() => import('./Components/Contact.jsx'));
const Favorites = lazy(() => import('./Components/Favorites.jsx'));
const ProductOverview = lazy(() => import('./Components/ProductOverview.jsx'));
const Login = lazy(() => import('./Components/Login.jsx'));
const OrderTracking = lazy(() => import('./Components/OrderTracking.jsx'));
const OrderHistory = lazy(() => import('./Components/OrderHistory.jsx'));
const Payment = lazy(() => import('./Components/Payment.jsx'));
const CategoryPage = lazy(() => import('./Components/CategoryPage.jsx'));
const SearchResults = lazy(() => import('./Components/SearchResults.jsx'));
const Orders = lazy(() => import('./Components/Orders.jsx'));


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/login",
        element: <Login />,
      }
      ,
      {
        path: "/favorites",
        element: <Favorites />,
      },
      {
        path: "/product/:id",
        element: <ProductOverview />,
      },
      {
        path: "/men",
        element: <CategoryPage categoryName="Men" type="men" />,
      },
      {
        path: "/women",
        element: <CategoryPage categoryName="Women" type="women" />,
      },
      {
        path: "/kids",
        element: <CategoryPage categoryName="Kids" type="kids" />,
      },
      {
        path: "/search",
        element: <SearchResults />,
      },
      {
        path: "/order-tracking",
        element: <OrderTracking />,
      },
      {
        path: "/order-history",
        element: <OrderHistory />,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      // ... (remove Signup import at top)
      // ... inside routes
      {
        path: "/signup",
        element: <Login />,
      },
    ]

  },


]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ShopProvider>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[var(--color-normalbg)] dark:bg-[var(--color-darkbg)]"><div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div></div>}>
        <RouterProvider router={router} />
      </Suspense>
    </ShopProvider>
  </StrictMode>,

)
