import axios from 'axios'
import React from 'react'
import { useState } from 'react'

function Checkout() {
    const [district, setDistrict] = useState(null)
    const [address, setAddress] = useState(null)
    const [zipcode, setZipcode] = useState(null)
    const [msg, setMsg] = useState(null)

    const handleDistrictChange = (event)=>{
        setDistrict(event.target.value)
    }
    const handleAddressChange = (event)=>{
        setAddress(event.target.value)
    }
    const handleZipcodeChange = (event)=>{
        setZipcode(event.target.value)
    }

    const handleSubmit = async(event) => {
        event.preventDefault()

        await axios.post(`/orders/createOrders/`, {district, address, zipcode}).then(
            (response) => {
                setMsg(response.data.msg)
            }
        ).catch((error) => {console.log(error)})
    }
  return (
    <div><h1>Checkout</h1>
    <form onSubmit={handleSubmit}>
        <input
        type="text"
        placeholder="District"
        value={district} 
        onChange={handleDistrictChange}
        required
        />
        <input
        type="text"
        placeholder="Address"
        value={address} 
        onChange={handleAddressChange}
        required
        />
        <input
        type="text"
        placeholder="ZIP code"
        value={zipcode} 
        onChange={handleZipcodeChange}
        required
        />
        <button type="submit">
            Confirm Order
		</button>
    </form>
    {msg && <p>{msg}</p>}
    </div>
  )
}

export default Checkout