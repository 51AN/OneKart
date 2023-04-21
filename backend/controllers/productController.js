const asynchandler = require('express-async-handler')
const connection = require('../config/dbconnect')

const getMyProduct = asynchandler(async(req, res)=>{
    const sql = `SELECT * FROM products WHERE id = ${req.params.id}`

    connection.query(sql, (err, results) => {
        if(err){
            res.status(400).json({msg: "An error occured"})
            return
        }
        res.status(200).json(results)
    })
})

const updateProduct = asynchandler(async(req, res)=>{
    const {name, price, description, quantity, availability} = req.body
    const sql = `UPDATE products
                 SET name="${name}", price="${price}", description="${description}", quantity="${quantity}", availability="${availability}"
                 WHERE id = ${req.params.id}`

    connection.query(sql, (err, results) => {
        if(err){
            res.status(400).json({msg: err})
            return
        }
        res.status(200).json(results)
    })
})

const topSellingProducts = asynchandler(async(req, res)=>{
    const sql = `SELECT * FROM products ORDER BY sellcount DESC LIMIT 5`

    connection.query(sql, (err, results) => {
        if(err){
            res.status(400).json({msg: "An error occured"})
            return
        }
        res.status(200).json({data: results})
    })

})

const deleteProduct = asynchandler(async(req, res)=>{
    const sql = `DELETE FROM products WHERE id = ${req.params.id}`

    connection.query(sql, (err, results) => {
        if(err){
            res.status(400).json({msg: "An error occured"})
            return
        }
        res.status(200).json(results)
    })
})

module.exports = {
    getMyProduct,
    updateProduct,
    deleteProduct,
    topSellingProducts,
}