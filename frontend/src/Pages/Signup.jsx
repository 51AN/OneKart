import React, {useState} from 'react'
import axios from 'axios'
import '../style/Signup.css'
import {Link} from 'react-router-dom'
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
    <div className="signup_container">
			<div className="signup_form_container1">
				<div className="signup_left">
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className="signup_white_btn">
							Sign in
						</button>
					</Link>
				</div>
				<div className="signup_right">
					<form className="signup_form_container" onSubmit={handleSubmit}>
						<h1>Create Account</h1>
						<input
							type="text"
							placeholder="User Name"
							value={username} 
                            onChange={handleUsernameChange}
							required
							className="signup_input"
						/>
						<input
							type="email"
							placeholder="Email"
							value={email} 
                            onChange={handleEmailChange}
							required
							className="signup_input"
						/>
						<input
							type="password"
							placeholder="Password"
							value={password} 
                            onChange={handlePasswordChange}
							required
							className="signup_input"
						/>
                        <input
							type="text"
							placeholder="Address"
							value={address} 
                            onChange={handleAddressChange}
							required
							className="signup_input"
						/>
						
						{error && <div className="signup_error_msg">{error}</div>}
						{msg && <div className="signup_success_msg">{msg}</div>}
						<button type="submit" className="signup_green_btn">
							Sign Up
						</button>
						<button className="login_green_btn">
							<Link className="login_green_btn_link" to="/">Go To Home</Link>
						</button>
					</form>
				</div>
			</div>
		</div>
  )
}

export default Signup