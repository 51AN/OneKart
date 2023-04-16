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
                    req.session.cartId = reslt[0].id

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
}