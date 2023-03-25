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

function App() {
  //get user from localstorage
  const [user, setUser] = useState(null)
  useEffect(()=>{
    const user = localStorage.getItem("loggedInUser")
    if(user){
        setUser(user)
    }  
  },[])

  //handle logout
  const handleLogout = ()=>{
    localStorage.clear()
    setUser(null)
    window.location.reload()
  }

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
      <Navbar user={user} logout={handleLogout} />
      <Routes>
        <Route exact path='/' Component={Home} />
        <Route exact path='/login' Component={Login} />
        <Route exact path='/signup' Component={Signup} />
        <Route exact path='/upload' Component={UploadAndDisplayImage} />
      </Routes>
    </div>
  </Router> </>}
    
  </>
  )
}

export default App