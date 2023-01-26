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


router.post('/:reviewId/images', requireAuth, async (req, res) => {
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

  if (!reviewUserMatch) {
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
    delete finalImg.id;


  res.json(finalImg)


})


module.exports = router;
