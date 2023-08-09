const express = require("express");
const router = express.Router();

const usersNightController = require("../controllers/usersNightController")

router.get("/", usersNightController.getUsersNight); // endpoint ("", VARIABLE, nopmbre de la funcion que he creado)
router.get("/:userNightById", usersNightController.getUserNightById);
router.delete("/:userNightById", usersNightController.deleteUserNightById);
router.post("/", usersNightController.postUserNight);

module.exports = router;