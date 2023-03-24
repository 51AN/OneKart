import React, {useState, useEffect} from 'react'

function Home() {
    const [loggedInUser, setLoggedInUser] = useState(null)

    useEffect(()=>{
        const user = localStorage.getItem("loggedInUser")
        if(user){
            setLoggedInUser(user)
        }
    },[])

  return (
    <div>
        <h1>Homepage boiiiii</h1>
        {loggedInUser && <p>Welcome, {loggedInUser}!</p>}
    </div>
  )
}

export default Home