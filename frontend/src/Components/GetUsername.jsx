import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

function GetUsername(props) {
    const [name, setName] = useState(null)

    const getUserData = async () => {
        await axios.get(`/orders/getUserData/${props.id}`).then(
            (response) => {
                setName(response.data[0].username)
            }
        ).catch((error) => {console.log(error)})
      }

    useEffect(()=>{
        getUserData()
    },[])

  return (
    <div><p> <b>From :</b> {name}</p></div>
  )
}

export default GetUsername