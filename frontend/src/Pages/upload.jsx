import React, { useState } from "react";
import axios from "axios";

const UploadAndDisplayImage = () => {

  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState(null)
  const [description, setDescription] = useState(null)
  const [availability, setAvailability] = useState(null)
  const [price, setPrice] = useState(null)
  const [quantity, setQuantity] = useState(null)
  const [msg, setMsg] = useState(null)
  const [bid, setBid] = useState(null)

  const handleSubmit = async(event)=>{
    event.preventDefault()

    const managerId = localStorage.getItem("userId")
    await axios.get(`/branch/${managerId}`).then(
      (response)=>{
        setBid(response.data[0].bid)
      }
    ).catch((error)=>{
      console.log(error)
    })

    const formData = new FormData();
    
    formData.append("name",name)
    formData.append("description", description)
    formData.append("photo",selectedImage)
    formData.append("price", price)
    formData.append("quantity", quantity)
    formData.append("availability", availability)
    formData.append("bid", bid)

    const config = {
        headers:{
            "Content-Type":"multipart/form-data"
        }
    }


    await axios.post("/products/", formData, config).then(
      (response)=>{
        setMsg("Product uploaded successfully")
        setTimeout(() => {
          setMsg('')
        }, 2000)
      }
    ).catch((error)=>{
      setMsg("An error occured while uploading")
    })
  }

  const handleNameChange = (event)=>{
    setName(event.target.value)
  }

  const handleDescriptionChange = (event)=>{
    setDescription(event.target.value)
  }

  const handleImage = (event)=>{
    setSelectedImage(event.target.files[0])
    //setUrl(window.URL.createObjectURL(selectedImage))
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

  return (
    <div>
      <div className="inline_box">
      <div className="text-box">
        <h2>Upload and Display Image usign React Hook's</h2>
      </div>
    </div>
      {msg && <p>{msg}</p>}
      {selectedImage && (
        <div>
          <img
            alt="not found"
            width={"250px"}
            src={URL.createObjectURL(selectedImage)}
          />
          <br />
          <button onClick={() => setSelectedImage(null)}>Remove</button>
        </div>
      )}

      <br />

{/* 
      <form onSubmit={handleSubmit}>
        <label>
            Name:
            <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <label>
            Description:
            <input type="text" value={description} onChange={handleDescriptionChange} />
        </label>
        <label>
          image:
          <input type="file" name="myImage" onChange={handleImage}/>
        </label>
        <label>
            Price:
            <input type="text" value={price} onChange={handlePriceChange} />
        </label>
        <label>
            Quantity:
            <input type="text" value={quantity} onChange={handleQuantityChange} />
        </label>
        <label>
            Availability:
            <input type="text" value={availability} onChange={handleAvailabilityChange} />
        </label>
        <br />
            <button type='submit'>
                Submit
            </button>
      </form> */}

  <div className="form_container">
        <form class="form" onSubmit={handleSubmit} style={{width:'800px', height:'610px'}}>

        <div className="input-container">
                <input id="name_enter" type="text" className="input" placeholder=" " value={name} onChange={handleNameChange}/>
                <div className="cut"></div>
                <label for="name_enter" className="placeholder"> Name </label>
        </div>

        <div className="input-container">
            <input id="description" type="text" className="input" placeholder=" " value={description} onChange={handleDescriptionChange}/>
            <div className="cut"></div>
            <label for="description" className="placeholder"> Description </label>
        </div>
        
      

            <div className="input-container">
                <input id="price-enter" type="text" className="input" placeholder=" " value={price} onChange={handlePriceChange}/>
                <div className="cut"></div>
                <label for="price-enter" className="placeholder"> Price </label>
            </div>

            <div className="input-container">
                <input id="quantity-enter" type="text" className="input" placeholder=" " value={quantity} onChange={handleQuantityChange}/>
                <div className="cut"></div>
                <label for="quantity-enter" className="placeholder"> Quantity </label>
            </div>

            <div className="input-container">
                <input id="availability-enter" type="text" className="input" placeholder=" " value={availability} onChange={handleAvailabilityChange}/>
                <div className="cut"></div>
                <label for="availability-enter" className="placeholder"> Availability </label>
            </div>
        <div className="input-container">
            <input id="image_enter"  type="file" className="input" placeholder=" " name="myImage" onChange={handleImage}/>
            <div className="cut"></div>
            <label for="image_enter" className="placeholder">  </label>
        </div>
            <button type='submit' className="update_button">
                Submit
            </button>
    </form>
 </div>


    </div>
  );
};

export default UploadAndDisplayImage;