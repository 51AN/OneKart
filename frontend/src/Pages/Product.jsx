import React from 'react'
import { useParams } from 'react-router-dom'

function Product() {
    const {name} = useParams()
    console.log(name)
  return (
    <div><h1>{name}</h1></div>
  )
}

export default Product