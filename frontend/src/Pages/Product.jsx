import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import '../style/Product.css'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

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
            toast.success(response.data.msg)
          
        }
    ).catch((error)=>{
        console.log(error)
    })
  }

  let data = ''
  if(product){
      data = (
          <>
          <div className="pro_container">
            <div className="pro_image">
                <img src={`http://localhost:5000/uploads/${product.image}`} alt='bla bla bla' style={{width:'400px', height:'400px'}}/>
            </div>
            <div className="pro_details">
                <h1>{product.name}</h1>
                <h4>{product.description}</h4>
                <h3>Price: {product.price} ৳BDT</h3>
            </div>
            
          </div>
          
          </>
      )
  }
  else
      data = "No product!"
  return (
    <div className="onClick_container">
      <p>{data}</p>
      <button className="add_button" onClick={addProductToCart}>Add to cart</button>
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
  )
}

export default Product