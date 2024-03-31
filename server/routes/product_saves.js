const express = require("express");
const router = express.Router();
const { product_saves } = require("../models");

router.get("/", async (req, res) => {
  // res.json("hello world!product_saves");
  const listOfProductSaves = await product_saves.findAll();
  res.json(listOfProductSaves);
});

//Route to get a product_save by SAVE ID
//api test success in frontend and backend
router.get("/:saveId", async (req, res) => {
  const save_id = req.params.saveId;

  try {
    const save = await product_saves.findByPk(save_id);
    if (!save) {
      return res.status(404).json({ message: "Product save not found" });
    }
    res.json(save);
  } catch (error) {
    console.error("Error fetching product save:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Route to get all product_save attached to a USER ID
//api test success in frontend and backend
router.get("/user/:userId", async (req, res) => {
  const user_id = req.params.userId;

  try {
    const saveByUser = await product_saves.findAll({
      where: {
        user_id: user_id,
      },
    });
    res.json(saveByUser);
  } catch (error) {
    console.error("Error fetching product saves:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  const product_save = req.body;
  await product_saves.create(product_save);
  res.json(product_save);
}); //This is for frontend

//test successfully, we may never use update route
router.put("/:saveId", async (req, res) => {
  const saveId = req.params.saveId;

  try {
    const save = await product_saves.findByPk(saveId);
    if (!save) {
      return res.status(404).json({ message: "save product not found" });
    }

    // Update product fields based on the request body
    await save.update(req.body);

    res.json({ message: "save product updated successfully" });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:saveId", async (req, res) => {
  const saveId = req.params.saveId;

  try {
    const save = await product_saves.findByPk(saveId);
    if (!save) {
      return res.status(404).json({ message: "save product not found" });
    }

    // Delete the product
    await save.destroy();

    res.json({ message: "save product deleted successfully" });
  } catch (error) {
    console.error("Error deleting save product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
