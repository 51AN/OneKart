import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

function Profileuser() {
    const [userData, setUserData] = useState(null)

    const getData = async()=>{
        axios.get(`/users/getdata/`).then(
            (response)=>{
                setUserData(response.data)
            }
        ).catch((error)=>{
            console.log(error)
        })
    }

    useEffect(()=>{
        getData()
    }, [])
  return (
    <div>
        <h1>My profile</h1>
        {userData && <>
        <p>Name: {userData.Name}</p>
        <p>Email: {userData.Email}</p>
        <p>Address: {userData.Address}</p>
        <p>Total orders: {userData.Orders}</p>
        <p>Completed orders: {userData.Complete}</p>
        <p>Total spent: {userData.Spent}</p></>}
    </div>
  )
}

export default Profileuser