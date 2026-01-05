import React from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'

import Cart from './Components/Cart'
import NewsletterPopup from './Components/NewsletterPopup'
import Chatbot from './Components/Chatbot'
import QuickViewModal from './Components/QuickViewModal'

import { Outlet } from 'react-router-dom'
import { ToastProvider } from './Context/ToastContext'
import { QuickViewProvider } from './Context/QuickViewContext'
import ScrollToTop from "./Components/ScrollToTop";



function App() {
  return (
    <ToastProvider>
      <QuickViewProvider>
        <ScrollToTop />
        <Header />
        <NewsletterPopup />
        <Chatbot />
        <QuickViewModal />

        <Outlet />

        <Cart />
        <Footer />
      </QuickViewProvider>
    </ToastProvider>
  )
}

export default App
