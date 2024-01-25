const express =require('express')
const router = express.Router()
const {products}=require('../models');

router.get('/',async (req,res)=>{
    // res.json("hello world!products");
    const listOfProducts=await products.findAll();
    res.json(listOfProducts);
});

router.post("/", async (req,res)=>{
    const product=req.body;
    await products.create(product);
    res.json(product);
     
})//This is for frontend 


module.exports=router;