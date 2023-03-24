import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' 
import Navbar from './Components/Navbar' 
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'

function App() {
  return (
    <Router>
      <div>
        <Navbar/ >
        <Routes>
          <Route exact path='/' Component={Home} />
          <Route exact path='/login' Component={Login} />
          <Route exact path='/signup' Component={Signup} />
        </Routes>
      </div>
    </Router>
  )
}

export default App