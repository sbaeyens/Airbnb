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


router.delete('/:imageId', requireAuth, async (req, res) => {
    let image = await SpotImage.findByPk(req.params.imageId, {
      include: {model: Spot}
  });

  //if spot id doesn't exist throw error
  if (!image) {
    const err = new Error("Spot Image couldn't be found");
    err.statusCode = 404;
    next(err);
  }

    let imageIdNum = image.toJSON().User.userId;
    console.log(imageIdNum)

    if (imageIdNum !== req.user.id) {
      res.status(400);
      return res.json({ message: "Must be owner of Booking to delete" });
    }

    res.send("response")

})


module.exports = router;
