import React, {useState} from 'react'
import axios from 'axios'

function Signup() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [address, setAddress] = useState("")
    const [error, setError] = useState("")
    const [msg, setMsg] = useState("") 


    const handleUsernameChange = (event)=>{
        setUsername(event.target.value)
    }

    const handleEmailChange = (event)=>{
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event)=>{
        setPassword(event.target.value)
    }

    const handleAddressChange = (event)=>{
        setAddress(event.target.value)
    }

    const handleSubmit =async(event)=>{
        event.preventDefault()
        //signup logic
        await axios.post("/users/register", {username ,email, password, address}).then((response)=>{
            setMsg("Registration successful!")
        }).catch((error)=>{
            setError("Invalid email or password")
        })
    }
  return (
    <div>
        <h1>Signup page</h1>
        {error && <p>{error}</p>}
        {msg && <p>{msg}</p>}
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" value={username} onChange={handleUsernameChange} />
            </label>
            <label>
                Email:
                <input type="email" value={email} onChange={handleEmailChange} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={handlePasswordChange} />
            </label>
            <label>
                Address:
                <input type="text" value={address} onChange={handleAddressChange} />
            </label>
            <br />
            <button type='submit'>
                Sign up
            </button>
        </form>
    </div>
  )
}

export default Signup