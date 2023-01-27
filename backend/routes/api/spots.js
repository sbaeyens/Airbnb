const express = require("express");
const router = express.Router();

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Spot, User, SpotImage, Review, ReviewImage, Booking, sequelize} = require("../../db/models");
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

////GET ALL BOOKINGS FROM SPOT BASED ON SPOTS ID
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
  // check if spot exists
   let spot = await Spot.findByPk(req.params.spotId);
   if (!spot) {
     const err = new Error("Spot couldn't be found");
     err.status = 404;
     return next(err);
   }

  //if not owner of the spot, they can see only booking start and end time and spotid
  let ownerIdObj = await Spot.findByPk(req.params.spotId, {
    attributes: ["ownerId"],
  });

  let ownerIdNum = ownerIdObj.toJSON().ownerId;

  if (ownerIdNum !== req.user.id) {

    let Bookings = await Booking.findAll({
      where: { spotId: req.params.spotId },
      attributes: { exclude: ['id', 'userId', 'createdAt', 'updatedAt']}
    })


    return res.json({ Bookings});
  } else {
    // if owner of spot, they can see additional data on booker and booking
    let Bookings = await Booking.findAll({
      where: { spotId: req.params.spotId },
      include: {
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
    });

    return res.send({ Bookings });
  }


})

///// CREATE A BOOKING FOR A SPOT BASED ON THE SPOT'S ID

router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
  // check if spot exists
  let spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    return next(err);
  }

  //spot CANNOT belong to current user
  let ownerIdObj = await Spot.findByPk(req.params.spotId, {
    attributes: ["ownerId"],
  });

  let ownerIdNum = ownerIdObj.toJSON().ownerId;

  if (ownerIdNum === req.user.id) {
    res.status(403);
    return res.json({ message: "Owners cannot make booking to their own spot" });
  }


  //EndDate cannot be on or before start date
  const { startDate, endDate } = req.body
  // console.log('startDate', startDate)
  let startDateData = new Date(startDate)
  let endDateData = new Date(endDate)
  // let endDateMS = endDate.toDateString();
  // console.log('startDateData', startDateData)

  // console.log(startDateMS)

  if (endDateData.getTime() - startDateData.getTime() < 0) {
     const err = new Error("endDate cannot be on or before startDate");
     err.status = 403;
    next(err);
    return
  }

  //Time range must be open (aka no overlapping booking date)
    ///STILL NEED TO SOLVE THIS
    let spotBookings = await Spot.findByPk(req.params.spotId, {
      include: {model: Booking}
    })

    let spotBookingsObj = spotBookings.toJSON()
  // console.log(spotBookingsObj)
  let bookingsArr = spotBookingsObj.Bookings
  // console.log(bookingsArr)

      //loop through all bookings
  for (i = 0; i < bookingsArr.length; i++) {
    let bookingStartDate = bookingsArr[i].startDate
    let bookingEndDate = bookingsArr[i].endDate
    console.log('bookingStarDate', bookingStartDate)
    console.log('startDateData', startDateData)

    //check if NEW start date falls between start and end date. Throw error if so.
    // if (startDateData > )
    // check if NEW end date falls between start and end date. Throw error if so.
  }






  //If pass all checks above, then create new booking:
  let spotIdNum = Number(req.params.spotId);
  let newBooking = await Booking.create({
    spotId: spotIdNum,
    userId: req.user.id,
    ...req.body,
  });

  res.json(newBooking)

})




//// Get all Reviews by Spot's id
router.get('/:spotId/reviews', async (req, res, next) => {
    let spot = await Spot.findByPk(req.params.spotId)
  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    return next(err);
  }


  let reviewsArr = await Review.findAll({
    where: { spotId: req.params.spotId },
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
        model: ReviewImage,
        attributes: {
          exclude: ["reviewId", "createdAt", "updatedAt"],
          },
        },
      ],
    });

    let finalArr = []

  reviewsArr.forEach(rev => {
    let review = rev.toJSON()
    finalArr.push(review)
  })
  // let reviews = reviewsPromise.toJSON()
  // console.log(reviews)

  finalReviews = {}
  finalReviews.Reviews = finalArr

    res.json(finalReviews)
})

router.post('/:spotId/reviews', requireAuth, async (req, res, next) => {
  let spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    return next(err);
  }

  //validation checks: make sure data is appropriate
  const { review, stars } = req.body

  if (!review) {
    const err = new Error("Review text is required");
    err.status = 400;
    return next(err);
  }

  if (stars < 1 || stars > 5) {
    const err = new Error("Stars must be an integer from 1 to 5");
    err.status = 400;
    return next(err);
  }

  //check if user already has a review for this spot
  let reviewsOnSpot = await Review.findOne({
    where: {
      spotId: req.params.spotId,
      userId: req.user.id
    }
  })

  if (reviewsOnSpot) {
    const err = new Error("User already has a review for this spot");
    err.status = 403;
    return next(err);
  }

  let spotIdNum = Number(req.params.spotId)
  let newReview = await Review.create({
    spotId: spotIdNum,
    userId: req.user.id,
    ...req.body,
  });

  res.json(newReview)

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
    err.status = 404;

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
    return res.json({ message: "Must be owner of Spot to update spot" });
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

router.delete('/:spotId', requireAuth, async (req, res, next) => {
  let spot = await Spot.findByPk(req.params.spotId)

  //if spot id doesn't exist throw error
  if (!spot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
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
    return res.json({ message: "Must be owner of Spot to delete spot" });
  }

  // delete the spot
  await spot.destroy()
  return res.json({
    message: "Successfully deleted"
  })

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
    err.status = 404
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
  res.status(err.statusCode || 500)
  res.send({
    error: err.message,
  });
});

module.exports = router;
