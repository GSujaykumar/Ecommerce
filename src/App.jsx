import React from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'


import Cart from './Components/Cart'
import { Outlet } from 'react-router-dom'


function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Cart />
      <Footer />
    </>
  )
}

export default App
