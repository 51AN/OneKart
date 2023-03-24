import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' 
import Navbar from './Components/Navbar' 
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import { HashLoader } from 'react-spinners'
import { useState, useEffect } from 'react'
import "../src/App.css"

function App() {
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
      <Navbar/ >
      <Routes>
        <Route exact path='/' Component={Home} />
        <Route exact path='/login' Component={Login} />
        <Route exact path='/signup' Component={Signup} />
      </Routes>
    </div>
  </Router> </>}
    
  </>
  )
}

export default App