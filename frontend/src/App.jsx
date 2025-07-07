import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';

export default function App() {
  const isSellerPath = useLocation().pathname.includes('seller');
  return (
    <div>
      {isSellerPath?null:<Navbar/>}
      <Toaster/>
      <div className={` ${isSellerPath ? '' : 'px-4 md:px-12 lg:px-20 xl:px-28'}`}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      <Footer/>
    </div>
  )
}
