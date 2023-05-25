const asynchandler = require('express-async-handler')
const connection = require('../config/dbconnect')

const createOrders = asynchandler(async(req, res)=>{
    const {district, address, zipcode} = req.body

    const sql = `SELECT cart_items.pid, cart_items.quantity, cart_items.price, products.bid FROM cart_items INNER JOIN products ON cart_items.pid = products.id WHERE cartid = ${req.session.cartId}`

    connection.query(sql, (err, results) => {
        if(err){
            res.status(400).json({msg: "An error occured"})
            return
        }
        //res.status(200).json(results)
        if(results.length === 0){
            res.status(200).json({msg: "Your cart is empty"})
            return
        }

        for(i=0; i<results.length; i++){
            const sql1 = `INSERT INTO orders(cartid, pid, quantity, price, bid, district, address, zipcode) VALUES('${req.session.cartId}', '${results[i].pid}', '${results[i].quantity}', '${results[i].price}', '${results[i].bid}', '${district}', '${address}', '${zipcode}')`

            connection.query(sql1, (err, result) => {
                if(err){
                    res.status(400).json(err)
                    return
                }
            })
        }

        const sql2 = `DELETE FROM cart_items WHERE cartid = ${req.session.cartId}`
        connection.query(sql2, (err, result) => {
            if(err){
                res.status(400).json({msg: err})
                return
            }
            res.status(200).json({msg: "Order placed successfully"})
        }) 
    })
})

module.exports = {
    createOrders,
}