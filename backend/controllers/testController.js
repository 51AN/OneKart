const asynchandler = require('express-async-handler')
const connection = require('../config/dbconnect')

const testSession = asynchandler(async(req, res)=>{
    res.json({username: req.session.username,
              role: req.session.role})
})

module.exports = {
    testSession,
}