import React, { useState } from 'react'
import { assets } from '../assets/assets'

function AddAddress() {
    
    const onSubmitHandler = (e)=>{
        e.preventDefault();

    }

    const [address,setAddress] = useState({
        firstName:'',
        lastName:'',
        email:"",
        street:"",
        city:"",
        state:"",
        zipcode:"",
        country:"",
        phone:""
    });

    const handleChange =(e)=>{
       const{name,value}=e.target;

       setAddress((prev)=>({
        ...prev,
        [name]:value
       }));
    }

    return (
    <div className='mt-16 pb-16'>
       <p className='text-2xl md:text-3xl text-gray-500'>Add shipping <span className='font-semibold text-primary'>Address</span></p>
       <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
          <div className=' flex-1 max-w-md'>
             <form onSubmit={onSubmitHandler} className='space-y-3 mt-6 text-sm '>
                <div className='grid grid-col-2 gap-4'>
                    <InputField handleChange={handleChange} address={address} name="firstName"  type="text" placeholder="firstName" />
                    <InputField handleChange={handleChange} address={address} name="lastName"  type="text" placeholder="lastName" />
                </div>

                    <InputField handleChange={handleChange} address={address} name="email"  type="email" placeholder="Enter email" />
                    <InputField handleChange={handleChange} address={address} name="street"  type="text" placeholder="street" />

                <div className='grid grid-cols-2 gap-4'>
                    <InputField handleChange={handleChange} address={address} name="city"  type="text" placeholder="city" />
                    <InputField handleChange={handleChange} address={address} name="state"  type="text" placeholder="state" />
                </div>

                <div className='grid grid-cols-2 gap-4'>
                    <InputField handleChange={handleChange} address={address} name="zipcode"  type="number" placeholder="Zip code" />
                    <InputField handleChange={handleChange} address={address} name="country"  type="text" placeholder="country" />
                </div>

                    <InputField handleChange={handleChange} address={address} name="phone"  type="text" placeholder="phone" />
                    <button className='w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull transition cursor-pointer uppercase'>Save Address</button>
             </form>
             
          </div>
          <img className='md:mr-16 mb-16 md:mt-0' src={assets.add_address_iamge} alt="" />
       </div>
    </div>
  )
}

export default AddAddress

export const InputField = ({type,placeholder,name,handleChange,address})=>{
    return (
       <input className='w-full px-2 py-2.5 border border-gray-500/50 rounded outline-none text-gray-500 focus:border-primary transition' 
          type={type} 
          placeholder={placeholder}
          onChange={handleChange}
          name={name}
          value={address[name]}
          required
       />
    )
}