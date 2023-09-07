const express = require("express");
const router = express.Router();

const usersNightController = require("../controllers/usersNightController")

router.get("/", usersNightController.getUsersNight);
router.get("/me", usersNightController.getUserData);
router.post("/", usersNightController.registerUserNight);

router.post("/me/avatar", usersNightController.updateAvatar)
router.get("/:userNightById", usersNightController.getUserNightById);
router.delete("/:userNightById", usersNightController.deleteUserNightById);
router.post ("/login", usersNightController.login);


router.post("/booking", usersNightController.localBooking);


module.exports = router;