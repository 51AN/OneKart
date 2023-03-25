import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const history = useNavigate()

    const handleEmailChange = (event)=>{
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event)=>{
        setPassword(event.target.value)
    }

    const handleSubmit = async(event)=>{
        event.preventDefault()
        //login logic
        await axios.post("/users/login", {email, password}).then((response)=>{
            localStorage.setItem("loggedInUser", response.data[0].username)
            history("/")
            window.location.reload()
        }).catch((error)=>{
            setError("Invalid email or password")
        })
    }

  return (
    <div>
        <h1>Login page</h1>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input type="email" value={email} onChange={handleEmailChange} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={handlePasswordChange} />
            </label>
            <br />
            <button type='submit'>
                Login
            </button>
        </form>
    </div>
  )
}

export default Login