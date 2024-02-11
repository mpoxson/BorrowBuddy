const express =require('express')
const router = express.Router()
const {comments}=require('../models');

router.get('/',async (req,res)=>{
    // res.json("hello world!comments");
    const listOfComments=await comments.findAll();
    res.json(listOfComments);
});

router.post("/", async (req,res)=>{
    const comment=req.body;
    await comments.create(comment);
    res.json(comment);
     
})//This is for frontend 


module.exports=router;