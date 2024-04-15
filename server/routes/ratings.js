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

router.post("/", async (req, res) => {
  const rating = req.body;
  await ratings.create(rating);
  res.json(rating);
}); //This is for frontend

module.exports = router;
