const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const connection = require('./config/dbconnect')
const port = 5000

const app = express()

connection.connect()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use("/uploads", express.static('./uploads'))

app.use('/api/users/', require('./routes/userRoutes'))
app.use('/api/products', require('./routes/productRoutes'))
app.use('/api/branch', require('./routes/branchroutes'))

app.listen(port, ()=> console.log(`server started on port: ${port}`));