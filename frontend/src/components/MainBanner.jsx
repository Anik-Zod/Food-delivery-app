import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

function MainBanner() {
    return (
        <div className="relative mt-9">
            <img
                src={assets.main_banner_bg}
                alt="banner"
                className="w-full hidden md:block h-[420px] object-cover rounded-xl shadow-xl"
            />
            <img
                src={assets.main_banner_bg_sm}
                alt="banner"
                className="w-full md:hidden h-[260px] object-cover rounded-xl shadow-lg"
            />
            <div className="absolute inset-0 flex flex-col items-start justify-center text-left px-6 md:px-16 bg-black/40 rounded-xl h-full">
                <h1 className="text-white text-4xl md:text-6xl font-extrabold drop-shadow-2xl mb-8 tracking-tight">
                    Freshness You Can Trust,<br className="hidden md:block" /> Savings You Will Love!
                </h1>
                <Link
                    to="/shop"
                    className="inline-flex items-center bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-semibold px-8 py-3 rounded-full shadow-xl transition-all duration-200 text-lg gap-2"
                >
                    Shop Now
                    <img className="w-6 h-6" src={assets.white_arrow_icon} alt="" />
                </Link>
            </div>
        </div>
    )
}

export default MainBanner