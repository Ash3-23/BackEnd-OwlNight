const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/bookingController");

router.get("/usersNight/:userId", bookingController.getAllBookings);
router.post("/", bookingController.createBooking);
router.put('/:bookingId', bookingController.updateBooking);



module.exports = router;