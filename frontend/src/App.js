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
import Cart from './Pages/Cart'
import Orders from './Pages/Orders'
import Profile from './Pages/Profile'
import Checkout from './Pages/Checkout'
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


  return (
  <>
    
    
    <Router>
    <div className="main_container">
      <Navbar user={user} role={role} />
      <Routes>
        <Route exact path='/' Component={Home} />
        <Route exact path='/home-manager' Component={HomeManager} />
        <Route exact path='/login' Component={Login} />
        <Route exact path='/signup' Component={Signup} />
        <Route exact path='/upload' Component={UploadAndDisplayImage} />
        <Route exact path='/product/:id' Component={Product} />
        <Route exact path='/product-manager/:id' Component={ProductManager} />
        <Route exact path='/cart/' Component={Cart} />
        <Route exact path='/checkout/' Component={Checkout} />
        <Route exact path='/orders/' Component={Orders} />
        <Route exact path="/profile/" Component={Profile}/>
      </Routes>
    </div>
  </Router>
  
    
  </>
  )
}

export default App