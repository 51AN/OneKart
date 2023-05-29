import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import OrderProcessing from '../Components/OrderProcessing'
import GetUsername from '../Components/GetUsername'
import '../style/OrderMan.css'
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
          <div className="inline_box">
          <div className="text-box">
            <h2>My Orders</h2>
          </div>
        </div>
        <div className="orderMan-container">
          {orderData &&
              orderData.length>0?orderData.map((el, i) => {
                return (
                  <>
                    <div className="orderMan-content">
                      <GetUsername id={el.cartid} />
                      <p><b>Name :</b>  {el.pname}</p>
                      <p><b>QTY :</b>  {el.quantity}</p>
                      <p><b>Total :</b>  {el.price}</p>
                      <p><b>Address :</b> {el.address},{el.district}</p>
                      <p><b>Zipcode :</b> {el.zipcode}</p>
                      <p><b>Order time :</b> {formatTime(el.time)} - {formatDate(el.time)} </p>
                      <div className="OrderProcess">

                      <OrderProcessing id={el.id} />

                      </div>
                    </div>
                  </>
                )
              }) : ""
            }
            </div>
        </div>
    )
}

export default OrdersManager