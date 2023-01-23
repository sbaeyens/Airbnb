const express = require("express");
const router = express.Router();

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Spot, User, Review } = require("../../db/models");
const { Op } = require("sequelize");

router.get('/', async (req, res) => {
    let spots = await Spot.findAll({
        include: { model: Review},
      attributes: [[sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]],
    });


    res.json(spots)
})

module.exports = router;
