import React, {useState, useEffect} from 'react'
import axios from 'axios';

function Home() {
    const [loggedInUser, setLoggedInUser] = useState(null)

    const [data, setData] = useState([]);

    const getUserData = async () => {
        const res = await axios.get("/products/", {
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (res.data.status === 201) {
            console.log("data get");
            setData(res.data.data)

        } else {
            console.log("error")
        }
    }

    useEffect(()=>{
        const user = localStorage.getItem("loggedInUser")
        if(user){
            setLoggedInUser(user)
        }
    },[])

    useEffect(() => {
      getUserData()
  }, [])

  return (
    <div>
        <h1>Homepage boiiiii</h1>
        {loggedInUser && <p>Welcome, {loggedInUser}!</p>}
        {
          data.length>0?data.map((el, i) => {
            return (
                <>
                  <div>
                    <img src={`http://localhost:5000/uploads/${el.image}`} alt='bla bla bla' style={{width:'400px', height:'400px'}}/>
                    <p>{el.name}</p>
                    <p>{el.description}</p>
                  </div>
                </>
            )
        }) : ""
        }
    </div>
  )
}

export default Home