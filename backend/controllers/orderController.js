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
            const sql1 = `INSERT INTO orders(cartid, pid, quantity, price, bid, district, address, zipcode, time) VALUES('${req.session.cartId}', '${results[i].pid}', '${results[i].quantity}', '${results[i].price}', '${results[i].bid}', '${district}', '${address}', '${zipcode}', CURRENT_TIMESTAMP)`

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

const getMyOrders = asynchandler(async(req, res)=>{
    const sql = `SELECT orders.price, orders.quantity, orders.district, orders.address, orders.time, orders.status,
                 products.name as pname, products.image, branch.name FROM orders
                 INNER JOIN products ON orders.pid = products.id
                 INNER JOIN branch ON orders.bid = branch.bid
                  WHERE cartid = ${req.session.cartId}`

    connection.query(sql, (err, results) => {
        if(err){
            res.status(400).json({msg: err})
            return
        }
        res.status(200).json(results)
    }) 
})

const getBranchOrders = asynchandler(async(req, res)=>{
    const sql = `SELECT orders.id, orders.cartid, orders.price, orders.quantity, orders.district, orders.address, orders.zipcode, orders.time, orders.status,
                 products.name as pname, products.image FROM orders
                 INNER JOIN products ON orders.pid = products.id
                 INNER JOIN branch ON orders.bid = branch.bid
                 INNER JOIN users ON branch.branchmanager = users.id
                  WHERE users.id = ${req.session.uid}
                  ORDER BY time DESC`

    connection.query(sql, (err, results) => {
        if(err){
            res.status(400).json({msg: err})
            return
        }
        res.status(200).json(results)
    }) 
})

const getOrderStatus = asynchandler(async(req, res)=>{
    const sql = `SELECT status FROM orders WHERE id = ${req.params.id}`

    connection.query(sql, (err, results) => {
        if(err){
            res.status(400).json({msg: err})
            return
        }
        res.status(200).json(results)
    }) 
})

const getUserData = asynchandler(async(req, res)=>{
    const sql = `SELECT DISTINCT users.username FROM orders INNER JOIN carts ON orders.cartid = carts.id INNER JOIN users ON carts.uid = users.id WHERE cartid = ${req.params.id}`

    connection.query(sql, (err, results) => {
        if(err){
            res.status(400).json({msg: err})
            return
        }
        res.status(200).json(results)
    }) 
})

const updateOrderStatus = asynchandler(async(req, res)=>{
    const sql = `SELECT * FROM orders WHERE id = ${req.params.id}`
    const {selectedStatus} = req.body

    if(selectedStatus !== 'Complete'){
        const sql1 = `UPDATE orders
                      SET status = "${selectedStatus}"
                      WHERE id = ${req.params.id}`
        connection.query(sql1, (err, results) => {
            if(err){
                res.status(400).json({msg: err})
                return
            }
            res.status(200).json({msg: "Status updated successfully"})
        })

    }else{
        connection.query(sql, (err, results) => {
            if(err){
                res.status(400).json({msg: err})
                return
            }
            //res.status(200).json(results)
            const sql2 = `UPDATE products SET sellcount = sellcount + ${results[0].quantity}, quantity = quantity - ${results[0].quantity}
                          WHERE id = ${results[0].pid}`
            connection.query(sql2, (err, result) => {
                if(err){
                    res.status(400).json({msg: err})
                    return
                }
            //res.status(200).json({msg: "Status updated successfully"})
                const sql1 = `UPDATE orders
                      SET status = "${selectedStatus}"
                      WHERE id = ${req.params.id}`
                connection.query(sql1, (err, reslt) => {
                    if(err){
                        res.status(400).json({msg: err})
                        return
                    }
                res.status(200).json({msg: "Status updated successfully"})
            })
        })
        }) 
    }
})

module.exports = {
    createOrders,
    getMyOrders,
    getBranchOrders,
    getOrderStatus,
    updateOrderStatus,
    getUserData,
}