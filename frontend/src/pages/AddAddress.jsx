import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axiosInstance from '../api/axios'
import { useDispatch } from 'react-redux'
import { setAddress } from '../features/appSlice'
import { useNavigate } from 'react-router-dom'

function AddAddress() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [address, setLocalAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setLocalAddress((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await axiosInstance.post('/address/add', address)

      if (response.data.success) {
        dispatch(setAddress(address))
        setSuccess('Address added successfully!')
        navigate('/cart')
        dispatch(setAddress(address))
        // setLocalAddress({ street: '', city: '', state: '', zipcode: '', country: '', phone: '' })
      } else {
        setError(response.data.message || 'Failed to add address')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-16 pb-16">
      <p className="text-2xl md:text-3xl text-gray-500">
        Add shipping <span className="font-semibold text-primary">Address</span>
      </p>
      <div className="flex flex-col-reverse md:flex-row justify-between mt-10">
        <div className="flex-1 max-w-md">
          <form onSubmit={onSubmitHandler} className="space-y-3 mt-6 text-sm">
            <InputField
              handleChange={handleChange}
              address={address}
              name="street"
              type="text"
              placeholder="Street"
            />
            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="city"
                type="text"
                placeholder="City"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="state"
                type="text"
                placeholder="State"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="zipCode"
                type="number"
                placeholder="Zip code"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="country"
                type="text"
                placeholder="Country"
              />
            </div>

            <InputField
              handleChange={handleChange}
              address={address}
              name="phone"
              type="text"
              placeholder="Phone"
            />

            {error && <p className="text-red-600">{error}</p>}
            {success && <p className="text-green-600">{success}</p>}

            <button
              disabled={loading}
              className={`w-full mt-6 py-3 uppercase text-white ${
                loading ? 'bg-primary-dull cursor-not-allowed' : 'bg-primary hover:bg-primary-dull cursor-pointer'
              } transition`}
            >
              {loading ? 'Saving...' : 'Save Address'}
            </button>
          </form>
        </div>

        <img
          className="md:mr-16 mb-16 md:mt-0"
          src={assets.add_address_iamge} // Check your asset name here
          alt="Add Address Illustration"
        />
      </div>
    </div>
  )
}

export default AddAddress

export const InputField = ({ type, placeholder, name, handleChange, address }) => {
  return (
    <input
      className="w-full px-2 py-2.5 border border-gray-500/50 rounded outline-none text-gray-500 focus:border-primary transition"
      type={type}
      placeholder={placeholder}
      onChange={handleChange}
      name={name}
      value={address[name]}
      required
      aria-label={placeholder}
    />
  )
}
