const asynchandler = require('express-async-handler')
const connection = require('../config/dbconnect')

const addToCart = asynchandler(async(req, res)=>{
    const {pid, perunitprice} = req.body

    const sql = `SELECT * FROM cart_items WHERE cartid = ${req.session.cartId} AND pid = ${pid}`

    connection.query(sql, (err, results) => {
        if(err){
            res.status(400).json(err)
            return
        }

        if(results.length > 0){
            const updateQty = `UPDATE cart_items SET quantity = quantity + 1 WHERE cartid = ${req.session.cartId} AND pid = ${pid}`
            const updatePrice = `UPDATE cart_items SET price = price + ${perunitprice} WHERE cartid = ${req.session.cartId} AND pid = ${pid}`

            connection.query(updateQty, (err, result)=>{
                if(err){
                    console.log(err)
                    return
                }

                console.log('updated qty successful')
            })

            connection.query(updatePrice, (err, result)=>{
                if(err){
                    console.log(err)
                    return
                }

                console.log('updated price successful')
            })

            res.status(200).json({msg: 'Product Added to cart'})
        }
        else{
            const insertIntoCart = `INSERT INTO cart_items(cartid, pid, quantity, price) VALUES('${req.session.cartId}', '${pid}', '1', '${perunitprice}')`

            connection.query(insertIntoCart, (err, result)=>{
                if(err){
                    console.log(err)
                    return
                }

                res.status(200).json({msg: 'Product Added to cart'})
            })
        }
    })
})

const getCartItems = asynchandler(async(req, res)=>{
    const sql = `SELECT products.id, products.name, products.image, cart_items.quantity, cart_items.price
                 FROM products 
                 JOIN cart_items ON products.id = cart_items.pid
                 WHERE cart_items.cartid = ${req.session.cartId}`

    connection.query(sql, (err, results)=>{
        if(err){
            res.status(400).json(err)
            return
        }

        res.status(200).json({data:results})
    })
})

const getTotalItem = asynchandler(async(req, res)=>{
    const sql = `SELECT COUNT(*) AS total FROM cart_items WHERE cartid = ${req.session.cartId}`

    connection.query(sql, (err, results)=>{
        if(err){
            res.status(400).json(err)
            return
        }

        res.status(200).json(results)
    })
})

const increaseItem = asynchandler(async(req, res)=>{
    const sql = `UPDATE cart_items SET price = price + (price/quantity), quantity = quantity + 1 WHERE cartid = ${req.session.cartId} AND pid = ${req.params.id}`

    connection.query(sql, (err, results)=>{
        if(err){
            res.status(400).json(err)
            return
        }

        res.status(200).json(results)
    })
})

const decreaseItem = asynchandler(async(req, res)=>{
    const sql = `UPDATE cart_items SET price = price - (price/quantity), quantity = quantity - 1 WHERE cartid = ${req.session.cartId} AND pid = ${req.params.id}`

    connection.query(sql, (err, results)=>{
        if(err){
            res.status(400).json(err)
            return
        }

        res.status(200).json(results)
    })
})

const deleteItem = asynchandler(async(req, res)=>{
    const sql = `DELETE FROM cart_items WHERE cartid = ${req.session.cartId} AND pid = ${req.params.id}`

    connection.query(sql, (err, results)=>{
        if(err){
            res.status(400).json(err)
            return
        }

        res.status(200).json(results)
    })
})

const getTotalAmount = asynchandler(async(req, res)=>{
    const sql = `SELECT SUM(price) AS totalAmount FROM cart_items WHERE cartid = ${req.session.cartId}`

    connection.query(sql, (err, results)=>{
        if(err){
            res.status(400).json(err)
            return
        }

        res.status(200).json(results)
    })
})

module.exports = {
    addToCart,
    getCartItems,
    getTotalItem,
    increaseItem,
    decreaseItem,
    deleteItem,
    getTotalAmount,
}