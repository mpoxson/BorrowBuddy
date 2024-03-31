const express =require('express')
const router = express.Router()
const {product_rentals}=require('../models');

router.get('/',async (req,res)=>{
    // res.json("hello world!product_rentals");
    const listOfProductRentals=await product_rentals.findAll();
    res.json(listOfProductRentals);
});

//Route to get a product_save by RENTAL ID
//api test success in backend
router.get('/:saveId', async (req, res) => {
    const rental_id = req.params.rentalId;

    try {
        const rental = await product_rentals.findByPk(rental_id);
        if (!rental) {
            return res.status(404).json({ message: 'Product rental not found' });
        }
        res.json(rental);
    } catch (error) {
        console.error('Error fetching product rental:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//Route to get all ACTIVE product_rental attached to a USER ID
//api test success in backend
router.get('/user/active/:userId', async (req, res) => {
    const user_id = req.params.userId;

    try {
        const rentalByUser = await product_rentals.findAll({
            where: {
                user_id: user_id,
                rental_is_return: 'False'
            }
        });
        res.json(rentalByUser);
    } catch (error) {
        console.error('Error fetching product rentals:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//Route to get all product_rental attached to a USER ID
//api test success in backend
router.get('/user/:userId', async (req, res) => {
    const user_id = req.params.userId;

    try {
        const rentalByUser = await product_rentals.findAll({
            where: {
                user_id: user_id
            }
        });
        res.json(rentalByUser);
    } catch (error) {
        console.error('Error fetching product rentals:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//Route to get all product_rental attached to a PRODUCT ID
//api test success in backend
router.get('/product/:productId', async (req, res) => {
    const product_id = req.params.productId;

    try {
        const saveByProduct = await product_rentals.findAll({
            where: {
                product_id: product_id
            }
        });
        res.json(saveByProduct);
    } catch (error) {
        console.error('Error fetching product rentals:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//Route to get all ACTIVE product_rental attached to a PRODUCT ID
//api test success in backend
router.get('/product/active/:productId', async (req, res) => {
    const product_id = req.params.productId;

    try {
        const saveByProduct = await product_rentals.findAll({
            where: {
                product_id: product_id,
                rental_is_return: 'False'
            }
        });
        res.json(saveByProduct);
    } catch (error) {
        console.error('Error fetching product rentals:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post("/", async (req,res)=>{
    const product_rental=req.body;
    await product_rentals.create(product_rental);
    res.json(product_rental);
     
})//This is for frontend 


router.put("/:rentalId", async (req, res) => {
  const rentalId = req.params.rentalId;

  try {
    const rental = await product_rentals.findByPk(rentalId);
    if (!rental) {
      return res.status(404).json({ message: "rental product not found" });
    }

    // Update product fields based on the request body
    await rental.update(req.body);

    res.json({ message: "rental product updated successfully" });
  } catch (error) {
    console.error("Error updating rental product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:rentalId", async (req, res) => {
  const rentalId = req.params.rentalId;

  try {
    const rental = await product_rentals.findByPk(rentalId);
    if (!rental) {
      return res.status(404).json({ message: "rental product not found" });
    }

    // Delete the product
    await rental.destroy();

    res.json({ message: "rental product deleted successfully" });
  } catch (error) {
    console.error("Error deleting rental product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;

