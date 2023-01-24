const express = require("express");
const router = express.Router();

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Spot, User, Review, sequelize} = require("../../db/models");
const { Op } = require("sequelize");


router.post('/')

router.get('/', async (req, res) => {

  let allSpots = await Spot.findAll()

  //WIP add avgReview to each spot in allSpots data
  let avgReview = await Spot.findAll({

  include: { model: Review},
    attributes: [[sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating",]
  ],
  });

    res.json(allSpots)
})

module.exports = router;
