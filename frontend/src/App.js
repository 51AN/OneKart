import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' 
import Navbar from './Components/Navbar' 
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import UploadAndDisplayImage from './Pages/upload'
import { HashLoader } from 'react-spinners'
import { useState, useEffect } from 'react'
import "../src/App.css"
import Product from './Pages/Product'
import HomeManager from './Pages/HomeManager'
import ProductManager from './Pages/ProductManager'

function App() {
  //get user from localstorage
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)
  useEffect(()=>{
    const user = localStorage.getItem("loggedInUser")
    const role = localStorage.getItem("role")
    if(user){
        setUser(user)
        setRole(role)
    }  
  },[])

  //loading state
  const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    },[])

  return (
  <>
    {loading?<div className="loadingScreen"><HashLoader color={"#FA6D4F"} loading={loading} size={100} aria-label="Loading Spinner" data-testid="loader"/> </div> 
    :<><Router>
    <div>
      <Navbar user={user} role={role} />
      <Routes>
        <Route exact path='/' Component={Home} />
        <Route exact path='/home-manager' Component={HomeManager} />
        <Route exact path='/login' Component={Login} />
        <Route exact path='/signup' Component={Signup} />
        <Route exact path='/upload' Component={UploadAndDisplayImage} />
        <Route exact path='/product/:name' Component={Product} />
        <Route exact path='/product-manager/:id' Component={ProductManager} />
      </Routes>
    </div>
  </Router> </>}
    
  </>
  )
}

export default App