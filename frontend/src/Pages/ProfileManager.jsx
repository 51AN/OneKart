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
                <p><b>Total sales :</b> {userData.Saless}</p>
                <p><b>Total earning :</b> {userData.Earning}</p>
                <p><b>Total Products :</b> {userData.Products}</p>
                </div>
                
                
            </div>
            </>}
        </div>


        {/* <div className="inline_box">
        <div className="text-box">
            <h2>My Profile</h2>
        </div>
        </div>
        {userData && <>
        <p>Name: {userData.Name}</p>
        <p>Email: {userData.Email}</p>
        <p>Address: {userData.Address}</p>
        <p>Total sales: {userData.Saless}</p>
        <p>Total earning: {userData.Earning}</p>
        <p>Total Products: {userData.Products}</p></>} */}
    </div>
  )
}

export default ProfileManager