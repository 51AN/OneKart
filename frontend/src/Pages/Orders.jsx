import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

function Orders() {
  const [orderData, setOrderData] = useState(null)

  const getOrderData = async () => {
    await axios.get(`/orders/getMyOrders/`).then(
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
      <div className="inline_box">
          <div className="text-box">
            <h2>My Orders</h2>
          </div>
        </div>
      {orderData &&
          orderData.length>0?orderData.map((el, i) => {
            return (
              <>
                <div>
                  <p>Product name: {el.pname}</p>
                  <p>QTY: {el.quantity}</p>
                  <p>Total price: {el.price}</p>
                  <p>Address: {el.address},{el.district}</p>
                  <p>Order status: {el.status}</p>
                  <p>Order time: {formatDate(el.time)} {formatTime(el.time)}</p>
                </div>
              </>
            )
          }) : ""
        }
    </div>
  )
}

export default Orders