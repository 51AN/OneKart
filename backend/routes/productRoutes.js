const express = require('express')
const multer = require('multer');
const connection = require('../config/dbconnect');
const { getMyProduct, updateProduct, deleteProduct, topSellingProducts, getBranchProducts, searchProducts } = require('../controllers/productController');
const { route } = require('./userRoutes');
const router = express.Router()

var imgconfig = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./uploads");
    },
    filename:(req,file,callback)=>{
        callback(null,`image-${Date.now()}.${file.originalname}`)
    }
});

// img filter
const isImage = (req,file,callback)=>{
    if(file.mimetype.startsWith("image")){
        callback(null,true)
    }else{
        callback(null,Error("only image is allowd"))
    }
}

var upload = multer({
    storage:imgconfig,
    fileFilter:isImage
})

// router.get('/', allProducts)
// router.post('/', uploadProduct)

router.post("/",upload.single("photo"),(req,res)=>{
    const {name, description, price, availability, quantity, bid} = req.body;
    const {filename} = req.file;
    
    try {
        
        connection.query("INSERT INTO products SET ?",{name:name, description:description, image:filename, price:price, sellcount:5, availability:availability, quantity:quantity, bid:bid},(err,result)=>{
            if(err){
                console.log("error")
            }else{
                console.log("data added")
                res.status(201).json({status:201,data:req.body})
            }
        })
    } catch (error) {
        res.status(422).json({status:422,error})
    }
});

router.get("/all/:id",(req,res)=>{
    try {
        connection.query(`SELECT * FROM products WHERE bid = ${req.params.id} AND availability = 'Available'`,(err,result) =>{
            if(err){
                console.log("error")
            }else{
                console.log("data get")
                res.status(201).json({status:201,data:result})
            }
        })
    } catch (error) {
        res.status(422).json({status:422,error})
    }
});

router.get("/topselling/:id", topSellingProducts)
router.get("/getbranchproducts/", getBranchProducts)
router.get("/myproduct/:id", getMyProduct)
router.post("/searchProducts/", searchProducts)
router.put("/myproduct/:id", updateProduct)
router.delete("/myproduct/:id", deleteProduct)

module.exports = router