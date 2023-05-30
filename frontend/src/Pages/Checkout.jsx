import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import '../style/Checkout.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
                toast.success(response.data.msg)
            }
        ).catch((error) => {toast.error(error)})
    }
  return (
      <div>
        <div className="inline_box">
            <div className="text-box">
                <h2>Checkout</h2>
            </div>
        </div>

          <div className="form_container">
        <form class="form" onSubmit={handleSubmit} style={{width:'800px', height:'400px'}}>

        <div className="input-container">
                <input id="district" type="text" className="input" placeholder=" " value={district} onChange={handleDistrictChange} required/>
                <div className="cut"></div>
                <label for="district" className="placeholder"> District </label>
        </div>

        <div className="input-container">
            <input id="address" type="text" className="input" placeholder=" " value={address} onChange={handleAddressChange}/>
            <div className="cut"></div>
            <label for="address" className="placeholder"> Address </label>
        </div>
        
      

            <div className="input-container">
                <input id="zipCode" type="text" className="input" placeholder=" " value={zipcode} onChange={handleZipcodeChange}/>
                <div className="cut"></div>
                <label for="zipCode" className="placeholder"> ZIP Code </label>
            </div>


            <button type='submit' className="update_button">
            Confirm Order
            </button>
    </form>
    {/* {msg && <p>{msg}</p>} */}
    <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
    />
    
 </div>



    {/* <form onSubmit={handleSubmit}>
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
    {msg && <p>{msg}</p>} */}
    </div>
  )
}

export default Checkout