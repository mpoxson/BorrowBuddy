const express =require('express')
const router = express.Router()
const {product_saves}=require('../models');

router.get('/',async (req,res)=>{
    // res.json("hello world!product_saves");
    const listOfProductSaves=await product_saves.findAll();
    res.json(listOfProductSaves);
});

router.post("/", async (req,res)=>{
    const product_save=req.body;
    await product_saves.create(product_save);
    res.json(product_save);
     
})//This is for frontend 


module.exports=router;