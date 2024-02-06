const express =require('express')
const router = express.Router()
const {product_rentals}=require('../models');

router.get('/',async (req,res)=>{
    // res.json("hello world!product_rentals");
    const listOfProductRentals=await product_rentals.findAll();
    res.json(listOfProductRentals);
});

router.post("/", async (req,res)=>{
    const product_rental=req.body;
    await product_rentals.create(product_rental);
    res.json(product_rental);
     
})//This is for frontend 


module.exports=router;