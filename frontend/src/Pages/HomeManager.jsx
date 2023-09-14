import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'
import '../style/Home.css'

function HomeManager() {
    const [loggedInUser, setLoggedInUser] = useState(null)
    const [search, setSearch] = useState(null)

    const [data, setData] = useState([]);

    const handlesearchChange = (event)=>{
      setSearch(event.target.value)
    }

    const handleSearchSubmit = async(event)=>{
      event.preventDefault()
      await axios.post(`/products/searchProductsManager/`, {pname: search}).then(
        (response)=>{
          setData(response.data.data)
        }
      ).catch((error)=>{
        console.log(error)
      })
    }

    const getUserData = async () => {
        await axios.get(`products/getbranchproducts/`).then(
            (response) => {
                setData(response.data)
            }
        ).catch((error) => {console.log(error)})
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

<div className="search-container-man">
      <form onSubmit={handleSearchSubmit} className="search">
      <input
				type="text"
				placeholder="Search Products"
				value={search} 
        onChange={handlesearchChange}
        class="searchTerm"
				required
			/>
      <button type='submit' class="searchButton">Go</button>
      </form>
    </div>

        {/* {loggedInUser && <p>Welcome, {loggedInUser}!</p>} */}
        <div className="inline_box">
          <div className="text-box">
            <h2>My Products</h2>
          </div>
        </div>
        <div className="all-container">

        {
          data.length>0?data.map((el, i) => {
            return (
              <>
                <Link to={`/product-manager/${el.id}`} className="link_color">
                <div className = "all-products">
                      <img className="all_image" src={`http://localhost:5000/uploads/${el.image}`} alt='bla bla bla' style={{width:'200px', height:'200px'}}/>
                      <h3>{el.name}</h3>
                      <p>{el.price} ৳BDT</p>
                    </div>
                  </Link>
                </>
            )
          }) : ""
        }
        </div>
    </div>
  )
}

export default HomeManager