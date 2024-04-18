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

//update comment
router.put("/:commentId", async (req, res) => {
    const commentId = req.params.commentId;
  
    try {
      const comment = await comments.findByPk(commentId);
      if (!comment) {
        return res.status(404).json({ message: "comment id not found" });
      }
  
      // Update comment fields based on the request body
      await comment.update(req.body);
  
      res.json({ message: "User comment updated successfully" });
    } catch (error) {
      console.error("Error updating user comment:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  router.delete("/:commentId", async (req, res) => {
    const commentId = req.params.commentId;
  
    try {
      const comment = await comments.findByPk(commentId);
      if (!comment) {
        return res.status(404).json({ message: "comment id not found" });
      }
  
      // Delete the rate
      await comment.destroy();
  
      res.json({ message: "user comment deleted successfully" });
    } catch (error) {
      console.error("Error deleting user comment:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
module.exports=router;