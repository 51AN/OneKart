const asynchandler = require('express-async-handler')
const connection = require('../config/dbconnect')
const bcrypt = require('bcryptjs')

const getAllUsers = asynchandler(async(req, res)=>{
    const sql = 'SELECT * FROM users'

    connection.query(sql, (err, results) => {
        if(err){
            res.status(400).json({msg: "An error occured"})
            return
        }
        res.status(200).json(results)
    })
})

const loginUser = asynchandler(async(req, res)=>{
    const{email, password} = req.body

    const sql = `SELECT * FROM users WHERE email = "${email}"`

    connection.query(sql, (err, results) => {
        if(results.length === 0){
            res.status(400).json({msg: 'Invalid information'})
            return
        }

        const pass = results[0].password
        bcrypt.compare(password, pass, (err, result)=>{
            if(result){
                req.session.uid = results[0].id
                req.session.username = results[0].username
                req.session.role = results[0].role

                const getCartId = `SELECT id FROM carts WHERE uid = "${req.session.uid}"`
                connection.query(getCartId, (err, reslt)=>{
                    if(err){
                        console.log(err)
                        return
                    }
                    if(reslt.length > 0){
                        req.session.cartId = reslt[0].id
                    }
                    res.status(200).json(results)
                })
            }
            else{
                res.status(400).json({msg: 'Invalid information'})
            }
        })
    })
})

const logoutUser = asynchandler(async(req, res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.log(err)
        }
        else{
            res.json({msg: "Logged out"})
        }
    })
})

const getData = asynchandler(async(req, res)=>{
    const sql = `SELECT * FROM users WHERE id = ${req.session.uid}`
    const sql1 = `SELECT COUNT(orders.id) AS total FROM orders INNER JOIN carts ON orders.cartid = carts.id
                  INNER JOIN users ON carts.uid = users.id WHERE users.id = ${req.session.uid}`
    const sql2 = `SELECT SUM(orders.price) AS spent FROM orders INNER JOIN carts ON orders.cartid = carts.id
                  INNER JOIN users ON carts.uid = users.id WHERE users.id = ${req.session.uid} AND orders.status = "Complete"`
    const sql3 = `SELECT COUNT(orders.id) AS total FROM orders INNER JOIN carts ON orders.cartid = carts.id
                    INNER JOIN users ON carts.uid = users.id WHERE users.id = ${req.session.uid} AND orders.status = "Complete"`

    connection.query(sql, (err, results) => {
        if(err){
            res.status(400).json(err)
            return
        }

        connection.query(sql1, (err, result) => {
            if(err){
                res.status(400).json(err)
                return
            }

            connection.query(sql2, (err, reslt) => {
                if(err){
                    res.status(400).json(err)
                    return
                }

                connection.query(sql3, (err, rslt) => {
                    if(err){
                        res.status(400).json(err)
                        return
                    }
                    res.status(200).json({Name: results[0].username,
                        Email: results[0].email,
                      Address: results[0].address,
                      Orders: result[0].total,
                      Complete: rslt[0].total,
                      Spent: reslt[0].spent})
                })
            })
        })
    })
})

const getDataManager = asynchandler(async(req, res)=>{
    const sql = `SELECT * FROM users WHERE id = ${req.session.uid}`
    const sql1 = `SELECT SUM(sellcount) AS total FROM products INNER JOIN branch ON products.bid = branch.bid WHERE branch.branchmanager = ${req.session.uid}`
    const sql2 = `SELECT SUM(sellcount*price) AS total FROM products INNER JOIN branch ON products.bid = branch.bid WHERE branch.branchmanager = ${req.session.uid}`
    const sql3 = `SELECT COUNT(products.id) AS total FROM products INNER JOIN branch ON products.bid = branch.bid WHERE branch.branchmanager = ${req.session.uid}`

    connection.query(sql, (err, results) => {
        if(err){
            res.status(400).json(err)
            return
        }

        connection.query(sql1, (err, result) => {
            if(err){
                res.status(400).json(err)
                return
            }

            connection.query(sql2, (err, reslt) => {
                if(err){
                    res.status(400).json(err)
                    return
                }

                connection.query(sql3, (err, rslt) => {
                    if(err){
                        res.status(400).json(err)
                        return
                    }
                    res.status(200).json({Name: results[0].username,
                        Email: results[0].email,
                      Address: results[0].address,
                      Saless: result[0].total,
                      Earning: reslt[0].total,
                      Products: rslt[0].total})
                })
            })
        })
    })
})

const registerUser = asynchandler(async(req, res)=>{
    const{username, email, password, address} = req.body
   
    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedpass = await bcrypt.hash(password, salt) 
    const sql = `SELECT * FROM users WHERE email = "${email}"`

    //connection query
    connection.query(sql, (err, results) => {
        if(results.length > 0)
        {
            res.status(400).json({msg: 'An account already exists with this email', results})
            return
        }

        const insert = `INSERT INTO users(username, email, password, address, role) VALUES('${username}', '${email}', '${hashedpass}', '${address}', 'customer')`
        connection.query(insert, (err, results) => {
            if(err){
                res.status(400).json(err)
                return
            }
            res.status(200).json({msg: 'Registration Successful'})
        })

        const uid = `SELECT id FROM users WHERE email = "${email}"`
        connection.query(uid, (err, results) => {
            if(err){
                console.log(err)
                return
            }

            const assignCart = `INSERT INTO carts(uid) VALUES('${results[0].id}')`
            connection.query(assignCart, (err, results) => {
                if(err){
                    console.log(err)
                    return
                }
            })
        })
    }) 
})


module.exports = {
    getAllUsers,
    loginUser,
    registerUser,
    logoutUser,
    getData,
    getDataManager,
}