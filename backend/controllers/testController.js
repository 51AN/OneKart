const asynchandler = require('express-async-handler')
const connection = require('../config/dbconnect')

const testSession = asynchandler(async(req, res)=>{
    res.json({id: req.session.uid,
              username: req.session.username,
              cartId: req.session.cartId})
})

module.exports = {
    testSession,
}