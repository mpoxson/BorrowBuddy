const express =require('express')
const router = express.Router()
const {users}=require('../models');


router.get('/',async (req,res)=>{
    // res.send("hello world!users")
    const listOfUsers=await users.findAll();
    res.json(listOfUsers);
});

router.post("/", async (req,res)=>{
    const user=req.body;
    await users.create(user);
    res.json(user);
     
})//This is for frontend 



module.exports=router;