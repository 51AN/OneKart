import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import "../style/Navbar.css"
function Navbar({user, role}) {
    const[total, setTotal] = useState(null)
    const history = useNavigate()

    const getTotal = async()=>{
        axios.get('/cart/total').then(
            (response)=>{
                setTotal(response.data[0].total)
            }
        ).catch((error)=>{
            console.log(error)
        })
    }

    useEffect(()=>{
        getTotal()
    },[])

    const Logout = ()=>{
        axios.post("/users/logout").then(
            (response)=>{
                if(response.data.msg === "Logged out"){
                    localStorage.clear()
                    user = ''
                    history("/")
                    window.location.reload()
                }
            }
        ).catch((error)=>{
            console.log("Error logging out")
        })
    }
    let show = ''
    if(user){
        if(role === 'manager'){
            show = (
                <ul>
                    <li>
                        <Link to="/home-manager">Home</Link>
                    </li>
                    <li><Link to="/profile-manager/">{user}</Link></li>
                    <li>
                        <Link to="/orders-manager/">Orders</Link>
                    </li>
                    <li>
                        <Link to="/upload">Upload</Link>
                    </li>
                    <li onClick={Logout}><Link>Logout</Link></li>
                </ul>
            )
        }
        else{
            show =(
                <ul>
                    <>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li><Link to="/profile/">{user}</Link></li>
                        <li><Link to="/cart/">Cart({total})</Link></li>
                        <li><Link to="/orders/">Orders</Link></li>
                        <li onClick={Logout}><Link>Logout</Link></li>
                    </>
                </ul>
            )
        }
    }
    else{
        show = (
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/signup">Signup</Link>
                </li>
            </ul>
        )
    }
  return (
    <header>
    <nav>
        <img src="https://i.ibb.co/7tfGJXr/rsz-onekart-logo.pnghttps://i.ibb.co/q0YfcrM/rsz-1rsz-onekart-logo.png"></img>
            {show}
        
    </nav>
    </header>
  )
}

export default Navbar