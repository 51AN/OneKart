const asynchandler = require('express-async-handler')
const connection = require('../config/dbconnect')

const addToCart = asynchandler(async(req, res)=>{
    const sql = `SELECT * FROM branch WHERE branchmanager = ${req.params.id}`

    connection.query(sql, (err, results) => {
        if(err){
            res.status(400).json({msg: "An error occured"})
            return
        }
        res.status(200).json(results)
    })
})

module.exports = {
    addToCart,
}