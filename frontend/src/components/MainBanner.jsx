import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'


function MainBanner() {
    return (
        <div className='mt-9 relative'>
           <h1 className="text-center px-17 text-black text-4xl md:text-6xl font-extrabold drop-shadow-2xl mb-8 tracking-tight">Freshness You Can Trust,</h1>
           <h1 className="px-17 text-primary text-center text-4xl md:text-6xl font-bold drop-shadow-2xl mb-8 tracking-tight"> Savings You’ll Love!</h1>

        <div className='hidden sm:flex mt-9  justify-center items-center gap-8 '>
            <OffersCard service="Fast delivery" from="from nearest store" discount="upto 60% off" image="1.png" />
            <OffersCard service="Handpicked Quality" from="Unbeatable Prices!" discount="upto 40% off" image="2.png" />
            <OffersCard service="Farm-Fresh Picks" from="Just a Click Away!" discount="upto 10% off" image="3.png" />
        </div>

        </div>
    )
}

export default MainBanner


export  function OffersCard({ service, from, discount, image }) {
  const navigate = useNavigate();
  return (
<div className="w-75 mt-2 h-65 overflow-hidden bg-primary/15 rounded-4xl shadow hover:shadow-lg transition duration-300 flex flex-col justify-between p-5 z-30">
      <div>
        <h1 className="text-3xl font-bold uppercase text-gray-800 ">{service}</h1>
        <p className=" uppercase text-gray-500 text-sm">{from}</p>
        <p className="uppercase bg-primary/15 text-primary text-xs font-semibold rounded-full px-3 py-1 w-30  mt-3">
          {discount}
        </p>
      </div>

      <div className="relative flex justify-center items-center mt-4">
        <img
          src={image}
          alt="Food"
          className="h-37 translate-x-20 object-contain transition-transform duration-300 hover:scale-105"
        />
        <div onClick={()=>navigate('/products')}  className="absolute left-0 w-10 h-10 cursor-pointer bg-primary rounded-full flex items-center justify-center shadow-md">
          <LogOut size={16} color="white" />
        </div>
      </div>
    </div>
  )
}