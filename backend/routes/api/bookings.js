const express = require("express");
const router = express.Router();

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Spot, User, SpotImage, Review, ReviewImage, Booking, sequelize } = require("../../db/models");
const { Op } = require("sequelize");


router.get('/current', requireAuth, async (req, res) => {

    let bookings = await Booking.findAll({
        where: { userId: req.user.id },
        include: {model: Spot}
    })




    res.json(bookings)
})




module.exports = router;
