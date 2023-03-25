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

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedpass = await bcrypt.hash(password, salt) 

    const sql = `SELECT * FROM users WHERE email = "${email}"`

    connection.query(sql, (err, results) => {
        if(results.length === 0){
            res.status(400).json({msg: 'Invalid information'})
            return
        }
        res.status(200).json(results)
    })
})

const registerUser = asynchandler(async(req, res)=>{
    const{username, email, password} = req.body
   
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

        const insert = `INSERT INTO users(username, email, password) VALUES('${username}', '${email}', '${hashedpass}')`
        connection.query(insert, (err, results) => {
            if(err){
                res.status(400).json(err)
                return
            }
            res.status(200).json({msg: 'Registration Successful'})
        })
    }) 
})


module.exports = {
    getAllUsers,
    loginUser,
    registerUser,
}