import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

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
            <h1>{product.name}</h1>
            <img src={`http://localhost:5000/uploads/${product.image}`} alt='bla bla bla' style={{width:'400px', height:'400px'}}/>
            <p>Description: {product.description}</p>
            <p>Price: {product.price}</p>
            <p>Total sales: {product.sellcount}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Earning: {product.price * product.sellcount}</p>
            </>
        )
    }
    else
        data = "No product!"

  return (
    <div>
        {data}
        <h1>Update product info</h1>
        {msg && <p>{msg}</p>}
        <form onSubmit={handleSubmit}>
            <label>
                Product name:
                <input type="text" value={name} onChange={handleNameChange}/>
            </label>
            <label>
                Price:
                <input type="text" value={price} onChange={handlePriceChange}/>
            </label>
            <label>
                Description:
                <input type="text" value={description} onChange={handleDescriptionChange}/>
            </label>
            <label>
                Quantity:
                <input type="text" value={quantity} onChange={handleQuantityChange}/>
            </label>
            <label>
                Availability:
                <input type="text" value={availability} onChange={handleAvailabilityChange}/>
            </label>
            <br />
            <button type='submit'>
                Update
            </button>
        </form>
        <h1>Delete Product</h1>
        <button onClick={deleteProduct}>Delete</button>
    </div>
  )
}

export default ProductManager