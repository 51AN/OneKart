import React, { useState } from "react";
import axios from "axios";

const UploadAndDisplayImage = () => {

  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState(null)
  const [description, setDescription] = useState(null)
  const [msg, setMsg] = useState(null)

  const handleSubmit = async(event)=>{
    event.preventDefault()

    const formData = new FormData();
    
    formData.append("name",name)
    formData.append("description", description)
    formData.append("photo",selectedImage)
    

    const config = {
        headers:{
            "Content-Type":"multipart/form-data"
        }
    }


    await axios.post("/products/", formData, config).then(
      (response)=>{
        setMsg(response.data[0].msg)
      }
    ).catch((error)=>{
      setMsg(error.response.data[0].msg)
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

  return (
    <div>
      <h1>Upload and Display Image usign React Hook's</h1>
      {msg && <p>{msg}</p>}
      {selectedImage && (
        <div>
          <img
            alt="not found"
            width={"250px"}
            src={URL.createObjectURL(selectedImage)}
          />
          <p>{URL.createObjectURL(selectedImage)}</p>
          <br />
          <button onClick={() => setSelectedImage(null)}>Remove</button>
        </div>
      )}

      <br />
      <br />

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
          <input
          type="file"
          name="myImage"
          onChange={handleImage}
        />
        </label>
        <br />
            <button type='submit'>
                Submit
            </button>
      </form>
    </div>
  );
};

export default UploadAndDisplayImage;