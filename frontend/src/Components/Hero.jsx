import React from 'react'
import '../style/Hero.css'
import { useState, useEffect } from 'react'
const Hero = () => {
    const [selectedCatagory, setSelectedCatagory] = useState(1)

    const handleSelectionChange = async(event) => {
      setSelectedCatagory(event.target.value)

    }
    return (
        <>
        
        </>
    )
}

export default Hero
