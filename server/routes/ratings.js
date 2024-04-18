const express = require("express");
const router = express.Router();
const { ratings } = require("../models");
const { QueryTypes } = require("sequelize");
const db = require("../models");

router.get("/", async (req, res) => {
  // res.json("hello world!ratings");
  const listOfRatings = await ratings.findAll();
  res.json(listOfRatings);
});

router.get("/avg/:ratedId", async (req, res) => {
  const user_rated_id = req.params.ratedId;

  try {
    const average = await ratings.findAll({
      attributes: [
        [
          db.sequelize.fn("AVG", db.sequelize.col("rating_value")),
          "average_rating",
        ],
      ],
      where: {
        user_rated_id: user_rated_id,
      },
    });
    const averageRating = average[0].dataValues.average_rating;
    res.json({ average_rating: averageRating });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/rated/:ratedId/:raterId", async (req, res) => {
  const user_rated_id = req.params.ratedId;
  const user_rating_id = req.params.raterId;

  try {
    const rated = await ratings.findAll({
      where: {
        user_rated_id: user_rated_id,
        user_rating_id: user_rating_id,
      },
    });
    res.json(rated);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/reviews/:ratedId", async (req, res) => {
  const user_rated_id = req.params.ratedId;

  try {
    const review = await ratings.findAll({
      where: {
        user_rated_id: user_rated_id,
      },
    });
    res.json(review);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  const rating = req.body;
  await ratings.create(rating);
  res.json(rating);
}); //This is for frontend

//update rate
router.put("/:ratedId", async (req, res) => {
  const ratedId = req.params.ratedId;

  try {
    const rate = await ratings.findByPk(ratedId);
    if (!rate) {
      return res.status(404).json({ message: "rate id not found" });
    }

    // Update rate fields based on the request body
    await rate.update(req.body);

    res.json({ message: "User rate updated successfully" });
  } catch (error) {
    console.error("Error updating user rate:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:ratedId", async (req, res) => {
  const ratedId = req.params.ratedId;

  try {
    const rate = await ratings.findByPk(ratedId);
    if (!rate) {
      return res.status(404).json({ message: "rate id not found" });
    }

    // Delete the rate
    await rate.destroy();

    res.json({ message: "user rate deleted successfully" });
  } catch (error) {
    console.error("Error deleting user rate:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
