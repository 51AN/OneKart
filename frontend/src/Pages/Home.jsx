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
        <div>
          <div>
            <img src={require('../images/kitkat.jpg')} alt='kitkat' style={{ width: '400px', height: '400' }}/>
            <p>kitkat</p>
          </div>
          <div>
            <img src={require('../images/dairy milk.jpg')} alt='kitkat' style={{ width: '400px', height: '400' }}/>
            <p>dairy milk</p>
          </div>
          <div>
            <img src={require('../images/OIP.jpg')} alt='kitkat' style={{ width: '400px', height: '400' }}/>
            <p>snickers</p>
          </div>
        </div>
    </div>
  )
}

export default Home