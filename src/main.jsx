import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ShopProvider } from './Context/ShopContext.jsx';

import Home from './Components/Home.jsx';
import About from './Components/About.jsx';
import Contact from './Components/Contact.jsx';
import Favorites from './Components/Favorites.jsx';
import ProductOverview from './Components/ProductOverview.jsx';
import Login from './Components/Login.jsx';
import OrderTracking from './Components/OrderTracking.jsx';
import OrderHistory from './Components/OrderHistory.jsx';
import Payment from './Components/Payment.jsx';
import CategoryPage from './Components/CategoryPage.jsx';
import SearchResults from './Components/SearchResults.jsx';

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
        element: <CategoryPage categoryName="Men" apiCategory="men's clothing" />,
      },
      {
        path: "/women",
        element: <CategoryPage categoryName="Women" apiCategory="women's clothing" />,
      },
      {
        path: "/kids",
        element: <CategoryPage categoryName="Kids" apiCategory="electronics" />,
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
    ]

  },


]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ShopProvider>
      <RouterProvider router={router} />
    </ShopProvider>
  </StrictMode>,

)
