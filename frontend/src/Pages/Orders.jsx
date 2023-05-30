import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import '../style/Order.css'
function Orders() {
  const completeStyle ={
    color : "green"
  }
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
        <div className="order-container">
        {orderData &&
          orderData.length>0?orderData.map((el, i) => {
            return (
              <>
                <div className="order-content">
                  <p><b>Product name : </b>  {el.pname}</p>
                  <p><b>QTY :</b>  {el.qty}</p>
                  <p><b>Ordered from :</b>  {el.orderto}</p>
                  <p><b>Total price :</b>  {el.total}</p>
                  <p><b>Address :</b>  {el.address}, {el.district}</p>
                  {el.status === "Complete" && <p><b>Order status :</b> <i  style={completeStyle}> {el.status}</i> </p>}
                  {el.status === "Processing" && <p><b>Order status :</b>  {el.status}</p>}
                  {el.status === "Pending" && <p><b>Order status :</b>  {el.status}</p>}
                  <p><b>Order time :</b> {formatTime(el.time)} - {formatDate(el.time)}</p>
                </div>
              </>
            )
          }) : ""
        }
        </div>
      

    </div>
  )
}

export default Orders