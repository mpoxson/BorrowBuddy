const express =require('express')
const router = express.Router()
const {Conversations}=require('../models');
const { Op } = require("sequelize");

router.get('/',async (req,res)=>{
    // res.json("hello world!comments");
    const listOfConversations=await Conversations.findAll();
    res.json(listOfConversations);
});

//Route to get all conversations associated with a USER ID, sorted by LastMessageTime (descending)
//api test success in backend
router.get('/user/:userId', async (req, res) => {
    const user_id = req.params.userId;

    try {
        const conversationsByUser = await Conversations.findAll({
            where: {
                [Op.or]: [{user_id1: user_id}, {user_id2: user_id}]
            },
            order: [
                ['LastMessageTime', 'DESC'],
            ] 
        });
        res.json(conversationsByUser);
    } catch (error) {
        console.error('Error fetching conversations:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post("/", async (req,res)=>{
    const Conversation=req.body;
    await Conversations.create(Conversation);
    res.json(Conversation);
     
})//This is for frontend 


module.exports=router;