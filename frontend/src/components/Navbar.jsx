import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {assets} from '../assets/assets'
import { useDispatch, useSelector } from 'react-redux'
import { setShowUserLogin,logout } from '../features/appSlice'
import { setSearchQuery } from '../features/productSlice'

export default function Navbar() {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    
    const {searchQuery} = useSelector((state) => state.products)
    const {user,showUserLogin} = useSelector((state) => state.app)
    
    const cart = useSelector(state=>state.cart.cart)
    const navigate = useNavigate();

   const handleLogout = () => {
        dispatch(setShowUserLogin(false))
        dispatch(logout())
    }

    const handleSearch = (e)=>{
        dispatch(setSearchQuery(e.target.value))
    }
    useEffect(()=>{
          if(searchQuery.length>0){
            navigate('/products')
          }
    },[searchQuery])


    return (
      <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
            <NavLink to={'/'}>
                <img className="h-9" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/dummyLogoColored.svg" alt="dummyLogoColored" />
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <NavLink to={'/'}>Home</NavLink>
                <NavLink to={'/products'}>All Product</NavLink>
                <NavLink to={'/contact'}>Contact</NavLink>
                
                { user && <div onClick={() => setOpen(false)} className='bg-primary/20 px-3 py-2 hover:bg-primary-dull rounded-xl'> 
                   <NavLink  to={'/my-orders'} className="block">My Orders</NavLink>
                </div>}


                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input onChange={handleSearch}  className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                    <img src={assets.search_icon} alt="" />
                </div>

                <div onClick={()=>navigate('/cart')} className="relative cursor-pointer">
                    <img src={assets.cart_icon} className='w-6 opacity-60' alt="" />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{cart.length}</button>
                </div>

                {user?(<>
                   <img src={user.image} className="h-10" alt="" />
                    <p>{user.name}</p>
                    <button onClick={handleLogout} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-dull transition text-white rounded-full text-sm">
                        logout
                    </button>
                </>
                ): (<button  onClick={() => { setOpen(false); dispatch(setShowUserLogin(true)); }} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-dull transition text-white rounded-full text-sm">
                    Login
                </button>)}
            </div>

            <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                {/* Menu Icon SVG */}
                <img src={assets.menu_icon} alt="" />
            </button>

            {/* Mobile Menu */}
            <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
                <NavLink onClick={() => setOpen(false)} to={'/'} className="block">Home</NavLink>
                <NavLink onClick={() => setOpen(false)} to={'/about'} className="block">About</NavLink>
                <NavLink onClick={() => setOpen(false)} to={'/contact'} className="block">Contact</NavLink>
                               { user && <div onClick={() => setOpen(false)} className='bg-primary/20 px-3 py-2 hover:bg-primary-dull rounded-xl'> 
                   <NavLink  to={'/my-orders'} className="block">My Orders</NavLink>
                </div>}
                
                {user?(
                    <button onClick={() =>{handleLogout();setOpen(false)}} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-dull transition text-white rounded-full text-sm">
                        logout
                    </button>
                ): (<button  onClick={() => { setOpen(false); dispatch(setShowUserLogin(true)); }} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-dull transition text-white rounded-full text-sm">
                    Login
                </button>)}
            </div>

        </nav>
  )
}
