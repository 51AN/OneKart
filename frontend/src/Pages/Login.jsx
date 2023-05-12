import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import '../style/Login.css'
import { Link } from 'react-router-dom'

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
            localStorage.setItem("userId", response.data[0].id)
            localStorage.setItem("role",response.data[0].role)
            if(response.data[0].role === 'manager')
                history("/home-manager")
            else
                history("/")
            window.location.reload()
        }).catch((error)=>{
            setError("Invalid email or password")
        })
    }

  return (
    <div className="login_container">
			<div className="login_form_container">
				<div className="login_left">
					<form className="login_form_container2"
                        onSubmit={handleSubmit}>
						<h1>Login to Your Account</h1>
						<input
							type="email"
							placeholder="Email"
							value={email} 
                            onChange={handleEmailChange}
							required
							className="login_input"
						/>
						<input
							type="password"
							placeholder="Password"
							value={password} 
                            onChange={handlePasswordChange}
							required
							className="login_input"
						/>
						
						<Link to="/forgot-password" style={{ alignSelf: "flex-start" }}>
							<p style={{ padding: "7px 150px" }}>Forgot Password ?</p>
						</Link>
						{error && <div className="login_error_msg">{error}</div>}
						<button type="submit" className="login_green_btn">
							Log In
						</button>
						<button className="login_green_btn">
							<Link className="login_green_btn_link" to="/">Go To Home</Link>
						</button>
					</form>
				</div>
				<div className="login_right">
					<h1>New Here ?</h1>
					<Link to="/signup">
						<button type="button" className="login_white_btn">
							Sign Up
						</button>
					</Link>
				</div>
			</div>
		</div>
  )
}

export default Login