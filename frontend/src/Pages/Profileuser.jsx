import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import '../style/Profile.css'

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
        <div className="inline_box">
        <div className="text-box">
            <h2>My Profile</h2>
        </div>
        </div>
        <div className="profile-container">
            {userData && <>
            <div className="profile-details">
                <div className="one">
                <p> <b>Name :</b> {userData.Name}</p>
                <p><b>Email :</b> {userData.Email}</p>
                <p><b>Address :</b> {userData.Address}</p>
                </div>
                <div className="two">
                <p><b>Total orders :</b> {userData.Orders}</p>
                <p><b>Completed orders :</b> {userData.Complete}</p>
                <p><b>Total spent :</b> {userData.Spent}</p>
                </div>
                
                
            </div>
            </>}
        </div>

        

    </div>
  )
}

export default Profileuser