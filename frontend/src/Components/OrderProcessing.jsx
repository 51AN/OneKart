import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import '../style/OrderPro.css'
function OrderProcessing(props) {
    const [selectedCatagory, setSelectedCatagory] = useState(null)
    const handleSelectionChange = async(event) => {
        setSelectedCatagory(event.target.value)
        await axios.put(`/orders/updateOrder/${props.id}`, {selectedStatus:event.target.value}).then(
            (response) =>{
                console.log(response)
            }
        ).catch((error) => {
            console.log(error)
        })
    }

    const getOrderStatus = async()=>{
        await axios.get(`/orders/status/${props.id}`).then(
            (response)=>{
              setSelectedCatagory(response.data[0].status)
            }
        ).catch((error)=>{
            console.log(error)
        })
    }

    useEffect(()=>{
        getOrderStatus()
    },[])

  return (
    <div className="box">
        <select value={selectedCatagory} onChange={handleSelectionChange}>
            {
                selectedCatagory === 'Pending' ? (
                    <>
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Complete">Complete</option>
                    </>
                  ) : selectedCatagory === 'Processing' ? (
                    <>
                      <option value="Processing">Processing</option>
                      <option value="Complete">Complete</option>
                    </>
                  ) : (
                    <option value="Complete">Complete</option>
                  )
            }
        </select>
    </div>
  )
}

export default OrderProcessing