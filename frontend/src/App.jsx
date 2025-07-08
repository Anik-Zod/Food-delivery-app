import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';
import { useSelector } from 'react-redux';
import Login from './components/Login';
import AllProduct from './pages/AllProduct';
import ProductCategory from './pages/ProductCategory';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';

export default function App() {
  const isSellerPath = useLocation().pathname.includes('seller');
  const showUserLogin = useSelector(state=>state.app.showUserLogin) 
  
  return (
    <div>
      
      {isSellerPath?null:<Navbar/>}
      {showUserLogin && <Login/>}
      <Toaster/>
      <div className={` ${isSellerPath ? '' : 'px-4 md:px-12 lg:px-20 xl:px-28'}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProduct />} />
          <Route path="/products/:category" element={<ProductCategory/>} />
          <Route path="/products/:category/:id" element={<ProductDetails/>} />
          <Route path="/cart" element={<Cart/>} />
        </Routes>
      </div>
      <Footer/>
    </div>
  )
}
