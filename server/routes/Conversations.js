const express =require('express')
const router = express.Router()
const {Conversations}=require('../models');
const { Op } = require("sequelize");

router.get('/',async (req,res)=>{
    // res.json("hello world!Conversation");
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


//PUT route to update conversation fields
router.put('/:conversationId', async (req, res) => {
    const { user_id1, user_id2, LastMessageTime } = req.body;
    const { conversationId } = req.params;

    try {
        const conversation = await Conversations.findByPk(conversationId);

        if (!conversation) {
            return res.status(404).json({ message: "Conversation not found" });
        }

        if (user_id1) {
            conversation.user_id1 = user_id1;
        }
        if (user_id2) {
            conversation.user_id2 = user_id2;
        }
        if (LastMessageTime) {
            conversation.LastMessageTime = LastMessageTime;
        }

        await conversation.save();

        return res.status(200).json({ message: "Conversation updated successfully" });
    } catch (error) {
        console.error('Error updating conversation:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE route to delete a conversation
router.delete("/:conversationId", async (req, res) => {
    const conversationId = req.params.conversationId;

    try {
        const conversation = await Conversations.findByPk(conversationId);
        if (!conversation) {
            return res.status(404).json({ message: "Conversation not found" });
        }

        await conversation.destroy();

        res.json({ message: "Conversation deleted successfully" });
    } catch (error) {
        console.error('Error deleting conversation:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports=router;