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
            attributes: {exclude: ['createdAt', 'updatedAt']}
        }
    })


    // get array of current bookings (missing preview image)
    let bookingsArr = []

    bookings.forEach(booking => {
        let bookingObj = booking.toJSON()
        bookingsArr.push(bookingObj)
    })
    console.log("bookingsArr from backend route", bookingsArr);


    let finalBookingsObj = {}

    let finalBookingsArr = []

    for (i = 0; i < bookingsArr.length; i++) {
        let bookingObj = bookingsArr[i]
        // console.log(bookingObj);

        let spotIdNum = bookingObj.spotId

        let previewImg = await SpotImage.findOne({
            where: {spotId: spotIdNum}
        })
        let previewImgUrl = previewImg.toJSON()['url']
        // console.log(previewImgUrl)


        // console.log(bookingObj)
        bookingObj.Spot.previewImage = previewImgUrl
        // console.log(bookingObj);
        finalBookingsArr.push(bookingObj)
        // console.log(bookingsArr)

    }

    console.log(finalBookingsArr)

    finalBookingsObj.Bookings = finalBookingsArr
    res.json(finalBookingsObj)
})

//////EDIT A BOOKING

router.put('/:bookingId', requireAuth, async (req, res, next) => {
  let booking = await Booking.findByPk(req.params.bookingId);

  //if booking id doesn't exist throw error
  if (!booking) {
    const err = new Error("Booking couldn't be found");
    err.status = 404;
    next(err);
  }

  //Must be owner of booking in order to update booking
  let userIdNum = booking.toJSON().userId;
  if (userIdNum !== req.user.id) {
    res.status(400);
    return res.json({ message: "Must be owner of Spot to update spot" });
  }

  //pull out existing start and end date
  const { startDate, endDate } = req.body;
  let startDateData = new Date(startDate);
  let endDateData = new Date(endDate);

  // Error for editing end date before start date
  /// STILL NEED TO SOLVE THIS
  if (endDateData < startDateData) {
    const err = new Error("endDate cannot come before startDate");
    err.status = 400;
    next(err);
    return;
  }

  //Error for attempting to edit a past booking
  //can't delete booking that is in the past
  let bookingObj = booking.toJSON();
  let currentTimeMS = Date.now();
  let endTime = bookingObj.endDate;
  let endTimeMS = endTime.getTime();

  // console.log('currentTimeMS', currentTimeMS)
  // console.log('startTime', startTime)
  // console.log("startTimeMS", startTimeMS);
  let dateCalc = endTimeMS - currentTimeMS;

  if (dateCalc < 0) {
    const err = new Error("Past bookings can't be modified");
    err.status = 403;
    next(err);
    return;
  }
  console.log(bookingObj)
  //Error for if new dates have a booking conflict
  //Time range must be open (aka no overlapping booking date)
  let spotBookings = await Spot.findByPk(bookingObj.spotId, {
    include: { model: Booking },
  });

  let spotBookingsObj = spotBookings.toJSON();
  // console.log(spotBookingsObj)
  let bookingsArr = spotBookingsObj.Bookings;
  // console.log(bookingsArr)

  //loop through all bookings
  for (i = 0; i < bookingsArr.length; i++) {
    let existingBookingStartDate = bookingsArr[i].startDate;
    let existingBookingEndDate = bookingsArr[i].endDate;
    // console.log("existingBookingStarDate", existingBookingStartDate);
    // console.log("existingBookingEndDate", existingBookingEndDate);

    //check if NEW start date falls between start and end date. Throw error if so.
    // if (startDateData > )
    if (
      startDateData >= existingBookingStartDate &&
      startDateData <= existingBookingEndDate
    ) {
      const err = new Error(
        "Sorry, this spot is already booked for the specified dates"
      );
      err.status = 403;
      next(err);
      return;
    }

    // check if NEW end date falls between start and end date. Throw error if so.
    if (
      endDateData >= existingBookingStartDate &&
      endDateData <= existingBookingEndDate
    ) {
      const err = new Error(
        "Sorry, this spot is already booked for the specified dates"
      );
      err.status = 403;
      next(err);
      return;
    }

    // if start date is before start date, check if end date is after end date
    if (
      startDateData <= existingBookingStartDate &&
      endDateData >= existingBookingEndDate
    ) {
      const err = new Error(
        "Sorry, this spot is already booked for the specified dates"
      );
      err.status = 403;
      next(err);
      return;
    }
  }
  //end of check for conflicting bookings

  // If pass all checks above, update booking:
  await booking.update({ ...req.body });

  res.json(booking);
})

router.delete('/:bookingId', requireAuth, async (req, res, next) => {
  let booking = await Booking.findByPk(req.params.bookingId);

  //if booking id doesn't exist throw error
  if (!booking) {
    const err = new Error("Booking couldn't be found");
    err.status = 404;
    next(err);
  }

  //Must be owner of booking in order to update booking
  let userIdNum = booking.toJSON().userId;
  if (userIdNum !== req.user.id) {
    res.status(400);
    return res.json({ message: "Must be owner of Booking to delete" });
  }

    //can't delete booking that is in the past
    let bookingObj = booking.toJSON()
    let currentTimeMS = Date.now()
    let startTime = bookingObj.startDate
    let startTimeMS = startTime.getTime()

    // console.log('currentTimeMS', currentTimeMS)
    // console.log('startTime', startTime)
    // console.log("startTimeMS", startTimeMS);
    let dateCalc = startTimeMS - currentTimeMS

    if (dateCalc < 0) {
        const err = new Error(
          "Bookings that have been started can't be deleted"
        );
        err.status = 403;
        next(err);
        return
    }


  //delete booking
    await booking.destroy()

  res.json({
    message: "Successfully deleted"
  });
})


module.exports = router;
