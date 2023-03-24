const express = require('express')
const mysql = require('mysql2')
const connection = require('./config/dbconnect')
const port = 5000

const app = express()

connection.connect()
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/users/', require('./routes/userRoutes'))

app.listen(port, ()=> console.log(`server started on port: ${port}`));