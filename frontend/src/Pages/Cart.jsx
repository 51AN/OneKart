import React, {useState, useEffect} from 'react'
import axios from 'axios'

function Cart() {
  const [data, setData] = useState(null)

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

  useEffect(()=>{
    getCartData()
  },[])

  return (
    <div>
      <h1>My cart</h1>
      {data &&
          data.length>0?data.map((el, i) => {
            return (
                <>
                  <div>
                    <img src={`http://localhost:5000/uploads/${el.image}`} alt='bla bla bla' style={{width:'100px', height:'100px'}}/>
                    <p>{el.name}</p>
                    <p>{el.quantity}</p>
                    <p>{el.price}</p>
                  </div>
                </>
            )
        }) : <p>Cart is empty</p>
      }
    </div>
  )
}

export default Cart