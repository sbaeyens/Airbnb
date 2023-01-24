const express = require("express");
const router = express.Router();

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Spot, User, Review, sequelize} = require("../../db/models");
const { Op } = require("sequelize");

router.get('/', async (req, res) => {
    let spots = await Spot.findAll({
        //// NOT WORKING: get avg reviews

    include: { model: Review},
      attributes: [
        'ownerId',
      'address',
      'city',
      'state',
      'country',
      'lat',
      'lng',
      'name',
      'description',
      'price',
      'createdAt',
      'updatedAt',
          [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating",]
    ],
    //   attributes: {exclude: ['Reviews']}
    });

    // spots.forEach(spot => {
    //     delete spots.Reviews
    // })
    console.log("test")

    res.json(spots)
})

module.exports = router;
