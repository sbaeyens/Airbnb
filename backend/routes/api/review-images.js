const express = require("express");
const router = express.Router();

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const {
  Spot,
  User,
  SpotImage,
  Review,
  ReviewImage,
  Booking,
  sequelize,
} = require("../../db/models");
const { Op } = require("sequelize");

router.delete("/:imageId", requireAuth, async (req, res, next) => {
  let image = await ReviewImage.findByPk(req.params.imageId, {
    include: { model: Review },
  });
  //   console.log(image)
  //if spot id doesn't exist throw error
  if (!image) {
    const err = new Error("Spot Image couldn't be found");
    err.statusCode = 404;
    next(err);
  }

  //check current user is owner of spot associated with image
  let userIdNum = image.toJSON().Review.userId;
  console.log(userIdNum);

  if (userIdNum !== req.user.id) {
    res.status(400);
    return res.json({ message: "Must be the reviewer to delete Image" });
  }

  //delete image
  await image.destroy();
  return res.json({
    message: "Successfully deleted",
  });
});

module.exports = router;
