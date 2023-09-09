const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/bookingController");


router.post("/", bookingController.createBooking);
// router.post('/bookings', bookingController.createBookings);



module.exports = router;