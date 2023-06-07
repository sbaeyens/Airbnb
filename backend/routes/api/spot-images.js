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


router.delete('/:imageId', requireAuth, async (req, res, next) => {
    let image = await SpotImage.findByPk(req.params.imageId, {
      include: {model: Spot}
  });
  //if spot id doesn't exist throw error
  if (!image) {
    const err = new Error("Spot Image couldn't be found");
    err.status = 404;
    next(err);
  }
    //check current user is owner of spot associated with image
    let userIdNum = image.toJSON().Spot.ownerId;

    if (userIdNum !== req.user.id) {
      res.status(400);
      return res.json({ message: "Must be owner of Spot to delete Image" });
    }

    //delete image
    await image.destroy();
    return res.json({
      message: "Successfully deleted",
    });



})


module.exports = router;
