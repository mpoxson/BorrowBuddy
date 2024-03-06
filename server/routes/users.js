const express =require('express')
const router = express.Router()
const {users}=require('../models');


router.get('/',async (req,res)=>{
    // res.send("hello world!users")
    const listOfUsers=await users.findAll();
    res.json(listOfUsers);
});

router.post("/", async (req,res)=>{
    // const user=req.body;
    // await users.create(user);
    // res.json(user);

    try {
        const { user_email } = req.body;
        // Check if the email already exists in the database
        const existingUser = await users.findOne({ where: { user_email } });
        if (existingUser) {
          // If the email already exists, return 409 status code
          return res.status(409).json({ error: 'Email address is already registered' });
        }
        // If the email is unique, proceed with user creation
        const newUser = await users.create(req.body);
        res.status(201).json(newUser);
      } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
      }  
})//This is for frontend 



module.exports=router;