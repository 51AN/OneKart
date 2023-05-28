import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

function ProfileManager() {
    const [userData, setUserData] = useState(null)

    const getData = async()=>{
        axios.get(`/users/getdatamanager/`).then(
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
        <p>Total sales: {userData.Saless}</p>
        <p>Total earning: {userData.Earning}</p>
        <p>Total Products: {userData.Products}</p></>}
    </div>
  )
}

export default ProfileManager