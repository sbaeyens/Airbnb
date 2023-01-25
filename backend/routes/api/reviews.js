const express = require("express");
const router = express.Router();

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Spot, User, SpotImage, Review, ReviewImage, sequelize } = require("../../db/models");
const { Op } = require("sequelize");


//// Get all Reviews of the current user

router.get('/current', requireAuth, async (req, res) => {

    let reviews = await Review.findAll({
      include: [
        {
          model: User,
          attributes: {
            exclude: [
              "username",
              "hashedPassword",
              "email",
              "createdAt",
              "updatedAt",
            ],
          },
        },
        {
          model: Spot,
          attributes: {
            exclude: ["description", "createdAt", "updatedAt"],
          },
        },
        {
          model: ReviewImage,
          attributes: {
            exclude: ["reviewId", "createdAt", "updatedAt"],
          },
        },
      ],
      where: { userId: req.user.id },
      attributes: { exclude: ["userId"] },
    });



    res.json(reviews)

})








module.exports = router;
