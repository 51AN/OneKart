const asynchandler = require('express-async-handler')
const connection = require('../config/dbconnect')

//get all products
const allProducts = asynchandler(async(req, res)=>{
    const sql = 'SELECT * FROM products'

    connection.query(sql, (err, results) => {
        if(err){
            res.status(400).json({msg: "An error occured"})
            return
        }
        res.status(200).json(results)
    })
})

const uploadProduct = asynchandler(async(req, res)=>{
    const{name, description} = req.body
    const {image} = req.file

    const insert = `INSERT INTO products(name, description, image) VALUES('${name}', '${description}', '${image}')`
    connection.query(insert, (err, results) => {
        if(err){
            res.status(400).json(err)
            return
        }
        res.status(200).json({msg: 'Upload Successful'})
    })
})

module.exports = {
    allProducts,
    uploadProduct,
}