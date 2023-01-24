const express = require("express");
const router = express.Router();

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Spot, User, SpotImage, Review, sequelize} = require("../../db/models");
const { Op } = require("sequelize");

router.get('/:spotId', async (req, res) => {
  let spot = await Spot.findByPk(req.params.spotId, {
    include: [
      {
        model: SpotImage,
        attributes: ["id", "url", "preview"],
      },
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
    ],
  });

  if (!spot) {
    const err = new Error("Spot couldn't be found")
    err.status = 404
    return next(err)
  }

  console.log(spot)

  res.json(spot)

})

router.post('/', requireAuth, async (req, res) => {

  const newSpot = await Spot.create({
    ownerId: req.user.id,
    ...req.body
  })

  console.log(newSpot)

  res.json(newSpot)

})

router.get('/', async (req, res) => {

  let allSpots = await Spot.findAll()

  //WIP add avgReview to each spot in allSpots data
  // let avgReview = await Spot.findAll({

  // include: { model: Review},
  //   attributes: [[sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating",]
  // ],
  // });

    res.json(allSpots)
})

//error handler - maybe delete and include in each endpoint
router.use((err, req, res, next) => {
  res.status(404);
  return res.json({ message: "generic message" });
});

module.exports = router;
