const express = require("express");
const router = express.Router();

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Spot, User, SpotImage, Review, ReviewImage, Booking, sequelize } = require("../../db/models");
const { Op } = require("sequelize");


router.get('/current', requireAuth, async (req, res) => {

    let bookings = await Booking.findAll({
        where: { userId: req.user.id },
        include: {
            model: Spot,
            attributes: {exclude: 'description'}
        }
    })

    // console.log(bookings)
    let bookingsArr = []
    let finalBookingsObj = {}

    bookings.forEach(async booking => {
        let bookingObj = booking.toJSON()
        // console.log(bookingObj);

        let spotIdNum = bookingObj.spotId

        let previewImg = await SpotImage.findOne({
            where: {spotId: spotIdNum}
        })
        let previewImgUrl = previewImg.toJSON()['url']
        console.log(previewImgUrl)

        // console.log(bookingObj)
        bookingObj.Spot.previewImage = previewImgUrl
        // console.log(bookingObj);
        bookingsArr.push(bookingObj)
        console.log(bookingsArr)

    });

    console.log(bookingsArr)

    finalBookingsObj.Bookings = bookingsArr
    res.json(finalBookingsObj)
})

//////EDIT A BOOKING

router.put('/:bookingId', requireAuth, async (req, res, next) => {
  let booking = await Booking.findByPk(req.params.bookingId);

  //if booking id doesn't exist throw error
  if (!booking) {
    const err = new Error("Booking couldn't be found");
    err.statusCode = 404;
    next(err);
  }

  //Must be owner of booking in order to update booking
    let userIdNum = booking.toJSON().userId
    if (userIdNum !== req.user.id) {
        res.status(400);
        return res.json({ message: "Must be owner of Spot to update spot" });
    }

    // Error for editing end date before start date
    /// STILL NEED TO SOLVE THIS
    const { startDate, endDate } = req.body

    //Error for attempting to edit a past booking
    //STILL NEED TO SOLVE THIS

    //Error for if new dates have a booking conflict
    ////STILL NEED TO SOLVE THIS

    // If pass all checks above, update booking:
    await booking.update({ ...req.body });

    res.json(booking)


})

router.delete('/:bookingId', requireAuth, async (req, res) => {
  let booking = await Booking.findByPk(req.params.bookingId);

  //if booking id doesn't exist throw error
  if (!booking) {
    const err = new Error("Booking couldn't be found");
    err.statusCode = 404;
    next(err);
  }

  //Must be owner of booking in order to update booking
  let userIdNum = booking.toJSON().userId;
  if (userIdNum !== req.user.id) {
    res.status(400);
    return res.json({ message: "Must be owner of Booking to delete" });
  }

    //can't delete booking that is in the past
        //STILL NEED TO SOLVE

  //delete booking
    await booking.destroy()

  res.json({
    message: "Successfully deleted"
  });
})


module.exports = router;
