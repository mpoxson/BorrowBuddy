const express =require('express')
const router = express.Router()
const {ratings}=require('../models');

router.get('/',async (req,res)=>{
    // res.json("hello world!ratings");
    const listOfRatings=await ratings.findAll();
    res.json(listOfRatings);
});

router.post("/", async (req,res)=>{
    const rating=req.body;
    await ratings.create(rating);
    res.json(rating);
     
})//This is for frontend 


module.exports=router;