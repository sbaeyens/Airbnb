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
            exclude: [
              "username",
              "hashedPassword",
              "email",
              "createdAt",
              "updatedAt",
            ],
          },
        },
        { model: ReviewImage },
      ],
      where: { userId: req.user.id },
      attributes: { exclude: ["userId"] },
    });


    //remove properties from response object that we don't want returned


    res.json(reviews)

})

//// Create a Review for a Spot based on the Spot's id







module.exports = router;
