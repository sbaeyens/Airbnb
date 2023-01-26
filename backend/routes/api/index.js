const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const spotsRouter = require("./spots.js");
const bookingsRouter = require("./bookings.js");
const reviewsRouter = require("./reviews.js");
// const spotImagesRouter = require("./users.js");
// const reviewImagesRouter = require("./users.js");
const { restoreUser } = require('../../utils/auth.js');

router.use(restoreUser);
// backend/routes/api/index.js

router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.use("/spots", spotsRouter);

router.use("/bookings", bookingsRouter);

router.use("/reviews", reviewsRouter);

// router.use("/spotImages", spotImagesRouter)

// router.use("/reviewImages", reviewImagesRouter);


// router.post('/test', function(req, res) {
//   res.json({ requestBody: req.body });
// });

// // GET /api/set-token-cookie
// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//       where: {
//         username: 'Demo-lition'
//       }
//     });
//   setTokenCookie(res, user);
//   return res.json({ user: user });
// });

// // GET /api/restore-user


// router.get(
//   '/restore-user',
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// // GET /api/require-auth
// const { requireAuth } = require('../../utils/auth.js');
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );


module.exports = router;
