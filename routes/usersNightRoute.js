const express = require("express");
const router = express.Router();

const usersNightController = require("../controllers/usersNightController")

router.get("/", usersNightController.getUsersNight);
router.get("/me", usersNightController.getUserData);
router.get("/:userNightById", usersNightController.getUserNightById);
router.delete("/:userNightById", usersNightController.deleteUserNightById);
router.post("/", usersNightController.registerUserNight);
router.post ("/login", usersNightController.login);
router.post("/booking", usersNightController.localBooking);
router.patch("/update", usersNightController.updateAvatar);
router.patch("/:usersNightById", usersNightController.editUser);

module.exports = router;