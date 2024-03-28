const express =require('express')
const router = express.Router()
const {Messages}=require('../models');

router.get('/',async (req,res)=>{
    // res.json("hello world!comments");
    const listOfMessages=await Messages.findAll();
    res.json(listOfMessages);
});

//Route to get all messages attached to a CONVERSATION ID
//api test success in backend
router.get('/:conversationId', async (req, res) => {
    const ConversationID = req.params.conversationId;

    try {
        const messagesByConversation = await Messages.findAll({
            where: {
                ConversationID: ConversationID
            }
        });
        res.json(messagesByConversation);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post("/", async (req,res)=>{
    const Message=req.body;
    await Messages.create(Message);
    res.json(Message);
     
})//This is for frontend 


module.exports=router;