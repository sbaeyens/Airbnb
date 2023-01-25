const express = require("express");
const router = express.Router();

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Spot, User, SpotImage, Review, sequelize} = require("../../db/models");
const { Op } = require("sequelize");

router.get('/current', requireAuth, async (req, res, next) => {
  let yourSpots = await Spot.findAll({
    where: {ownerId: req.user.id}
  })
  let spotsList = []
  let previewImgArr = []

  yourSpots.forEach(spot => {
    let spotObj = spot.toJSON()
    // console.log(spotObj)

    spotsList.push(spotObj)

  });

  //for loop to add avg rating to each spot
  for (let i = 0; i < spotsList.length; i++) {
    let spotId = spotsList[i]['id']
    // console.log(spotId)
    const starRating = await Review.findOne({
      where: { spotId: spotId },
      attributes: [
        [sequelize.fn("AVG", sequelize.col("stars")), "avgStarRating"],
      ],
    });

     let reviewJson = starRating.toJSON();
    //  console.log(reviewJson);

     spotsList[i].avgRating = reviewJson.avgStarRating;
  }

  //for loop to add preview Image to each spot
  for (let i = 0; i < spotsList.length; i++) {
    let spotId = spotsList[i]["id"];
    // console.log(spotId);
    const spotImg = await SpotImage.findOne({
      where: {
        spotId: spotId,
        preview: true
      },
      attributes: [
        'url', 'preview'
      ],
    });

    if (!spotImg) spotsList[i].previewImage = "no preview image set"

    if (spotImg) {
      let previewImg = spotImg.toJSON();
      spotsList[i].previewImage = previewImg.url;
    }


  }




  let spots = {}
  spots.Spots = spotsList
  // console.log(spotsList)

  res.json(spots)
})

router.post('/:spotId/images', requireAuth, async (req, res, next) => {
  //throws error if spotId doesnt exist
  let spot = await Spot.findByPk(req.params.spotId)
  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    return next(err);
  }

  let newSpotImg = await SpotImage.create({
    spotId: req.params.spotId,
    ...req.body,
  });


  //spot must belong to current user
  let ownerIdObj = await Spot.findByPk(req.params.spotId, {
    attributes: ["ownerId"]
  })

  let ownerIdNum = ownerIdObj.toJSON().ownerId;

  console.log(ownerIdNum)
  if (ownerIdNum !== req.user.id) {
      res.status(400);
      return res.json({ message: "Must be owner of Spot to post image" });
  }

  let spotImg = newSpotImg.toJSON()
  console.log(spotImg)


  delete spotImg.updatedAt
  delete spotImg.createdAt;
  delete spotImg.spotId;


  res.json(spotImg)

})

router.put('/:spotId', async (req, res, next) => {
  let spot = await Spot.findByPk(req.params.spotId)

  //if spot id doesn't exist throw error
  if (!spot) {
        const err = new Error("Spot couldn't be found");
        err.statusCode = 404;
        next(err);
  }

  //Must be owner of spot in order to update spot
  let ownerIdObj = await Spot.findByPk(req.params.spotId, {
    attributes: ["ownerId"],
  });

  let ownerIdNum = ownerIdObj.toJSON().ownerId;

  console.log(ownerIdNum);
  if (ownerIdNum !== req.user.id) {
    res.status(400);
    return res.json({ message: "Must be owner of Spot to post image" });
  }


  await spot.update({ ...req.body })

  let finalSpot = spot.toJSON()

  delete finalSpot.updatedAt
  delete finalSpot.createdAt;
  delete finalSpot.id;
  delete finalSpot.ownerId;

  console.log(finalSpot)


  return res.json(finalSpot)

})

router.get('/:spotId', async (req, res, next) => {
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
    err.statusCode = 404
    next(err)
  }

  const numReviews = await Review.count({
   where: { spotId: spot.id }
  })

  console.log(numReviews)

  const starRating = await Review.findOne({
    where: { spotId: spot.id },
    attributes: [[sequelize.fn("AVG", sequelize.col("stars")), "avgStarRating",]]
  })

  // console.log(starRating)

  let reviewJson = starRating.toJSON()
  console.log(reviewJson)

  let newSpot = spot.toJSON()

  newSpot.numReviews = numReviews
  newSpot.avgStarRating = reviewJson.avgStarRating


  console.log(newSpot.numReviews, newSpot.avgStarRating)

  console.log(newSpot)
  res.json(newSpot)

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
  console.log(err);
  res.status = err.statusCode || 500;
  res.send({
    error: err.message,
  });
});

module.exports = router;
