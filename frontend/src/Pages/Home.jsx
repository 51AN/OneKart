import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'
import "../style/Home.css"
import "../style/Hero.css"
import hero from '../Components/Hero';
import Hero from '../Components/Hero';

function Home() {
    const [loggedInUser, setLoggedInUser] = useState(null)

    const [data, setData] = useState([])
    const [topsellingProductData, setTopsellingProductData] = useState(null)
    const [selectedCatagory, setSelectedCatagory] = useState(1)
    const [search, setSearch] = useState(null)

    const handleSelectionChange = async(event) => {
      setSelectedCatagory(event.target.value)

    }
    const handlesearchChange = (event)=>{
      setSearch(event.target.value)
    }

    const handleSearchSubmit = async(event)=>{
      event.preventDefault()
      await axios.post(`/products/searchProducts/`, {pname: search, branch: selectedCatagory}).then(
        (response)=>{
          setData(response.data.data)
          setTopsellingProductData('')
        }
      ).catch((error)=>{
        console.log(error)
      })
    }

    const getUserData = async () => {
        const res = await axios.get(`/products/all/${selectedCatagory}`, {
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

    const getTopSellingProducts = async () => {
        await axios.get(`/products/topselling/${selectedCatagory}`).then(
            (response)=>{
                setTopsellingProductData(response.data.data)
            }
        ).catch((error)=>{
            console.log(error)
        })
    }

    useEffect(()=>{
        const user = localStorage.getItem("loggedInUser")
        if(user){
            setLoggedInUser(user)
        }
    },[])

    useEffect(() => {
      getUserData()
      getTopSellingProducts()
  }, [selectedCatagory])

  return (
  <>
    {/* <nav>
    <select value={selectedCatagory} onChange={handleSelectionChange}>
          <option value="1">Dhaka</option>
          <option value="2">Mymensingh</option>
        </select>
    </nav> */}

    {/* hero part  */}
    <div className="container_hero">
            <div className="header_text">
                <h1>Welcome to OneKart</h1>
            </div>
            <div className="header_selection">
              <h3>Select Branch</h3>
              <div className="selectPad">
              <select className="header_select" value={selectedCatagory} onChange={handleSelectionChange}>
                    <option value="1">Dhaka</option>
                    <option value="2">Mymensingh</option>
                    <option value="3">Gazipur</option>
                    <option value="4">Chittagong</option>
                </select>
              </div>
                
            </div>
    </div>

<div className="search-container">
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

    



    {topsellingProductData && topsellingProductData.length > 0 ? (
  <div className="inline_box">
    <div className="text-box">
      <h2>Top selling products</h2>
    </div>
  </div>
) : null}

    
      <div className = "top-container">
        {/* {loggedInUser && <p>Welcome, {loggedInUser}!</p>} */}
        
        {topsellingProductData &&
          topsellingProductData.length>0?topsellingProductData.map((el, i) => {
            return (
                <>
                <Link to={`/product/${el.id}`} className="link_color">
                  <div className = "top-selling">
                    <img className="ts_image" src={`http://localhost:5000/uploads/${el.image}`} alt='bla bla bla' style={{width:'200px', height:'200px'}}/>
                    
                    <h3>{el.name}</h3>
                    <p>{el.price} ৳BDT</p>
                  </div>
                </Link>
                </>
            )
        }) : ""
        }
      </div>
        <div className="inline_box">
          <div className="text-box">
            <h2>All products</h2>
          </div>
        </div>

        <div className="all-container">
        {data &&
          data.length>0?data.map((el, i) => {
            return (
                <>
                  <Link to={`/product/${el.id}`} className="link_color">
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
   </>
  )
}

export default Home