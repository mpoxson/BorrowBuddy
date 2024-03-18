const express =require('express')
const router = express.Router()
const {products}=require('../models');

router.get('/',async (req,res)=>{
    // res.json("hello world!products");
    const listOfProducts=await products.findAll();
    res.json(listOfProducts);
});

//Route to get a product by ID//api test success in frontend and backend
router.get('/:productId', async (req, res) => {
    const product_id = req.params.productId;

    try {
        const product = await products.findByPk(product_id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post("/", async (req,res)=>{
    const product=req.body;
    await products.create(product);
    res.json(product);
     
})//This is for frontend 


module.exports=router;