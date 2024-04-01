const express =require('express')
const router = express.Router()
const {product_images}=require('../models');

router.get('/',async (req,res)=>{
    // res.json("hello world!product_images");
    const listOfProductimages=await product_images.findAll();
    res.json(listOfProductimages);
});

router.post("/", async (req,res)=>{
    const product_image=req.body;
    await product_images.create(product_image);
    res.json(product_image);
     
})//This is for frontend 


module.exports=router;