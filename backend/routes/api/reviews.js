const express = require("express");
const router = express.Router();

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Spot, User, SpotImage, Review, ReviewImage, sequelize } = require("../../db/models");
const { Op } = require("sequelize");


//// Get all Reviews of the current user

router.get('/current', requireAuth, async (req, res, next) => {
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

  //put reviews in arr
  let reviewsArr = []

  reviews.forEach((rev) => {
    let revObj = rev.toJSON();
    reviewsArr.push(revObj);
  });

  // console.log(reviewsArr)

  //for loop to add preview Image to each spot
  for (let i = 0; i < reviewsArr.length; i++) {
    let spotId = reviewsArr[i]["Spot"]["id"];
    // console.log("spotId", spotId);
    const spotImg = await SpotImage.findOne({
      where: {
        spotId: spotId,
        preview: true,
      },
      attributes: ["url", "preview"],
    });
    // console.log("spotImg",spotImg)

    if (!spotImg) reviewsArr[i]["Spot"].previewImage = "no preview image set";

    if (spotImg) {
      let previewImg = spotImg.toJSON();
      console.log('previewImg', previewImg)
      console.log(reviewsArr[i]["Spot"]);
      let spot = reviewsArr[i]["Spot"];
      spot.previewImage = previewImg.url;
      console.log(spot)
      reviewsArr[i].Spot = spot
    }
  }

  let result = {};

  result.Reviews = reviewsArr;

  res.json(result);
})


router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
  //review must exist
  let reviewExist = await Review.findByPk(req.params.reviewId);

  if (!reviewExist) {
    const err = new Error("Review couldn't be found");
    err.status = 404;
    return next(err);
  }

  //review must belong to the current user
  let reviewUserMatch = await Review.findByPk(req.params.reviewId, {
    where: { userId: req.user.id },
  });

  if (reviewUserMatch.toJSON().userId !== req.user.id) {
    const err = new Error("Review must belong to current user");
    err.status = 400;
    return next(err);
  }

  //check if 10 images have already been added to this review



  // add image to review (if none of the above checks are hit)
  let reviewIdNum = Number(req.params.reviewId);
  let newImg = await ReviewImage.create({
    reviewId: reviewIdNum,
    ...req.body,
  });


    let finalImg = newImg.toJSON()

    delete finalImg.createdAt
    delete finalImg.updatedAt;
    delete finalImg.reviewId;


  res.json(finalImg)


})


/////// EDIT A REVIEW
router.put('/:reviewId', requireAuth, async (req, res, next) => {
  //review must exist
  let reviewExist = await Review.findByPk(req.params.reviewId);

  if (!reviewExist) {
    const err = new Error("Review couldn't be found");
    err.status = 404;
    return next(err);
  }

  //user-review match check: review must belong to the current user
  let reviewUserMatch = await Review.findByPk(req.params.reviewId, {
    where: { userId: req.user.id },
  });

  if (!reviewUserMatch) {
    const err = new Error("Review must belong to current user");
    err.status = 400;
    return next(err);
  }

    // validation checks:
    const { review, stars } = req.body;

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


    //if all checks passed: edit review
    await reviewExist.update({ ...req.body });

    let finalReview = reviewExist.toJSON();

    console.log(finalReview);

    return res.json(finalReview);


})

//DELETE A REVIEW
router.delete('/:reviewId', requireAuth, async (req, res, next) => {
  //review must exist
  let review = await Review.findByPk(req.params.reviewId);

  if (!review) {
    const err = new Error("Review couldn't be found");
    err.status = 404;
    return next(err);
  }

  //user-review match check: review must belong to the current user
  let reviewUserMatch = await Review.findByPk(req.params.reviewId, {
    where: { userId: req.user.id },
  });

  if (!reviewUserMatch) {
    const err = new Error("Review must belong to current user");
    err.status = 400;
    return next(err);
  }

    //delete the review
    await review.destroy();

    res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });

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
