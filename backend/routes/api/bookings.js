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




module.exports = router;
