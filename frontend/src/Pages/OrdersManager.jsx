import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import OrderProcessing from '../Components/OrderProcessing'
import GetUsername from '../Components/GetUsername'

function OrdersManager() {
    const [orderData, setOrderData] = useState(null)
    const [selectedCatagory, setSelectedCatagory] = useState(null)

    const getOrderData = async () => {
      await axios.get(`/orders/getBranchOrders/`).then(
          (response) => {
              setOrderData(response.data)
          }
      ).catch((error) => {console.log(error)})
    }
  
    const formatDate = (datetime)=>{
      const dateObj = new Date(datetime);
      const formattedDate = dateObj.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
      return formattedDate
    }
  
    const formatTime = (datetime)=>{
      const dateObj = new Date(datetime);
      const formattedTime = dateObj.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
      return formattedTime
    }
  
    useEffect(()=>{
      getOrderData()
    },[])
    return (
        <div>
          <h1>My orders</h1>
          {orderData &&
              orderData.length>0?orderData.map((el, i) => {
                return (
                  <>
                    <div>
                      <GetUsername id={el.cartid} />
                      <p>Name: {el.pname}</p>
                      <p>QTY: {el.quantity}</p>
                      <p>Total: {el.price}</p>
                      <p>Address: {el.address},{el.district}</p>
                      <p>Zipcode: {el.zipcode}</p>
                      <OrderProcessing id={el.id} />
                      <p>Order time: {formatDate(el.time)} {formatTime(el.time)}</p>
                    </div>
                  </>
                )
              }) : ""
            }
        </div>
    )
}

export default OrdersManager