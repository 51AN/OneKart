import React, {useState, useEffect} from 'react'
import axios from 'axios'
import '../style/Cart.css'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

function Cart() {
  const [data, setData] = useState(null)
  const [totalAmountToPay, setTotalAmountToPay] = useState(null)

  const getCartData = async()=>{
    await axios.get('/cart/').then(
      (response)=>{
        setData(response.data.data)
        console.log(data)
      }
    ).catch((error)=>{
      console.log(error)
    })
  }

  const decreaseItem = async(id)=>{
    await axios.put(`/cart/decrease/${id}`,{}).then(
      (response)=>{
        console.log("decrease successful")
      }
    ).catch((error)=>{
      console.log(error)
    })
  }

  const increaseItem = async(id)=>{
    await axios.put(`/cart/increase/${id}`,{}).then(
      (response)=>{
        console.log("increase successful")
      }
    ).catch((error)=>{
      console.log(error)
    })
  }

  const deleteItem = async(id)=>{
    await axios.delete(`/cart/delete/${id}`).then(
      (response)=>{
        console.log("delete successful")
      }
    ).catch((error)=>{
      console.log(error)
    })
  }

  const getAmountToPay = async()=>{
    await axios.get(`/cart/totalamount`).then(
      (response)=>{
        setTotalAmountToPay(response.data[0].totalAmount)
      }
    ).catch((error)=>{
      console.log(error)
    })
  }

  const handleDelete = async(Id)=>{
    await deleteItem(Id)
    await getCartData()
    await getAmountToPay()
  }

  const handleIncrease = async(Id)=>{
    await increaseItem(Id)
    await getCartData()
    await getAmountToPay()
  }

  const handleDecrease = async(Id)=>{
    await decreaseItem(Id)
    await getCartData()
    await getAmountToPay()
  }

  useEffect(()=>{
    getCartData()
    getAmountToPay()
  },[])

  return (
    <div>
      <div className="inline_box">
      <div className="text-box">
        <h2>My Cart</h2>
      </div>
    </div>
      {data &&
          data.length>0?data.map((el, i) => {
            return (
                <>
                  <div>
                    <div className="cart_content">
                      <div className="cart_image">
                        <img src={`http://localhost:5000/uploads/${el.image}`} alt='bla bla bla' style={{width:'200px', height:'200px'}}/>
                      </div>
                      <div className="cart_details">
                        <h2>{el.name}</h2>
                        <div className="button_pad">
                          <button className="plus_button" onClick={()=>handleIncrease(el.id)}>+</button>
                        </div>
                        <div className="quantity">
                          <h4>{el.quantity}</h4>
                        </div>
                        <div className="button_pad">
                          <button  className="plus_button" onClick={()=>handleDecrease(el.id)}>-</button>
                        </div>
                        <h3>{el.price} BDT</h3>
                      </div>
                    </div>
                    
                    <button className="add_button" onClick={()=>handleDelete(el.id)}>Delete</button>
                  </div>
                </>
            )
        }) : <p className="cart_empty">Cart is empty</p>
      }
      {totalAmountToPay && <div>
        <div className="inline_box">
      <div className="text-box">
        <div className="text-flex">
          <h2>Total Amount to Pay&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;
          </h2>
          <h2 className="right-side-pay">{totalAmountToPay} BDT</h2>
        </div>
      </div>
    </div>
        <p className="cart_content">
          
        </p>
        <Link to="/checkout/"><button className="add_button">Checkout</button></Link>  </div>}
    </div>
  )
}

export default Cart