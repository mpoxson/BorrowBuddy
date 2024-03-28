const express =require('express')
const router = express.Router()
const {product_saves}=require('../models');

router.get('/',async (req,res)=>{
    // res.json("hello world!product_saves");
    const listOfProductSaves=await product_saves.findAll();
    res.json(listOfProductSaves);
});

//Route to get a product_save by SAVE ID
//api test success in frontend and backend
router.get('/:saveId', async (req, res) => {
    const save_id = req.params.saveId;

    try {
        const save = await product_saves.findByPk(save_id);
        if (!save) {
            return res.status(404).json({ message: 'Product save not found' });
        }
        res.json(save);
    } catch (error) {
        console.error('Error fetching product save:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//Route to get all product_save attached to a USER ID
//api test success in frontend and backend
router.get('/user/:userId', async (req, res) => {
    const user_id = req.params.userId;

    try {
        const saveByUser = await product_saves.findAll({
            where: {
                user_id: user_id
            }
        });
        res.json(saveByUser);
    } catch (error) {
        console.error('Error fetching product saves:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post("/", async (req,res)=>{
    const product_save=req.body;
    await product_saves.create(product_save);
    res.json(product_save);
     
})//This is for frontend 


module.exports=router;