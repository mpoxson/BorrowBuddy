const express =require('express')
const router = express.Router()
const {Messages}=require('../models');

router.get('/',async (req,res)=>{
    // res.json("hello world!Message");
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

// Route to update fields in the Messages table
router.put('/:messageID', async (req, res) => {
    const { SenderID, MessageText, Timestamp, ConversationID } = req.body;
    const { messageID } = req.params;

    try {
        // Find the message by ID
        const message = await Messages.findByPk(messageID);

        if (!message) {
            return res.status(404).json({ message: "Message not found" });
        }

        // Update the fields if they are provided in the request body
        if (SenderID) {
            message.SenderID = SenderID;
        }
        if (MessageText) {
            message.MessageText = MessageText;
        }
        if (Timestamp) {
            message.Timestamp = Timestamp;
        }
        if (ConversationID) {
            message.ConversationID = ConversationID;
        }

        // Save the updated message
        await message.save();

        return res.status(200).json({ message: "Message updated successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.delete("/:messageID", async (req, res) => {
    const messageID = req.params.messageID;
  
    try {
      const message = await Messages.findByPk(messageID);
      if (!message) {
        return res.status(404).json({ message: "message not found" });
      }
  
      // Delete the message
      await message.destroy();
  
      res.json({ message: "message deleted successfully" });
    } catch (error) {
      console.error("Error deleting message:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
module.exports=router;