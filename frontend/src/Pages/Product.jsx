import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function Product() {
  const {id} = useParams()
  const[product, setProduct] = useState(null)
  const[price, setPrice] = useState(null)
  const[msg, setMsg] = useState(null)


  const getProductData = async()=>{
      await axios.get(`/products/myproduct/${id}`).then(
          (response)=>{
              setProduct(response.data[0])
              setPrice(response.data[0].price)
              console.log(response.data)
          }
      ).catch((error)=>{
          console.log(error)
      })
  }

  useEffect(() => {
      getProductData()
  },[])

  const addProductToCart = async()=>{
    await axios.post('/cart/', {pid:id, perunitprice:price}).then(
        (response)=>{
            setMsg(response.data.msg)
            setTimeout(() => {
                setMsg('')
              }, 2000)
        }
    ).catch((error)=>{
        console.log(error)
    })
  }

  let data = ''
  if(product){
      data = (
          <>
          <h1>{product.name}</h1>
          <img src={`http://localhost:5000/uploads/${product.image}`} alt='bla bla bla' style={{width:'400px', height:'400px'}}/>
          <p>Description: {product.description}</p>
          <p>Price: {product.price}</p>
          </>
      )
  }
  else
      data = "No product!"
  return (
    <div>
      <p>{data}</p>
      <button onClick={addProductToCart}>Add to cart</button>
      {msg && <p>{msg}</p>}
    </div>
  )
}

export default Product