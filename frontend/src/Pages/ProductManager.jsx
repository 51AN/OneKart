import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../style/Product.css'
import '../style/Cart.css'
import '../style/form.css'

function ProductManager() {
    const {id} = useParams()
    const[product, setProduct] = useState(null)
    const [name, setName] = useState(null)
    const [description, setDescription] = useState(null)
    const [availability, setAvailability] = useState(null)
    const [price, setPrice] = useState(null)
    const [quantity, setQuantity] = useState(null)
    const [msg, setMsg] = useState(null)

    const history = useNavigate()

    const handleNameChange = (event)=>{
        setName(event.target.value)
    }
    
    const handleDescriptionChange = (event)=>{
        setDescription(event.target.value)
    }
    const handlePriceChange = (event)=>{
        setPrice(event.target.value)
    }

    const handleQuantityChange = (event)=>{
        setQuantity(event.target.value)
    }

    const handleAvailabilityChange = (event)=>{
        setAvailability(event.target.value)
    }

    const deleteProduct = async(event)=>{
        await axios.delete(`/products/myproduct/${id}`).then(
            (response)=>{
                history("/home-manager")
            }
        ).catch((error)=>{
            console.log(error)
        })
    }

    const handleSubmit =async(event)=>{
        event.preventDefault()
        const pdata = {
            name,
            description,
            availability,
            price,
            quantity
        }
        await axios.put(`/products/myproduct/${id}`, pdata).then((response)=>{
            setMsg("Product information updated successfully")
            window.location.reload()}
        ).catch((error)=>{
            setMsg("Update failed")
        })
    }

    const getProductData = async()=>{
        await axios.get(`/products/myproduct/${id}`).then(
            (response)=>{
                setProduct(response.data[0])
                console.log(response.data)
            }
        ).catch((error)=>{
            console.log(error)
        })
    }

    useEffect(() => {
        getProductData()
    },[])

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
                <p>Total sales: {product.sellcount}</p>
                <p>Quantity: {product.quantity}</p>
                <p>Earning: {product.price * product.sellcount}</p>
            </div>
            
          </div>
            </>
        )
    }
    else
        data = "No product!"

  return (
    <div>
        {data}
        <div className="inline_box">
        <div className="text-box">
            <h2>Update Product Info</h2>
        </div>
        </div>
        
        {msg && <p>{msg}</p>}
  

        {/* <form onSubmit={handleSubmit}>
          


            
        </form> */}

<div className="form_container">
        <form class="form" style={{width:'700px', height:'550px'}}>

        <div className="input-container">
                <input id="product_name" type="text" className="input" placeholder=" " value={name} onChange={handleNameChange}/>
                <div className="cut"></div>
                <label for="product_name" className="placeholder"> Product Name </label>
        </div>
      

            <div className="input-container">
                <input id="price" type="text" className="input" placeholder=" " value={price} onChange={handlePriceChange}/>
                <div className="cut"></div>
                <label for="price" className="placeholder"> Price </label>
            </div>

            <div className="input-container">
                <input id="description" type="text" className="input" placeholder=" " value={description} onChange={handleDescriptionChange}/>
                <div className="cut"></div>
                <label for="description" className="placeholder"> Description </label>
            </div>

            <div className="input-container">
                <input id="quantity" type="text" className="input" placeholder=" " value={quantity} onChange={handleQuantityChange}/>
                <div className="cut"></div>
                <label for="quantity" className="placeholder"> Quantity </label>
            </div>

            <div className="input-container">
                <input id="availability" type="text" className="input" placeholder=" " value={availability} onChange={handleAvailabilityChange}/>
                <div className="cut"></div>
                <label for="availability" className="placeholder"> Availability </label>
            </div>
            <button type='submit' className="update_button">
                Update
            </button>
    </form>
</div>
        
<div className="inline_box">
        <div className="text-box">
            <h2>Delete Product</h2>
        </div>
        </div>
        <button className="add_button" onClick={deleteProduct}>Delete</button>
    </div>
  )
}

export default ProductManager